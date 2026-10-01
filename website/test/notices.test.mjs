import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  libraryLabels,
  licensesDirectory,
  parseLicenseEntries,
  parseNotices,
  readLibraryNotices,
  readNotices,
} from "../src/lib/notices.mjs";

const block = (version, source = version, release = version) =>
  `Kitewell includes Dagu.\n\nPinned engine release: Dagu ${version}\nUpstream source: https://github.com/dagucloud/dagu/tree/v${source}\nRelease: https://github.com/dagucloud/dagu/releases/tag/v${release}\n`;

test("the published notices name a Dagu release with matching links", async () => {
  const dagu = await readNotices();
  assert.match(dagu.version, /^\d+\.\d+\.\d+$/);
  assert.equal(dagu.source, `https://github.com/dagucloud/dagu/tree/v${dagu.version}`);
  assert.equal(dagu.release, `https://github.com/dagucloud/dagu/releases/tag/v${dagu.version}`);
});

test("a notices file that does not name its Dagu release consistently is refused", async () => {
  assert.deepEqual(parseNotices(block("2.18.1").replace(/\n/g, "\r\n")).version, "2.18.1");
  assert.throws(() => parseNotices("Kitewell includes Dagu.\n"), /does not name/);
  assert.throws(() => parseNotices(block("2.18")), /does not name/);
  assert.throws(() => parseNotices(block("2.18.1", "2.17.0")), /do not match Dagu 2\.18\.1/);
  assert.throws(() => parseNotices(block("2.18.1", "2.18.1", "2.17.0")), /do not match/);
  const empty = await mkdtemp(join(tmpdir(), "kitewell-notices-"));
  try {
    await assert.rejects(readNotices(empty));
  } finally {
    await rm(empty, { recursive: true, force: true });
  }
});

test("every notice file is labelled, and every library notice lists its components once", async () => {
  const files = await readdir(licensesDirectory);
  for (const file of files.filter((name) => name.endsWith("-LICENSES.txt"))) {
    assert.ok(libraryLabels.has(file), `${file} has no label on the licenses page`);
    const entries = parseLicenseEntries(await readFile(join(licensesDirectory, file), "utf8"));
    assert.ok(entries.length > 0, `${file} lists no components`);
    assert.equal(new Set(entries).size, entries.length, `${file} lists a component twice`);
  }
  const libraries = await readLibraryNotices();
  assert.deepEqual(libraries.map(({ file }) => file), [...libraryLabels.keys()].filter((name) => files.includes(name)));
});

test("the Dagu license is the GPL, and every file the notices point to is published", async () => {
  const license = await readFile(join(licensesDirectory, "DAGU-LICENSE.txt"), "utf8");
  assert.match(license, /GNU GENERAL PUBLIC LICENSE/);
  assert.match(license, /Version 3/);
  const notices = await readFile(join(licensesDirectory, "THIRD-PARTY-NOTICES.txt"), "utf8");
  const files = await readdir(licensesDirectory);
  for (const [name] of notices.matchAll(/\b[A-Z][A-Z-]+\.txt\b/g)) {
    assert.ok(files.includes(name), `THIRD-PARTY-NOTICES.txt points to ${name}, which is not published`);
  }
});
