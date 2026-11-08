#!/usr/bin/env node
// Draws each blog post's card for link previews, such as a post on X, from
// the post's title, in the look of the site's own card (public/social-ja.svg):
//
//   node scripts/render-blog-cards.mjs
//
// Cards land in src/assets/blog/<slug>.png, 1200 × 630. The build refuses a
// post without one, so run this after writing a post or changing a title,
// and commit the card with it.
//
// The browser is Microsoft Edge or Google Chrome: CHROME names the executable
// when it is not in one of the usual places.
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { breakByPhrase } from "../src/lib/japanese.mjs";

const posts = path.resolve("src/blog/ja");
const cards = path.resolve("src/assets/blog");
const width = 1200;
const height = 630;

const executablePath =
  process.env.CHROME ??
  [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("No Chrome or Edge found; set CHROME to the browser executable.");
  process.exit(2);
}

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const titleOf = (markdown) => markdown.match(/^---\n[\s\S]*?^title:\s*(.+)$/m)?.[1].trim();

// The title wraps between phrases, as on the page, and shrinks until it
// fits in three lines.
const card = (title) =>
  breakByPhrase(`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; width: ${width}px; height: ${height}px; background: #ffffff; }
  body { position: relative; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Sans", "Yu Gothic", Meiryo, sans-serif; color: #0c0f0e; }
  .brand { position: absolute; left: 72px; top: 64px; display: flex; align-items: center; gap: 16px; font-size: 34px; font-weight: 700; letter-spacing: -0.5px; }
  .eyebrow { position: absolute; left: 72px; top: 172px; margin: 0; font-size: 22px; font-weight: 650; letter-spacing: 2px; color: #5a615e; }
  .title { position: absolute; left: 72px; right: 72px; top: 222px; margin: 0; font-size: 64px; font-weight: 800; line-height: 1.3; word-break: keep-all; overflow-wrap: anywhere; }
  .site { position: absolute; left: 72px; top: 548px; margin: 0; font-size: 24px; font-weight: 650; }
</style>
</head>
<body>
  <div class="brand"><svg width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#173d33"/><g transform="translate(10 10) scale(.6875)" fill="#ffffff"><path d="M41.5 4.5C42.7 3.7 44.1 4.9 43.6 6.3L24.1 58.4C23.7 59.7 22 59.9 21.3 58.8L5.3 32.8C4.2 31.1 4.6 28.9 6.3 27.8Z"/><path d="M47.1 10.1C47.6 8.8 49.1 8.7 49.7 10L60.3 33C61.1 34.7 60.6 36.7 59.1 37.8L31 59C29.8 59.9 28.4 58.8 28.9 57.4Z"/></g></svg>Kitewell</div>
  <p class="eyebrow">ブログ</p>
  <p class="title">${escape(title)}</p>
  <p class="site">kitewell.com</p>
</body>
</html>`);

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width, height } });
fs.mkdirSync(cards, { recursive: true });
for (const file of fs.readdirSync(posts).filter((name) => name.endsWith(".md"))) {
  const title = titleOf(fs.readFileSync(path.join(posts, file), "utf8"));
  if (!title) throw new Error(`${file} has no title`);
  await page.setContent(card(title));
  await page.evaluate(() => {
    const heading = document.querySelector(".title");
    let size = 64;
    while (heading.getBoundingClientRect().height > size * 1.3 * 3 + 1 && size > 36) {
      size -= 2;
      heading.style.fontSize = `${size}px`;
    }
  });
  const out = path.join(cards, file.replace(/\.md$/, ".png"));
  await page.screenshot({ path: out });
  console.log(path.relative(process.cwd(), out));
}
await browser.close();
