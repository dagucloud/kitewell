// Pictures for "Backups and recovery": the Backups page with a snapshot on
// it, and the edit-history view comparing an earlier version with the current
// one.
//
// The snapshot is made through the app's own POST /backups, and only when the
// device holds none, so capturing again does not pile archives up. The
// comparison uses the revision the shared seed already leaves behind: naming
// the demo project writes the project settings as they were before, which is
// a real two-sided difference and needs nothing of its own created.

// seed makes one snapshot when there is none. A backup waits for the device to
// be idle, so a run that another page's scene started makes it refuse; the
// attempt is repeated a few times and then left alone, since the page below
// shows whatever snapshots the device holds.
export async function seed({ api, page }) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const list = (await api("/backups")).body;
    if (Array.isArray(list) && list.length > 0) return;
    const made = await api("/backups", { method: "POST", body: "{}" });
    if (made.status === 201) return;
    await page.waitForTimeout(15_000);
  }
}

export const scenes = [
  {
    name: "backups-list",
    doc: "backups",
    run: async ({ go, snap }) => {
      await go("#backups", 2500);
      await snap("backups-list");
    },
  },
  {
    name: "backups-history",
    doc: "backups",
    // The dialog is the point, so the picture is clipped to it.
    run: async ({ page, go, api, snap }) => {
      await go("#jobs", 2000);
      await page.click('[data-action="definition-history"][data-id=""]');
      await page.waitForTimeout(2500);
      // The dialog opens on the newest version. The project's own settings are
      // the one with a difference to read, whatever else has been saved since.
      const revisions = (await api("/revisions")).body?.revisions ?? [];
      const project = revisions.find((item) => item.kind === "project");
      if (project) {
        await page.click(`[data-revision-id="${project.id}"]`);
        await page.waitForTimeout(2000);
      }
      await snap("backups-history", { clip: await clipTo(page, "#modal") });
    },
  },
];

async function clipTo(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  if (!box) return undefined;
  const margin = 12;
  const x = Math.max(0, box.x - margin), y = Math.max(0, box.y - margin);
  return { x, y, width: Math.min(1440 - x, box.width + margin * 2), height: Math.min(900 - y, box.height + margin * 2) };
}
