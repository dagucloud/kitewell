import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseManifest, readManifest } from "../src/lib/releases.mjs";

function fixture() {
  return {
    version: "0.16.0",
    downloads: Object.fromEntries(
      ["arm64", "amd64"].map((arch) => [
        `darwin-${arch}`,
        {
          url: `https://github.com/dagucloud/runstead/releases/download/v0.16.0/Runstead-0.16.0-${arch}.pkg`,
          sha256: "a".repeat(64),
        },
      ]),
    ),
  };
}

test("the published manifest exposes matching versioned downloads for both chips", () => {
  const release = parseManifest(JSON.stringify(fixture()));
  assert.equal(release.version, "0.16.0");
  assert.equal(
    release.downloads["darwin-arm64"].url,
    "https://github.com/dagucloud/runstead/releases/download/v0.16.0/Runstead-0.16.0-arm64.pkg",
  );
  assert.equal(release.downloads["darwin-amd64"].sha256, "a".repeat(64));
});

test("missing release data produces the preview state; broken release data stops the build", async () => {
  const directory = await mkdtemp(join(tmpdir(), "runstead-manifest-"));
  try {
    const file = join(directory, "latest.json");
    assert.equal(await readManifest(file), null);
    await writeFile(file, "{bad json");
    await assert.rejects(readManifest(file));
    await writeFile(file, JSON.stringify(fixture()));
    assert.equal((await readManifest(file)).version, "0.16.0");
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("a download cannot be advertised with a wrong version, missing chip, invalid hash, or foreign URL", () => {
  const changes = [
    (value) => {
      value.version = "0.16.0-beta.1";
    },
    (value) => {
      delete value.downloads["darwin-amd64"];
    },
    (value) => {
      value.downloads["darwin-arm64"].sha256 = "invalid";
    },
    (value) => {
      value.downloads["darwin-arm64"].url =
        "https://example.com/unverified.pkg";
    },
    (value) => {
      value.downloads["darwin-arm64"].url = value.downloads[
        "darwin-arm64"
      ].url.replace("/v0.16.0/", "/v0.15.0/");
    },
    (value) => {
      value.downloads["darwin-arm64"].url += "?token=private";
    },
  ];
  for (const change of changes) {
    const value = fixture();
    change(value);
    assert.throws(() => parseManifest(JSON.stringify(value)));
  }
});

test("manifest fields use the same JSON types required by the app updater", () => {
  for (const value of [null, [], "0.16.0", 16, true, {}]) {
    assert.throws(() => parseManifest(JSON.stringify(value)));
  }
  const changes = [
    (value) => {
      value.version = [value.version];
    },
    (value) => {
      value.downloads = [];
    },
    (value) => {
      value.downloads = "darwin-arm64";
    },
    (value) => {
      value.downloads["darwin-arm64"] = null;
    },
    (value) => {
      value.downloads["darwin-arm64"].sha256 = ["a".repeat(64)];
    },
    (value) => {
      value.downloads["darwin-arm64"].url = [
        value.downloads["darwin-arm64"].url,
      ];
    },
  ];
  for (const change of changes) {
    const value = fixture();
    change(value);
    assert.throws(() => parseManifest(JSON.stringify(value)));
  }
});
