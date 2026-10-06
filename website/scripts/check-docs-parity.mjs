#!/usr/bin/env node
// Checks that the Japanese docs mirror the English ones: every page has its
// twin, with the same number of sections and the same pictures, and every
// picture a page shows exists on disk. Exits 1 when something is off, so it
// can run before a build.
//
//   node scripts/check-docs-parity.mjs
import fs from "node:fs";
import path from "node:path";

const docs = path.resolve("src", "content", "docs");
const en = path.join(docs, "docs");
const ja = path.join(docs, "ja", "docs");
// Pages are named by their path under docs/, so reference/x.md has its twin
// at ja/docs/reference/x.md.
const list = (dir, prefix = "") =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? list(path.join(dir, e.name), `${prefix}${e.name}/`) : e.name.endsWith(".md") ? [`${prefix}${e.name}`] : []))
    .sort();
const pages = list(en);
let problems = 0;
const problem = (text) => {
  problems++;
  console.log(text);
};

const read = (file) => fs.readFileSync(file, "utf8").replace(/^---[\s\S]*?---/, "");
const headings = (text) => [...text.matchAll(/^(#{2,3}) /gm)].map((m) => m[1]);
const pictures = (text) => [...text.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({ alt: m[1], src: m[2] }));

for (const page of pages) {
  const twin = path.join(ja, page);
  if (!fs.existsSync(twin)) {
    problem(`${page}: no Japanese page`);
    continue;
  }
  const a = read(path.join(en, page));
  const b = read(twin);
  const ha = headings(a);
  const hb = headings(b);
  if (ha.join() !== hb.join()) problem(`${page}: sections differ — en ${ha.length} (${ha.join(" ")}), ja ${hb.length} (${hb.join(" ")})`);
  const pa = pictures(a);
  const pb = pictures(b);
  const names = (list) => list.map((p) => path.basename(p.src)).join(",");
  if (names(pa) !== names(pb)) problem(`${page}: pictures differ — en [${names(pa)}], ja [${names(pb)}]`);
  for (const [lang, dir, list] of [["en", en, pa], ["ja", ja, pb]]) {
    for (const p of list) {
      const file = path.resolve(dir, p.src);
      if (!fs.existsSync(file)) problem(`${page} (${lang}): missing picture ${p.src}`);
      if (!p.alt.trim()) problem(`${page} (${lang}): picture without alt text ${p.src}`);
      const expected = path.join("assets", "docs", lang);
      if (!file.includes(path.sep + expected + path.sep)) problem(`${page} (${lang}): picture outside src/${expected}: ${p.src}`);
    }
  }
}
const extra = fs.readdirSync(ja).filter((f) => f.endsWith(".md") && !pages.includes(f));
for (const f of extra) problem(`${f}: Japanese page with no English page`);

// Pictures nobody shows are weight for nothing.
const referenced = new Set();
for (const [dir, lang] of [[en, "en"], [ja, "ja"]]) {
  for (const page of list(dir)) {
    for (const p of pictures(read(path.join(dir, page)))) referenced.add(`${lang}/${path.basename(p.src)}`);
  }
}
for (const lang of ["en", "ja"]) {
  const dir = path.resolve("src", "assets", "docs", lang);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) if (!referenced.has(`${lang}/${f}`)) problem(`src/assets/docs/${lang}/${f}: not shown by any page`);
}

console.log(`${pages.length} pages, ${referenced.size} pictures, ${problems} problem${problems === 1 ? "" : "s"}.`);
process.exit(problems ? 1 : 0);
