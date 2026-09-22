import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
async function walk(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      files.map((file) =>
        file.isDirectory()
          ? walk(path.join(directory, file.name))
          : [path.join(directory, file.name)],
      ),
    )
  ).flat();
}
const htmlFiles = (await walk(root)).filter((file) => file.endsWith(".html"));
const failures = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = "/" + path.relative(root, file).replace(/index\.html$/, "");
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|data:|javascript:|\/\/)/.test(value)) continue;
    const url = new URL(
      value.replaceAll("&amp;", "&"),
      "https://runstead.dev" + route,
    );
    let target = path.join(root, decodeURIComponent(url.pathname));
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await stat(target);
      if (url.hash && target.endsWith(".html")) {
        const destination = await readFile(target, "utf8");
        const anchor = decodeURIComponent(url.hash.slice(1));
        if (!destination.includes(`id="${anchor}"`))
          throw new Error("missing anchor");
      }
    } catch {
      failures.push(`${route} → ${value}`);
    }
  }
}
if (failures.length)
  throw new Error(
    "Broken internal links:\n" + [...new Set(failures)].join("\n"),
  );
console.log(`Checked internal links in ${htmlFiles.length} pages.`);
