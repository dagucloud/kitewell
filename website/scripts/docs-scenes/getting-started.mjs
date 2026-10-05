// Your first workflow: the three moments the guide walks through — choosing
// what the first step does, the step's command in the editor, and the finished
// run with its output. The workflow is the seeded "Morning check-in", which is
// the one the page builds, so nothing is created here: the scene that opens a
// new workflow never saves it.
const words = {
  en: { workflow: "Morning check-in" },
  ja: { workflow: "朝のチェック" },
};

export const scenes = [
  {
    name: "first-workflow-task",
    doc: "getting-started",
    run: async ({ page, go, t, snap }) => {
      await go("#jobs", 2000);
      await page.getByRole("button", { name: await t("Create a workflow") }).first().click();
      await page.waitForTimeout(1500);
      await page.getByRole("button", { name: await t("Choose your first task") }).first().click();
      await page.waitForTimeout(1800);
      // The task list is drawn below the ways into a new workflow, so the
      // editor pane is scrolled to it — and only the editor pane, so the
      // window itself stays where the reader sees it.
      await page.evaluate(() => {
        const choice = document.querySelector('[data-builder-task="script"]');
        choice?.scrollIntoView({ block: "center" });
        for (let el = choice?.parentElement; el; el = el.parentElement) {
          if (el.classList?.contains("studio-editor-pane")) continue;
          if (el.scrollTop) el.scrollTop = 0;
        }
        document.scrollingElement.scrollTop = 0;
      });
      await page.waitForTimeout(1200);
      await snap("first-workflow-task");
    },
  },
  {
    name: "first-workflow-editor",
    doc: "getting-started",
    run: async ({ page, go, lang, t, snap }) => {
      const name = words[lang].workflow;
      await go("#jobs", 2500);
      await page
        .locator("tr", { hasText: name })
        .first()
        .locator(`[title="${await t("Edit workflow")}"]`)
        .first()
        .click();
      await page.waitForTimeout(4000);
      await snap("first-workflow-editor");
    },
  },
  {
    name: "first-workflow-run",
    doc: "getting-started",
    run: async ({ page, go, lang, t, snap }) => {
      const name = words[lang].workflow;
      await go("#activity", 3500);
      await page
        .locator("tr.history-row", { hasText: name })
        .first()
        .getByRole("button", { name: await t("View run") })
        .first()
        .click();
      await page.waitForTimeout(3500);
      // The log opens on the run's own events; the step's output is what the
      // guide tells the reader to look for.
      await page.locator("#run-step-rows tr").first().click().catch(() => {});
      await page.waitForTimeout(2500);
      await snap("first-workflow-run");
    },
  },
];
