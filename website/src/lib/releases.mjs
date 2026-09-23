import { readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

export const manifestFile = resolve("public/updates/macos/latest.json");
const versionPattern = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/;
const architectures = ["darwin-arm64", "darwin-amd64"];

export function parseManifest(text) {
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
    const asset = manifest.downloads[architecture];
    if (
      !asset ||
      typeof asset.url !== "string" ||
      typeof asset.sha256 !== "string" ||
      !/^[a-fA-F0-9]{64}$/.test(asset.sha256)
    ) {
      throw new Error(`Missing installer or checksum: ${architecture}`);
    }
    const url = new URL(asset.url);
    const expected = `/dagucloud/runstead/releases/download/v${manifest.version}/Kitewell-${manifest.version}-${architecture.slice(7)}.pkg`;
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

export async function readManifest(file = manifestFile) {
  try {
    return parseManifest(await readFile(file, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
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
