// The documentation's front page: Kitewell at rest, with a project that has
// work on record.
export const scenes = [
  {
    name: "overview",
    doc: "index",
    run: async ({ go, snap }) => {
      await go("#overview", 2500);
      await snap("overview");
    },
  },
];
