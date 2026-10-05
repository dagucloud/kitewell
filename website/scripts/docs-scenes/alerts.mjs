// The picture for "Alerts": the Notifications page as a device without
// Kitewell Pro shows it, which is what the page's "What you need" describes.
// Nothing is created; a device that has the plan shows its channels here
// instead.
export const scenes = [
  {
    name: "alerts-notifications",
    doc: "alerts",
    run: async ({ page, go, snap }) => {
      await go("#notifications", 3000);
      await page.waitForSelector(".alerts-upsell, #notifications-form", { state: "visible" });
      await page.waitForTimeout(1500);
      await snap("alerts-notifications");
    },
  },
];
