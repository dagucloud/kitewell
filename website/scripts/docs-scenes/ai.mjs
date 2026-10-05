// Pictures for "AI agents and models": the page where a project's models and
// command-line agents are set up. The model it shows is the one the shared
// seed puts there, so this file creates nothing of its own.
export const scenes = [
  {
    name: "agents-and-models",
    doc: "ai",
    run: async ({ go, snap }) => {
      await go("#agents", 2500);
      await snap("agents-and-models");
    },
  },
];
