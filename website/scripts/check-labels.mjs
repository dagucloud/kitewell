#!/usr/bin/env node
// Lists every bold phrase in the docs that is not a label the app shows.
// A bold phrase stands for something the reader clicks or types into, so it
// must be spelled as the app spells it: in English, a key of the app's
// catalog; in Japanese, that key's Japanese column. The catalog is read from
// the app's source, named by KITEWELL_SOURCE or the sibling checkout.
//
//   node scripts/check-labels.mjs [--all]
//
// Without --all, phrases that are plainly not labels are left out: links,
// sentences, page titles, and anything with no letters. The rest is for a
// person to judge, which is why this is a report rather than a test.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const source = process.env.KITEWELL_SOURCE ?? path.resolve("..", "..", "kitewell-source");
const catalogFile = path.join(source, "i18n", "messages.mjs");
if (!fs.existsSync(catalogFile)) {
  console.error(`No catalog at ${catalogFile}; set KITEWELL_SOURCE to the app's checkout.`);
  process.exit(2);
}
const { messages, languages } = await import(pathToFileURL(catalogFile).href);
const ja = languages.indexOf("ja");
const english = new Set(Object.keys(messages));
const japanese = new Set(Object.values(messages).map((row) => row[ja]).filter(Boolean));
// A label may carry a placeholder the page fills in — "Run {count} rows" is
// shown as "Run 6 rows" — so a key with one matches any value in its place.
const fold = (s) => s.replace(/…$/, "").trim();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const matcher = (labels) => {
  const exact = new Set([...labels].map(fold));
  // A key that is nothing but placeholders, "{comparison} {value}", would
  // match any phrase at all; only keys with words of their own become patterns.
  const patterns = [...labels]
    .filter((l) => /\{[a-z]+\}/.test(l) && /[\p{L}]{3,}/u.test(l.replace(/\{[a-z]+\}/g, "")))
    .map((l) => new RegExp(`^${fold(l).split(/\{[a-z]+\}/).map(escape).join(".+")}$`));
  return (phrase) => exact.has(phrase) || patterns.some((p) => p.test(phrase));
};
const knownEnglish = matcher(english);
const knownJapanese = matcher(japanese);

const all = process.argv.includes("--all");
const docs = path.resolve("src", "content", "docs");
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".md")) files.push(p);
  }
})(docs);

let missing = 0;
for (const file of files.sort()) {
  const lang = file.includes(`${path.sep}ja${path.sep}`) ? "ja" : "en";
  const known = lang === "ja" ? knownJapanese : knownEnglish;
  const text = fs.readFileSync(file, "utf8").replace(/^---[\s\S]*?---/, "");
  const found = new Map();
  for (const [, phrase] of text.matchAll(/\*\*([^*\n]+?)\*\*/g)) {
    const p = phrase.replace(/…$/, "").trim();
    if (!all) {
      if (/\[|\]\(/.test(p)) continue; // a link in bold
      if (/[.。]$/.test(p) && p.length > 30) continue; // a sentence
      if (!/[\p{L}]/u.test(p)) continue; // no letters at all
    }
    if (!known(fold(p))) {
      // "Tools → Check workflow" names two controls; each must exist on its own.
      const parts = p.split(/\s*(?:→|>)\s*/).map(fold);
      if (parts.length > 1 && parts.every((part) => known(part))) continue;
      found.set(p, (found.get(p) ?? 0) + 1);
    }
  }
  if (found.size) {
    console.log(`\n${path.relative(process.cwd(), file)}`);
    for (const [p, n] of found) console.log(`  ${p}${n > 1 ? `  ×${n}` : ""}`);
    missing += found.size;
  }
}
console.log(`\n${missing} bold phrases are not app labels (${files.length} pages).`);
