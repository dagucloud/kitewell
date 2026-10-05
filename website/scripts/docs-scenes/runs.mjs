// Pictures for "Runs and logs": one run open on a step's output, and a failed
// run with the ways forward. The successful run is the invoice run the shared
// seed makes; the failed one is this page's own, because its output has to be
// legible in the picture. A step that prints Japanese comes back garbled from
// Windows PowerShell today, so every command here prints plain ASCII.
import { words } from "./_seed.mjs";

const FAILING = {
  en: {
    name: "Folder check (runs docs)",
    description: "Checks that last night's backup landed.",
    scan: "Look in the backup folder",
    verify: "Check last night's copy",
  },
  ja: {
    name: "フォルダー確認（実行のドキュメント）",
    description: "昨夜のバックアップが保存されたか確かめます。",
    scan: "バックアップ用フォルダーを見る",
    verify: "前夜のコピーを確認する",
  },
};

const spec = (f) => `type: graph
description: ${f.description}
steps:
  - id: scan
    name: ${f.scan}
    run: sleep 1; echo "D:/Backups/nightly"
  - id: verify
    name: ${f.verify}
    depends: [scan]
    run: echo "backup folder D:/Backups/nightly was not found"; exit 1
`;

const list = async (api, route) => {
  const reply = (await api(route)).body;
  if (Array.isArray(reply)) return reply;
  return reply?.jobs ?? reply?.runs ?? [];
};
const named = async (api, name) => (await list(api, "/jobs")).find((job) => job.name === name);

export async function seed({ api, page, lang }) {
  const failing = FAILING[lang];
  let job = await named(api, failing.name);
  if (!job) {
    job = (await api("/jobs", {
      method: "POST",
      body: JSON.stringify({ name: failing.name, description: failing.description, spec: spec(failing), enabled: false }),
    })).body;
  }
  const runs = await list(api, "/runs");
  if (!runs.some((run) => run.jobId === job.id)) {
    await api(`/jobs/${job.id}/run`, { method: "POST", body: "{}" });
    await page.waitForTimeout(6000);
  }
}

// latest finds the newest run of one workflow, by the workflow's name.
async function latest({ api }, name) {
  const job = await named(api, name);
  if (!job) throw new Error(`no workflow named ${name}`);
  const run = (await list(api, "/runs")).find((item) => item.jobId === job.id);
  if (!run) throw new Error(`no run of ${name}`);
  return run;
}
// open shows one run the way the list does, and waits for its steps. The
// workflow list is visited first, the way a person reaches the runs: a failed
// run offers to open its workflow only once the app knows the workflow.
async function open(tools, run) {
  const { page, go } = tools;
  await go("#jobs", 2000);
  await page.click('.sidebar [data-page="activity"]');
  await page.waitForSelector(".history-table", { state: "visible" });
  await page.waitForTimeout(2000);
  await page.click(`[data-history-action="open"][data-id="${run.id}"]`);
  await page.waitForSelector(".run-step-table", { state: "visible" });
  await page.waitForTimeout(2500);
}

export const scenes = [
  // There is no picture of the list of runs: the table's dates follow the
  // computer's own language rather than the page's, so an English capture
  // shows Japanese dates.
  {
    name: "runs-run-view",
    doc: "runs",
    run: async (tools) => {
      const { page, lang, snap } = tools;
      await open(tools, await latest(tools, words(lang).invoices.name));
      await page.click('[data-action="select-run-step"][data-id="collect"]');
      await page.waitForTimeout(2000);
      await snap("runs-run-view");
    },
  },
  {
    name: "runs-failed-run",
    doc: "runs",
    run: async (tools) => {
      const { lang, page, snap } = tools;
      await open(tools, await latest(tools, FAILING[lang].name));
      await page.waitForTimeout(1500);
      await snap("runs-failed-run");
    },
  },
];
