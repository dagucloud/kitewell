import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { proofs } from "../src/lib/proof.mjs";

const publicFile = (path) => new URL(`../public${path}`, import.meta.url);

test("each hero recording has its video and poster in both languages", () => {
  for (const name of proofs) {
    for (const locale of ["en", "ja"]) {
      for (const ext of ["mp4", "webp"]) {
        assert.ok(existsSync(publicFile(`/videos/proof/${name}-${locale}.${ext}`)), `${name}-${locale}.${ext}`);
      }
    }
  }
});
