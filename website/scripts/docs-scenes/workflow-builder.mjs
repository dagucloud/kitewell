// Pictures for "Build a workflow": the task picker, a step with its test, the
// review before a run, and the run form. The invoice workflow the shared seed
// makes is what the first three show; the run form needs a workflow with an
// input, so this module makes one of its own, named for this page.
import { words } from "./_seed.mjs";

const EXTRA = {
  en: {
    name: "Weekly summary (builder docs)",
    description: "A short note to the team, with the week in its title.",
    title: "Week this covers",
    hint: "Shown at the top of the note.",
    week: "week of 5 October",
    wrote: "Wrote the note",
    sent: "Sent the note to the team",
  },
  ja: {
    name: "週次まとめ（組み立てのドキュメント）",
    description: "その週をタイトルに入れて、チームへ短い連絡を送ります。",
    title: "対象の週",
    hint: "連絡の先頭に表示されます。",
    week: "10 月 5 日の週",
    wrote: "連絡文を作成しました",
    sent: "チームに連絡を送りました",
  },
};

const spec = (e) => `type: graph
description: ${e.description}
params:
  type: object
  properties:
    WEEK:
      type: string
      title: ${e.title}
      description: ${e.hint}
      default: ${e.week}
  required: [WEEK]
steps:
  - id: write
    name: ${e.wrote}
    run: echo "\${WEEK}"; echo "${e.wrote}"
  - id: send
    name: ${e.sent}
    depends: [write]
    run: sleep 1; echo "${e.sent}"
`;

// jobs lists this project's workflows, so a scene can find one by name.
const jobs = async (api) => {
  const reply = (await api("/jobs")).body;
  return Array.isArray(reply) ? reply : (reply?.jobs ?? []);
};
const named = async (api, name) => (await jobs(api)).find((job) => job.name === name);

export async function seed({ api, lang }) {
  const extra = EXTRA[lang];
  if (await named(api, extra.name)) return;
  await api("/jobs", {
    method: "POST",
    body: JSON.stringify({ name: extra.name, description: extra.description, spec: spec(extra), enabled: false }),
  });
}

// editor opens one workflow's editor by its name and waits for the toolbar.
async function editor({ page, api, go }, name) {
  const job = await named(api, name);
  if (!job) throw new Error(`no workflow named ${name}`);
  await go("#jobs", 1500);
  await page.click(`[data-action="edit-job"][data-id="${job.id}"]`);
  await page.waitForSelector(".studio-section-tabs", { state: "visible" });
  await page.waitForTimeout(2000);
  return job;
}

export const scenes = [
  {
    name: "workflow-builder-task-picker",
    doc: "workflow-builder",
    run: async (tools) => {
      const { page, lang, snap } = tools;
      await editor(tools, words(lang).invoices.name);
      // The + under a step on the map is how the reader adds the next one.
      await page.click('[data-add-node-id="enter"]');
      await page.waitForSelector(".builder-task-picker", { state: "visible" });
      await page.waitForTimeout(1200);
      await snap("workflow-builder-task-picker");
    },
  },
  {
    name: "workflow-builder-step",
    doc: "workflow-builder",
    run: async (tools) => {
      const { page, lang, until, snap } = tools;
      await editor(tools, words(lang).invoices.name);
      await page.click('[data-node-id="collect"]');
      await page.waitForSelector("[data-test-run]", { state: "visible" });
      await page.waitForTimeout(800);
      await page.click("[data-test-run]");
      // The step sleeps three seconds, then prints the invoices it found.
      await until(async () => (await page.locator("[data-test-result] pre, [data-test-result] .run-output").count()) > 0, 90_000);
      await page.waitForTimeout(1500);
      await snap("workflow-builder-step");
    },
  },
  {
    name: "workflow-builder-review",
    doc: "workflow-builder",
    run: async (tools) => {
      const { page, lang, snap } = tools;
      await editor(tools, words(lang).invoices.name);
      await page.click('[data-action="studio-view"][data-view="review"]');
      await page.waitForSelector(".studio-readiness", { state: "visible" });
      await page.waitForTimeout(2500);
      await snap("workflow-builder-review");
    },
  },
  {
    name: "workflow-builder-run-dialog",
    doc: "workflow-builder",
    run: async ({ page, api, lang, go, snap }) => {
      const job = await named(api, EXTRA[lang].name);
      if (!job) throw new Error("the builder docs workflow is missing");
      await go("#jobs", 1500);
      await page.click(`[data-action="run-job"][data-id="${job.id}"]`);
      await page.waitForSelector("#run-params-form", { state: "visible" });
      await page.waitForTimeout(2000);
      // The form is the point here, so the picture keeps it and a margin.
      await snap("workflow-builder-run-dialog", { clip: { x: 280, y: 160, width: 880, height: 580 } });
    },
  },
];
