// Chores people do by hand on their computers, told from their side: how it
// goes now, the one sentence that hands it to Kitewell, how it runs, and what
// they see instead. Each is backed by the workflow of the same name in
// src/workflows, which uses only steps Kitewell has; the tests check both.

export const groups = ["everyone", "code"];

const needs = {
  chrome: { en: "Google Chrome (or Edge on Windows)", ja: "Google Chrome（Windows では Edge も可）" },
  browserModel: {
    en: "An Anthropic, OpenAI, or Gemini model that can use a browser",
    ja: "ブラウザーを操作できる Anthropic、OpenAI、Gemini のモデル",
  },
  computerModel: {
    en: "An Anthropic, OpenAI, or Gemini model that can use a computer",
    ja: "コンピューターを操作できる Anthropic、OpenAI、Gemini のモデル",
  },
  desktop: {
    en: "Screen Recording and Accessibility allowed on macOS, or Kitewell running in your session on Windows",
    ja: "macOS では画面収録とアクセシビリティの許可、Windows ではサインイン中のセッションで動く Kitewell",
  },
  mailbox: {
    en: "A connected mailbox: Gmail, Microsoft 365, iCloud, or any IMAP",
    ja: "接続したメールボックス（Gmail、Microsoft 365、iCloud、または IMAP）",
  },
  model: {
    en: "An API model: Anthropic, OpenAI, Gemini, or a local server",
    ja: "API モデル（Anthropic、OpenAI、Gemini、またはローカルサーバー）",
  },
  workbook: {
    en: "The workbook as .xlsx (not .xls or Google Sheets)",
    ja: ".xlsx 形式のブック（.xls や Google スプレッドシートは不可）",
  },
  agent: {
    en: "A command-line agent such as Codex or Claude Code, installed and signed in",
    ja: "Codex や Claude Code などのコマンドラインエージェント（インストールとサインイン済み）",
  },
  git: { en: "A Git repository and the gh command", ja: "Git リポジトリと gh コマンド" },
  python: { en: "Python 3", ja: "Python 3" },
  servers: {
    en: "The servers registered as a group: one machine at a time, stop on failure",
    ja: "グループとして登録したサーバー（1 台ずつ、失敗したら停止）",
  },
};

export const chores = [
  {
    slug: "supplier-invoices",
    group: "everyone",
    scheduled: true,
    uses: ["browser", "desktop", "approval", "email"],
    needs: ["chrome", "computerModel", "desktop", "mailbox"],
    film: { now: "busywork", tell: "ask", run: "run", ok: "ok", after: "learn" },
    related: ["excel-orders", "invoice-intake", "form-from-sheet"],
    en: {
      when: "Every weekday morning",
      chore: "Every morning I log in to our supplier's portal, download the new invoices, and type each one into an accounting app from 2009.",
      motions: [
        "Log in to the portal.",
        "Find the new invoices.",
        "Download each one.",
        "Copy the amount.",
        "Switch to Ledger.",
        "New bill. Paste. Save.",
        "Back to the portal for the next one.",
        "Write the summary.",
        "Send.",
      ],
      tally: "Every weekday, for every invoice.",
      sentence:
        "Every weekday at 9, collect new invoices from the Harbor Supply portal, enter them in Ledger, and email me a summary.",
      steps: [
        ["website", "Collect new invoices", "Signs in to the portal and collects every invoice since the last weekday."],
        ["desktop", "Enter them in Ledger", "Opens Ledger, adds each bill without saving, and takes a screenshot."],
        ["approval", "Wait for your OK", "You check the screenshot, then approve, send it back with a note, or reject."],
        ["desktop", "Save them in Ledger", "Saves the bills and checks they are in the list."],
        ["email", "Email me a summary", "What went into Ledger today, in your inbox."],
      ],
      run: "On the website, in the old desktop app, and in your email. Ledger has no API, so a model reads the screen and uses the mouse and keyboard.",
      ok: "Before anything is saved in Ledger, the run waits for you, with a screenshot of what it typed. Every step and every decision is recorded.",
      moment: { time: "9:04", title: "Weekday invoice run", text: "Waiting for you: save 3 bills in Ledger?" },
      after:
        "The first run learns the clicks with AI. After that, the clicks replay without it, faster and free. When a page changes, it relearns only the clicks that broke.",
      good: [
        "Nothing is saved in Ledger until you say so.",
        "The website and desktop steps send what they see, page text and screenshots of the screen, to the model you choose. The portal password is a secret on this computer: Kitewell types it, and the model never sees it.",
      ],
      film: "Kitewell's own screens with sample data. The supplier portal and Ledger are made up.",
    },
    ja: {
      when: "平日の朝",
      chore: "毎朝、取引先のポータルにログインして新しい請求書をダウンロードし、2009 年製の会計アプリに 1 件ずつ打ち込んでいる。",
      motions: [
        "ポータルにログイン。",
        "新しい請求書を探す。",
        "1 件ずつダウンロード。",
        "金額をコピー。",
        "台帳アプリに切り替え。",
        "新規伝票。貼り付け。保存。",
        "ポータルに戻って次の 1 件。",
        "概要を書く。",
        "送信。",
      ],
      tally: "平日は毎日、請求書の数だけ。",
      sentence: "平日の朝9時に、みなと資材のポータルから新しい請求書を集めて台帳に入力し、概要をメールで送って。",
      steps: [
        ["website", "新しい請求書を集める", "ポータルにサインインし、前の平日以降の請求書をすべて集めます。"],
        ["desktop", "台帳に入力する", "台帳アプリを開いて伝票を 1 件ずつ入力し、保存せずにスクリーンショットを撮ります。"],
        ["approval", "あなたの OK を待つ", "スクリーンショットを見て、承認、ひとこと添えて差し戻し、または却下します。"],
        ["desktop", "台帳に保存する", "伝票を保存し、一覧に入ったことを確かめます。"],
        ["email", "概要をメールで送る", "今日台帳に入れた内容が、あなたの受信トレイに届きます。"],
      ],
      run: "Web サイトでも、古いデスクトップアプリでも、メールでも。台帳アプリには API がないので、モデルが画面を読み、マウスとキーボードで操作します。",
      ok: "台帳に保存する前に、入力した画面のスクリーンショットを添えて、実行はあなたを待ちます。すべてのステップと判断が記録に残ります。",
      moment: { time: "9:04", title: "平日の請求書処理", text: "あなたの対応待ち：台帳に 3 件の伝票を保存しますか？" },
      after:
        "最初の実行で、AI がクリックを覚えます。そこから先は覚えた操作を AI なしで繰り返すので、速く、費用もかかりません。画面が変わったときは、合わなくなったクリックだけを覚え直します。",
      good: [
        "あなたが OK するまで、台帳には何も保存されません。",
        "Web サイトとデスクトップのステップは、見たもの（ページの文章と画面のスクリーンショット）を、あなたが選んだモデルに送ります。ポータルのパスワードはこのコンピューターのシークレットにあり、Kitewell が入力するので、モデルには見えません。",
      ],
      film: "Kitewell の実際の画面と、サンプルのデータです。取引先のポータルと台帳アプリは架空のものです。",
    },
  },
  {
    slug: "inbox-digest",
    group: "everyone",
    scheduled: true,
    uses: ["email", "model"],
    needs: ["mailbox", "model"],
    related: ["invoice-intake", "price-watch", "supplier-invoices"],
    en: {
      when: "Every morning",
      chore: "Every morning I read through fifty emails to find the five that actually need me.",
      motions: [
        "Open the inbox.",
        "Open one. Not for me.",
        "Open the next.",
        "Skim the thread.",
        "Flag it.",
        "Scroll back up.",
        "Wait. Was that one due today?",
      ],
      tally: "Every morning, before the real work starts.",
      sentence:
        "Every weekday at 8:00, find the email that arrived in my mailbox in the last 24 hours, write a digest grouped by topic with anything due today first, and email it to me.",
      steps: [
        ["email", "Find yesterday's email", "Everything that arrived in the last 24 hours, up to 50 emails. Nothing is marked read."],
        ["ai", "Write the digest", "A model groups it by topic, names who is waiting on you, and puts anything due today first."],
        ["email", "Send it to me", "One email, to your own address."],
      ],
      moment: { time: "8:00", title: "Inbox digest", text: "2 due today. 3 people waiting on you." },
      artifact: {
        type: "mail",
        subject: "Inbox digest",
        sections: [
          ["Due today", ["Contract renewal: Dana needs your signature by 5 pm.", "Quarterly numbers: the finance sheet closes at noon."]],
          ["Waiting on you", ["Sam asks whether Thursday works for the demo.", "The printer quote needs a yes or no.", "Lee sent the draft for your comments."]],
          ["Everything else", ["Two newsletters, the shipping notice for the chairs, and four receipts."]],
        ],
      },
      good: [
        "There is nothing to approve: it only reads your email and writes to you. Finding never marks anything read, so your inbox looks the same afterwards.",
        "The model reads the text of the emails it summarizes. Choose one you trust with them, or a local model.",
      ],
    },
    ja: {
      when: "毎朝",
      chore: "毎朝、50 通のメールに目を通して、本当に自分が対応すべき 5 通を探している。",
      motions: [
        "受信トレイを開く。",
        "1 通開く。自分宛てじゃない。",
        "次を開く。",
        "スレッドを流し読み。",
        "フラグを付ける。",
        "上までスクロールして戻る。",
        "待って、あれは今日が期限だった？",
      ],
      tally: "毎朝、本当の仕事を始める前に。",
      sentence:
        "平日の 8:00 に、私のメールボックスに直近 24 時間で届いたメールを探して、話題ごとにまとめ、今日が期限のものを先頭にしたダイジェストを書き、私にメールしてください。",
      steps: [
        ["email", "前日のメールを探す", "直近 24 時間に届いたメールを、最大 50 通。既読にはしません。"],
        ["ai", "ダイジェストを書く", "モデルが話題ごとにまとめ、返事を待っている相手を挙げ、今日が期限のものを先頭に置きます。"],
        ["email", "自分に送る", "自分のアドレス宛てに 1 通。"],
      ],
      moment: { time: "8:00", title: "受信トレイのダイジェスト", text: "今日が期限 2 件。あなたの返事待ち 3 人。" },
      artifact: {
        type: "mail",
        subject: "受信トレイのダイジェスト",
        sections: [
          ["今日が期限", ["契約更新：佐藤さんが 17 時までにあなたの署名を待っています。", "四半期の数字：経理のシートは正午で締め切りです。"]],
          ["あなたの返事待ち", ["田中さん：木曜のデモは都合がつくか。", "プリンターの見積もり：可否の返事が必要です。", "鈴木さん：下書きへのコメントの依頼。"]],
          ["そのほか", ["ニュースレター 2 通、椅子の発送通知、領収書 4 通。"]],
        ],
      },
      good: [
        "承認するものはありません。メールを読んで、あなたに書くだけです。検索で既読になることはないので、受信トレイの見た目は変わりません。",
        "モデルは、まとめるメールの本文を読みます。任せられるモデルか、ローカルのモデルを選んでください。",
      ],
    },
  },
  {
    slug: "excel-orders",
    group: "everyone",
    scheduled: false,
    uses: ["browser"],
    needs: ["chrome", "browserModel", "workbook"],
    film: { after: "sheet" },
    related: ["form-from-sheet", "supplier-invoices", "company-research"],
    en: {
      when: "Whenever new orders come in",
      chore: "I go down an order list in Excel, place each order on a supplier's website, and type the receipt number back into the sheet.",
      motions: [
        "Read the next row.",
        "Switch to the supplier's site.",
        "Search for the item.",
        "Type the quantity.",
        "Pick the delivery date.",
        "Place the order.",
        "Copy the receipt number.",
        "Back to Excel. Paste it beside the row.",
        "Next row.",
      ],
      tally: "Row by row, down the whole list.",
      sentence:
        "For each row of orders.xlsx, place the order on the Harbor Supply site and write the receipt number back beside the row.",
      steps: [
        ["excel", "Read the rows to run", "Before anything runs, you see which rows will run, and why any other row won't."],
        ["website", "Place the order", "For each row: find the item, add the quantity, set the delivery date, place the order, and read the receipt number."],
        ["excel", "Write the receipt back", "Each receipt number goes into the workbook, beside the order it came from."],
      ],
      moment: { title: "orders.xlsx", text: "Every row done. Each receipt number is beside its order." },
      after:
        "The results land in the columns you chose, with Undo. A result never lands on the wrong row, even after you sort in Excel, and a file open in Excel means waiting, not failing.",
      good: [
        "The workbook stays on this computer. The website step sends what it reads on the page to the model you choose.",
        "Kitewell works on the file itself without starting Excel, so it runs with the screen locked.",
      ],
      film: "Kitewell's own screens with sample data.",
    },
    ja: {
      when: "受注が入るたびに",
      chore: "Excel の発注一覧を上から順に見て、取引先のサイトで 1 件ずつ発注し、受付番号をシートに打ち戻している。",
      motions: [
        "次の行を読む。",
        "取引先のサイトに切り替え。",
        "品名で検索。",
        "数量を入力。",
        "納期を選ぶ。",
        "発注する。",
        "受付番号をコピー。",
        "Excel に戻って、その行の横に貼り付け。",
        "次の行。",
      ],
      tally: "1 行ずつ、一覧の最後まで。",
      sentence: "発注一覧.xlsx の行ごとに、みなと資材のサイトで発注して、受付番号をその行の横に書き戻して。",
      steps: [
        ["excel", "実行する行を読む", "実行の前に、どの行を実行するか、ほかの行はなぜ実行しないかが分かります。"],
        ["website", "発注する", "行ごとに、品物を探し、数量と納期を入れて発注し、受付番号を読み取ります。"],
        ["excel", "受付番号を書き戻す", "受付番号が、元の注文の行の横に書き込まれます。"],
      ],
      moment: { title: "発注一覧.xlsx", text: "全行完了。受付番号は、それぞれの注文の横にあります。" },
      after:
        "結果は、決めておいた列に入り、元に戻すこともできます。Excel で並べ替えても、結果が別の行に入ることはありません。ファイルを Excel で開いていても、失敗せずに待ちます。",
      good: [
        "ブックはこのコンピューターから出ません。Web サイトのステップは、ページで読んだ内容を、あなたが選んだモデルに送ります。",
        "Excel を起動せずにファイルそのものを扱うので、画面がロックされていても動きます。",
      ],
      film: "Kitewell の実際の画面と、サンプルのデータです。",
    },
  },
  {
    slug: "invoice-intake",
    group: "everyone",
    scheduled: true,
    uses: ["email", "foreach", "model", "command"],
    needs: ["mailbox", "model"],
    related: ["inbox-digest", "supplier-invoices", "excel-orders"],
    en: {
      when: "Every few days",
      chore: "Every few days I open each emailed invoice, copy the supplier and the total into a spreadsheet, and file the email away.",
      motions: [
        "Search the inbox for “invoice”.",
        "Open one.",
        "Open the PDF.",
        "Copy the supplier.",
        "Copy the invoice number.",
        "Copy the total.",
        "Paste them into the ledger.",
        "Mark it read.",
        "Drag it to Invoices.",
        "Next.",
      ],
      tally: "Every invoice, every few days.",
      sentence:
        "Every 30 minutes, find unread email in billing@example.com with an invoice attached, extract the supplier, invoice number, total, and currency with a model, append them as a CSV line to invoices.csv, then mark each email read and move it to Invoices.",
      steps: [
        ["email", "Find unread invoices", "Unread email with an attachment and “invoice” in the subject, up to 20 a run."],
        ["ai", "Read the amount", "For each email, a model answers with one line: supplier, invoice number, total, currency."],
        ["script", "Add it to the ledger", "The line goes to invoices.csv in your folder."],
        ["email", "File the email", "Marked read and moved to Invoices, only after its line is recorded."],
      ],
      moment: { time: "every 30 min", title: "Invoice intake", text: "3 invoices added to invoices.csv." },
      artifact: {
        type: "table",
        name: "invoices.csv",
        columns: ["supplier", "invoice_number", "total", "currency"],
        rows: [
          ["Harbor Supply Co.", "HS-20418", "1240.00", "USD"],
          ["Bright Paper Ltd", "BP-3391", "86.40", "USD"],
          ["Northwind Freight", "NF-77812", "412.75", "USD"],
        ],
      },
      good: [
        "An email is filed only after its line is recorded. One that fails stays unread and is tried again on the next run, by itself.",
        "The model reads each invoice email to find the supplier and total. Attachments are saved with the run, on this computer.",
      ],
    },
    ja: {
      when: "数日おきに",
      chore: "数日おきに、メールで届いた請求書を 1 通ずつ開き、仕入れ先と金額を表に書き写して、メールを片付けている。",
      motions: [
        "受信トレイで「請求書」を検索。",
        "1 通開く。",
        "PDF を開く。",
        "仕入れ先をコピー。",
        "請求書番号をコピー。",
        "合計をコピー。",
        "台帳に貼り付け。",
        "既読にする。",
        "「請求書」フォルダーへドラッグ。",
        "次。",
      ],
      tally: "数日おきに、届いた請求書の数だけ。",
      sentence:
        "30 分ごとに、billing@example.com の請求書が添付された未読メールを探し、仕入れ先、請求書番号、合計、通貨をモデルで読み取って invoices.csv に CSV の 1 行として追加し、各メールを既読にして Invoices へ移動してください。",
      steps: [
        ["email", "未読の請求書を探す", "添付ファイルがあり、件名に「invoice」を含む未読メールを、1 回につき最大 20 通。"],
        ["ai", "金額を読み取る", "メールごとに、モデルが仕入れ先、請求書番号、合計、通貨を 1 行で答えます。"],
        ["script", "台帳に追加する", "その行を、フォルダーの invoices.csv に追加します。"],
        ["email", "メールを整理する", "行を記録してから、既読にして Invoices へ移動します。"],
      ],
      moment: { time: "30 分ごと", title: "請求書の取り込み", text: "invoices.csv に 3 件追加しました。" },
      artifact: {
        type: "table",
        name: "invoices.csv",
        columns: ["supplier", "invoice_number", "total", "currency"],
        rows: [
          ["みなと資材", "MS-20418", "124000", "JPY"],
          ["あおば紙工", "AP-3391", "8640", "JPY"],
          ["北浜運輸", "KU-77812", "41275", "JPY"],
        ],
      },
      good: [
        "メールを整理するのは、行を記録したあとだけです。失敗したメールは未読のまま残り、次の実行でそのメールだけがやり直されます。",
        "モデルは、仕入れ先と合計を見つけるために請求書のメールを読みます。添付ファイルは実行と一緒に、このコンピューターに保存されます。",
      ],
    },
  },
  {
    slug: "form-from-sheet",
    group: "everyone",
    scheduled: false,
    uses: ["browser"],
    needs: ["chrome", "browserModel"],
    related: ["excel-orders", "company-research", "supplier-invoices"],
    en: {
      when: "Whenever the list grows",
      chore: "I type each row of a spreadsheet into the same web form, one customer at a time.",
      motions: [
        "Copy the name.",
        "Switch to the portal.",
        "Paste.",
        "Copy the email.",
        "Switch.",
        "Paste.",
        "Pick the plan.",
        "Save.",
        "Back to the sheet. Next row.",
      ],
      tally: "One customer at a time, all afternoon.",
      sentence:
        "Build a workflow with inputs NAME, EMAIL, and PLAN that opens https://portal.example.com/customers/new in the browser, signs in with the portal/password secret if needed, fills in the form, saves, and screenshots the confirmation. I will run it over a sheet.",
      steps: [
        ["website", "Register one customer", "Signs in if needed, fills in the form from the row, saves, checks it worked, and takes a screenshot."],
        ["excel", "Once for every row", "Paste the spreadsheet into a batch sheet: each row is one run, with progress and failures kept."],
      ],
      moment: { title: "Batch sheet · New customers", text: "57 of 60 registered. 3 need a look." },
      artifact: {
        type: "table",
        name: "New customers",
        columns: ["NAME", "EMAIL", "PLAN", "Status"],
        rows: [
          ["Ana Ruiz", "ana@example.com", "Team", "Done"],
          ["Ben Okafor", "ben@example.com", "Personal", "Done"],
          ["Chloe Martin", "chloe@example.com", "Team", "Needs a look"],
          ["Dev Patel", "dev@example.com", "Personal", "Done"],
        ],
        flag: "Needs a look",
      },
      good: [
        "The sign-in is saved on this computer and reused for every row. The password comes from a secret and is typed for you; the model never sees it.",
        "Every customer gets a screenshot of the confirmation, so a row that needs a look shows you why.",
      ],
    },
    ja: {
      when: "一覧が増えるたびに",
      chore: "スプレッドシートの行を 1 件ずつ、同じ Web フォームに打ち込んでいる。",
      motions: [
        "名前をコピー。",
        "ポータルに切り替え。",
        "貼り付け。",
        "メールアドレスをコピー。",
        "切り替え。",
        "貼り付け。",
        "プランを選ぶ。",
        "保存。",
        "シートに戻って次の行。",
      ],
      tally: "1 件ずつ、午後いっぱい。",
      sentence:
        "NAME、EMAIL、PLAN を入力に持つワークフローを作ってください。ブラウザーで https://portal.example.com/customers/new を開き、必要なら portal/password のシークレットでサインインし、フォームを埋めて保存し、確認画面のスクリーンショットを撮ります。シートで実行します。",
      steps: [
        ["website", "顧客を 1 件登録する", "必要ならサインインし、行の値でフォームを埋めて保存し、うまくいったか確かめて、スクリーンショットを撮ります。"],
        ["excel", "行の数だけ繰り返す", "スプレッドシートをバッチシートに貼り付けると、各行が 1 回の実行になり、進み具合と失敗が残ります。"],
      ],
      moment: { title: "バッチシート · 新規顧客", text: "60 件中 57 件を登録。3 件は確認が必要です。" },
      artifact: {
        type: "table",
        name: "新規顧客",
        columns: ["NAME", "EMAIL", "PLAN", "状態"],
        rows: [
          ["青木 美咲", "aoki@example.com", "Team", "完了"],
          ["石田 健", "ishida@example.com", "Personal", "完了"],
          ["上野 彩", "ueno@example.com", "Team", "要確認"],
          ["遠藤 誠", "endo@example.com", "Personal", "完了"],
        ],
        flag: "要確認",
      },
      good: [
        "サインインはこのコンピューターに保存され、すべての行で使い回されます。パスワードはシークレットから入力されるので、モデルには見えません。",
        "顧客ごとに確認画面のスクリーンショットが残るので、確認が必要な行は、その理由が分かります。",
      ],
    },
  },
  {
    slug: "company-research",
    group: "everyone",
    scheduled: false,
    uses: ["browser", "model"],
    needs: ["chrome", "browserModel"],
    related: ["form-from-sheet", "price-watch", "excel-orders"],
    en: {
      when: "Every new list",
      chore: "I open each company's website from a list and write down what they do, how big they are, and where they're based.",
      motions: [
        "Copy the URL.",
        "Open the site.",
        "Hunt for the About page.",
        "Read.",
        "Guess the headcount.",
        "Find the address.",
        "Back to the sheet. Type it in.",
        "Row 2 of 200.",
      ],
      tally: "Two hundred companies, one tab at a time.",
      sentence:
        "Build a workflow with inputs COMPANY and WEBSITE that opens the website in the browser, finds the About page, collects what the company does, its headcount, and its headquarters, and writes a two-line summary. I will run it over a sheet of 200 companies.",
      steps: [
        ["website", "Read the website", "Opens the site, finds the About page, and collects what they do, their size, and where they are."],
        ["ai", "Write a two-line summary", "A model turns the facts into two plain lines."],
        ["excel", "Once for every row", "A batch sheet runs it for each company and reads the answers into result columns."],
      ],
      moment: { title: "Batch sheet · 200 companies", text: "200 rows filled. 14 marked unsure." },
      artifact: {
        type: "table",
        name: "Companies",
        columns: ["COMPANY", "Business", "Headcount", "Headquarters"],
        rows: [
          ["Alder & Co.", "Furniture for small offices", "40–60", "Portland, OR"],
          ["Brightline Labs", "Lab equipment rental", "200+", "Austin, TX"],
          ["Cobalt Freight", "Regional trucking", "Unsure", "Columbus, OH"],
        ],
        flag: "Unsure",
      },
      good: [
        "Answers the model could not check against the page are marked unsure, with the evidence quoted, so you know which rows to look at.",
        "Each row is one run that asks the model, so 200 rows means 200 runs, paced by the project's queue.",
      ],
    },
    ja: {
      when: "リストが届くたびに",
      chore: "リストにある会社の Web サイトを 1 社ずつ開いて、事業内容と規模と所在地を書き出している。",
      motions: [
        "URL をコピー。",
        "サイトを開く。",
        "会社概要のページを探す。",
        "読む。",
        "従業員数を推し量る。",
        "所在地を探す。",
        "シートに戻って入力。",
        "200 社中、2 社目。",
      ],
      tally: "200 社を、タブ 1 枚ずつ。",
      sentence:
        "COMPANY と WEBSITE を入力に持つワークフローを作ってください。ブラウザーで Web サイトを開き、会社概要のページを探して、事業内容、人数、本社所在地を集め、2 行の要約を書きます。200 社のシートで実行します。",
      steps: [
        ["website", "Web サイトを読む", "サイトを開き、会社概要のページを探して、事業内容、規模、所在地を集めます。"],
        ["ai", "2 行の要約を書く", "モデルが事実を 2 行の平文にします。"],
        ["excel", "行の数だけ繰り返す", "バッチシートが会社ごとに実行し、答えを結果の列に読み取ります。"],
      ],
      moment: { title: "バッチシート · 200 社", text: "200 行を埋めました。14 行は要確認です。" },
      artifact: {
        type: "table",
        name: "会社リスト",
        columns: ["COMPANY", "事業内容", "従業員数", "本社"],
        rows: [
          ["青葉家具", "小規模オフィス向けの家具", "40〜60 人", "仙台市"],
          ["明光ラボ", "研究機器のレンタル", "200 人以上", "つくば市"],
          ["コバルト物流", "地域の陸上輸送", "要確認", "浜松市"],
        ],
        flag: "要確認",
      },
      good: [
        "モデルがページで確かめられなかった答えは「要確認」と表示され、根拠が引用されるので、見るべき行が分かります。",
        "1 行が、モデルに尋ねる 1 回の実行です。200 行なら 200 回の実行になり、プロジェクトのキューが速度を調整します。",
      ],
    },
  },
  {
    slug: "price-watch",
    group: "everyone",
    scheduled: true,
    uses: ["browser", "command", "email"],
    needs: ["chrome", "browserModel", "mailbox"],
    related: ["inbox-digest", "company-research", "supplier-invoices"],
    en: {
      when: "Every morning",
      chore: "I check the same product page every morning to see whether the price has dropped.",
      motions: ["Open the bookmark.", "Scroll to the price.", "Same as yesterday.", "Close the tab.", "Tomorrow: again."],
      tally: "Every morning, for weeks.",
      sentence:
        "Every morning at 7:00, open https://shop.example.com/products/desk in the browser, read the price, compare it with the last run, and email me only if it changed.",
      steps: [
        ["website", "Read the price", "Opens the page, makes sure a price is shown, and reads it as a number."],
        ["script", "Compare with yesterday", "Keeps the last price in your folder and notes whether it moved."],
        ["email", "Email me the change", "Runs only on the days the price moved."],
      ],
      moment: { time: "7:00", title: "Price watch", text: "Price changed: the desk is now 189." },
      artifact: {
        type: "week",
        days: [
          ["Mon", false],
          ["Tue", false],
          ["Wed", false],
          ["Thu", true],
          ["Fri", false],
          ["Sat", false],
          ["Sun", false],
        ],
        quiet: "Same price. No email.",
        changed: "The desk is now 189.",
      },
      good: [
        "You hear from it only on the days the price moves.",
        "Check the shop's terms first: some sites do not allow automated visits.",
      ],
    },
    ja: {
      when: "毎朝",
      chore: "毎朝、同じ商品ページを開いて、値下がりしていないか確かめている。",
      motions: ["ブックマークを開く。", "価格までスクロール。", "昨日と同じ。", "タブを閉じる。", "明日もまた。"],
      tally: "毎朝、何週間も。",
      sentence:
        "毎朝 7:00 に、ブラウザーで https://shop.example.com/products/desk を開いて価格を読み取り、前回の実行と比べて、変わったときだけ私にメールしてください。",
      steps: [
        ["website", "価格を読み取る", "ページを開き、価格が表示されていることを確かめ、数値として読み取ります。"],
        ["script", "前日と比べる", "前回の価格をフォルダーに残し、動いたかどうかを記録します。"],
        ["email", "変化をメールする", "価格が動いた日だけ実行されます。"],
      ],
      moment: { time: "7:00", title: "価格の見張り", text: "価格が変わりました：デスクは 18,900 円です。" },
      artifact: {
        type: "week",
        days: [
          ["月", false],
          ["火", false],
          ["水", false],
          ["木", true],
          ["金", false],
          ["土", false],
          ["日", false],
        ],
        quiet: "同じ価格。メールなし。",
        changed: "デスクは 18,900 円になりました。",
      },
      good: [
        "連絡が来るのは、価格が動いた日だけです。",
        "先にそのショップの利用規約を確認してください。自動アクセスを許可していないサイトもあります。",
      ],
    },
  },
  {
    slug: "dependency-update",
    group: "code",
    scheduled: true,
    uses: ["agent", "approval", "command"],
    needs: ["agent", "git"],
    related: ["pr-review", "deploy-check", "daily-report"],
    en: {
      when: "Every Monday",
      chore: "Every Monday I update our dependencies, run the tests, and lose the morning fixing whatever broke.",
      motions: [
        "git switch -c deps.",
        "Bump everything.",
        "Run the tests.",
        "Red.",
        "Read three changelogs.",
        "Fix.",
        "Run the tests.",
        "Push. Open the PR.",
      ],
      tally: "Every Monday morning.",
      sentence:
        "Every weekday at 2:00, have my Codex agent update the dependencies in my repo on a branch named deps/nightly, run the tests, and commit. Wait for my approval, then push the branch and open a PR.",
      steps: [
        ["agent", "Update dependencies", "Codex branches, updates, runs the tests, fixes what broke, and commits. Its notes are saved."],
        ["approval", "Wait for your OK", "Nothing is pushed until you approve, in Kitewell or from your phone through Claude."],
        ["script", "Push and open the PR", "git push --force-with-lease, then gh pr create."],
      ],
      moment: { time: "7:30", title: "Dependency update", text: "Waiting for you: push deps/nightly and open a pull request?" },
      artifact: {
        type: "approval",
        title: "Update dependencies",
        notes: ["Updated 14 packages, 2 of them major versions.", "Fixed a renamed option in the date library.", "All 312 tests pass."],
        prompt: "Push the deps/nightly branch and open a pull request?",
        actions: ["Approve", "Send back", "Reject"],
      },
      good: [
        "By default the agent may only read its working folder and asks before anything risky. It works with the sign-in it already has; Kitewell supplies no AI credits.",
        "Approving from your phone needs Claude connected to Kitewell, which uses a Dagu Cloud sign-in.",
      ],
    },
    ja: {
      when: "毎週月曜",
      chore: "毎週月曜に依存関係を上げてテストを回し、壊れたところを直して午前が終わる。",
      motions: [
        "git switch -c deps。",
        "全部上げる。",
        "テストを回す。",
        "赤。",
        "変更履歴を 3 つ読む。",
        "直す。",
        "テストを回す。",
        "プッシュ。PR を開く。",
      ],
      tally: "毎週月曜の午前中。",
      sentence:
        "平日の 2:00 に、私の Codex エージェントに、リポジトリの依存関係を deps/nightly ブランチで更新し、テストを実行してコミットさせてください。私の承認を待ってから、ブランチをプッシュして PR を開いてください。",
      steps: [
        ["agent", "依存関係を更新する", "Codex がブランチを作り、更新し、テストし、壊れたところを直してコミットします。メモは保存されます。"],
        ["approval", "あなたの OK を待つ", "承認するまで何もプッシュされません。承認は Kitewell で、またはスマホの Claude から。"],
        ["script", "プッシュして PR を開く", "git push --force-with-lease のあと、gh pr create。"],
      ],
      moment: { time: "7:30", title: "依存関係の更新", text: "あなたの対応待ち：deps/nightly をプッシュして PR を開きますか？" },
      artifact: {
        type: "approval",
        title: "依存関係を更新する",
        notes: ["14 パッケージを更新（うち 2 つはメジャーバージョン）。", "日付ライブラリで名前が変わったオプションを修正。", "312 件のテストがすべて成功。"],
        prompt: "deps/nightly ブランチをプッシュして、プルリクエストを開きますか？",
        actions: ["承認", "差し戻す", "却下"],
      },
      good: [
        "エージェントは既定では作業フォルダーの読み取りしかできず、危険な操作の前には確認します。使うのはエージェントにすでにあるサインインで、Kitewell は AI のクレジットを提供しません。",
        "スマホから承認するには、Claude を Kitewell に接続します。接続には Dagu Cloud のサインインを使います。",
      ],
    },
  },
  {
    slug: "pr-review",
    group: "code",
    scheduled: true,
    uses: ["agent", "command"],
    needs: ["agent", "git"],
    related: ["dependency-update", "deploy-check", "daily-report"],
    en: {
      when: "Every morning",
      chore: "Every morning I open each pull request just to work out which one could break something.",
      motions: ["Open the PR list.", "Open one.", "Scroll the diff.", "What does this touch?", "Open the next.", "Lose track of the first.", "Start over."],
      tally: "Every morning, before review even starts.",
      sentence:
        "Every weekday at 9:00, have my Claude Code agent list the open pull requests in this repo with gh, review each diff, and write a Markdown digest ordered by risk. Save it under reviews/ with today's date.",
      steps: [
        ["agent", "Review the open pull requests", "Lists them with gh, reads each diff, and writes three lines per PR, riskiest first."],
        ["script", "Save the digest", "Written to reviews/<date>.md and shown in the run."],
      ],
      moment: { time: "9:00", title: "PR digest", text: "5 open pull requests, riskiest first." },
      artifact: {
        type: "doc",
        name: "reviews/2026-10-06.md",
        blocks: [
          ["#482 Move sessions to the new store", ["Changes: how sessions are read and written.", "Could break: anyone signed in during the deploy.", "Ready: not yet. It needs a migration note."]],
          ["#479 Fix the date picker in Safari", ["Changes: one component.", "Could break: little.", "Ready: yes."]],
        ],
      },
      good: [
        "The agent runs in your checkout and uses gh, so private repositories need no extra credential.",
        "On Personal or Team, an alert can send the digest to your email or Slack when the run finishes.",
      ],
    },
    ja: {
      when: "毎朝",
      chore: "毎朝、どれが何かを壊しそうか知るためだけに、プルリクエストを 1 つずつ開いている。",
      motions: ["PR の一覧を開く。", "1 つ開く。", "差分をスクロール。", "これは何に触る？", "次を開く。", "最初のを忘れる。", "やり直し。"],
      tally: "毎朝、レビューを始める前に。",
      sentence:
        "平日の 9:00 に、私の Claude Code エージェントに、このリポジトリのオープンなプルリクエストを gh で一覧し、各差分をレビューして、リスク順の Markdown ダイジェストを書かせてください。今日の日付で reviews/ に保存してください。",
      steps: [
        ["agent", "オープンな PR をレビューする", "gh で一覧を取り、差分を読み、PR ごとに 3 行をリスクの高い順に書きます。"],
        ["script", "ダイジェストを保存する", "reviews/<日付>.md に書き込み、実行に表示します。"],
      ],
      moment: { time: "9:00", title: "PR ダイジェスト", text: "オープンな PR 5 件を、リスクの高い順に。" },
      artifact: {
        type: "doc",
        name: "reviews/2026-10-06.md",
        blocks: [
          ["#482 セッションを新しいストアへ移す", ["変更：セッションの読み書き。", "壊れうるもの：デプロイ中にサインインしている人。", "マージ：まだ。移行の注記が必要。"]],
          ["#479 Safari の日付ピッカーを直す", ["変更：コンポーネント 1 つ。", "壊れうるもの：ほぼなし。", "マージ：可。"]],
        ],
      },
      good: [
        "エージェントはあなたのチェックアウトの中で gh を使うので、プライベートリポジトリでも追加の認証情報は要りません。",
        "Personal または Team では、実行が終わったときにダイジェストをメールや Slack に送るアラートを付けられます。",
      ],
    },
  },
  {
    slug: "deploy-check",
    group: "code",
    scheduled: false,
    uses: ["ssh", "approval"],
    needs: ["servers"],
    related: ["dependency-update", "pr-review", "daily-report"],
    en: {
      when: "Every release",
      chore: "I SSH into each server, pull the release, restart the service, and curl the health check, one machine at a time.",
      motions: ["ssh web-1.", "git pull.", "sudo systemctl restart app.", "curl /healthz.", "Wait. Again.", "exit.", "ssh web-2."],
      tally: "Every release, every machine.",
      sentence:
        "Build a chain workflow aimed at my web server group that pulls /srv/app with git, waits for my approval, restarts the app service, and checks http://127.0.0.1:8080/healthz on each machine before moving to the next.",
      steps: [
        ["server", "Pull the release", "A fast-forward pull on the machine."],
        ["approval", "Wait for your OK", "The restart waits for your approval, machine by machine."],
        ["server", "Restart the service", "Runs after you approve."],
        ["server", "Check it answers", "Six tries, five seconds apart. A machine that never answers stops the rollout."],
      ],
      moment: { title: "Rollout · web group", text: "web-3 failed its health check. Rollout stopped." },
      artifact: {
        type: "servers",
        hosts: [
          ["web-1", "ok", "Healthy"],
          ["web-2", "ok", "Healthy"],
          ["web-3", "failed", "No answer from /healthz"],
          ["web-4", "idle", "Untouched"],
        ],
      },
      good: [
        "Because the group stops on the first failure, a machine that fails its check halts the rollout with the rest untouched.",
        "Host keys are approved in the project, and any password comes from a secret, so the workflow holds neither.",
      ],
    },
    ja: {
      when: "リリースのたびに",
      chore: "サーバーに 1 台ずつ SSH して、リリースを取得し、サービスを再起動して、ヘルスチェックを curl している。",
      motions: ["ssh web-1。", "git pull。", "sudo systemctl restart app。", "curl /healthz。", "待つ。もう一度。", "exit。", "ssh web-2。"],
      tally: "リリースのたびに、台数分。",
      sentence:
        "Web サーバーグループに向けた chain のワークフローを作ってください。/srv/app を git で取得し、私の承認を待ち、app サービスを再起動して、各マシンで http://127.0.0.1:8080/healthz を確かめてから次のマシンに進みます。",
      steps: [
        ["server", "リリースを取得する", "マシン上で fast-forward の pull を行います。"],
        ["approval", "あなたの OK を待つ", "再起動は、マシンごとにあなたの承認を待ちます。"],
        ["server", "サービスを再起動する", "承認後に実行されます。"],
        ["server", "応答を確かめる", "5 秒間隔で 6 回。応答しないマシンがあれば、ロールアウトが止まります。"],
      ],
      moment: { title: "ロールアウト · web グループ", text: "web-3 がヘルスチェックに失敗。ロールアウトを止めました。" },
      artifact: {
        type: "servers",
        hosts: [
          ["web-1", "ok", "正常"],
          ["web-2", "ok", "正常"],
          ["web-3", "failed", "/healthz が応答なし"],
          ["web-4", "idle", "未着手"],
        ],
      },
      good: [
        "グループは最初の失敗で止まるので、確認に失敗したマシンがあれば、残りに手を付けずにロールアウトが止まります。",
        "ホスト鍵はプロジェクトで承認済みで、パスワードはシークレットから来るので、ワークフローはどちらも持ちません。",
      ],
    },
  },
  {
    slug: "daily-report",
    group: "code",
    scheduled: true,
    uses: ["command"],
    needs: ["python"],
    related: ["pr-review", "dependency-update", "inbox-digest"],
    en: {
      when: "Every morning",
      chore: "Every morning I total yesterday's orders from a CSV export and write up the same little report.",
      motions: ["Open the export.", "Sum the column.", "Count the orders.", "Work out the average.", "Paste it into the report.", "Save.", "Same again tomorrow."],
      tally: "Every morning, the same numbers in the same places.",
      sentence:
        "Build a workflow that reads orders.csv in my daily-report folder, totals the amount_usd column with Python, and writes a Markdown report to report.md every morning at 8:00.",
      steps: [
        ["script", "Read orders", "Reads the CSV and passes it on."],
        ["script", "Build the report", "A few lines of Python total the orders and write Markdown."],
        ["script", "Save the report", "Writes report.md and shows it in the run."],
      ],
      moment: { time: "8:00", title: "Daily sales report", text: "report.md saved: 42 orders, $3,184.20." },
      artifact: {
        type: "doc",
        name: "report.md",
        blocks: [["Daily sales report", ["Orders: 42", "Revenue: $3,184.20", "Average order: $75.81"]]],
      },
      good: [
        "No AI and no network: it runs entirely on this computer and needs only Python 3.",
        "The walkthrough in Build a workflow builds this one step by step, with sample data.",
      ],
    },
    ja: {
      when: "毎朝",
      chore: "毎朝、前日の注文の CSV を集計して、いつもと同じ短いレポートを書いている。",
      motions: ["エクスポートを開く。", "列を合計。", "件数を数える。", "平均を出す。", "レポートに貼る。", "保存。", "明日も同じ。"],
      tally: "毎朝、同じ数字を同じ場所に。",
      sentence:
        "daily-report フォルダーの orders.csv を読み、amount_usd 列を Python で集計して、毎朝 8:00 に Markdown のレポートを report.md に書くワークフローを作ってください。",
      steps: [
        ["script", "注文を読む", "CSV を読み、次へ渡します。"],
        ["script", "レポートを作る", "数行の Python が注文を集計し、Markdown を書きます。"],
        ["script", "レポートを保存する", "report.md に書き込み、実行に表示します。"],
      ],
      moment: { time: "8:00", title: "日次の売上レポート", text: "report.md を保存：注文 42 件、$3,184.20。" },
      artifact: {
        type: "doc",
        name: "report.md",
        blocks: [["Daily sales report", ["Orders: 42", "Revenue: $3,184.20", "Average order: $75.81"]]],
      },
      good: [
        "AI もネットワークも使いません。すべてこのコンピューターで動き、必要なのは Python 3 だけです。",
        "「ワークフローを組み立てる」の手順で、サンプルデータを使ってこのワークフローを 1 ステップずつ作れます。",
      ],
    },
  },
];

export function needsFor(chore, locale) {
  return chore.needs.map((key) => needs[key][locale]);
}

export function choreBySlug(slug) {
  return chores.find((chore) => chore.slug === slug);
}
