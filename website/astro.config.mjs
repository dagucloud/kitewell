import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";
import { languages, locales } from "./src/lib/i18n.mjs";

export default defineConfig({
  site: "https://kitewell.app",
  trailingSlash: "always",
  redirects: {
    "/community": "https://join.slack.com/t/kitewell/shared_invite/zt-4c4b7g551-nkAwJqwfdeBhrtnMMm3vZg",
  },
  integrations: [
    starlight({
      title: "Kitewell",
      description: "Run workflows and AI agents on your own machine.",
      favicon: "/favicon.svg",
      // Language detection, as on the rest of the site (public/lang.js).
      head: [{ tag: "script", attrs: { src: "/lang.js" } }],
      disable404Route: true,
      customCss: ["./src/styles/docs.css"],
      components: { Footer: "./src/components/DocsFooter.astro" },
      routeMiddleware: "./src/routeData.ts",
      defaultLocale: "root",
      locales: Object.fromEntries(locales.map((l) => [l === "en" ? "root" : l, { label: languages[l].label, lang: languages[l].lang }])),
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dagucloud/kitewell",
        },
        { icon: "slack", label: "Slack", href: "/community/" },
      ],
      sidebar: [
        {
          label: "Get started",
          translations: { ja: "はじめに", "zh-CN": "入门", ko: "시작하기", fr: "Premiers pas", de: "Erste Schritte" },
          items: [
            { label: "Introduction", translations: { ja: "概要", "zh-CN": "简介", ko: "소개", fr: "Introduction", de: "Einführung" }, slug: "docs" },
            { label: "Install Kitewell", translations: { ja: "Kitewell のインストール", "zh-CN": "安装 Kitewell", ko: "Kitewell 설치", fr: "Installer Kitewell", de: "Kitewell installieren" }, slug: "docs/install" },
            { label: "Your first workflow", translations: { ja: "最初のワークフロー", "zh-CN": "你的第一个工作流", ko: "첫 워크플로", fr: "Votre premier workflow", de: "Ihr erster Workflow" }, slug: "docs/getting-started" },
            { label: "Build a workflow", translations: { ja: "ワークフローを組み立てる", "zh-CN": "搭建工作流", ko: "워크플로 구성하기", fr: "Construire un workflow", de: "Einen Workflow erstellen" }, slug: "docs/workflow-builder" },
            { label: "Automate a website", translations: { ja: "Web サイトを自動操作", "zh-CN": "自动操作网站", ko: "웹사이트 자동화", fr: "Automatiser un site web", de: "Eine Website automatisieren" }, slug: "docs/browser" },
            { label: "Automate a desktop app", translations: { ja: "デスクトップアプリを自動操作", "zh-CN": "自动操作桌面应用", ko: "데스크톱 앱 자동화", fr: "Automatiser une app de bureau", de: "Eine Desktop-App automatisieren" }, slug: "docs/desktop" },
            { label: "Automate email", translations: { ja: "メールを自動化", "zh-CN": "自动处理邮件", ko: "이메일 자동화", fr: "Automatiser les e-mails", de: "E-Mails automatisieren" }, slug: "docs/email" },
            { label: "Automate Excel", translations: { ja: "Excel を自動化", "zh-CN": "自动处理 Excel", ko: "Excel 자동화", fr: "Automatiser Excel", de: "Excel automatisieren" }, slug: "docs/spreadsheets" },
            { label: "Run a workflow over a sheet", translations: { ja: "シートでワークフローを一括実行", "zh-CN": "按表格批量运行工作流", ko: "시트로 워크플로 일괄 실행", fr: "Exécuter un workflow sur une feuille", de: "Workflow pro Tabellenzeile ausführen" }, slug: "docs/batches" },
            { label: "Runs and logs", translations: { ja: "実行とログ", "zh-CN": "运行与日志", ko: "실행 및 로그", fr: "Exécutions et logs", de: "Ausführungen und Logs" }, slug: "docs/runs" },
            {
              label: "Schedules and background operation",
              translations: { ja: "スケジュールとバックグラウンド動作", "zh-CN": "计划与后台运行", ko: "일정과 백그라운드 동작", fr: "Planifications et arrière-plan", de: "Planungen und Hintergrundbetrieb" },
              slug: "docs/scheduling",
            },
            { label: "Alerts", translations: { ja: "アラート", "zh-CN": "提醒", ko: "알림", fr: "Alertes", de: "Benachrichtigungen" }, slug: "docs/alerts" },
          ],
        },
        {
          label: "Connect and automate",
          translations: { ja: "連携と自動化", "zh-CN": "连接与自动化", ko: "연결과 자동화", fr: "Connecter et automatiser", de: "Verbinden und automatisieren" },
          items: [
            { label: "Start from a webhook", translations: { ja: "Webhook で開始", "zh-CN": "通过 Webhook 启动", ko: "웹후크로 시작", fr: "Démarrer depuis un webhook", de: "Per Webhook starten" }, slug: "docs/webhooks" },
            { label: "Import an API", translations: { ja: "API のインポート", "zh-CN": "导入 API", ko: "API 가져오기", fr: "Importer une API", de: "API importieren" }, slug: "docs/apis" },
            { label: "AI agents and models", translations: { ja: "AI エージェントとモデル", "zh-CN": "AI 智能体与模型", ko: "AI 에이전트와 모델", fr: "Agents IA et modèles", de: "KI-Agenten und Modelle" }, slug: "docs/ai" },
            { label: "Knowledge", translations: { ja: "ナレッジ", "zh-CN": "知识库", ko: "지식", fr: "Connaissances", de: "Wissen" }, slug: "docs/knowledge" },
            { label: "MCP and API access", translations: { ja: "MCP と API アクセス", "zh-CN": "MCP 与 API 访问", ko: "MCP와 API 액세스", fr: "MCP et accès API", de: "MCP und API-Zugriff" }, slug: "docs/mcp" },
            { label: "Share workflows with your team", translations: { ja: "チームでワークフローを共有", "zh-CN": "与团队共享工作流", ko: "팀과 워크플로 공유하기", fr: "Partager avec votre équipe", de: "Workflows im Team teilen" }, slug: "docs/sharing" },
            { label: "Sync with Dagu Cloud", translations: { ja: "Dagu Cloud と同期", "zh-CN": "与 Dagu Cloud 同步", ko: "Dagu Cloud와 동기화", fr: "Synchroniser avec Dagu Cloud", de: "Mit Dagu Cloud synchronisieren" }, slug: "docs/cloud-sync" },
            { label: "Dagu Console", translations: { ja: "Dagu Console", "zh-CN": "Dagu Console", ko: "Dagu Console", fr: "Dagu Console", de: "Dagu Console" }, slug: "docs/console" },
            { label: "Releases and staged projects", translations: { ja: "リリースと段階的なプロジェクト", "zh-CN": "发布版本与分阶段项目", ko: "릴리스와 단계별 프로젝트", fr: "Versions publiées et projets par environnement", de: "Releases und gestufte Projekte" }, slug: "docs/releases" },
            { label: "Secrets", translations: { ja: "シークレット", "zh-CN": "密钥", ko: "시크릿", fr: "Secrets", de: "Secrets" }, slug: "docs/secrets" },
          ],
        },
        {
          label: "Look after your workspace",
          translations: { ja: "ワークスペースの管理", "zh-CN": "管理工作区", ko: "작업 공간 관리", fr: "Entretenir votre espace de travail", de: "Arbeitsbereich verwalten" },
          items: [
            { label: "What leaves your computer", translations: { ja: "コンピューターの外に出るもの", "zh-CN": "哪些数据会离开你的电脑", ko: "컴퓨터 밖으로 나가는 것", fr: "Ce qui quitte votre ordinateur", de: "Was Ihren Computer verlässt" }, slug: "docs/data-flow" },
            { label: "Updates", translations: { ja: "更新", "zh-CN": "更新", ko: "업데이트", fr: "Mises à jour", de: "Updates" }, slug: "docs/updates" },
            { label: "Backups and recovery", translations: { ja: "バックアップと復旧", "zh-CN": "备份与恢复", ko: "백업과 복구", fr: "Sauvegardes et restauration", de: "Backups und Wiederherstellung" }, slug: "docs/backups" },
            { label: "Troubleshooting", translations: { ja: "トラブルシューティング", "zh-CN": "故障排除", ko: "문제 해결", fr: "Dépannage", de: "Fehlerbehebung" }, slug: "docs/troubleshooting" },
            { label: "Uninstall", translations: { ja: "アンインストール", "zh-CN": "卸载", ko: "제거", fr: "Désinstaller", de: "Deinstallieren" }, slug: "docs/uninstall" },
          ],
        },
        {
          label: "Reference",
          translations: { ja: "リファレンス", "zh-CN": "参考", ko: "참조", fr: "Référence", de: "Referenz" },
          items: [
            { label: "Excel", translations: { ja: "Excel", "zh-CN": "Excel", ko: "Excel", fr: "Excel", de: "Excel" }, slug: "docs/reference/spreadsheets" },
            { label: "Schedules", translations: { ja: "スケジュール", "zh-CN": "计划", ko: "일정", fr: "Planifications", de: "Planungen" }, slug: "docs/reference/scheduling" },
            { label: "What leaves your computer", translations: { ja: "コンピューターの外に出るもの", "zh-CN": "哪些数据会离开你的电脑", ko: "컴퓨터 밖으로 나가는 것", fr: "Ce qui quitte votre ordinateur", de: "Was Ihren Computer verlässt" }, slug: "docs/reference/data-flow" },
          ],
        },
        {
          label: "Website",
          translations: { ja: "ウェブサイト", "zh-CN": "网站", ko: "웹사이트", fr: "Site web", de: "Website" },
          items: [
            { label: "Home", translations: { ja: "ホーム", "zh-CN": "首页", ko: "홈", fr: "Accueil", de: "Startseite" }, link: "/" },
            { label: "Downloads", translations: { ja: "ダウンロード", "zh-CN": "下载", ko: "다운로드", fr: "Téléchargements", de: "Downloads" }, link: "/download/" },
            { label: "Support", translations: { ja: "サポート", "zh-CN": "支持", ko: "지원", fr: "Assistance", de: "Support" }, link: "/support/" },
          ],
        },
      ],
    }),
    sitemap({
      i18n: { defaultLocale: "en", locales: Object.fromEntries(locales.map((l) => [l, languages[l].lang])) },
    }),
  ],
});
