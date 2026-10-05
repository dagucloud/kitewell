#!/usr/bin/env node
// Captures the screenshots the documentation shows, from a running Kitewell,
// in each language the docs are written in. One service per language, each
// with its own data folder, so the Japanese pages show Japanese data:
//
//   node scripts/capture-docs.mjs --en http://127.0.0.1:19781 --ja http://127.0.0.1:19782 \
//     [--data-en C:\kw-docs-en\data --data-ja C:\kw-docs-ja\data] \
//     [--only overview,first-workflow] [--seeds _seed.mjs,email.mjs] [--lang en] [--list]
//
// --seeds names the modules whose seeds run, for a picture of the demo project
// alone: on a fresh service, `--seeds _seed.mjs --only overview` shows the
// three workflows the pages begin with and nothing another page added.
//
// Every file in scripts/docs-scenes/ exports `scenes`, one entry per picture:
// { name, doc, run }, where run drives the page to the moment the picture
// shows and calls snap(). A module may also export `seed`, which runs once
// per language before any scene and may create what its pictures need; seeds
// must be idempotent, since the same service is captured again and again.
// Pictures land in src/assets/docs/<lang>/<name>.png, which the pages
// reference with a relative path so Astro optimizes them at build time.
//
// The browser is Microsoft Edge or Google Chrome: CHROME names the executable
// when it is not in one of the usual places.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const LANGS = {
  en: { locale: "en-US", timezoneId: "America/Los_Angeles" },
  ja: { locale: "ja-JP", timezoneId: "Asia/Tokyo" },
};
const wanted = (option("lang") ?? "en,ja").split(",");
const only = option("only")?.split(",");
const seeds = option("seeds")?.split(",");
const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const root = path.resolve(here, "..");

// Scenes come from every module in docs-scenes, in file order, so a page's
// pictures stay together.
const sceneDir = path.join(here, "docs-scenes");
const modules = [];
for (const file of fs.readdirSync(sceneDir).filter((f) => f.endsWith(".mjs")).sort()) {
  modules.push({ file, ...(await import(pathToFileURL(path.join(sceneDir, file)).href)) });
}
const scenes = modules.flatMap((m) => (m.scenes ?? []).map((s) => ({ ...s, file: m.file })));
if (args.includes("--list")) {
  for (const s of scenes) console.log(`${s.name.padEnd(32)} ${s.doc.padEnd(20)} ${s.file}`);
  process.exit(0);
}

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

const browser = await chromium.launch({ executablePath });
let failures = 0;
for (const lang of wanted) {
  const base = option(lang);
  if (!base) {
    console.error(`--${lang} <app URL> is needed to capture the ${lang} pictures.`);
    failures++;
    continue;
  }
  const dataDir = option(`data-${lang}`);
  const out = path.join(root, "src", "assets", "docs", lang);
  fs.mkdirSync(out, { recursive: true });
  // Light theme at a size that keeps the sidebar open and the pictures legible
  // at the width the docs show them.
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: "light",
    locale: LANGS[lang].locale,
    timezoneId: LANGS[lang].timezoneId,
  });
  const page = await context.newPage();
  const tools = helpers({ page, base, lang, dataDir, out });

  // The seeds first, so every scene finds its data, whatever order it runs in.
  for (const m of modules) {
    if (!m.seed || (seeds && !seeds.includes(m.file))) continue;
    try {
      await m.seed(tools);
    } catch (error) {
      failures++;
      console.error(`seed in ${m.file} (${lang}) failed:`, error.message);
    }
  }
  for (const scene of scenes) {
    if (only && !only.includes(scene.name)) continue;
    try {
      await scene.run(tools);
      if (!tools.snapped.has(scene.name)) await tools.snap(scene.name);
    } catch (error) {
      failures++;
      // The screen as it was when the scene gave up, kept outside the assets.
      const where = path.join(os.tmpdir(), `kitewell-docs-${scene.name}-${lang}.failed.png`);
      await page.screenshot({ path: where }).catch(() => {});
      console.error(`scene ${scene.name} (${lang}) failed:`, error.message, `(screen saved to ${where})`);
    }
  }
  await context.close();
}
await browser.close();
process.exit(failures ? 1 : 0);

// helpers is what a scene drives the app with.
function helpers({ page, base, lang, dataDir, out }) {
  const snapped = new Set();
  // t translates a phrase of the app's English catalog into the page's
  // language, from the catalog the page itself loaded, so a scene names a
  // control once and finds it in either language.
  const t = (source) => page.evaluate((s) => window.KitewellI18n.t(s), source);
  // exact matches a control's whole caption, so "Run" does not find "Run all".
  const exact = async (source) => new RegExp(`^${(await t(source)).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);
  // api calls the app's own interface as the page would, within the one
  // project the service holds. The page must be the app's for the call to
  // have an origin, so a context that has not opened it yet does so first.
  const api = async (route, init = {}) => {
    if (!page.url().startsWith(base)) await page.goto(base, { waitUntil: "networkidle" });
    return page.evaluate(
      async ({ route, init }) => {
        const pid = (await (await fetch("/gui/api/projects")).json()).projects[0]?.id;
        const join = route.includes("?") ? "&" : "?";
        const r = await fetch(`/gui/api${route}${pid ? `${join}projectId=${pid}` : ""}`, {
          ...init,
          headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
        });
        return { status: r.status, body: await r.json().catch(() => null) };
      },
      { route, init },
    );
  };
  // go opens a page of the app by its hash and lets it settle. The app is
  // loaded afresh each time: a change of hash alone keeps whatever dialog the
  // last scene left open.
  const go = async (hash = "", settle = 1200) => {
    await page.goto("about:blank");
    await page.goto(`${base}/${hash}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(settle);
  };
  // until waits for a check to pass, polling gently.
  const until = async (check, ms = 60_000, every = 1000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      if (await check()) return true;
      await page.waitForTimeout(every);
    }
    return false;
  };
  // snap writes the picture. A clip keeps part of the window; the default is
  // the whole viewport.
  const snap = async (name, { clip } = {}) => {
    const file = path.join(out, `${name}.png`);
    await page.screenshot({ path: file, clip, fullPage: false });
    snapped.add(name);
    console.log(`captured ${lang}/${name}`);
  };
  return { page, base, lang, dataDir, t, exact, api, go, until, snap, snapped };
}
