import { readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";

// The notices the installers carry. The app's publisher copies them here with
// each release, so the licenses page always describes what ships.
export const licensesDirectory = resolve("public/licenses");

const version = "(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)";
const daguRelease = new RegExp(
  `^Pinned engine release: Dagu (${version})\\nUpstream source: (\\S+)\\nRelease: (\\S+)$`,
  "m",
);

// What each library notice file covers, in the order the page lists them.
export const libraryLabels = new Map([
  ["GO-LICENSES.txt", "Go standard library and dependencies"],
  ["MCP-LICENSES.txt", "MCP viewer dependencies"],
  ["DAG-EDITOR-LICENSES.txt", "Workflow editor dependencies"],
  ["MARKDOWN-LICENSES.txt", "Markdown viewer dependencies"],
  ["WINDOWS-LICENSES.txt", "Windows app runtime and libraries"],
]);

// parseNotices reads the bundled Dagu release from THIRD-PARTY-NOTICES.txt.
export function parseNotices(text) {
  const match = daguRelease.exec(text.replace(/\r\n/g, "\n"));
  if (!match) {
    throw new Error("THIRD-PARTY-NOTICES.txt does not name the bundled Dagu release");
  }
  const [, release, source, page] = match;
  if (
    source !== `https://github.com/dagucloud/dagu/tree/v${release}` ||
    page !== `https://github.com/dagucloud/dagu/releases/tag/v${release}`
  ) {
    throw new Error(`THIRD-PARTY-NOTICES.txt links do not match Dagu ${release}`);
  }
  return { version: release, source, release: page };
}

export async function readNotices(directory = licensesDirectory) {
  return parseNotices(await readFile(join(directory, "THIRD-PARTY-NOTICES.txt"), "utf8"));
}

// readLibraryNotices lists the library notice files, labelled ones first; a
// file without a label is still listed, under its name.
export async function readLibraryNotices(directory = licensesDirectory) {
  const files = (await readdir(directory)).filter((name) => name.endsWith("-LICENSES.txt"));
  const labelled = [...libraryLabels.keys()].filter((name) => files.includes(name));
  const unlabelled = files.filter((name) => !libraryLabels.has(name)).sort();
  return [...labelled, ...unlabelled].map((file) => ({ file, label: libraryLabels.get(file) ?? file }));
}

// parseLicenseEntries lists a notice file's "--- name ---" headings.
export function parseLicenseEntries(text) {
  return [...text.matchAll(/^--- (.+) ---\r?$/gm)].map((match) => match[1]);
}
