// Releases and staged projects: the dialog a release is cut in. It only opens
// the dialog, so no release is made and the project is left as it was. The
// Apply preview cannot be pictured here: it needs a second project on the
// device, which the free plan does not hold.
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
    name: "releases-new",
    doc: "releases",
    run: async ({ page, go, snap }) => {
      await go("#jobs", 2500);
      await page.locator('[data-action="release-new"]').first().click();
      await page.waitForTimeout(1500);
      await snap("releases-new", { clip: await box(page, "#modal") });
    },
  },
];
