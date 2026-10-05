// Pictures for "Secrets": the project's stored credentials, and the dialog
// that stores one. The shared seed already declares portal-password with a
// description and openrouter-key for the demo's model, so the list shows a
// secret with a description and one with something using it. No picture here
// can show a value: the app never shows one back.
export const scenes = [
  {
    name: "secrets-list",
    doc: "secrets",
    run: async ({ go, snap }) => {
      await go("#secrets", 2000);
      await snap("secrets-list");
    },
  },
  {
    name: "secrets-new",
    doc: "secrets",
    // The dialog is the point, so the picture is clipped to it. The value
    // field is left empty: a demo value in a password field is still a value
    // in a picture of a credential dialog.
    run: async ({ page, go, snap }) => {
      await go("#secrets", 2000);
      await page.click('[data-action="new-secret"]');
      await page.waitForTimeout(1200);
      await page.fill("#secret-form #ref", "ledger/api-token");
      await page.fill("#secret-form #description", await describe(page));
      await page.waitForTimeout(400);
      await snap("secrets-new", { clip: await clipTo(page, "#modal") });
    },
  },
];

// describe writes the description in the page's own language, from the demo
// project's words: the token a workflow uses to reach the ledger.
async function describe(page) {
  return page.evaluate(() =>
    window.KitewellI18n.language() === "ja" ? "台帳の API トークン" : "Ledger API token",
  );
}

async function clipTo(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  if (!box) return undefined;
  const margin = 12;
  const x = Math.max(0, box.x - margin), y = Math.max(0, box.y - margin);
  return { x, y, width: Math.min(1440 - x, box.width + margin * 2), height: Math.min(900 - y, box.height + margin * 2) };
}
