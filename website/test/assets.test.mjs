import assert from "node:assert/strict";
import test from "node:test";
import { versioned } from "../src/lib/assets.mjs";

test("a published file's address names what it holds", () => {
  const english = versioned("/videos/proof/websites-en.mp4");
  assert.match(english, /^\/videos\/proof\/websites-en\.mp4\?v=[0-9a-f]{10}$/);
  assert.equal(versioned("/videos/proof/websites-en.mp4"), english, "the same file keeps its address");
  assert.notEqual(versioned("/videos/proof/websites-ja.mp4").split("?v=")[1], english.split("?v=")[1], "a different file has another");
});
