import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { film } from "../src/lib/film.mjs";
import { locales } from "../src/lib/i18n.mjs";

const publicFile = (path) => new URL(`../public${path}`, import.meta.url);

test("each cut of the film has its video, poster, and caption tracks", () => {
  for (const [locale, cut] of Object.entries(film)) {
    assert.ok(existsSync(publicFile(`/videos/${cut.name}.mp4`)), `${locale} video`);
    assert.ok(existsSync(publicFile(`/videos/${cut.name}.webp`)), `${locale} poster`);
    for (const [, lang] of cut.tracks) {
      assert.ok(existsSync(publicFile(`/videos/${cut.name}.${lang}.vtt`)), `${locale} ${lang} track`);
    }
  }
});

test("every language tells the same film", () => {
  for (const locale of locales) {
    const cut = film[locale];
    assert.ok(cut, `${locale} has the film`);
    assert.equal(cut.seconds, film.en.seconds, `${locale} length`);
    assert.equal(cut.scenes.length, film.en.scenes.length, `${locale} scenes`);
    for (const scene of cut.scenes) {
      assert.equal(scene.length, 2, "each scene pairs a narrated line with what is shown");
    }
  }
});
