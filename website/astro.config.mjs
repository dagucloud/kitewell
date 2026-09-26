import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://kitewell.app",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Kitewell",
      description: "Run workflows and AI agents on your own machine.",
      favicon: "/favicon.svg",
      disable404Route: true,
      customCss: ["./src/styles/docs.css"],
      components: { Footer: "./src/components/DocsFooter.astro" },
      routeMiddleware: "./src/routeData.ts",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        ja: { label: "日本語", lang: "ja" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dagucloud/kitewell",
        },
      ],
      sidebar: [
        {
          label: "Get started",
          translations: { ja: "はじめに" },
          items: [
            { label: "Introduction", translations: { ja: "概要" }, slug: "docs" },
            { label: "Install Kitewell", translations: { ja: "Kitewell のインストール" }, slug: "docs/install" },
            { label: "Your first workflow", translations: { ja: "最初のワークフロー" }, slug: "docs/getting-started" },
            { label: "Build a workflow", translations: { ja: "ワークフローを組み立てる" }, slug: "docs/workflow-builder" },
            {
              label: "Schedules and background operation",
              translations: { ja: "スケジュールとバックグラウンド動作" },
              slug: "docs/scheduling",
            },
            { label: "Alerts", translations: { ja: "アラート" }, slug: "docs/alerts" },
          ],
        },
        {
          label: "Connect and automate",
          translations: { ja: "連携と自動化" },
          items: [
            { label: "Import an API", translations: { ja: "API のインポート" }, slug: "docs/apis" },
            { label: "AI agents and models", translations: { ja: "AI エージェントとモデル" }, slug: "docs/ai" },
            { label: "MCP and API access", translations: { ja: "MCP と API アクセス" }, slug: "docs/mcp" },
            { label: "Share workflows with your team", translations: { ja: "チームでワークフローを共有" }, slug: "docs/sharing" },
            { label: "Sync with Dagu Cloud", translations: { ja: "Dagu Cloud と同期" }, slug: "docs/cloud-sync" },
            { label: "Secrets", translations: { ja: "シークレット" }, slug: "docs/secrets" },
          ],
        },
        {
          label: "Look after your workspace",
          translations: { ja: "ワークスペースの管理" },
          items: [
            { label: "Updates", translations: { ja: "更新" }, slug: "docs/updates" },
            { label: "Backups and recovery", translations: { ja: "バックアップと復旧" }, slug: "docs/backups" },
            { label: "Troubleshooting", translations: { ja: "トラブルシューティング" }, slug: "docs/troubleshooting" },
            { label: "Uninstall", translations: { ja: "アンインストール" }, slug: "docs/uninstall" },
          ],
        },
        {
          label: "Website",
          translations: { ja: "ウェブサイト" },
          items: [
            { label: "Home", translations: { ja: "ホーム" }, link: "/" },
            { label: "Downloads", translations: { ja: "ダウンロード" }, link: "/download/" },
            { label: "Support", translations: { ja: "サポート" }, link: "/support/" },
          ],
        },
      ],
    }),
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", ja: "ja" } },
    }),
  ],
});
