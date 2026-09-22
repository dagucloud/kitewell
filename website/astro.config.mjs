import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://runstead.dev",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Runstead",
      description: "Run workflows and AI agents on your own machine.",
      favicon: "/favicon.svg",
      disable404Route: true,
      customCss: ["./src/styles/docs.css"],
      components: { Footer: "./src/components/DocsFooter.astro" },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dagucloud/runstead",
        },
      ],
      sidebar: [
        {
          label: "Get started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Install Runstead", slug: "docs/install" },
            { label: "Your first workflow", slug: "docs/getting-started" },
            { label: "Build a workflow", slug: "docs/workflow-builder" },
            {
              label: "Schedules and background operation",
              slug: "docs/scheduling",
            },
          ],
        },
        {
          label: "Connect and automate",
          items: [
            { label: "Import an API", slug: "docs/apis" },
            { label: "AI agents and models", slug: "docs/ai" },
            { label: "MCP and API access", slug: "docs/mcp" },
            { label: "Share workflows with your team", slug: "docs/sharing" },
            { label: "Secrets", slug: "docs/secrets" },
          ],
        },
        {
          label: "Look after your workspace",
          items: [
            { label: "Updates", slug: "docs/updates" },
            { label: "Backups and recovery", slug: "docs/backups" },
            { label: "Troubleshooting", slug: "docs/troubleshooting" },
            { label: "Uninstall", slug: "docs/uninstall" },
          ],
        },
        {
          label: "Website",
          items: [
            { label: "Home", link: "/" },
            { label: "Downloads", link: "/download/" },
            { label: "Support", link: "/support/" },
          ],
        },
      ],
    }),
    sitemap(),
  ],
});
