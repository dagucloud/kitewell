import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// versioned is the address of a file under public/ that names what the file
// holds. Browsers keep a video for hours, so a recording published again
// under the same name reaches them only at an address of its own.
export function versioned(path) {
  const hash = createHash("sha256").update(readFileSync(resolve("public", `.${path}`))).digest("hex");
  return `${path}?v=${hash.slice(0, 10)}`;
}
