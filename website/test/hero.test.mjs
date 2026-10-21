import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const figures = JSON.parse(readFileSync(new URL("../src/data/hero-runs.json", import.meta.url), "utf8"));
const file = (path) => new URL(`..${path}`, import.meta.url);

test("each language's loop has its cuts, poster, and stills", () => {
  for (const locale of ["en", "ja"]) {
    const { video } = figures[locale];
    for (const name of [`${video}.mp4`, `${video}-720.mp4`, `${video}.webp`]) {
      assert.ok(existsSync(file(`/public/videos/hero/${name}`)), name);
    }
    for (const still of ["chat", "replayed", "recovered"]) {
      assert.ok(existsSync(file(`/src/assets/home/${locale}/${still}.webp`)), `${locale} ${still}`);
    }
  }
});

// The page quotes these figures beside the loop; each comes from a captured
// run, and a capture that lost one would leave a sentence with a hole.
test("each language has every figure the page quotes", () => {
  for (const locale of ["en", "ja"]) {
    const run = figures[locale];
    assert.ok(Date.parse(run.capturedAt), `${locale} capturedAt`);
    for (const name of ["cold", "replayed", "recovered"]) {
      const { seconds, withoutAI } = run[name];
      assert.ok(seconds > 0, `${locale} ${name} seconds`);
      assert.ok(withoutAI.total > 0 && withoutAI.count >= 0 && withoutAI.count <= withoutAI.total, `${locale} ${name} withoutAI`);
    }
    assert.ok(run.replayed.withoutAI.count > run.cold.withoutAI.count, `${locale}: the replayed run ran more without AI than the first`);
    assert.ok(run.recovered.fixed, `${locale} the click AI fixed`);
  }
});
