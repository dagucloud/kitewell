// The launch film shown at /#film: its files, caption, and narration.
// Each language has its own cut, captioned in that language and subtitled
// in the other; the transcript pairs each narrated line with what is shown.
export const film = {
  en: {
    name: "kitewell-launch",
    seconds: 89,
    tracks: [
      ["captions", "en", "English"],
      ["subtitles", "ja", "日本語"],
    ],
    label: "Kitewell film, 89 seconds, narrated",
    link: "Watch the Kitewell film.",
    caption: ["89 seconds · Narrated · Captions", "Kitewell's own screens with sample data; the client, its supplier portal, Ledger, and the team chat are made up"],
    transcript: "Read the film's narration",
    scenes: [
      [
        "A lot of the work people want automated lives on their computer: behind a sign-in, in an app with no API, in an Excel file.",
        "A client's own pointer races through one Monday's chores: signing in to a supplier portal, downloading invoices, copying a total from a PDF, pasting it into an old desktop accounting app, and sending a summary. The camera pulls back to the client's computer, where three labels name where that work lives: the portal behind a sign-in, an accounting app with no API, and an order list in Excel.",
      ],
      ["Now those jobs are yours.", "The three labels line up above the promise and are checked off as “yours” is said."],
      [
        "Describe the job, and Kitewell lays out every step for you to check.",
        "In Kitewell's chat window, the builder types: “Every weekday at 9, collect new invoices from the Harbor Supply portal, enter them in Ledger, and email me a summary.” Kitewell proposes the workflow as a card with its steps drawn as a graph and its next runs listed. Applied, the workflow draws itself in the editor.",
      ],
      [
        "Prefer code? It's plain YAML. Build it from Claude Code or Codex, over MCP.",
        "For developers: the workflow's YAML, its plain-language steps highlighted. Then a terminal where a coding agent, Claude Code or Codex, makes a change through Kitewell's MCP tools: it checks the draft, then saves it.",
      ],
      [
        "It runs on their computer, and their passwords stay there.",
        "On the client's computer, the project has arrived with its portal password named but not filled in. The client sets the value there, and Kitewell's page notes that values stay on each device.",
      ],
      [
        "It does the clicking: websites, desktop apps, and email.",
        "Kitewell's own pointer signs in to the portal and reads the new invoices, types them into Ledger, a desktop app with no API, and drafts the summary, while the run checks off its steps.",
      ],
      [
        "It stops for their OK where it matters, and keeps a record of every step.",
        "A notification says one step is waiting. The client approves saving the bills; the run finishes, and its record shows each step, how long it took, and who approved.",
      ],
      [
        "Got a list in Excel? It runs for every row, and writes each result back beside it.",
        "A sheet in Kitewell linked to orders.xlsx runs the reorder workflow once per row, each row turning to Succeeded with its receipt number. Then the workbook itself: the Receipt No, Run at, and Status columns fill in beside every order.",
      ],
      [
        "It learns the clicks once, replays them without the model, and relearns when a page changes.",
        "A week of runs: on Monday the model learns the clicks in 4 minutes 12 seconds, and the other days replay them without the model in under a minute, except Thursday, when the portal's page changed and the model relearned three clicks.",
      ],
      [
        "If a run fails, the alert names the step, in your Slack. Fix it on your laptop, and the fix reaches their computer.",
        "The next Monday's run fails, and Kitewell's alert arrives in the builder's team chat: the workflow, the step that failed, the project, and when it started. The builder changes the workflow on their own laptop, and the change reaches the client's computer through the client's own Dagu Cloud workspace. Notes on screen say alerts need Kitewell Personal or Team, and syncing across computers needs Kitewell Team.",
      ],
      [
        "What you teach goes into the project's notes, for whoever takes over. You build it. Their computers do the work.",
        "The knowledge page Kitewell's assistant wrote as the builder worked, linked to the workflow. The workflow and the page travel through the client's workspace to the computers of two of the client's people, where the work runs, and each computer keeps its own passwords.",
      ],
      [
        "Kitewell. It flies on its own. You hold the string.",
        "The kite leaves the logo and flies, its string running back to the last word. kitewell.app. Free for one project, no account needed.",
      ],
    ],
  },
  ja: {
    name: "kitewell-launch-ja",
    seconds: 89,
    tracks: [
      ["captions", "ja", "日本語"],
      ["subtitles", "en", "English"],
    ],
    label: "Kitewell 紹介映像（89 秒・ナレーション付き）",
    link: "Kitewell の紹介映像を見る。",
    caption: ["89 秒 · ナレーション · 日本語字幕と英語字幕", "Kitewell の実際の画面とサンプルデータ。お客さまの会社、仕入れ先のポータル、会計アプリ「台帳」、チャットは架空のものです"],
    transcript: "ナレーションをテキストで読む",
    scenes: [
      [
        "自動化したい仕事の多くは、その人のパソコンの中にあります。ログインが必要なサイト。API のないアプリ。手元の Excel。",
        "お客さま自身のポインターが月曜の雑務を駆け抜けます。仕入れ先のポータルにログインし、請求書をダウンロードし、PDF の金額をコピーして古い会計アプリに貼り付け、まとめをメールで送信。カメラが引くと、お客さまのパソコンの上で、その仕事がある場所に 3 つのラベルが付きます。ログインが必要なポータル、API のない会計アプリ、Excel の発注一覧。",
      ],
      ["その仕事こそ、あなたの出番。", "3 つのラベルが言葉の上に並び、「あなたの出番」の声とともにチェックされます。"],
      [
        "仕事の中身を伝えるだけ。Kitewell が、すべての手順を並べて見せます。",
        "Kitewell のチャットウィンドウに「平日の朝9時に、みなと資材のポータルから新しい請求書を集めて台帳に入力し、概要をメールで送って」と入力します。Kitewell は、手順のグラフと次の実行予定を載せたカードでワークフローを提案し、適用するとエディターでワークフローが描かれます。",
      ],
      [
        "コード派なら、中身は YAML。Claude Code や Codex から、MCP で組めます。",
        "開発者向けに、ふだんの言葉のステップを強調したワークフローの YAML。続いて、Claude Code や Codex といったコーディングエージェントが Kitewell の MCP ツールで下書きを検証し、保存するターミナルを映します。",
      ],
      [
        "動くのは、相手のパソコン。パスワードも、そこに残ります。",
        "お客さまのパソコンに届いたプロジェクトには、ポータルのパスワードが名前だけ入っていて、値は空です。お客さまがそのパソコンで値を設定し、Kitewell の画面には「値は各デバイスにとどまります」とあります。",
      ],
      [
        "Web も、デスクトップアプリも、メールも、操作はおまかせ。",
        "Kitewell のポインターがポータルにログインして新しい請求書を読み取り、API のないデスクトップアプリ「台帳」に入力し、概要のメールを下書きします。実行のステップが順に完了していきます。",
      ],
      [
        "大事なところでは、相手の OK を待ちます。どのステップも、記録に残ります。",
        "ステップが 1 つ待っているという通知。お客さまが伝票の保存を承認すると実行が終わり、記録には各ステップとかかった時間、承認した人が残ります。",
      ],
      [
        "Excel の一覧も、行ごとに実行して、結果を書き戻します。",
        "発注一覧.xlsx にリンクした Kitewell のシートが、発注のワークフローを 1 行に 1 回ずつ実行し、各行が受付番号とともに「成功」に変わります。続いてブックそのものに、受付番号、実行日時、状態の列が注文ごとに書き込まれます。",
      ],
      [
        "クリックを覚えるのは一度だけ。あとはモデルなしで再生し、画面が変わったら覚え直します。",
        "1 週間の実行。月曜はモデルが 4 分 12 秒でクリックを覚え、ほかの日はモデルなしで 1 分足らずで再生します。ポータルの画面が変わった木曜だけ、モデルが 3 クリックを覚え直します。",
      ],
      [
        "失敗したら、どのステップかを Slack に知らせます。あなたのパソコンで直せば、相手のパソコンに届きます。",
        "翌週月曜の実行が失敗し、Kitewell のアラートがあなたのチームのチャットに届きます。ワークフロー、失敗したステップ、プロジェクト、開始時刻。あなたが自分のパソコンでワークフローを直すと、その変更がお客さま自身の Dagu Cloud ワークスペースを通って、お客さまのパソコンに届きます。画面の注記のとおり、アラートには Kitewell Personal か Team、パソコン間の同期には Kitewell Team が必要です。アラートの文面は英語です。",
      ],
      [
        "教えたことは、プロジェクトのナレッジに。引き継ぐ人は、そこから始められます。作るのはあなた。働くのは、相手のパソコン。",
        "作業しながら Kitewell のアシスタントが書いた、ワークフローに関連付いたナレッジのページ。ワークフローとそのページが、お客さまのワークスペースを通って、お客さまの 2 人のパソコンに届きます。仕事はそこで動き、パスワードはそれぞれのパソコンにとどまります。",
      ],
      [
        "Kitewell。ひとりでに、飛んでいく。糸は、あなたの手に。",
        "凧がロゴから飛び立ち、その糸は最後の言葉までつながっています。kitewell.app。1 プロジェクトまで無料、アカウント不要。",
      ],
    ],
  },
};
