// Troubleshooting: the two screens the page sends a reader to — a failed run
// with its summary, and the page that holds the service and engine logs. The
// failed run is the seeded "Nightly backup check", which fails on purpose;
// nothing is created here.
const words = {
  en: { failed: "Nightly backup check" },
  ja: { failed: "夜間バックアップ確認" },
};

export const scenes = [
  {
    name: "failed-run",
    doc: "troubleshooting",
    run: async ({ page, go, lang, t, snap }) => {
      const name = words[lang].failed;
      await go("#activity", 3500);
      await page
        .locator("tr.history-row", { hasText: name })
        .first()
        .getByRole("button", { name: await t("Inspect failure") })
        .first()
        .click();
      await page.waitForTimeout(4000);
      // The picture is the summary and what it offers, not the log below it:
      // a command's Japanese output comes back from PowerShell mis-decoded, so
      // the log pane is left out rather than shown garbled.
      const clip = await page.evaluate(() => {
        const dialog = document.querySelector("dialog#modal");
        const failure = document.querySelector("#run-failure");
        if (!dialog || !failure) return null;
        const d = dialog.getBoundingClientRect();
        const f = failure.getBoundingClientRect();
        const next = document.querySelector(".run-metrics")?.getBoundingClientRect();
        const bottom = next ? next.top - 8 : f.bottom + 14;
        return { x: d.x, y: d.y, width: d.width, height: bottom - d.y };
      });
      await snap("failed-run", clip ? { clip } : {});
    },
  },
  {
    name: "diagnostics",
    doc: "troubleshooting",
    run: async ({ go, page, snap }) => {
      await go("#diagnostics", 4000);
      // The project engine's log, which a device that has run anything has;
      // the service's own streams are empty unless the shell captured them.
      await page
        .evaluate(() => {
          const select = document.querySelector("#diagnostics-source");
          const engine = [...select.options].find((o) => o.value.startsWith("engine:"));
          if (!engine) return;
          select.value = engine.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
        })
        .catch(() => {});
      await page.waitForTimeout(4000);
      await snap("diagnostics");
    },
  },
];
