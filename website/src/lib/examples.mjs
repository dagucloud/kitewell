// Worked examples: each is a complete workflow a person can paste into
// Kitewell, in English and Japanese. Every step names its kind so the
// tests can check that the site only shows what the product has.

export const audiences = ["personal", "ops", "dev"];

export const kinds = [
  "command",
  "docker",
  "agent",
  "model",
  "decision",
  "browser",
  "desktop",
  "email",
  "template",
  "api",
  "http",
  "ssh",
  "sftp",
  "human",
  "approval",
  "subworkflow",
  "router",
  "foreach",
  "wait",
];

const docs = {
  browser: ["/docs/browser/", { en: "Automate a website", ja: "Web サイトを自動操作" }],
  desktop: ["/docs/desktop/", { en: "Automate a desktop app", ja: "デスクトップアプリを自動操作" }],
  email: ["/docs/email/", { en: "Automate email", ja: "メールを自動化" }],
  ai: ["/docs/ai/", { en: "AI agents and models", ja: "AI エージェントとモデル" }],
  builder: ["/docs/workflow-builder/", { en: "Build a workflow", ja: "ワークフローを組み立てる" }],
  batches: ["/docs/batches/", { en: "Run a workflow over a sheet", ja: "シートでワークフローを一括実行" }],
  scheduling: ["/docs/scheduling/", { en: "Schedules and background operation", ja: "スケジュールとバックグラウンド動作" }],
  alerts: ["/docs/alerts/", { en: "Alerts", ja: "アラート" }],
  secrets: ["/docs/secrets/", { en: "Secrets", ja: "シークレット" }],
  apis: ["/docs/apis/", { en: "Import an API", ja: "API のインポート" }],
  dataFlow: ["/docs/data-flow/", { en: "What leaves your computer", ja: "コンピューターの外に出るもの" }],
};

const needs = {
  mailbox: { en: "A connected mailbox", ja: "接続したメールボックス" },
  model: { en: "An API model (Anthropic, OpenAI, Gemini, or a local server)", ja: "API モデル（Anthropic、OpenAI、Gemini、またはローカルサーバー）" },
  browserModel: { en: "An API model that can drive a browser (Anthropic, OpenAI, or Gemini)", ja: "ブラウザーを操作できる API モデル（Anthropic、OpenAI、Gemini）" },
  computerModel: { en: "A computer-use model (Claude, GPT, or Gemini)", ja: "コンピューター操作に対応したモデル（Claude、GPT、Gemini）" },
  chrome: { en: "Google Chrome (or Edge on Windows)", ja: "Google Chrome（Windows では Edge も可）" },
  desktop: { en: "macOS or Windows, with desktop access allowed", ja: "macOS または Windows。デスクトップへのアクセスを許可済み" },
  agent: { en: "A command-line agent such as Claude Code or Codex, installed and signed in", ja: "Claude Code や Codex などのコマンドラインエージェント（インストールとサインイン済み）" },
  python: { en: "Python 3", ja: "Python 3" },
  api: { en: "An imported API with a create operation", ja: "作成操作を持つインポート済みの API" },
  servers: { en: "Servers registered in the project", ja: "プロジェクトに登録したサーバー" },
  sheet: { en: "A batch sheet to run it over many rows", ja: "多数の行で実行するためのバッチシート" },
  git: { en: "A Git repository and the gh command", ja: "Git リポジトリと gh コマンド" },
};

// The workflow YAML is the same in both languages; only prose differs.
export const examples = [
  {
    slug: "inbox-digest",
    audience: "personal",
    needs: ["mailbox", "model"],
    docs: ["email", "ai", "scheduling"],
    steps: ["email", "model", "email"],
    yaml: `type: graph
schedule: "0 8 * * 1-5"
steps:
  - id: find
    name: Find yesterday's email
    action: mail.search
    with:
      mailbox: me@example.com
      unread: false
      within: 24h
      limit: 50
  - id: digest
    name: Write the digest
    depends: [find]
    action: chat.completion
    with:
      model: kitewell-agent-fast
      system: You write short, plain digests of email. Group by topic, name who is waiting on a reply, and list anything due today first.
      prompt: |
        These emails arrived in the last 24 hours, as JSON:
        \${steps.find.outputs.messages}
    output: DIGEST
  - id: send
    name: Send it to me
    depends: [digest]
    action: mail.send
    with:
      mailbox: me@example.com
      to: me@example.com
      subject: Inbox digest
      message: \${env.DIGEST}
`,
    en: {
      title: "A morning digest of yesterday's email",
      summary: "Every weekday at 8:00, read what arrived in the last 24 hours, have a model sort it by topic and urgency, and send yourself one email.",
      intro:
        "Three steps: find the email, ask a model to write the digest, send the digest. Finding never marks anything read, so your inbox looks the same afterwards. The model sees the email text, so choose one you trust with it, or a local model.",
      steps: [
        ["Find yesterday's email", "Everything received in the last 24 hours, up to 50 emails, oldest first."],
        ["Write the digest", "A model groups the email by topic, names who is waiting on you, and puts anything due today first."],
        ["Send it to me", "The digest goes to your own address from the same mailbox."],
      ],
      prompt: "Every weekday at 8:00, find the email that arrived in my mailbox in the last 24 hours, write a digest grouped by topic with anything due today first, and email it to me.",
      note: "Change the mailbox address to one you have connected, and the model to one of your project's API models.",
    },
    ja: {
      title: "前日のメールを朝のダイジェストに",
      summary: "平日の 8:00 に、直近 24 時間に届いたメールをモデルに話題と緊急度で整理させ、自分宛てに 1 通送ります。",
      intro:
        "ステップは 3 つです。メールを探し、モデルにダイジェストを書かせ、送ります。検索でメールが既読になることはないので、受信トレイの見た目は変わりません。モデルにはメールの本文が渡るので、任せられるモデルか、ローカルのモデルを選んでください。",
      steps: [
        ["前日のメールを探す", "直近 24 時間に届いたメールを、古い順に最大 50 件。"],
        ["ダイジェストを書く", "モデルが話題ごとにまとめ、返信を待っている相手を挙げ、今日が期限のものを先頭に置きます。"],
        ["自分に送る", "同じメールボックスから自分のアドレス宛てに送ります。"],
      ],
      prompt: "平日の 8:00 に、私のメールボックスに直近 24 時間で届いたメールを探して、話題ごとにまとめ、今日が期限のものを先頭にしたダイジェストを書き、私にメールしてください。",
      note: "メールボックスのアドレスは接続済みのものに、モデルはプロジェクトの API モデルに置き換えてください。",
    },
  },
  {
    slug: "invoice-intake",
    audience: "ops",
    needs: ["mailbox", "model"],
    docs: ["email", "ai", "dataFlow"],
    steps: ["email", "foreach", "model", "command", "email"],
    yaml: `type: graph
schedule: "*/30 * * * *"
working_dir: /absolute/path/to/invoices
steps:
  - id: find
    name: Find unread invoices
    action: mail.search
    with:
      mailbox: billing@example.com
      unread: true
      subject: invoice
      has_attachments: true
      save_attachments: true
      limit: 20
  - id: each
    name: Record each invoice
    depends: [find]
    foreach:
      items: \${steps.find.outputs.messages}
      as: email
      key: \${foreach.email.id}
      steps:
        - id: read
          name: Read the amount
          action: chat.completion
          with:
            model: kitewell-agent-fast
            system: Answer with one CSV line, "supplier,invoice_number,total,currency", and nothing else.
            prompt: |
              From: \${foreach.email.from_address}
              Subject: \${foreach.email.subject}
              \${foreach.email.text}
          output: ROW
        - id: record
          name: Append it to the ledger
          depends: [read]
          run: printf '%s\\n' "$ROW" >> invoices.csv
        - id: file
          name: File the email
          depends: [record]
          action: mail.organize
          with:
            mailbox: billing@example.com
            emails: \${foreach.email.id}
            mark: read
            move: Invoices
`,
    en: {
      title: "Invoices from an inbox into a ledger",
      summary: "Every half hour, find unread email with an invoice attached, read the supplier and total, append a line to a CSV, and file the email.",
      intro:
        "The loop handles one email at a time and files it only after its line is recorded. An email that fails stays unread and is tried again on the next run, alone. Attachments are saved with the run, so the PDFs are there when you need them.",
      steps: [
        ["Find unread invoices", "Unread email with an attachment and “invoice” in the subject, up to 20 per run."],
        ["Read the amount", "A model answers with one CSV line: supplier, invoice number, total, currency."],
        ["Append it to the ledger", "The line goes to invoices.csv in the working folder."],
        ["File the email", "Marked read and moved to an Invoices folder, created if missing."],
      ],
      prompt: "Every 30 minutes, find unread email in billing@example.com with an invoice attached, extract the supplier, invoice number, total, and currency with a model, append them as a CSV line to invoices.csv, then mark each email read and move it to Invoices.",
      note: "Set working_dir to an existing folder. A run's saved attachments appear under the run's artifacts.",
    },
    ja: {
      title: "受信トレイの請求書を台帳へ",
      summary: "30 分ごとに、請求書が添付された未読メールを探し、仕入れ先と金額を読み取って CSV に 1 行追加し、メールを整理します。",
      intro:
        "ループはメールを 1 通ずつ処理し、行を記録してからそのメールを整理します。失敗したメールは未読のまま残り、次の実行でそのメールだけが再試行されます。添付ファイルは実行と一緒に保存されるので、PDF が必要なときに取り出せます。",
      steps: [
        ["未読の請求書を探す", "添付ファイルがあり、件名に「invoice」を含む未読メールを、1 回につき最大 20 件。"],
        ["金額を読み取る", "モデルが、仕入れ先、請求書番号、合計、通貨の CSV 1 行で答えます。"],
        ["台帳に追加する", "作業フォルダーの invoices.csv に行を追加します。"],
        ["メールを整理する", "既読にして Invoices フォルダーへ移動します。フォルダーがなければ作られます。"],
      ],
      prompt: "30 分ごとに、billing@example.com の請求書が添付された未読メールを探し、仕入れ先、請求書番号、合計、通貨をモデルで読み取って invoices.csv に CSV の 1 行として追加し、各メールを既読にして Invoices へ移動してください。",
      note: "working_dir には既存のフォルダーを指定します。保存した添付ファイルは、実行の成果物に表示されます。",
    },
  },
  {
    slug: "nightly-dependency-update",
    audience: "dev",
    needs: ["agent", "git"],
    docs: ["ai", "builder", "scheduling"],
    steps: ["agent", "approval", "command"],
    yaml: `type: graph
schedule: "0 2 * * 1-5"
working_dir: /absolute/path/to/repo
steps:
  - id: update
    name: Update dependencies
    action: harness.run
    with:
      provider: kitewell-agent-codex
      prompt: |
        Create a branch named deps/nightly from main. Update every dependency
        to its latest compatible version, run the test suite, and fix what the
        update broke. Commit with a message that lists the notable changes.
        Do not push.
    output: NOTES
    approval:
      prompt: Push the deps/nightly branch and open a pull request?
  - id: push
    name: Push and open the PR
    depends: [update]
    run: |
      git push -u origin deps/nightly --force-with-lease
      gh pr create --fill --base main --head deps/nightly
`,
    en: {
      title: "Nightly dependency update, with approval before the push",
      summary: "At 2:00 on weekdays, a coding agent updates dependencies on a branch and runs the tests. Nothing is pushed until you approve.",
      intro:
        "The agent works in your repository with the tool you already use, such as Codex or Claude Code, and stops before anything leaves your computer. The approval gate holds the run; approve it in the morning and the branch is pushed with a pull request.",
      steps: [
        ["Update dependencies", "The agent branches, updates, tests, fixes, and commits. Its notes are saved."],
        ["Approve", "The run waits under Waiting for you until you approve or reject."],
        ["Push and open the PR", "Push with --force-with-lease, then open the pull request with gh."],
      ],
      prompt: "Every weekday at 2:00, have my Codex agent update the dependencies in my repo on a branch named deps/nightly, run the tests, and commit. Wait for my approval, then push the branch and open a PR.",
      note: "Add the agent under Agents & models first; the reference above is an example. By default an agent may only read its working folder and asks before anything risky.",
    },
    ja: {
      title: "毎晩の依存関係の更新。プッシュは承認後に",
      summary: "平日の 2:00 に、コーディングエージェントがブランチで依存関係を更新してテストを実行します。承認するまで何もプッシュされません。",
      intro:
        "エージェントは、Codex や Claude Code など普段使っているツールであなたのリポジトリで作業し、コンピューターの外に何かが出る前に止まります。承認ゲートが実行を保留するので、朝に承認すればブランチがプッシュされ、プルリクエストが開きます。",
      steps: [
        ["依存関係を更新する", "エージェントがブランチを作り、更新し、テストし、修正し、コミットします。メモは保存されます。"],
        ["承認する", "承認または却下するまで、実行は「あなたの対応待ち」で待ちます。"],
        ["プッシュして PR を開く", "--force-with-lease でプッシュし、gh でプルリクエストを開きます。"],
      ],
      prompt: "平日の 2:00 に、私の Codex エージェントに、リポジトリの依存関係を deps/nightly ブランチで更新し、テストを実行してコミットさせてください。私の承認を待ってから、ブランチをプッシュして PR を開いてください。",
      note: "先に「エージェントとモデル」でエージェントを追加してください。上の参照名は例です。エージェントは既定では作業フォルダーの読み取りしかできず、危険な操作の前には確認します。",
    },
  },
  {
    slug: "pr-review-digest",
    audience: "dev",
    needs: ["agent", "git"],
    docs: ["ai", "alerts"],
    steps: ["agent", "command"],
    yaml: `type: graph
schedule: "0 9 * * 1-5"
working_dir: /absolute/path/to/repo
steps:
  - id: review
    name: Review the open pull requests
    action: harness.run
    with:
      provider: kitewell-agent-claude
      prompt: |
        List the open pull requests with gh. For each, read the diff and write
        three lines: what it changes, what could break, and whether it is
        ready to merge. Order them by risk. Write Markdown.
    output: DIGEST
  - id: save
    name: Save the digest
    depends: [review]
    run: |
      mkdir -p reviews
      printenv DIGEST > "reviews/$(date +%F).md"
      cat "reviews/$(date +%F).md"
`,
    en: {
      title: "A daily digest of open pull requests",
      summary: "Every weekday at 9:00, a coding agent reads each open pull request and writes what it changes, what could break, and whether it is ready.",
      intro:
        "The agent runs in your checkout and uses gh for the list, so private repositories work without any extra credential. The digest is saved as a dated Markdown file and printed to the run's log, where you can read it in Kitewell.",
      steps: [
        ["Review the open pull requests", "The agent lists them with gh, reads each diff, and writes three lines per PR ordered by risk."],
        ["Save the digest", "Written to reviews/<date>.md and shown in the run."],
      ],
      prompt: "Every weekday at 9:00, have my Claude Code agent list the open pull requests in this repo with gh, review each diff, and write a Markdown digest ordered by risk. Save it under reviews/ with today's date.",
      note: "On Pro, add an alert so the digest reaches you by email or Slack when the run finishes.",
    },
    ja: {
      title: "オープンなプルリクエストの日次ダイジェスト",
      summary: "平日の 9:00 に、コーディングエージェントがオープンなプルリクエストを読み、変更点、壊れそうな箇所、マージ可能かを書きます。",
      intro:
        "エージェントはあなたのチェックアウトの中で動き、一覧には gh を使うので、プライベートリポジトリでも追加の認証情報は要りません。ダイジェストは日付付きの Markdown として保存され、実行のログにも出力されるので Kitewell の中で読めます。",
      steps: [
        ["オープンな PR をレビューする", "エージェントが gh で一覧を取り、差分を読み、PR ごとに 3 行をリスク順に書きます。"],
        ["ダイジェストを保存する", "reviews/<日付>.md に書き込み、実行に表示します。"],
      ],
      prompt: "平日の 9:00 に、私の Claude Code エージェントに、このリポジトリのオープンなプルリクエストを gh で一覧し、各差分をレビューして、リスク順の Markdown ダイジェストを書かせてください。今日の日付で reviews/ に保存してください。",
      note: "Pro では、実行が終わったときにメールや Slack でダイジェストを受け取るアラートを追加できます。",
    },
  },
  {
    slug: "price-watch",
    audience: "personal",
    needs: ["chrome", "browserModel", "mailbox"],
    docs: ["browser", "email", "scheduling"],
    steps: ["browser", "command", "email"],
    yaml: `type: graph
schedule: "0 7 * * *"
working_dir: /absolute/path/to/watch
steps:
  - id: look
    name: Read the price
    action: browser.run
    with:
      url: https://shop.example.com/products/desk
      do:
        - expect: The product page shows a price
        - extract:
            instruction: The current price, as a number without currency
            schema:
              type: object
              properties:
                price: {type: number}
  - id: compare
    name: Compare with yesterday
    depends: [look]
    run: |
      new="\${steps.look.outputs.price}"
      old="$(cat last-price.txt 2>/dev/null || echo none)"
      echo "$new" > last-price.txt
      if [ "$old" != "$new" ]; then echo "changed"; else echo "same"; fi
    output:
      result: {from: stdout}
  - id: tell
    name: Email me the change
    depends: [compare]
    preconditions:
      - condition: \${steps.compare.outputs.result}
        expected: changed
    action: mail.send
    with:
      mailbox: me@example.com
      to: me@example.com
      subject: Price changed
      message: The desk is now \${steps.look.outputs.price}.
`,
    en: {
      title: "Watch a price and email yourself when it changes",
      summary: "Every morning, open a product page in Chrome, read the price, compare it with yesterday's, and send an email only when it moved.",
      intro:
        "The website step reads the page with a model the first time; on later runs the same actions replay without the model, so the daily run is nearly free. The comparison is a few lines of shell, and the email step runs only when its precondition holds.",
      steps: [
        ["Read the price", "Open the page, make sure a price is shown, and collect it as a number."],
        ["Compare with yesterday", "Keep last-price.txt in the working folder and print “changed” or “same”."],
        ["Email me the change", "Runs only when the result is “changed”."],
      ],
      prompt: "Every morning at 7:00, open https://shop.example.com/products/desk in the browser, read the price, compare it with the last run, and email me only if it changed.",
      note: "Check the shop's terms before automating it; some sites do not allow automated visits.",
    },
    ja: {
      title: "価格を見張り、変わったときだけ自分にメール",
      summary: "毎朝、Chrome で商品ページを開いて価格を読み取り、前日と比べて、動いたときだけメールを送ります。",
      intro:
        "Web サイトのステップは、最初の実行ではモデルでページを読みますが、以降の実行では同じ操作をモデルなしで再現するので、毎日の実行はほぼ無料です。比較は数行のシェルで、メールのステップは前提条件が成り立つときだけ実行されます。",
      steps: [
        ["価格を読み取る", "ページを開き、価格が表示されていることを確かめ、数値として集めます。"],
        ["前日と比べる", "作業フォルダーの last-price.txt を保ち、「changed」か「same」を出力します。"],
        ["変化をメールする", "結果が「changed」のときだけ実行されます。"],
      ],
      prompt: "毎朝 7:00 に、ブラウザーで https://shop.example.com/products/desk を開いて価格を読み取り、前回の実行と比べて、変わったときだけ私にメールしてください。",
      note: "自動化する前にそのショップの利用規約を確認してください。自動アクセスを許可していないサイトもあります。",
    },
  },
  {
    slug: "portal-form-from-sheet",
    audience: "ops",
    needs: ["chrome", "browserModel", "sheet"],
    docs: ["browser", "batches", "secrets"],
    steps: ["browser"],
    yaml: `type: graph
params:
  - NAME: ""
  - EMAIL: ""
  - PLAN: ""
secrets:
  - name: PORTAL_PASSWORD
    ref: portal/password
steps:
  - id: register
    name: Register one customer
    action: browser.run
    with:
      url: https://portal.example.com/customers/new
      variables:
        name: \${params.NAME}
        email: \${params.EMAIL}
        plan: \${params.PLAN}
        password: \${env.PORTAL_PASSWORD}
      do:
        - act: If a sign-in form is shown, type ops@example.com as the user and %password% as the password, then sign in
        - act: Type %name% into the customer name field
        - act: Type %email% into the email field
        - act: Choose %plan% from the plan list and press Save
        - expect: The page confirms the customer was created
        - screenshot: saved
      browser:
        profile: register
`,
    en: {
      title: "Fill in a web form for every row of a spreadsheet",
      summary: "One workflow registers one customer on a portal. A batch sheet runs it once per row, with progress, failures, and a screenshot per customer.",
      intro:
        "The workflow takes three inputs. Paste a spreadsheet into a batch sheet with columns named NAME, EMAIL, and PLAN, and run it: each row becomes one run, paced by the project's queue. The password comes from a secret and is typed as %password%, so the model never sees it. The saved sign-in is reused across runs.",
      steps: [
        ["Register one customer", "Sign in if needed, fill the form from the row's values, save, confirm, and take a screenshot as evidence."],
      ],
      prompt: "Build a workflow with inputs NAME, EMAIL, and PLAN that opens https://portal.example.com/customers/new in the browser, signs in with the portal/password secret if needed, fills in the form, saves, and screenshots the confirmation. I will run it over a sheet.",
      note: "Add the secret under Secrets first. Runs that share a saved sign-in take turns, so the sheet processes one row at a time for this workflow.",
    },
    ja: {
      title: "スプレッドシートの行ごとに Web フォームを入力",
      summary: "1 つのワークフローがポータルに顧客を 1 件登録します。バッチシートが行ごとに実行し、進捗、失敗、顧客ごとのスクリーンショットを残します。",
      intro:
        "ワークフローは 3 つの入力を受け取ります。NAME、EMAIL、PLAN の列を持つスプレッドシートをバッチシートに貼り付けて実行すると、各行が 1 回の実行になり、プロジェクトのキューが速度を調整します。パスワードはシークレットから来て %password% として入力されるので、モデルには見えません。保存したサインインは実行をまたいで再利用されます。",
      steps: [
        ["顧客を 1 件登録する", "必要ならサインインし、行の値でフォームを埋め、保存し、確認して、証拠のスクリーンショットを撮ります。"],
      ],
      prompt: "NAME、EMAIL、PLAN を入力に持つワークフローを作ってください。ブラウザーで https://portal.example.com/customers/new を開き、必要なら portal/password のシークレットでサインインし、フォームを埋めて保存し、確認画面のスクリーンショットを撮ります。シートで実行します。",
      note: "先にシークレットを追加してください。保存したサインインを共有する実行は順番に動くので、このワークフローではシートは 1 行ずつ処理されます。",
    },
  },
  {
    slug: "desktop-app-entry",
    audience: "ops",
    needs: ["desktop", "computerModel"],
    docs: ["desktop", "builder", "dataFlow"],
    steps: ["desktop", "approval", "desktop"],
    yaml: `type: graph
params:
  - CUSTOMER: ""
  - AMOUNT: ""
llm:
  model: kitewell-agent-computer
steps:
  - id: enter
    name: Enter the invoice
    action: computer.run
    with:
      variables:
        customer: \${params.CUSTOMER}
        amount: \${params.AMOUNT}
      do:
        - launch: {command: open, args: [-a, Ledger]}
        - act: Create a new invoice for %customer% with the amount %amount%, but do not save it yet
        - expect: An unsaved invoice for the customer is shown with the amount
        - screenshot: before-save
    approval:
      prompt: Save this invoice? Check the before-save screenshot first.
  - id: save
    name: Save it
    depends: [enter]
    action: computer.run
    with:
      do:
        - act: Save the open invoice and close the invoice window
        - expect: The invoice list shows the new invoice
`,
    en: {
      title: "Type an invoice into a desktop app, and save only after you approve",
      summary: "A model opens an accounting app, fills in a new invoice from the workflow's inputs, and stops. You look at the screenshot, approve, and a second step saves it.",
      intro:
        "This is the desktop side of RPA, without recording clicks: the model reads the screen and uses the mouse and keyboard, on macOS or Windows. The approval gate between the two desktop steps is the safety: nothing is saved in the app until a person has seen it. Run it over a batch sheet to enter many invoices, one approval each.",
      steps: [
        ["Enter the invoice", "Open the app, fill in the invoice without saving, make sure it looks right, and take a screenshot."],
        ["Approve", "The run waits. Open it, look at before-save, and approve or reject."],
        ["Save it", "Save the open invoice and confirm it appears in the list."],
      ],
      prompt: "Build a workflow with inputs CUSTOMER and AMOUNT that opens the Ledger app, creates a new invoice for the customer with that amount without saving, screenshots it, waits for my approval, then saves it.",
      note: "On Windows, open the app by its program path instead of open -a. Every operation sends a screenshot of the whole screen to the model's provider.",
    },
    ja: {
      title: "デスクトップアプリに請求書を入力し、承認後にだけ保存",
      summary: "モデルが会計アプリを開き、ワークフローの入力から新しい請求書を作って止まります。スクリーンショットを見て承認すると、2 つ目のステップが保存します。",
      intro:
        "クリックを記録せずに行う、RPA のデスクトップ側の仕事です。モデルが画面を読み、macOS または Windows でマウスとキーボードを使います。2 つのデスクトップステップの間の承認ゲートが安全装置で、人が見るまでアプリには何も保存されません。バッチシートで実行すれば、1 件ごとに承認しながら多数の請求書を入力できます。",
      steps: [
        ["請求書を入力する", "アプリを開き、保存せずに請求書を埋め、正しく見えることを確かめ、スクリーンショットを撮ります。"],
        ["承認する", "実行は待ちます。開いて before-save を見て、承認または却下します。"],
        ["保存する", "開いている請求書を保存し、一覧に表示されることを確かめます。"],
      ],
      prompt: "CUSTOMER と AMOUNT を入力に持つワークフローを作ってください。Ledger アプリを開き、その顧客と金額で新しい請求書を保存せずに作り、スクリーンショットを撮って、私の承認を待ってから保存します。",
      note: "Windows では open -a の代わりにプログラムのパスでアプリを開きます。操作ごとに画面全体のスクリーンショットがモデルの提供元に送られます。",
    },
  },
  {
    slug: "company-research-sheet",
    audience: "ops",
    needs: ["chrome", "browserModel", "sheet"],
    docs: ["batches", "browser", "ai"],
    steps: ["browser", "model"],
    yaml: `type: graph
params:
  - COMPANY: ""
  - WEBSITE: ""
steps:
  - id: visit
    name: Read the website
    action: browser.run
    with:
      url: \${params.WEBSITE}
      do:
        - act: If there is an About or Company page, open it
        - extract:
            instruction: What the company does, roughly how many people work there, and where its headquarters is
            schema:
              type: object
              properties:
                business: {type: string}
                headcount: {type: string}
                headquarters: {type: string}
  - id: summarize
    name: Write a two-line summary
    depends: [visit]
    action: chat.completion
    with:
      model: kitewell-agent-fast
      prompt: |
        Company: \${params.COMPANY}
        Business: \${steps.visit.outputs.business}
        Headcount: \${steps.visit.outputs.headcount}
        Headquarters: \${steps.visit.outputs.headquarters}
        Write two plain lines: what they do, and why they might need workflow automation.
    output: SUMMARY
`,
    en: {
      title: "Research a list of companies from their websites",
      summary: "One run visits one company's site and collects what it does, its size, and its headquarters. A batch sheet runs it for every row and reads the answers into result columns.",
      intro:
        "The sheet is the interesting part: paste 200 companies with their websites, add result columns for business, headcount, headquarters, and summary, and run. The sheet's model reads each finished run into the columns and quotes the evidence, and flags rows it is unsure about. Export the sheet as CSV when it is done.",
      steps: [
        ["Read the website", "Open the site, find the About page, and collect three facts."],
        ["Write a two-line summary", "A model turns the facts into two plain lines."],
      ],
      prompt: "Build a workflow with inputs COMPANY and WEBSITE that opens the website in the browser, finds the About page, collects what the company does, its headcount, and its headquarters, and writes a two-line summary. I will run it over a sheet of 200 companies.",
      note: "Each browser run asks the model; 200 rows means 200 runs, paced by the project's queue. Results that the model could not verify are marked unsure in the sheet.",
    },
    ja: {
      title: "企業リストを Web サイトから調べる",
      summary: "1 回の実行が 1 社のサイトを訪れ、事業内容、規模、本社所在地を集めます。バッチシートが行ごとに実行し、答えを結果の列に読み取ります。",
      intro:
        "面白いのはシートの方です。200 社と Web サイトを貼り付け、事業内容、人数、本社、要約の結果列を追加して実行します。シートのモデルが終わった実行を読んで列を埋め、根拠を引用し、自信のない行に印を付けます。終わったらシートを CSV に書き出せます。",
      steps: [
        ["Web サイトを読む", "サイトを開き、会社概要のページを探して、3 つの事実を集めます。"],
        ["2 行の要約を書く", "モデルが事実を 2 行の平文にします。"],
      ],
      prompt: "COMPANY と WEBSITE を入力に持つワークフローを作ってください。ブラウザーで Web サイトを開き、会社概要のページを探して、事業内容、人数、本社所在地を集め、2 行の要約を書きます。200 社のシートで実行します。",
      note: "ブラウザーの実行はそれぞれモデルに尋ねます。200 行なら 200 回の実行で、プロジェクトのキューが速度を調整します。モデルが確認できなかった結果は、シートで「要確認」と表示されます。",
    },
  },
  {
    slug: "daily-report",
    audience: "dev",
    needs: ["python"],
    docs: ["builder", "scheduling"],
    steps: ["command", "command", "command"],
    yaml: `type: graph
# Replace this with the absolute path to the folder containing orders.csv.
working_dir: /absolute/path/to/daily-report
steps:
  - id: read_orders
    name: Read orders
    run: cat orders.csv
    output: ORDERS

  - id: build_report
    name: Build report
    depends: [read_orders]
    run: |
      #!/usr/bin/env python3
      import csv
      import io
      import os
      from decimal import Decimal

      orders = list(csv.DictReader(io.StringIO(os.environ["ORDERS"])))
      revenue = sum(Decimal(order["amount_usd"]) for order in orders)
      print("# Daily sales report\\n")
      print(f"- Orders: {len(orders)}")
      print(f"- Revenue: \${revenue:,.2f}")
      print(f"- Average order: \${revenue / len(orders):,.2f}")
    output: REPORT

  - id: save_report
    name: Save report
    depends: [build_report]
    run: |
      printenv REPORT > report.md
      cat report.md
`,
    en: {
      title: "Turn a CSV into a daily Markdown report",
      summary: "Read a CSV of orders, total it with a few lines of Python, and save a Markdown report. No AI, no network: the plainest workflow there is.",
      intro:
        "Three command steps pass values to each other through outputs. It runs entirely on your computer and needs only Python 3. The guide walks through building it in the visual editor and reading the result in the run log.",
      steps: [
        ["Read orders", "Print the CSV and save it as ORDERS."],
        ["Build report", "Python totals the orders and prints Markdown, saved as REPORT."],
        ["Save report", "Write report.md and show it in the run."],
      ],
      prompt: "Build a workflow that reads orders.csv in my daily-report folder, totals the amount_usd column with Python, and writes a Markdown report to report.md every morning at 8:00.",
      note: "The full walkthrough, with sample data, is in Build a workflow.",
    },
    ja: {
      title: "CSV を日次の Markdown レポートに",
      summary: "注文の CSV を読み、数行の Python で集計し、Markdown のレポートを保存します。AI もネットワークも使わない、いちばん素朴なワークフローです。",
      intro:
        "3 つのコマンドステップが、出力を通じて値を受け渡します。すべてあなたのコンピューターで動き、必要なのは Python 3 だけです。ガイドでは、ビジュアルエディターでの組み立てと、実行ログでの結果の確認を順に説明しています。",
      steps: [
        ["注文を読む", "CSV を出力し、ORDERS として保存します。"],
        ["レポートを作る", "Python が注文を集計して Markdown を出力し、REPORT として保存します。"],
        ["レポートを保存する", "report.md に書き込み、実行に表示します。"],
      ],
      prompt: "daily-report フォルダーの orders.csv を読み、amount_usd 列を Python で集計して、毎朝 8:00 に Markdown のレポートを report.md に書くワークフローを作ってください。",
      note: "サンプルデータ付きの手順は「ワークフローを組み立てる」にあります。",
    },
  },
  {
    slug: "deploy-check",
    audience: "dev",
    needs: ["servers"],
    docs: ["builder", "secrets"],
    steps: ["ssh", "approval", "ssh", "ssh"],
    yaml: `type: chain
target: kitewell-group-web
steps:
  - id: pull
    name: Pull the release
    run: git -C /srv/app pull --ff-only
    approval:
      prompt: The release is pulled on this machine. Restart the service?
  - id: restart
    name: Restart the service
    run: sudo systemctl restart app
  - id: check
    name: Check it answers
    run: |
      for i in 1 2 3 4 5 6; do
        curl -fsS http://127.0.0.1:8080/healthz && exit 0
        sleep 5
      done
      echo "The service did not answer" >&2
      exit 1
`,
    en: {
      title: "Roll a release out to servers one at a time, with a check on each",
      summary: "Aim a workflow at a server group and each machine gets its own run, in order: pull, wait for approval, restart, and check the health endpoint before the next machine starts.",
      intro:
        "The group lists the servers and the rollout policy; the workflow is three commands. Because the group stops on the first failure, a machine whose health check fails halts the rollout with the others untouched. Host keys are approved in the project, and any password comes from a secret, so the workflow carries neither.",
      steps: [
        ["Pull the release", "A fast-forward pull on the machine, then the run waits for your approval."],
        ["Restart the service", "Runs after you approve."],
        ["Check it answers", "Six tries, five seconds apart; a machine that never answers fails its run and stops the rollout."],
      ],
      prompt: "Build a chain workflow aimed at my web server group that pulls /srv/app with git, waits for my approval, restarts the app service, and checks http://127.0.0.1:8080/healthz on each machine before moving to the next.",
      note: "Register the servers and the group under Servers first, with maxParallel 1 and onFailure stop.",
    },
    ja: {
      title: "サーバーに 1 台ずつリリースを配り、各台で確認",
      summary: "ワークフローをサーバーグループに向けると、各マシンが順番に自分の実行を持ちます。取得、承認待ち、再起動、そして次のマシンに進む前のヘルスチェックです。",
      intro:
        "グループがサーバーとロールアウトの方針を持ち、ワークフローは 3 つのコマンドだけです。グループは最初の失敗で止まるので、ヘルスチェックに失敗したマシンがあれば、ほかのマシンに手を付けずにロールアウトが止まります。ホスト鍵はプロジェクトで承認済みで、パスワードはシークレットから来るので、ワークフローはどちらも持ちません。",
      steps: [
        ["リリースを取得する", "マシン上で fast-forward の pull を行い、あなたの承認を待ちます。"],
        ["サービスを再起動する", "承認後に実行されます。"],
        ["応答を確かめる", "5 秒間隔で 6 回試します。応答しないマシンは実行が失敗し、ロールアウトが止まります。"],
      ],
      prompt: "Web サーバーグループに向けた chain のワークフローを作ってください。/srv/app を git で取得し、私の承認を待ち、app サービスを再起動して、各マシンで http://127.0.0.1:8080/healthz を確かめてから次のマシンに進みます。",
      note: "先に「サーバー」でサーバーとグループを登録し、maxParallel を 1、onFailure を stop にしてください。",
    },
  },
];

export function labelsFor(example, locale) {
  return {
    needs: example.needs.map((key) => needs[key][locale]),
    docs: example.docs.map((key) => [docs[key][0], docs[key][1][locale]]),
  };
}
