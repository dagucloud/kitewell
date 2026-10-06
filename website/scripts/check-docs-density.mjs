#!/usr/bin/env node
// Keeps the guide pages readable: a paragraph says one thing in a few
// sentences, a page names the few controls the reader uses, and a guide
// stays short enough to read in one sitting. Reference pages may be long
// but keep their paragraphs short too. Exits 1 when a converted page is
// over a limit; pages not yet converted are reported, not failed.
//
//   node scripts/check-docs-density.mjs
import fs from "node:fs";
import path from "node:path";

const docs = path.resolve("src", "content", "docs", "docs");
const LIMITS = { paragraphWords: 55, boldPerPage: 60, guideWords: 900 };
// Pages the rewrite has not reached yet. Remove a page here once it is cut
// down, and the limits apply to it from then on.
const LEGACY = new Set([
  "ai", "alerts", "apis", "backups", "batches", "browser", "cloud-sync", "desktop", "email",
  "getting-started", "index", "install", "knowledge", "mcp", "releases", "runs", "scheduling", "secrets",
  "sharing", "troubleshooting", "uninstall", "updates", "webhooks", "workflow-builder",
]);

const list = (dir, prefix = "") =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? list(path.join(dir, e.name), `${prefix}${e.name}/`) : e.name.endsWith(".md") ? [`${prefix}${e.name}`] : []))
    .sort();

// Paragraphs are blocks of prose: headings, pictures, tables, fences, and
// asides are not measured; a list item counts as a paragraph of its own.
const paragraphs = (text) =>
  text
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .flatMap((block) => (/^\s*(?:[-*]|\d+\.) /.test(block) ? block.split(/\n(?=\s*(?:[-*]|\d+\.) )/) : [block]))
    .map((block) => block.replace(/!\[[^\]]*\]\([^)]*\)/g, "").trim())
    .filter((block) => block && !/^(#|\||:::|<)/.test(block));
const words = (text) => text.split(/\s+/).filter(Boolean).length;

let failures = 0;
let pending = 0;
for (const page of list(docs)) {
  const name = page.replace(/\.md$/, "");
  const text = fs.readFileSync(path.join(docs, page), "utf8");
  const body = text.replace(/^---[\s\S]*?---/, "").replace(/```[\s\S]*?```/g, "");
  const paras = paragraphs(text);
  const bold = (body.match(/\*\*[^*\n]+\*\*/g) ?? []).length;
  const total = words(body);
  const reference = name.startsWith("reference/");
  const over = [];
  for (const p of paras.filter((p) => words(p) > LIMITS.paragraphWords)) {
    over.push(`a paragraph of ${words(p)} words (limit ${LIMITS.paragraphWords}): "${p.replace(/\s+/g, " ").slice(0, 60)}…"`);
  }
  if (!reference && bold > LIMITS.boldPerPage) over.push(`${bold} bold labels (limit ${LIMITS.boldPerPage})`);
  if (!reference && total > LIMITS.guideWords) over.push(`${total} words (limit ${LIMITS.guideWords} for a guide)`);
  if (!over.length) continue;
  if (LEGACY.has(name)) {
    pending++;
    continue;
  }
  failures++;
  console.log(`${page}:\n  ${over.join("\n  ")}`);
}
console.log(`${failures} page${failures === 1 ? "" : "s"} over the limits; ${pending} not yet converted.`);
process.exit(failures ? 1 : 0);
