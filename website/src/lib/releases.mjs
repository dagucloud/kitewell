import { readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

export const manifestFile = resolve("public/updates/macos/latest.json");
export const windowsManifestFile = resolve("public/updates/windows/latest.json");
const versionPattern = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/;

// Each feed describes one operating system: the same grammar, a different set
// of architectures, and a different package name.
const systems = {
  macos: {
    architectures: ["darwin-arm64", "darwin-amd64"],
    asset: (version, architecture) =>
      `Kitewell-${version}-${architecture.slice("darwin-".length)}.pkg`,
  },
  windows: {
    architectures: ["windows-amd64"],
    asset: (version, architecture) =>
      `Kitewell-${version}-${architecture.slice("windows-".length)}-setup.exe`,
  },
};

export function parseManifest(text, system = "macos") {
  const { architectures, asset } = systems[system];
  const manifest = JSON.parse(text);
  if (
    !manifest ||
    typeof manifest.version !== "string" ||
    !versionPattern.test(manifest.version) ||
    !manifest.downloads ||
    typeof manifest.downloads !== "object" ||
    Array.isArray(manifest.downloads)
  ) {
    throw new Error("Invalid release version or downloads");
  }
  for (const architecture of architectures) {
    const download = manifest.downloads[architecture];
    if (
      !download ||
      typeof download.url !== "string" ||
      typeof download.sha256 !== "string" ||
      !/^[a-fA-F0-9]{64}$/.test(download.sha256)
    ) {
      throw new Error(`Missing installer or checksum: ${architecture}`);
    }
    const url = new URL(download.url);
    const expected = `/dagucloud/kitewell/releases/download/v${manifest.version}/${asset(manifest.version, architecture)}`;
    if (
      url.protocol !== "https:" ||
      url.host !== "github.com" ||
      url.pathname !== expected ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    ) {
      throw new Error(`Invalid installer URL: ${architecture}`);
    }
  }
  return manifest;
}

export function parseWindowsManifest(text) {
  return parseManifest(text, "windows");
}

export async function readManifest(file = manifestFile, system = "macos") {
  try {
    return parseManifest(await readFile(file, "utf8"), system);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

export function readWindowsManifest(file = windowsManifestFile) {
  return readManifest(file, "windows");
}

// The published state of every system, each read from its own feed: a
// missing feed leaves that system unpublished without hiding the other.
export async function readReleases({
  macos = manifestFile,
  windows = windowsManifestFile,
} = {}) {
  const [macosRelease, windowsRelease] = await Promise.all([
    readManifest(macos),
    readWindowsManifest(windows),
  ]);
  return { macos: macosRelease, windows: windowsRelease };
}

export async function releaseNotes() {
  const directory = resolve("../releases");
  const files = await readdir(directory);
  return Promise.all(
    files
      .filter(
        (file) =>
          versionPattern.test(file.replace(/\.md$/, "")) &&
          file.endsWith(".md"),
      )
      .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))
      .map(async (file) => ({
        version: file.slice(0, -3),
        body: await readFile(join(directory, file), "utf8"),
      })),
  );
}
