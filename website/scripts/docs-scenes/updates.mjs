// Updates: the one update the app's own window controls — the workflow
// engine's, under Device settings. The application's own updates live in the
// menu bar and the tray, which no browser can photograph.
export const scenes = [
  {
    name: "engine-updates",
    doc: "updates",
    run: async ({ page, go, t, snap }) => {
      await go("#settings", 3000);
      const heading = await t("Updates");
      const find = (text) =>
        page.evaluate((h) => {
          const section = [...document.querySelectorAll("section.section-split")].find(
            (s) => s.querySelector("h2")?.textContent.trim() === h,
          );
          if (!section) return null;
          section.scrollIntoView({ block: "center" });
          const r = section.getBoundingClientRect();
          return { x: r.x, y: r.y, width: r.width, height: r.height };
        }, text);
      // Once to bring the section into view, once for where it then sits.
      await find(heading);
      await page.waitForTimeout(1200);
      const box = await find(heading);
      const margin = 24;
      const clip = box && {
        x: Math.max(0, box.x - margin),
        y: Math.max(0, box.y - margin),
        width: Math.min(1440, box.width + margin * 2),
        height: Math.min(900, box.height + margin * 2),
      };
      await snap("engine-updates", clip ? { clip } : {});
    },
  },
];
