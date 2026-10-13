import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { film } from "../src/lib/film.mjs";

const publicFile = (path) => new URL(`../public${path}`, import.meta.url);

test("each cut of the film has its video, poster, and both caption tracks", () => {
  for (const [locale, cut] of Object.entries(film)) {
    assert.ok(existsSync(publicFile(`/videos/${cut.name}.mp4`)), `${locale} video`);
    assert.ok(existsSync(publicFile(`/videos/${cut.name}.webp`)), `${locale} poster`);
    for (const [, lang] of cut.tracks) {
      assert.ok(existsSync(publicFile(`/videos/${cut.name}.${lang}.vtt`)), `${locale} ${lang} track`);
    }
  }
});

test("the transcripts tell the same film in both languages", () => {
  assert.equal(film.en.seconds, film.ja.seconds);
  assert.equal(film.en.scenes.length, film.ja.scenes.length);
  for (const cut of Object.values(film)) {
    for (const scene of cut.scenes) {
      assert.equal(scene.length, 2, "each scene pairs a narrated line with what is shown");
    }
  }
});
