// The comparison page's content. Every fact about another product carries
// the page it comes from and the day that page was last opened to confirm
// it; a fact that a page no longer supports is removed, not kept unsourced.

export const checked = "2026-10-13";

// Who published a source, named the same way in both languages.
const via = {
  uipathBlog: { en: "UiPath blog", ja: "UiPath ブログ" },
  uipathPricing: { en: "UiPath pricing", ja: "UiPath 料金" },
  uipathDocs: "UiPath Documentation",
  uipathNews: { en: "UiPath newsroom", ja: "UiPath ニュースルーム" },
  learn: "Microsoft Learn",
  aaDocs: "Automation Anywhere Documentation",
  aaCommunity: "Automation Anywhere Community",
  cloudWatch: { en: "Impress Cloud Watch", ja: "クラウド Watch" },
  winactor: { en: "WinActor (NTT-AT)", ja: "WinActor 公式サイト" },
  itLeaders: "IT Leaders",
  bizrobo: { en: "BizRobo! (Open, Inc.)", ja: "BizRobo! 公式サイト" },
  atmarkit: "@IT",
  openai: "OpenAI API docs",
  claude: "Claude Docs",
  google: { en: "Google blog", ja: "Google ブログ" },
  skyvernDocs: "Skyvern docs",
  skyvernPricing: { en: "Skyvern pricing", ja: "Skyvern 料金" },
  stagehand: "Stagehand docs",
  browserbase: { en: "Browserbase pricing", ja: "Browserbase 料金" },
  workflowUse: "GitHub: browser-use/workflow-use",
  browserUse: { en: "Browser Use pricing", ja: "Browser Use 料金" },
  zapier: "Zapier",
  zapierHelp: "Zapier Help Center",
  n8nDocs: "n8n Docs",
  n8n: "n8n",
};

function fact(en, ja, source, publisher) {
  return { en, ja, source, via: publisher, checked };
}

export const columns = {
  en: ["Where it runs", "A routine run", "When a screen changes", "People in the loop", "What it works on"],
  ja: ["動く場所", "いつもの実行", "画面が変わったとき", "人の関与", "対象"],
};

// A cell with nothing to say from a checked source.
const none = { en: "—", ja: "—" };

export const glance = [
  {
    name: { en: "Kitewell", ja: "Kitewell" },
    cells: [
      { en: "Your own Mac or Windows PC", ja: "あなたの Mac や Windows PC" },
      {
        en: "Repeats website and desktop actions that worked, without asking the model. Reading a page and checks written in words ask it each run.",
        ja: "うまくいった Web サイトとデスクトップの操作を、モデルに尋ねずに繰り返す。ページの読み取りと、言葉で書いたチェックは毎回モデルに尋ねる。",
      },
      {
        en: "AI finds the new way and keeps it for later runs. The run record shows what it fixed.",
        ja: "AI が新しい操作を見つけて覚え直し、次の実行から使う。何を直したかは実行の記録に残る。",
      },
      {
        en: "Any step can wait for approval or be sent back with a note, from the app, a notification, or Claude and ChatGPT.",
        ja: "どのステップでも承認を待ち、メモ付きで差し戻せる。アプリ、通知、Claude や ChatGPT から。",
      },
      {
        en: "Websites, desktop apps, Excel, email, scripts, APIs, and coding agents",
        ja: "Web サイト、デスクトップアプリ、Excel、メール、スクリプト、API、コーディングエージェント",
      },
    ],
  },
  {
    category: "rpa-suites",
    cells: [
      {
        en: "Windows PCs (Power Automate for desktop). UiPath in its cloud or on your premises.",
        ja: "Windows PC（Power Automate のデスクトップ版）。UiPath はクラウドかオンプレミス。",
      },
      {
        en: "Runs the flow by its recorded selectors. AI steps in when an element is not found.",
        ja: "記録したセレクターでフローを実行。要素が見つからないときに AI が補う。",
      },
      {
        en: "AI self-healing: UiPath Healing Agent, Power Automate (preview, runtime only), Automation Anywhere's fallback",
        ja: "AI による自己修復。UiPath の Healing Agent、Power Automate（プレビュー、実行時のみ）、Automation Anywhere のフォールバック",
      },
      {
        en: "People review suggested fixes: UiPath recommendations, Power Automate repair, Automation Anywhere in Debug mode",
        ja: "修正案を人が確認。UiPath の推奨モード、Power Automate の修復、Automation Anywhere のデバッグモード",
      },
      { en: "Desktop apps and web pages", ja: "デスクトップアプリと Web ページ" },
    ],
  },
  {
    category: "japanese-rpa",
    cells: [
      {
        en: "WinActor: licensed per PC (node-locked). BizRobo!: desktop to server editions.",
        ja: "WinActor は PC ごとのライセンス（ノードロック）。BizRobo! はデスクトップ版からサーバー版まで。",
      },
      none,
      {
        en: "AI help for error questions (WinActor 7.7). AI that analyzes robots (BizRobo! AI Apps).",
        ja: "エラーの疑問に答える AI ヘルプ（WinActor 7.7）。ロボットを解析する AI（BizRobo! AI Apps）。",
      },
      none,
      none,
    ],
  },
  {
    category: "ai-agents",
    cells: [
      {
        en: "An environment you provide (OpenAI, Anthropic). A browser extension (NEC cotomi Agent).",
        ja: "自分で用意する環境（OpenAI、Anthropic）。ブラウザーの拡張機能（NEC cotomi Agent）。",
      },
      {
        en: "The model chooses each mouse and keyboard action, and your code carries it out. cotomi Agent reproduces a procedure shown once.",
        ja: "モデルがマウスとキーボードの操作を 1 つずつ決め、あなたのコードが実行する。cotomi Agent は一度見せた手順を再現する。",
      },
      { en: "The model sees the screen again at each step.", ja: "モデルが各ステップで画面を見直す。" },
      {
        en: "Vendors advise that a person confirm consequential actions.",
        ja: "重要な操作は人が確認するよう、各社が推奨。",
      },
      {
        en: "Browsers and desktops you provide. Gemini: browsers and mobile. cotomi Agent: work on the web.",
        ja: "自分で用意するブラウザーやデスクトップ。Gemini はブラウザーとモバイル、cotomi Agent は Web 上の業務。",
      },
    ],
  },
  {
    category: "browser-agents",
    cells: [
      {
        en: "Hosted cloud browsers (Browserbase, Browser Use), or a browser your own code starts",
        ja: "クラウドのホスト型ブラウザー（Browserbase、Browser Use）か、自分のコードで起動するブラウザー",
      },
      {
        en: "Replays cached actions or generated code without the model",
        ja: "キャッシュした操作や生成したコードを、モデルなしで再生",
      },
      {
        en: "Falls back to the agent. Skyvern regenerates its code automatically.",
        ja: "エージェントに戻る。Skyvern はコードを自動で生成し直す。",
      },
      { en: "Skyvern lists human-in-the-loop on Enterprise", ja: "Skyvern は Enterprise に Human-in-the-loop を記載" },
      { en: "Websites", ja: "Web サイト" },
    ],
  },
  {
    category: "app-connectors",
    cells: [
      {
        en: "n8n can be self-hosted, on premises or in a private cloud.",
        ja: "n8n はオンプレミスやプライベートクラウドでセルフホストできる。",
      },
      { en: "A trigger, then actions in connected apps", ja: "トリガーに続いて、つないだアプリでアクションを実行" },
      none,
      {
        en: "Approval steps: Zapier on paid plans, n8n before an AI agent uses a tool",
        ja: "承認のステップ。Zapier は有料プラン、n8n は AI エージェントがツールを使う前",
      },
      {
        en: "Apps with integrations: 10,260+ (Zapier), 2,366 (n8n)",
        ja: "連携に対応したアプリ。Zapier は 10,260 以上、n8n は 2,366",
      },
    ],
  },
];

export const categories = [
  {
    id: "rpa-suites",
    name: { en: "Desktop RPA suites", ja: "デスクトップ RPA" },
    intro: {
      en: "UiPath, Power Automate, and Automation Anywhere replay recorded or designed flows, and each now uses AI to recover when a screen changes.",
      ja: "UiPath、Power Automate、Automation Anywhere は、記録や設計をしたフローを再生します。いずれも今は、画面が変わったときに AI で立て直す機能を備えています。",
    },
    products: [
      {
        id: "uipath",
        name: "UiPath",
        facts: [
          fact(
            "Healing Agent works in two modes. In self-healing mode it applies fixes during a run and continues; in recommendation mode it suggests fixes that developers can review and apply.",
            "Healing Agent には 2 つのモードがあります。自己修復モードでは実行中に修正を適用して処理を続け、推奨モードでは開発者が確認して適用できる修正案を示します。",
            "https://www.uipath.com/blog/product-and-updates/technical-tuesday-how-healing-agent-solves-ui-automation-challenges",
            via.uipathBlog,
          ),
          fact(
            "Basic starts at $25 a month, is hosted in UiPath's European region, and has limited users and robots. Self-healing UI automation is included in Enterprise and available for purchase on Standard; both are priced through sales.",
            "Basic は月額 25 ドルからで、UiPath のヨーロッパのリージョンでホストされ、ユーザー数とロボット数に上限があります。UI 自動化の自己修復は Enterprise に含まれ、Standard では追加で購入できます。どちらも価格は営業への問い合わせです。",
            "https://www.uipath.com/pricing",
            via.uipathPricing,
          ),
          fact(
            "On premises, Healing Agent in Automation Suite 2.2510 needs AI Center's Computer Vision skill and an LLM, either UiPath's or your own through the AI Trust Layer.",
            "オンプレミスでは、Automation Suite 2.2510 の Healing Agent に、AI Center の Computer Vision スキルと LLM（UiPath のもの、または AI Trust Layer 経由の自社のもの）が必要です。",
            "https://docs.uipath.com/ja/agents/automation-suite/2.2510/user-guide-ha/setup",
            via.uipathDocs,
          ),
          fact(
            "UiPath ranked first in Japan's RPA market by revenue share for the eighth year in a row, in ITR Market View for fiscal 2024.",
            "UiPath は、ITR Market View（2024 年度実績）で国内 RPA 市場の売上シェア 1 位を 8 年連続で獲得しています。",
            "https://www.uipath.com/ja/newsroom/uipath-ranked-no1-in-the-rpa-market-share-in-japan-for-the-eighth-consecutive-year-in-itrs-survey-report",
            via.uipathNews,
          ),
        ],
        differs: {
          en: "Kitewell is one app on the computer you already have, with nothing else to host. AI builds the steps from your words, and fixing a changed screen is part of every plan, including the free one. The fix is kept for later runs and shown in the run record.",
          ja: "Kitewell は、いまあるコンピューターに入れる 1 つのアプリで、別に用意するサーバーはありません。手順はあなたの言葉から AI が組み、画面が変わったときの修正は無料プランを含むすべてのプランで使えます。直した操作は次の実行から使われ、実行の記録に残ります。",
        },
        instead: {
          en: "You run a large automation program with a center of excellence, many robots under central governance, and a budget for an enterprise platform. UiPath's scale and its track record in Japan fit that better.",
          ja: "推進組織（CoE）を置き、多数のロボットを一元的に統制する大規模な自動化に取り組んでいて、エンタープライズ向け基盤の予算がある場合。その規模と国内での実績は、UiPath のほうが合っています。",
        },
      },
      {
        id: "power-automate",
        name: "Power Automate",
        facts: [
          fact(
            "Self-healing (preview) in Power Automate for desktop covers desktop and browser automation. When an element or window is not found, AI picks the most likely element and recaptures its selector so the run continues. It is runtime-only, Microsoft notes it might occasionally identify an unintended element, and it is included at no extra cost for organization premium accounts.",
            "Power Automate for desktop の自己修復（プレビュー）は、デスクトップとブラウザーの自動化が対象です。要素やウィンドウが見つからないとき、AI が最も可能性の高い要素を選んでセレクターを取り直し、実行を続けます。実行時だけの機能で、意図しない要素を選ぶことがあると Microsoft は注記しています。組織のプレミアムアカウントでは追加費用なしで使えます。",
            "https://learn.microsoft.com/en-us/power-automate/desktop-flows/self-healing",
            via.learn,
          ),
          fact(
            "Self-healing uses GPT-4.1 mini and Claude Sonnet 4.5. Administrators must enable Anthropic as a subprocessor and, outside US regions, allow moving data across regions. It is not available in government or sovereign clouds.",
            "自己修復には GPT-4.1 mini と Claude Sonnet 4.5 が使われます。管理者が Anthropic をサブプロセッサーとして有効にし、米国以外のリージョンでは「リージョン間でのデータ移動」を許可する必要があります。政府向けクラウドとソブリンクラウドでは使えません。",
            "https://learn.microsoft.com/en-us/power-automate/desktop-flows/self-healing",
            via.learn,
          ),
          fact(
            "Repair with Copilot (preview) shows the selector Copilot found, and a person applies it once or for every run. It is available only in the US region, and Copilot is optimized for English.",
            "Copilot による修復（プレビュー）では、Copilot が見つけたセレクターを人が確かめ、今回だけ、またはすべての実行に適用します。提供は米国リージョンのみで、Copilot は英語向けに最適化されています。",
            "https://learn.microsoft.com/en-us/power-automate/desktop-flows/repair-at-runtime",
            via.learn,
          ),
          fact(
            "Power Automate for desktop runs on Windows 10, Windows 11, and Windows Server, and needs an active Internet connection.",
            "Power Automate for desktop は Windows 10、Windows 11、Windows Server で動き、インターネット接続が必要です。",
            "https://learn.microsoft.com/en-us/power-automate/desktop-flows/requirements",
            via.learn,
          ),
          fact(
            "Using Power Automate for desktop with a Microsoft account is available at no extra cost.",
            "Microsoft アカウントでの Power Automate for desktop の利用は、追加費用なしで提供されています。",
            "https://learn.microsoft.com/en-us/power-automate/desktop-flows/getting-started-msa",
            via.learn,
          ),
        ],
        differs: {
          en: "Kitewell runs on macOS as well as Windows and needs no Microsoft 365 tenant. A fix for a changed website is kept and used on later runs, and you choose the model, such as Anthropic, OpenAI, or Gemini.",
          ja: "Kitewell は Windows に加えて macOS でも動き、Microsoft 365 のテナントがなくても使えます。Web サイトの変化に合わせた修正は保存され、次の実行から使われます。モデルは Anthropic、OpenAI、Gemini などから選べます。",
        },
        instead: {
          en: "Your company is standardized on Microsoft 365, your flows run on Windows, and your IT team accepts the cloud AI and data settings that self-healing needs. Power Automate is already in that stack, and desktop use with a Microsoft account costs nothing extra.",
          ja: "Microsoft 365 で統一していて、フローを Windows で動かし、自己修復に必要なクラウドの AI とデータの設定を情報システム部門が認めている場合。Power Automate はすでにその環境の中にあり、Microsoft アカウントでのデスクトップ利用に追加費用はかかりません。",
        },
      },
      {
        id: "automation-anywhere",
        name: "Automation Anywhere",
        facts: [
          fact(
            "When an object is not detected within the timeout, Generative Recorder's generative-AI fallback looks for it. It then recommends updating the automation, which can be accepted in Debug mode but not in Run mode.",
            "オブジェクトがタイムアウトまでに見つからないとき、Generative Recorder の生成 AI によるフォールバックがそれを探します。そのうえで自動化の更新を推奨し、推奨はデバッグモードで受け入れられます（実行モードでは受け入れられません）。",
            "https://docs.automationanywhere.com/r/automation-360/generative-ai-based-fallback",
            via.aaDocs,
          ),
          fact(
            "A Vision Fallback combines OCR, object detection, and vision-language models. Automation Anywhere cites a 60% improvement in fallback efficacy.",
            "Vision Fallback は、OCR、物体検出、視覚言語モデルを組み合わせます。Automation Anywhere は、フォールバックの有効性が 60% 向上したとしています。",
            "https://community.automationanywhere.com/events/improved-self-healing-automation-with-vision-model-powered-generative-recorder-304",
            via.aaCommunity,
          ),
        ],
        differs: {
          en: "Kitewell keeps the new way a site or app needs as soon as it works, with no separate step to accept it, and the run record shows which step AI fixed. One person can start on their own Mac or PC.",
          ja: "Kitewell は、うまくいった新しい操作をその場で保存し、受け入れる手順を別に挟みません。どのステップを AI が直したかは実行の記録に残ります。1 人でも、自分の Mac や PC に入れて始められます。",
        },
        instead: {
          en: "You already run many bots on Automation 360 and want AI fallback across them without moving anything.",
          ja: "すでに Automation 360 で多くの Bot を動かしていて、何も移さずにそれらへ AI のフォールバックを加えたい場合。",
        },
      },
    ],
  },
  {
    id: "japanese-rpa",
    name: { en: "Japanese RPA", ja: "国産 RPA" },
    intro: {
      en: "WinActor and BizRobo! are widely used in Japan, and their newest AI features help people build and maintain robots.",
      ja: "WinActor と BizRobo! は国内で広く使われています。最新の AI 機能は、人がロボットをつくり、保守するのを助けるものです。",
    },
    facts: [
      fact(
        "In Nork Research's March 2025 survey of 1,300 Japanese companies with annual revenue under ¥50 billion, NTT-AT, Usac System, and the Open group ranked at the top for RPA adoption, and domestic vendors held most of the top 10 (reported by IT Leaders).",
        "ノークリサーチが 2025 年 3 月に発表した、年商 500 億円未満の国内企業 1,300 社の調査では、RPA の導入社数シェアで NTT アドバンステクノロジ、ユーザックシステム、オープングループが上位に入り、上位 10 位の大半を国内ベンダーが占めました（IT Leaders の報道）。",
        "https://it.impress.co.jp/articles/-/27623",
        via.itLeaders,
      ),
    ],
    products: [
      {
        id: "winactor",
        name: "WinActor",
        facts: [
          fact(
            "WinActor 7.6, on sale from July 17, 2025, added scenario templates drafted by generative AI and refined through dialogue, and integration with image-recognition AI (reported by Impress Cloud Watch).",
            "2025 年 7 月 17 日に発売された WinActor 7.6 は、生成 AI がつくるシナリオのひな形を対話で仕上げる機能と、画像認識 AI との連携を加えました（クラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2030158.html",
            via.cloudWatch,
          ),
          fact(
            "WinActor 7.7, released September 1, 2026, added AI help for questions about operation and errors, and generative-AI support for converting VBScript libraries to Python.",
            "2026 年 9 月 1 日に出た WinActor 7.7 は、操作やエラー対処の質問に答える AI ヘルプと、VBScript のライブラリを生成 AI で Python に置き換える支援を加えました。",
            "https://winactor.biz/update/2026/09/01_7434.html",
            via.winactor,
          ),
          fact(
            "WinActor Manager on Cloud 4.0, available from February 16, 2026, adds an MCP server so AI agents can run existing WinActor scenarios (reported by Impress Cloud Watch).",
            "2026 年 2 月 16 日に提供が始まった WinActor Manager on Cloud 4.0 は MCP サーバー機能を備え、AI エージェントが既存の WinActor シナリオを実行できます（クラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2083732.html",
            via.cloudWatch,
          ),
          fact(
            "A node-locked license costs ¥1,098,680 for the full version and ¥300,080 for the runtime version, tax included (reported by Impress Cloud Watch, July 2025).",
            "ノードロックライセンスは、フル機能版が 1,098,680 円、実行版が 300,080 円です（税込、2025 年 7 月のクラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2030158.html",
            via.cloudWatch,
          ),
        ],
        differs: {
          en: "In Kitewell, AI builds the steps from your words, and when a website or app changes, AI finds the new way and keeps it. The same workflow can also handle email, Excel row by row, and coding agents.",
          ja: "Kitewell では、あなたの言葉から AI が手順を組みます。Web サイトやアプリが変わったときは、AI が新しい操作を見つけて覚え直します。同じワークフローで、メール、Excel の行ごとの処理、コーディングエージェントも動かせます。",
        },
        instead: {
          en: "Your WinActor scenarios run fine and your team knows how to maintain them. Keep them; with WinActor Manager on Cloud 4.0, AI agents can even call them.",
          ja: "WinActor のシナリオが問題なく動いていて、保守できる担当者もいる場合。そのまま使い続けてください。WinActor Manager on Cloud 4.0 なら、AI エージェントからシナリオを呼び出すこともできます。",
        },
      },
      {
        id: "bizrobo",
        name: "BizRobo!",
        facts: [
          fact(
            "BizRobo! AI Apps uses AI to analyze robot files and write their specifications, map running robots to business flows, and draft a robot's wireframe from a task described in chat.",
            "BizRobo! AI Apps は、AI がロボットファイルを解析して仕様書をつくり、稼働中のロボットを業務フローにひも付け、チャットで伝えた業務内容からロボットのワイヤーフレームを自動でつくります。",
            "https://rpa-technologies.com/ai-apps/",
            via.bizrobo,
          ),
          fact(
            "BizRobo! comes in editions from desktop to server.",
            "BizRobo! は、デスクトップ版からサーバー版まで提供されています。",
            "https://rpa-technologies.com/products/first/",
            via.bizrobo,
          ),
        ],
        differs: {
          en: "Kitewell starts on one computer, free for one project, and someone who is not an RPA developer can describe the job in words. When a website changes, AI finds the new way and keeps it.",
          ja: "Kitewell は 1 台のコンピューターから、1 プロジェクトなら無料で始められ、RPA の開発者でなくても業務を言葉で伝えられます。Web サイトが変わったときは、AI が新しい操作を見つけて覚え直します。",
        },
        instead: {
          en: "Your BizRobo! robots run reliably on a server and your team maintains them. Keep them, and look at Kitewell only for the work they don't cover.",
          ja: "BizRobo! のロボットがサーバーで安定して動き、社内で保守できている場合。そのまま使い、カバーできていない業務にだけ Kitewell を検討してください。",
        },
      },
    ],
  },
  {
    id: "ai-agents",
    name: { en: "AI agents that operate a computer", ja: "コンピューターを操作する AI エージェント" },
    intro: {
      en: "These agents look at the screen and decide each click as they go. The vendors' APIs leave the environment, the schedule, and the safeguards to the developer.",
      ja: "これらのエージェントは画面を見ながら、クリックを 1 つずつ決めていきます。各社の API では、実行環境、スケジュール、安全対策は開発者が用意します。",
    },
    facts: [
      fact(
        "Gartner expects AI agents to complement, not replace, RPA and business process automation in the near term, and notes that in frequently run processes an AI agent can cost about 30 times as much as an RPA bot (Gartner's Saikat Ray, via @IT, January 2026).",
        "Gartner は、短期的には AI エージェントが RPA や BPA に取って代わることはなく両者を組み合わせるべきだとし、頻繁に実行するプロセスでは AI エージェントのコストが RPA ボットの約 30 倍になり得ると指摘しています（Gartner の Saikat Ray 氏、@IT の 2026 年 1 月の記事）。",
        "https://atmarkit.itmedia.co.jp/ait/articles/2601/16/news001.html",
        via.atmarkit,
      ),
    ],
    products: [
      {
        id: "openai",
        name: { en: "OpenAI computer use", ja: "OpenAI の computer use" },
        facts: [
          fact(
            "With the computer use tool, the model returns structured mouse and keyboard actions, and your application carries them out in a browser or desktop.",
            "computer use ツールでは、モデルがマウスとキーボードの操作を構造化して返し、あなたのアプリケーションがそれをブラウザーやデスクトップで実行します。",
            "https://developers.openai.com/api/docs/guides/tools-computer-use",
            via.openai,
          ),
          fact(
            "OpenAI's guide says to use an isolated browser or VM with an allow list, confirm consequential actions, and treat screen content as untrusted.",
            "OpenAI のガイドは、分離したブラウザーや VM と許可リストを使うこと、重要な操作は確認すること、画面の内容を信頼できないものとして扱うことを求めています。",
            "https://developers.openai.com/api/docs/guides/tools-computer-use",
            via.openai,
          ),
        ],
        differs: {
          en: "Kitewell is a finished app around the model. It works out a website or desktop task once, repeats what worked without asking the model while the screen still matches, and adds schedules, approvals, and a run record.",
          ja: "Kitewell は、モデルを使う側の完成したアプリです。Web サイトやデスクトップの作業を一度モデルで組み立て、画面が同じあいだはモデルに尋ねずに同じ操作を繰り返します。スケジュール、承認、実行の記録も備えています。",
        },
        instead: {
          en: "You are building computer use into your own product and will run and secure the environment yourself.",
          ja: "自社の製品にコンピューター操作を組み込もうとしていて、実行環境の用意と安全対策を自分たちで行う場合。",
        },
      },
      {
        id: "anthropic",
        name: { en: "Anthropic computer use", ja: "Anthropic の computer use" },
        facts: [
          fact(
            "With the computer use tool, your application carries out each action in an environment you control and returns the results, such as screenshots, to Claude. Claude does not connect to that environment directly.",
            "computer use ツールでは、あなたのアプリケーションが自分で管理する環境で各操作を実行し、スクリーンショットなどの結果を Claude に返します。Claude がその環境に直接つながることはありません。",
            "https://platform.claude.com/docs/en/docs/agents-and-tools/tool-use/computer-use-tool",
            via.claude,
          ),
          fact(
            "The tool is generally available on the Claude API and Google Cloud, and in beta on Amazon Bedrock and Microsoft Foundry.",
            "このツールは Claude API と Google Cloud で一般提供され、Amazon Bedrock と Microsoft Foundry ではベータです。",
            "https://platform.claude.com/docs/en/docs/agents-and-tools/tool-use/computer-use-tool",
            via.claude,
          ),
          fact(
            "Anthropic recommends a dedicated virtual machine or container, an allowlist of domains, and a person confirming decisions with meaningful real-world consequences.",
            "Anthropic は、専用の仮想マシンかコンテナ、ドメインの許可リスト、そして現実に影響の大きい判断を人が確認することを推奨しています。",
            "https://platform.claude.com/docs/en/docs/agents-and-tools/tool-use/computer-use-tool",
            via.claude,
          ),
        ],
        differs: {
          en: "Kitewell can use Claude as its model and can run Claude Code as a step on your own sign-in. Around the model it adds replay of what worked, schedules, approvals, and a run record.",
          ja: "Kitewell は Claude をモデルとして使えるうえ、Claude Code もあなたのサインインのままステップとして動かせます。モデルの周りに、うまくいった操作の再生、スケジュール、承認、実行の記録を加えます。",
        },
        instead: {
          en: "You are a developer adding computer use to your own agent or product and want the API directly.",
          ja: "開発者として、自社のエージェントや製品にコンピューター操作を組み込み、API を直接使いたい場合。",
        },
      },
      {
        id: "nec-cotomi",
        name: "NEC cotomi Agent",
        facts: [
          fact(
            "NEC announced cotomi Agent on August 18, 2026. It is sold through Microsoft Marketplace at ¥15,000 per user per month excluding tax, plus fees for a dedicated tenant (reported by Impress Cloud Watch).",
            "NEC は 2026 年 8 月 18 日に cotomi Agent を発表しました。Microsoft Marketplace で、1 ユーザーあたり月額 15,000 円（税別）と、別途専用テナントの利用費で販売されます（クラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2133506.html",
            via.cloudWatch,
          ),
          fact(
            "It automates work on the web. After an experienced employee shows a procedure once, it can reproduce it, and it installs as a browser extension (reported by Impress Cloud Watch).",
            "Web 上の業務を自動で実行します。ベテラン社員が操作を一度見せれば、その手順を再現でき、ブラウザーの拡張機能として導入します（クラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2133506.html",
            via.cloudWatch,
          ),
          fact(
            "Its agent technology, cotomi Act, scored 80.4% on the WebArena benchmark, above the human task success rate of 78.2% (reported by Impress Cloud Watch, December 2025).",
            "中核のエージェント技術 cotomi Act は、ベンチマーク WebArena で 80.4% を記録し、人間のタスク成功率 78.2% を上回りました（2025 年 12 月のクラウド Watch の報道）。",
            "https://cloud.watch.impress.co.jp/docs/news/2068803.html",
            via.cloudWatch,
          ),
        ],
        differs: {
          en: "Kitewell works desktop apps as well as websites, on your own computer. Team is priced per computer rather than per user, and one project is free.",
          ja: "Kitewell は Web サイトに加えてデスクトップアプリも、あなたのコンピューターで操作します。Team の料金はユーザー単位ではなくコンピューターの台数単位で、1 プロジェクトなら無料です。",
        },
        instead: {
          en: "Your work happens in the browser, you buy through Microsoft Marketplace, and you want an agent from a large Japanese vendor that learns from a veteran's demonstration.",
          ja: "業務がブラウザーの中で完結し、Microsoft Marketplace で購入でき、ベテランの操作を見せて覚えさせるエージェントを国内の大手ベンダーから導入したい場合。",
        },
      },
      {
        id: "google",
        name: "Gemini 2.5 Computer Use",
        facts: [
          fact(
            "Gemini 2.5 Computer Use launched in public preview through the Gemini API in Google AI Studio and Vertex AI on October 7, 2025. Google says it is optimized for web browsers, shows promise for mobile, and is not yet optimized for desktop OS-level control.",
            "Gemini 2.5 Computer Use は、2025 年 10 月 7 日に Google AI Studio と Vertex AI の Gemini API でパブリックプレビューとして公開されました。Google によると、主に Web ブラウザー向けに最適化され、モバイルでも有望で、デスクトップの OS レベルの操作にはまだ最適化されていません。",
            "https://blog.google/technology/google-deepmind/gemini-computer-use-model/",
            via.google,
          ),
          fact(
            "Developers can instruct it to refuse, or to ask the user for confirmation, before certain high-stakes actions.",
            "開発者は、リスクの高い特定の操作の前に、拒否させたり、ユーザーに確認を求めさせたりできます。",
            "https://blog.google/technology/google-deepmind/gemini-computer-use-model/",
            via.google,
          ),
        ],
        differs: {
          en: "Kitewell works desktop apps as well as websites, on Windows and macOS, and can use Gemini as its model.",
          ja: "Kitewell は Web サイトに加えて、Windows と macOS のデスクトップアプリも操作し、モデルとして Gemini も使えます。",
        },
        instead: {
          en: "You are building a browser or mobile agent into your own product on Google Cloud.",
          ja: "Google Cloud の上で、自社の製品にブラウザーやモバイルのエージェントを組み込む場合。",
        },
      },
    ],
  },
  {
    id: "browser-agents",
    name: { en: "Browser-agent developer tools", ja: "ブラウザー操作 AI の開発者向けツール" },
    intro: {
      en: "These tools let developers have AI work a site once, then replay what worked and fall back to AI when the page changes.",
      ja: "これらのツールでは、開発者が AI に一度サイトを操作させ、うまくいった操作を再生し、ページが変わったら AI に戻すしくみを組めます。",
    },
    products: [
      {
        id: "skyvern",
        name: "Skyvern",
        facts: [
          fact(
            "After an agent run succeeds, Skyvern can generate code from the actions it took, and later runs execute that code instead of asking the model. If the code fails because the page changed, Skyvern falls back to the agent and regenerates the code; this is on by default.",
            "エージェントの実行が成功すると、Skyvern はその操作からコードを生成でき、以降の実行はモデルに尋ねずにそのコードを実行します。ページが変わってコードが失敗すると、エージェントに戻ってコードを生成し直します。この動きは既定で有効です。",
            "https://skyvern.com/docs/developers/features/code-caching",
            via.skyvernDocs,
          ),
          fact(
            "Plans are Free, Hobby at $29 a month, Pro at $149 a month, and Enterprise at a custom price. Human-in-the-loop is listed on Enterprise only.",
            "プランは Free、月額 29 ドルの Hobby、月額 149 ドルの Pro、個別見積もりの Enterprise です。Human-in-the-loop は Enterprise にだけ記載されています。",
            "https://www.skyvern.com/pricing",
            via.skyvernPricing,
          ),
        ],
        differs: {
          en: "Kitewell is an app rather than a developer platform. Any plan can stop a step for a person's approval, and the same workflow can include desktop apps, Excel, and email.",
          ja: "Kitewell は開発者向けの基盤ではなく、アプリです。どのプランでもステップを止めて人の承認を待てて、同じワークフローにデスクトップアプリ、Excel、メールも入れられます。",
        },
        instead: {
          en: "You are coding browser automation into your own product, want hosted browsers and an API, and need many sessions at once.",
          ja: "自社のサービスにブラウザー自動化をコードで組み込み、ホスト型のブラウザーと API を使って、多数のセッションを同時に動かしたい場合。",
        },
      },
      {
        id: "stagehand",
        name: { en: "Stagehand and Browserbase", ja: "Stagehand と Browserbase" },
        facts: [
          fact(
            "Stagehand caches act() results. On a cache hit, Browserbase's server returns the result with no LLM inference; if the recorded selector no longer resolves, Stagehand falls back to full inference.",
            "Stagehand は act() の結果をキャッシュします。キャッシュに当たると Browserbase のサーバーが LLM の推論なしで結果を返し、記録したセレクターが見つからなくなると、通常の推論に戻ります。",
            "https://docs.stagehand.dev/v4/best-practices/caching",
            via.stagehand,
          ),
          fact(
            "The cache lives on Browserbase's servers. With a local browser the cache option has no effect, and every call runs inference.",
            "キャッシュは Browserbase のサーバー側にあります。ローカルのブラウザーではキャッシュの設定は効かず、毎回推論が走ります。",
            "https://docs.stagehand.dev/v4/best-practices/caching",
            via.stagehand,
          ),
          fact(
            "Browserbase plans are Free, Developer at $20 a month, Startup at $99 a month, and Scale at a custom price. Asia Pacific is available on request for enterprise customers.",
            "Browserbase のプランは Free、月額 20 ドルの Developer、月額 99 ドルの Startup、個別見積もりの Scale です。アジア太平洋リージョンは、エンタープライズの顧客に要望に応じて提供されます。",
            "https://www.browserbase.com/pricing",
            via.browserbase,
          ),
        ],
        differs: {
          en: "Kitewell keeps what worked on your own computer and runs it in your own Chrome or Edge, with the sign-ins saved there.",
          ja: "Kitewell は、うまくいった操作をあなたのコンピューターに保存し、そこにある Chrome や Edge と、保存したサインインで動かします。",
        },
        instead: {
          en: "You are a developer writing browser automation in code and want hosted browsers that scale in the cloud.",
          ja: "開発者としてブラウザー自動化をコードで書き、クラウドで規模を広げられるホスト型ブラウザーを使いたい場合。",
        },
      },
      {
        id: "browser-use",
        name: "Browser Use",
        facts: [
          fact(
            "workflow-use creates deterministic workflows that fall back to the Browser Use agent when a step fails. Its README says it is in very early development and not recommended for production.",
            "workflow-use は、決まった手順で動き、ステップが失敗すると Browser Use のエージェントに戻るワークフローをつくります。README には、開発のごく初期段階のため本番での利用は勧めないとあります。",
            "https://github.com/browser-use/workflow-use",
            via.workflowUse,
          ),
          fact(
            "Cloud browsers cost $0.02 an hour, and agents are billed at the model's cost plus 20%, plus browser time and traffic. There are no subscription plans.",
            "クラウドのブラウザーは 1 時間 0.02 ドル、エージェントはモデルの費用に 20% を加えた額と、ブラウザーの時間と通信量で課金されます。サブスクリプションのプランはありません。",
            "https://browser-use.com/pricing",
            via.browserUse,
          ),
        ],
        differs: {
          en: "In Kitewell, replaying what worked and fixing it when a site changes is how every website step runs by default, with no code to write.",
          ja: "Kitewell では、うまくいった操作の再生と、サイトが変わったときの修正が、すべての Web サイトのステップの既定の動きです。コードを書く必要はありません。",
        },
        instead: {
          en: "You want an agent library to build your own automation on, or pay-as-you-go cloud browsers for your own code.",
          ja: "自分の自動化の土台にするエージェントのライブラリや、自分のコードから使う従量課金のクラウドブラウザーが欲しい場合。",
        },
      },
    ],
  },
  {
    id: "app-connectors",
    name: { en: "App connectors", ja: "アプリ連携サービス" },
    intro: {
      en: "Zapier and n8n connect apps through their integrations and APIs rather than by working a screen.",
      ja: "Zapier と n8n は、画面を操作するのではなく、各アプリの連携機能や API を通じてアプリをつなぎます。",
    },
    products: [
      {
        id: "zapier",
        name: "Zapier",
        facts: [
          fact(
            "Zapier says it connects 10,260+ apps, with no code required.",
            "Zapier は、10,260 以上のアプリをコードなしでつなげるとしています。",
            "https://zapier.com/apps",
            via.zapier,
          ),
          fact(
            "Each Zap consists of a trigger and one or more actions.",
            "Zap は、1 つのトリガーと 1 つ以上のアクションでできています。",
            "https://help.zapier.com/hc/en-us/articles/8496181725453",
            via.zapierHelp,
          ),
          fact(
            "Human in the Loop's Request Approval action pauses a Zap so reviewers can approve, decline, or change data. It is on the Professional, Team, and Enterprise plans.",
            "Human in the Loop の Request Approval アクションは Zap を一時停止し、レビュー担当者が承認、却下、データの修正を行えるようにします。Professional、Team、Enterprise プランで使えます。",
            "https://help.zapier.com/hc/en-us/articles/38731463206029",
            via.zapierHelp,
          ),
        ],
        differs: {
          en: "Kitewell works the screens of websites and desktop apps that have no integration, on your own computer. A Zap can also start a Kitewell workflow through a webhook, on Personal and Team.",
          ja: "Kitewell は、連携機能のない Web サイトやデスクトップアプリの画面を、あなたのコンピューターで操作します。Zap から Webhook で Kitewell のワークフローを始めることもできます（Personal と Team）。",
        },
        instead: {
          en: "Every system involved has a Zapier integration. Connecting through integrations is quicker to set up and steadier than working a screen.",
          ja: "関係するシステムがすべて Zapier に対応している場合。連携機能でつなぐほうが、画面を操作するより早く組めて安定します。",
        },
      },
      {
        id: "n8n",
        name: "n8n",
        facts: [
          fact(
            "n8n can be self-hosted on your own infrastructure, on premises, or in a private cloud.",
            "n8n は、自社のインフラ、オンプレミス、プライベートクラウドでセルフホストできます。",
            "https://docs.n8n.io/hosting/",
            via.n8nDocs,
          ),
          fact(
            "n8n lists 2,366 integrations.",
            "n8n は 2,366 の連携を掲載しています。",
            "https://n8n.io/integrations/",
            via.n8n,
          ),
          fact(
            "Human-in-the-loop for tools requires a person's approval before an AI agent runs specific tools, through n8n's chat, Slack, Microsoft Teams, Gmail, and other channels.",
            "ツールの Human-in-the-loop では、AI エージェントが特定のツールを実行する前に人の承認を求めます。承認は n8n のチャット、Slack、Microsoft Teams、Gmail などから行えます。",
            "https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/",
            via.n8nDocs,
          ),
        ],
        differs: {
          en: "Kitewell is a desktop app with no server to run, and it works the screens of websites and desktop apps as well as calling APIs.",
          ja: "Kitewell は運用するサーバーが要らないデスクトップアプリで、API の呼び出しに加えて、Web サイトやデスクトップアプリの画面も操作します。",
        },
        instead: {
          en: "Your systems have APIs, and you want a visual workflow tool you can self-host for your team.",
          ja: "システムに API があり、チームで使うワークフローツールをセルフホストしたい場合。",
        },
      },
    ],
  },
];

// Where Kitewell falls short, each with the page that says so.
export const shortfalls = [
  {
    title: { en: "New, from a small company", ja: "新しい製品で、つくっているのは小さな会社" },
    text: {
      en: "Kitewell is made by Descarty, Inc., and paid plans open with the public launch. Workflows are plain YAML on the open-source Dagu engine, and a project can be exported any time.",
      ja: "Kitewell は Descarty, Inc. の製品で、有料プランは正式リリースから購入できます。ワークフローはオープンソースの Dagu エンジンで動く素の YAML で、プロジェクトはいつでもエクスポートできます。",
    },
    href: "/docs/sharing/",
  },
  {
    title: { en: "Slower than scripted RPA on fixed, high-volume entry", ja: "決まった大量入力は、スクリプトで組んだ RPA のほうが速い" },
    text: {
      en: "A robot replaying a fixed script enters data faster. Kitewell waits for each page, and asks a model wherever a step reads a page or checks something written in words.",
      ja: "固定の手順を再生するロボットのほうが入力は速く済みます。Kitewell は画面ごとに表示を待ち、ページの読み取りや言葉で書いたチェックではモデルに尋ねます。",
    },
    href: "/docs/browser/",
  },
  {
    title: { en: "macOS desktop replay works from the screen", ja: "macOS のデスクトップの再生は画面が頼り" },
    text: {
      en: "On Windows a replay finds the app's own buttons and fields. On macOS it needs the same screen as when the task was learned, and reading from the screen asks the model every run.",
      ja: "Windows ではアプリ自身のボタンや入力欄を探して再生します。macOS では覚えたときと同じ画面が必要で、画面からの読み取りは毎回モデルに尋ねます。",
    },
    href: "/docs/desktop/",
  },
  {
    title: { en: "The computer has to be on and awake", ja: "コンピューターが起きている必要がある" },
    text: {
      en: "Kitewell runs while the computer is awake and you are signed in. It does not wake a sleeping computer; scheduled starts it missed run when the computer is back.",
      ja: "Kitewell が動くのは、コンピューターが起きていて、サインインしているあいだです。眠っているコンピューターを起こすことはなく、逃したスケジュールはコンピューターが戻ったときに実行します。",
    },
    href: "/docs/scheduling/",
  },
  {
    title: { en: "Website steps use Chrome or Edge", ja: "Web サイトのステップは Chrome か Edge" },
    text: {
      en: "Chromium or Brave works when you give its path. Building and fixing a website step takes an Anthropic, OpenAI, or Gemini model; small local models usually cannot drive a browser.",
      ja: "Chromium や Brave も、場所を指定すれば使えます。Web サイトのステップを組み立てて直すには Anthropic、OpenAI、Gemini のモデルが必要で、小さなローカルモデルでは通常ブラウザーを操作できません。",
    },
    href: "/docs/browser/",
  },
  {
    title: { en: "A cloud model sees what it works on", ja: "クラウドのモデルには、操作する画面の内容が送られる" },
    text: {
      en: "When AI decides a desktop action, a screenshot of the whole screen goes to the model's provider; a website step sends the page's visible text and layout. Replayed actions send nothing, and with a local model the prompts stay inside your network.",
      ja: "デスクトップの操作を AI が決めるときは画面全体のスクリーンショットが、Web サイトのステップではページに見えている文字とレイアウトが、モデルの提供元に送られます。再生した操作は何も送らず、ローカルモデルならプロンプトは社内のネットワークにとどまります。",
    },
    href: "/docs/data-flow/",
  },
  {
    title: { en: "Gmail connects with an app password for now", ja: "Gmail は当面、アプリパスワードで接続" },
    text: {
      en: "Google is still reviewing Kitewell's Gmail access, so a Gmail mailbox starts from an app password until then.",
      ja: "Google が Kitewell の Gmail へのアクセスを審査している間は、アプリパスワードで Gmail のメールボックスを接続します。",
    },
    href: "/docs/email/",
  },
  {
    title: { en: "Team covers up to 25 people", ja: "Team で使えるのは 25 人まで" },
    text: {
      en: "For a larger organization, Enterprise is arranged under a contract.",
      ja: "それより大きな組織には、契約にもとづく Enterprise をご用意します。",
    },
    href: "/pricing/#enterprise",
  },
];
