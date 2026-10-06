// One more picture for "Automate Excel", taken after spreadsheets.mjs has
// seeded its linked sheet: the panel that links a workbook. fs is still
// needed for the fresh workbook it writes.
import fs from "node:fs";
import path from "node:path";
import { WORDS, writeWorkbook } from "./spreadsheets.mjs";

// found finds the seeded workflow and sheet again by name.
async function found(api, w) {
  const job = ((await api("/jobs")).body ?? []).find((item) => item.name === w.job);
  if (!job) throw new Error("the Excel workflow was not seeded");
  const set = (((await api(`/jobs/${job.id}/batch-sets`)).body ?? {}).sets ?? []).find((item) => item.name === w.sheet);
  if (!set) throw new Error("the linked sheet was not seeded");
  return { job, set };
}
const projectId = (page) => page.evaluate(async () => (await (await fetch("/gui/api/projects")).json()).projects[0]?.id);

export const scenes = [
  {
    // The link panel needs a sheet that is not linked yet and a workbook
    // nothing has been written into, so both are made for the picture and
    // the sheet removed again. The file picker is the desktop shell's; here
    // a stand-in for the shell answers with that workbook's path.
    name: "excel-link-dialog",
    doc: "spreadsheets",
    run: async ({ api, dataDir, go, lang, page, snap }) => {
      const w = WORDS[lang];
      if (!dataDir) throw new Error("--data-" + lang + " is needed for the workbook's path");
      const { job } = await found(api, w);
      const folder = path.resolve(dataDir, "..", "link");
      fs.mkdirSync(folder, { recursive: true });
      const file = path.join(folder, w.file);
      writeWorkbook(file, w.tab, [w.headers, ...w.rows]);
      const temp = (
        await api(`/jobs/${job.id}/batch-sets`, {
          method: "POST",
          body: JSON.stringify({ name: `${w.sheet} 2`, rows: [], columns: [{ name: w.receipt, type: "text", output: "receipt" }] }),
        })
      ).body;
      if (!temp?.id) throw new Error("could not make a sheet to link");
      await page.addInitScript(
        ({ id, file }) => {
          if (!location.hash.includes(id)) return;
          window.chrome = { webview: { postMessage: (message) => setTimeout(() => window.kitewellNativeResult({ id: message.id, path: file }), 50) } };
        },
        { id: temp.id, file: file.replace(/\\/g, "/") },
      );
      try {
        await go(`#batches?projectId=${await projectId(page)}&jobId=${job.id}&setId=${temp.id}`, 2500);
        await page.click('[data-sheet-action="toggle-import"]');
        await page.click('[data-sheet-action="link-workbook"]');
        await page.waitForSelector("fieldset.batch-link", { timeout: 30_000 });
        // The rows found and the link's own settings, in one view.
        await page.evaluate(() => document.querySelector("fieldset.batch-link")?.scrollIntoView({ block: "end" }));
        await page.waitForTimeout(1000);
        await snap("excel-link-dialog");
      } finally {
        await api(`/jobs/${job.id}/batch-sets/${temp.id}`, { method: "DELETE" }).catch(() => {});
      }
    },
  },
];
