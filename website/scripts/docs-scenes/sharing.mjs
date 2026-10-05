// Share workflows with your team: the dialog a project is exported from and
// imported into. It only opens the dialog, so nothing is created or changed.
async function box(page, selector, margin = 16) {
  const found = await page.locator(selector).first().boundingBox();
  if (!found) return undefined;
  const x = Math.max(0, found.x - margin);
  const y = Math.max(0, found.y - margin);
  return {
    x,
    y,
    width: Math.min(1440 - x, found.width + margin * 2),
    height: Math.min(900 - y, found.height + margin * 2),
  };
}

export const scenes = [
  {
    name: "project-sharing",
    doc: "sharing",
    run: async ({ page, go, snap }) => {
      await go("#overview", 2000);
      await page.locator('[data-action="manage-projects"]').first().click();
      await page.waitForTimeout(1200);
      await snap("project-sharing", { clip: await box(page, "#modal") });
    },
  },
];
