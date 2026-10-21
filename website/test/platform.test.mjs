import { test } from "node:test";
import assert from "node:assert/strict";
import { detectPlatform, pickDownload } from "../src/lib/platform.mjs";

const agents = {
  mac: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15",
  windows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  iphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  android: "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36",
  linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
  chromebook: "Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
};

const releases = {
  macos: {
    version: "0.18.3",
    downloads: {
      "darwin-arm64": { url: "https://example.test/arm64.pkg", sha256: "a".repeat(64) },
      "darwin-amd64": { url: "https://example.test/amd64.pkg", sha256: "b".repeat(64) },
    },
  },
  windows: {
    version: "0.18.2",
    downloads: { "windows-amd64": { url: "https://example.test/Setup.exe", sha256: "c".repeat(64) } },
  },
};

test("a Mac is offered Apple silicon unless its chip says Intel", () => {
  assert.deepEqual(detectPlatform({ userAgent: agents.mac }), { os: "mac", arch: "arm64" });
  assert.deepEqual(detectPlatform({ userAgent: agents.mac, uaPlatform: "macOS", architecture: "arm" }), { os: "mac", arch: "arm64" });
  assert.deepEqual(detectPlatform({ userAgent: agents.mac, uaPlatform: "macOS", architecture: "x86" }), { os: "mac", arch: "amd64" });
});

test("an iPad asking for the desktop site is not a Mac", () => {
  assert.equal(detectPlatform({ userAgent: agents.mac, maxTouchPoints: 5 }).os, "mobile");
});

test("phones are mobile, and other desktops are told Kitewell needs Mac or Windows", () => {
  assert.equal(detectPlatform({ userAgent: agents.iphone, maxTouchPoints: 5 }).os, "mobile");
  assert.equal(detectPlatform({ userAgent: agents.android, uaPlatform: "Android" }).os, "mobile");
  assert.equal(detectPlatform({ userAgent: agents.linux, uaPlatform: "Linux" }).os, "desktop-other");
  assert.equal(detectPlatform({ userAgent: agents.chromebook, uaPlatform: "Chrome OS" }).os, "desktop-other");
  assert.equal(detectPlatform().os, "desktop-other");
});

test("Windows takes the x64 installer, and Windows on Arm none yet", () => {
  const windows = detectPlatform({ userAgent: agents.windows, uaPlatform: "Windows" });
  assert.deepEqual(windows, { os: "windows", arch: "amd64" });
  assert.equal(pickDownload(releases, windows).url, "https://example.test/Setup.exe");
  const arm = detectPlatform({ userAgent: agents.windows, uaPlatform: "Windows", architecture: "arm" });
  assert.equal(pickDownload(releases, arm), null);
});

test("each platform gets its own published installer and version", () => {
  assert.deepEqual(pickDownload(releases, { os: "mac", arch: "amd64" }), {
    key: "darwin-amd64",
    version: "0.18.3",
    url: "https://example.test/amd64.pkg",
    sha256: "b".repeat(64),
  });
  assert.equal(pickDownload(releases, { os: "mac", arch: "arm64" }).key, "darwin-arm64");
  assert.equal(pickDownload(releases, { os: "mobile", arch: null }), null);
  assert.equal(pickDownload({ macos: releases.macos, windows: null }, { os: "windows", arch: "amd64" }), null);
});

// The site's head runs detectPlatform from its source text before the page
// draws, so the function must work with nothing from its module around it.
test("detectPlatform works from its source text alone", () => {
  const standalone = new Function(`return (${detectPlatform})`)();
  assert.deepEqual(standalone({ userAgent: agents.windows }), detectPlatform({ userAgent: agents.windows }));
  assert.equal(standalone({ userAgent: agents.mac, maxTouchPoints: 5 }).os, "mobile");
});
