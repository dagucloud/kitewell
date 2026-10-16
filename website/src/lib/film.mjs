// The launch film shown at /#film: its files, caption, and narration.
// Each language has its own cut, captioned in that language and subtitled
// in the other; the transcript pairs each narrated line with what is shown.
export const film = {
  en: {
    name: "kitewell-launch",
    seconds: 74,
    tracks: [
      ["captions", "en", "English"],
      ["subtitles", "ja", "日本語"],
    ],
    label: "Kitewell film, 74 seconds, narrated",
    link: "Watch the Kitewell film.",
    caption: ["74 seconds · Narrated · Captions", "Kitewell's own screens and real runs against a stand-in supplier portal; the company, its portal, Ledger, the team chat, and the email are made up"],
    transcript: "Read the film's narration",
    scenes: [
      [
        "The clicking, typing, and copying you still do by hand.",
        "A person's pointer races through one Monday's chores: signing in to a supplier's portal, downloading invoices, copying a total from a PDF, pasting it into an old desktop accounting app, and sending a summary. The camera pulls back to their computer, where three labels name where that work lives: behind a sign-in, in an app with no API, and in an Excel file.",
      ],
      [
        "RPA promised to take it off you. But every robot was built by hand, and fixed by hand whenever a screen changed.",
        "A recorded script replays the same chores with a robot's pointer. On a held chord it stops, and a specialist writes each step by hand. The supplier redesigns its sign-in page; the robot clicks where the button used to be, the step fails with \"Element not found\", and the specialist comes back to fix it.",
      ],
      [
        "Now, AI builds it.",
        "The three places, checked off, above the headline: AI builds the automation. Your computer runs it.",
      ],
      [
        "Describe the job, and Kitewell lays out every step for you to check.",
        "In Kitewell's chat window, the request is typed: “Every weekday at 9, collect new invoices from the Harbor Supply portal, enter them in Ledger, and email me a summary.” Kitewell proposes the workflow as a card with its steps drawn as a graph; applied, the workflow draws itself in the editor.",
      ],
      [
        "Or build it from Claude Code or Codex, over MCP.",
        "For developers: the workflow's YAML, then a terminal where a coding agent changes it through Kitewell's MCP tools, checking the draft and then saving it.",
      ],
      [
        "On the first run, AI learns the job in your browser. Then your computer runs it, every day.",
        "Real Kitewell runs against a stand-in supplier portal on the same computer. The first run's record, each action worked out as it goes, beside what the browser saw; then the next run, its sign-in actions marked Replayed.",
      ],
      [
        "When a site changes, AI finds the new way, and keeps it.",
        "The portal moves its sign-in button. In the next run's record, \"Click Sign in\" is marked Recovered: AI found the new button. In the run after that, the same action is Replayed.",
      ],
      [
        "It stops for your OK where it matters.",
        "A notification says a step is waiting for the person. One click approves it, and the run's record shows every step done and who approved it.",
      ],
      [
        "Got a list in Excel? It runs every row and writes the results back.",
        "A sheet linked to orders.xlsx runs the workflow once per row; then the workbook itself fills in each row's result.",
      ],
      [
        "Coding agents too. Claude Code writes the fix, Codex reviews it, and nothing ships until you approve.",
        "A real workflow on a demo repository: Claude Code fixes a failing test, with Codex and then Gemini behind it if it fails; Codex reviews the change; the run waits at the approval with Approve and Send back before the fix is committed on a local branch.",
      ],
      [
        "It runs on your computer, and your passwords stay there.",
        "On another computer that took the project, its portal password named but not filled, the person there sets the value, and the page notes that values stay on each device.",
      ],
      [
        "Run it on every computer, and watch them all from the cloud. If a run fails, or a computer goes quiet, you hear about it.",
        "The two computers report their runs to Dagu Console, whose real computers page takes the frame. Kitewell's alert for a failed run arrives in the team chat, and Dagu Console's email says a computer stopped reporting. Notes say Kitewell's alerts need Personal or Team, and Dagu Console's stopped-reporting alerts are turned on per computer.",
      ],
      [
        "Kitewell. It flies on its own. You hold the string.",
        "The kite leaves the logo and flies, its string running back to the last word. kitewell.app. Free for one project, on macOS and Windows.",
      ],
    ],
  },
  ja: {
    name: "kitewell-launch-ja",
    seconds: 74,
    tracks: [
      ["captions", "ja", "日本語"],
      ["subtitles", "en", "English"],
    ],
    label: "Kitewell 紹介映像（74 秒・ナレーション付き）",
    link: "Kitewell の紹介映像を見る。",
    caption: ["74 秒 · ナレーション · 日本語字幕と英語字幕", "Kitewell の実際の画面と、代役の仕入れ先ポータルでの実際の実行。会社、ポータル、会計アプリ「台帳」、チャット、メールは架空のものです"],
    transcript: "ナレーションをテキストで読む",
    scenes: [
      [
        "日々手でこなしている、クリックと入力とコピー。",
        "ある人のポインターが、月曜の雑務を駆け抜けます。仕入れ先のポータルにログインし、請求書をダウンロードし、PDF の金額をコピーして古い会計アプリに貼り付け、まとめをメールで送信。カメラが引くと、その人のパソコンの上で、仕事がある場所に 3 つのラベルが付きます。ログインが必要なサイト、API のないアプリ、手元の Excel。",
      ],
      [
        "RPA は、それを任せられるはずでした。でも、ロボットは手でつくり、画面が変わるたびに手で直すものでした。",
        "記録したシナリオが、ロボットのポインターで同じ雑務を再生します。和音が止まると、担当者が手順を一つずつ手で書き込みます。仕入れ先がログイン画面を作り直すと、ロボットはボタンがあった場所をクリックし、「要素が見つかりません」で止まり、担当者がまた直しに来ます。",
      ],
      [
        "いまは、AI がつくる。",
        "チェックの付いた 3 つの場所の下に、見出しが現れます。自動化は AI がつくる。動かすのは、あなたのパソコン。",
      ],
      [
        "伝えるだけで、Kitewell が手順を並べて見せます。",
        "Kitewell のチャットに「平日の朝9時に、みなと資材のポータルから新しい請求書を集めて台帳に入力し、概要をメールで送って」と入力します。Kitewell は手順をグラフで描いたカードでワークフローを提案し、適用するとエディターにワークフローが描かれます。",
      ],
      [
        "Claude Code や Codex から、MCP でも組めます。",
        "開発者向けに、ワークフローの YAML と、コーディングエージェントが Kitewell の MCP ツールで下書きを検証し、保存するターミナル。",
      ],
      [
        "最初の一回で、AI がブラウザーで仕事を覚え、あとは毎日、あなたのパソコンが動かします。",
        "同じパソコン上の代役の仕入れ先ポータルに対する、Kitewell の実際の実行です。1 回目の実行の記録と、そのときブラウザーに見えていた画面。次の実行では、ログインの操作に「再生」と記録されます。",
      ],
      [
        "サイトが変われば、AI が新しい手順を見つけて、覚え直します。",
        "ポータルのログインボタンが動きます。次の実行の記録では「ログインをクリックする」が「復旧」となり、AI が新しいボタンを見つけたことがわかります。その次の実行では、同じ操作が「再生」されます。",
      ],
      [
        "大事なところは、あなたの OK を待ちます。",
        "通知が、ステップが承認を待っていると知らせます。ワンクリックで承認すると、実行の記録に、すべてのステップの完了と承認した人が残ります。",
      ],
      [
        "Excel の一覧も、1 行ずつ実行して書き戻します。",
        "発注一覧.xlsx にリンクしたシートが 1 行ごとにワークフローを実行し、ブックの各行に結果が書き戻されます。",
      ],
      [
        "コーディングエージェントも。Claude Code が直し、Codex がレビュー。承認まで、何も出しません。",
        "デモ用リポジトリでの実際のワークフロー。Claude Code が失敗するテストを直し（失敗したら Codex、次に Gemini が引き継ぎます）、Codex が変更をレビューし、実行は「承認」と「差し戻し」のある承認で待ってから、ローカルのブランチにコミットします。",
      ],
      [
        "あなたのパソコンで動き、パスワードもそこに残ります。",
        "プロジェクトを受け取ったもう 1 台のパソコンで、名前だけが入ったポータルのパスワードに、その人が値を設定します。値は各デバイスにとどまると画面に書かれています。",
      ],
      [
        "どのパソコンで動かしても、クラウドからまとめて見守れます。失敗したときも、パソコンが止まったときも、知らせが届きます。",
        "2 台のパソコンが実行を Dagu Console に報告し、実際のコンピューター一覧の画面が映ります。失敗した実行についての Kitewell のアラートがチャットに届き、Dagu Console からはパソコンのレポートが停止したというメールが届きます。Kitewell のアラートは Personal と Team で使え、Dagu Console のレポート停止アラートはコンピューターごとにオンにすると注記されます。",
      ],
      [
        "Kitewell。ひとりでに、飛んでいく。糸は、あなたの手に。",
        "凧がロゴから飛び立ち、その糸は最後の言葉までつながっています。kitewell.app。1 プロジェクトまで無料、macOS と Windows に対応。",
      ],
    ],
  },
};
