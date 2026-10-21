import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Other products are named on the comparison page, where each claim carries
// its source, and nowhere on the home page.
const others = ["UiPath", "Power Automate", "Automation Anywhere", "WinActor", "BizRobo", "cotomi", "Skyvern", "Browser Use", "Stagehand", "Zapier", "n8n"];
const files = ["../src/views/Home.astro", "../src/lib/hero.mjs"];

test("the home page names no other product", () => {
  for (const file of files) {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    for (const name of others) {
      assert.ok(!source.includes(name), `${file} names ${name}`);
    }
  }
});
