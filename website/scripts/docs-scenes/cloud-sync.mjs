// Sync projects with Dagu Cloud: the account card a device signs in from.
// Signing in needs a real account, so the picture is the card as it stands
// before anybody does, which is also the screen the first step describes.
async function box(locator, margin = 16) {
  const found = await locator.boundingBox();
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
    name: "cloud-account",
    doc: "cloud-sync",
    run: async ({ page, go, exact, snap }) => {
      await go("#settings", 2500);
      const heading = page.getByRole("heading", { name: await exact("Dagu Cloud account") }).first();
      const panel = heading.locator("xpath=ancestor::section[1]");
      await panel.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await snap("cloud-account", { clip: await box(panel) });
    },
  },
];
