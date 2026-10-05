// Japanese text may wrap between any two characters, so a browser can split
// a word such as 手動 across two lines. BudouX finds the boundaries between
// phrases; marking them lets every browser wrap where a reader would pause.

import { HTMLProcessingParser, jaModel } from "budoux";
import { DOMParser } from "linkedom";

const NBSP = "\u00a0";
const untouched = new Set(["SCRIPT", "STYLE", "PRE", "CODE", "TEXTAREA"]);

// The space after a Latin word or a number belongs to what follows it: a
// particle (Kitewell には), a counter (1 人), or the rest of a name (Dagu
// Cloud). So does the space between a Japanese word and a number (各 100).
const bound = [/(?<=[A-Za-z0-9.+)]) (?=\S)/g, /(?<=[\p{sc=Han}\p{sc=Hiragana}\p{sc=Katakana}ー]) (?=\d)/gu];
// A particle after a closing bracket stays on its line: （ChatGPT や Claude）での.
const closing = /[）」』】〕]$/;
const particle = /^\p{sc=Hiragana}/u;

// The documentation keeps Starlight's own wrapping.
export function wrapsByPhrase(pathname) {
  return (pathname === "/ja" || pathname.startsWith("/ja/")) && !pathname.startsWith("/ja/docs/");
}

// Returns the page with a <wbr> between phrases and the "phrases" class on
// each paragraph that has them; the stylesheet keeps words whole there.
export function breakByPhrase(html) {
  const document = new DOMParser().parseFromString(html, "text/html");
  bindSpaces(document.body);
  const parser = new HTMLProcessingParser(jaModel, { className: "phrases", separator: document.createElement("wbr") });
  parser.applyToElement(document.body);
  for (const mark of document.body.querySelectorAll("wbr")) {
    const before = mark.previousSibling?.nodeValue ?? "";
    const after = mark.nextSibling?.nodeValue ?? "";
    if (closing.test(before) && particle.test(after)) mark.remove();
  }
  return document.toString();
}

function bindSpaces(element) {
  for (const child of element.childNodes) {
    if (child.nodeType === 1 && !untouched.has(child.tagName)) bindSpaces(child);
    else if (child.nodeType === 3) child.nodeValue = bound.reduce((text, space) => text.replace(space, NBSP), child.nodeValue);
  }
}
