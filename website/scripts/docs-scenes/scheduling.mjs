// Pictures for "Schedules and background operation": the editor's Schedule
// tab, where the schedule, the saved-schedule switch, the forecast and the
// webhook all live. It reads the invoice workflow the shared seed makes.
import { words } from "./_seed.mjs";

export const scenes = [
  {
    name: "scheduling-schedule-tab",
    doc: "scheduling",
    run: async ({ page, api, lang, go, snap }) => {
      const jobs = (await api("/jobs")).body ?? [];
      const job = (Array.isArray(jobs) ? jobs : jobs.jobs ?? []).find((item) => item.name === words(lang).invoices.name);
      if (!job) throw new Error("the invoice workflow is missing");
      await go("#jobs", 1500);
      await page.click(`[data-action="edit-job"][data-id="${job.id}"]`);
      await page.waitForSelector(".studio-section-tabs", { state: "visible" });
      await page.click('[data-action="studio-view"][data-view="schedule"]');
      await page.waitForSelector("#studio-schedule-toggle", { state: "visible" });
      // The forecast and the webhook are both fetched after the tab opens.
      await page.waitForTimeout(4000);
      await snap("scheduling-schedule-tab");
    },
  },
];
