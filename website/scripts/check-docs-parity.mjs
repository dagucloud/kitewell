#!/usr/bin/env node
// Checks that the docs in every other language mirror the English ones: every
// page has its twin, with the same number of sections and the same pictures,
// and every picture a page shows exists on disk, among that language's own.
// Exits 1 when something is off, so it can run before a build.
//
//   node scripts/check-docs-parity.mjs
import fs from "node:fs";
import path from "node:path";
import { locales } from "../src/lib/i18n.mjs";

const docs = path.resolve("src", "content", "docs");
// English is at the root; every other language under its own folder.
const folder = (lang) => (lang === "en" ? path.join(docs, "docs") : path.join(docs, lang, "docs"));
// Pages are named by their path under docs/, so reference/x.md has its twin
// at LANG/docs/reference/x.md.
const list = (dir, prefix = "") =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? list(path.join(dir, e.name), `${prefix}${e.name}/`) : e.name.endsWith(".md") ? [`${prefix}${e.name}`] : []))
    .sort();
const pages = list(folder("en"));
let problems = 0;
const problem = (text) => {
  problems++;
  console.log(text);
};

const read = (file) => fs.readFileSync(file, "utf8").replace(/^---[\s\S]*?---/, "");
const headings = (text) => [...text.matchAll(/^(#{2,3}) /gm)].map((m) => m[1]);
const pictures = (text) => [...text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({ alt: m[1], src: m[2] }));
const names = (list) => list.map((p) => path.basename(p.src)).join(",");

const check = (lang, dir, list, page) => {
  for (const p of list) {
    const file = path.resolve(dir, path.dirname(page), p.src);
    if (!fs.existsSync(file)) problem(`${page} (${lang}): missing picture ${p.src}`);
    if (!p.alt.trim()) problem(`${page} (${lang}): picture without alt text ${p.src}`);
    const expected = path.join("assets", "docs", lang);
    if (!file.includes(path.sep + expected + path.sep)) problem(`${page} (${lang}): picture outside src/${expected}: ${p.src}`);
  }
};

const referenced = new Set();
for (const page of pages) {
  const a = read(path.join(folder("en"), page));
  const pa = pictures(a);
  check("en", folder("en"), pa, page);
  for (const p of pa) referenced.add(`en/${path.basename(p.src)}`);
  for (const lang of locales.filter((l) => l !== "en")) {
    const twin = path.join(folder(lang), page);
    if (!fs.existsSync(twin)) {
      problem(`${page}: no ${lang} page`);
      continue;
    }
    const b = read(twin);
    const ha = headings(a);
    const hb = headings(b);
    if (ha.join() !== hb.join()) problem(`${page}: sections differ — en ${ha.length} (${ha.join(" ")}), ${lang} ${hb.length} (${hb.join(" ")})`);
    const pb = pictures(b);
    if (names(pa) !== names(pb)) problem(`${page}: pictures differ — en [${names(pa)}], ${lang} [${names(pb)}]`);
    check(lang, folder(lang), pb, page);
    for (const p of pb) referenced.add(`${lang}/${path.basename(p.src)}`);
  }
}
for (const lang of locales.filter((l) => l !== "en")) {
  if (!fs.existsSync(folder(lang))) continue;
  for (const f of list(folder(lang)).filter((f) => !pages.includes(f))) problem(`${f}: ${lang} page with no English page`);
}

// Pictures nobody shows are weight for nothing.
for (const lang of locales) {
  const dir = path.resolve("src", "assets", "docs", lang);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) if (!referenced.has(`${lang}/${f}`)) problem(`src/assets/docs/${lang}/${f}: not shown by any page`);
}

console.log(`${pages.length} pages, ${referenced.size} pictures, ${problems} problem${problems === 1 ? "" : "s"}.`);
process.exit(problems ? 1 : 0);
