import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  parseManifest,
  parseWindowsManifest,
  readManifest,
  readReleases,
  readWindowsManifest,
} from "../src/lib/releases.mjs";

function fixture() {
  return {
    version: "0.16.0",
    downloads: Object.fromEntries(
      ["arm64", "amd64"].map((arch) => [
        `darwin-${arch}`,
        {
          url: `https://github.com/dagucloud/kitewell/releases/download/v0.16.0/Kitewell-0.16.0-${arch}.pkg`,
          sha256: "a".repeat(64),
        },
      ]),
    ),
  };
}

function windowsFixture() {
  return {
    version: "0.16.0",
    downloads: {
      "windows-amd64": {
        url: "https://github.com/dagucloud/kitewell/releases/download/v0.16.0/Kitewell-0.16.0-amd64-setup.exe",
        sha256: "b".repeat(64),
      },
    },
  };
}

test("the published manifest exposes matching versioned downloads for both chips", () => {
  const release = parseManifest(JSON.stringify(fixture()));
  assert.equal(release.version, "0.16.0");
  assert.equal(
    release.downloads["darwin-arm64"].url,
    "https://github.com/dagucloud/kitewell/releases/download/v0.16.0/Kitewell-0.16.0-arm64.pkg",
  );
  assert.equal(release.downloads["darwin-amd64"].sha256, "a".repeat(64));
});

test("missing release data produces the preview state; broken release data stops the build", async () => {
  const directory = await mkdtemp(join(tmpdir(), "kitewell-manifest-"));
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

test("the Windows manifest exposes the versioned installer for x64", () => {
  const release = parseWindowsManifest(JSON.stringify(windowsFixture()));
  assert.equal(release.version, "0.16.0");
  assert.equal(
    release.downloads["windows-amd64"].url,
    "https://github.com/dagucloud/kitewell/releases/download/v0.16.0/Kitewell-0.16.0-amd64-setup.exe",
  );
  assert.equal(release.downloads["windows-amd64"].sha256, "b".repeat(64));
});

test("a missing Windows feed leaves Windows unpublished; a broken one stops the build", async () => {
  const directory = await mkdtemp(join(tmpdir(), "kitewell-manifest-"));
  try {
    const file = join(directory, "latest.json");
    assert.equal(await readWindowsManifest(file), null);
    await writeFile(file, "{bad json");
    await assert.rejects(readWindowsManifest(file));
    await writeFile(file, JSON.stringify(fixture()));
    await assert.rejects(readWindowsManifest(file), /windows-amd64/);
    await writeFile(file, JSON.stringify(windowsFixture()));
    assert.equal((await readWindowsManifest(file)).version, "0.16.0");
  } finally {
    await rm(directory, { recursive: true });
  }
});

test("a Windows installer cannot be advertised with a wrong version, name, hash, or address", () => {
  const edit = (change) => (value) => {
    value.downloads["windows-amd64"].url = change(
      value.downloads["windows-amd64"].url,
    );
  };
  const changes = [
    (value) => {
      value.version = "0.16.0-rc1";
    },
    (value) => {
      delete value.downloads["windows-amd64"];
    },
    (value) => {
      value.downloads["windows-amd64"].sha256 = "b".repeat(63);
    },
    edit(() => "https://example.com/Kitewell-0.16.0-amd64-setup.exe"),
    edit((url) => url.replace("https:", "http:")),
    edit((url) => url.replace("/v0.16.0/", "/v0.15.0/")),
    edit((url) => url.replace("-amd64-setup.exe", "-amd64.exe")),
    edit((url) => url.replace("-amd64-setup.exe", "-arm64-setup.exe")),
    edit((url) => url.replace("-setup.exe", ".pkg")),
    edit((url) => `${url}?token=private`),
    edit((url) => `${url}#fragment`),
    edit((url) => url.replace("https://", "https://user:secret@")),
    (value) => {
      value.downloads["windows-amd64"] = null;
    },
    (value) => {
      value.downloads["windows-amd64"].sha256 = ["b".repeat(64)];
    },
    (value) => {
      value.downloads = [];
    },
  ];
  for (const change of changes) {
    const value = windowsFixture();
    change(value);
    assert.throws(() => parseWindowsManifest(JSON.stringify(value)));
  }
});

test("each feed describes its own system only", () => {
  assert.throws(() => parseManifest(JSON.stringify(windowsFixture())));
  assert.throws(() => parseWindowsManifest(JSON.stringify(fixture())));
});

test("the two feeds are read independently", async () => {
  const directory = await mkdtemp(join(tmpdir(), "kitewell-manifest-"));
  try {
    const macos = join(directory, "macos.json");
    const windows = join(directory, "windows.json");
    assert.deepEqual(await readReleases({ macos, windows }), {
      macos: null,
      windows: null,
    });
    await writeFile(windows, JSON.stringify(windowsFixture()));
    const windowsOnly = await readReleases({ macos, windows });
    assert.equal(windowsOnly.macos, null);
    assert.equal(windowsOnly.windows.version, "0.16.0");
    await writeFile(macos, JSON.stringify(fixture()));
    const both = await readReleases({ macos, windows });
    assert.equal(both.macos.version, "0.16.0");
    assert.equal(both.windows.version, "0.16.0");
    await writeFile(macos, "{bad json");
    await assert.rejects(readReleases({ macos, windows }));
  } finally {
    await rm(directory, { recursive: true });
  }
});
