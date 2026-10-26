// The launch film shown at /#film: its files, caption, and narration.
// English and Japanese each have their own cut, captioned in that language
// and subtitled in the other; every other language shows the English cut,
// with its caption and transcript in that language. The transcript pairs
// each narrated line with what is shown.
const englishCut = {
  name: "kitewell-launch",
  seconds: 74,
  uploaded: "2026-10-14",
  tracks: [
    ["captions", "en", "English"],
    ["subtitles", "ja", "日本語"],
  ],
};

export const film = {
  en: {
    ...englishCut,
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
    uploaded: "2026-10-14",
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
  zh: {
    ...englishCut,
    label: "Kitewell 介绍影片（74 秒，英语旁白）",
    link: "观看 Kitewell 介绍影片。",
    caption: ["74 秒 · 英语旁白 · 英文字幕与日文字幕", "Kitewell 的真实界面，以及针对代用供应商门户的真实运行；其中的公司、门户、Ledger、团队聊天和邮件均为虚构"],
    transcript: "阅读影片旁白的文字版",
    scenes: [
      [
        "那些你至今仍在手动完成的点击、输入和复制。",
        "一个人的鼠标指针飞快地处理完一个周一的杂务：登录供应商门户、下载发票、从 PDF 中复制合计金额、粘贴到一个老旧的桌面记账应用里，再发送一份摘要。镜头拉远到这个人的电脑，三个标签标出这些工作所在的地方：需要登录的网站、没有 API 的应用，以及一个 Excel 文件。",
      ],
      [
        "RPA 本该替你接手这些工作。可是每个机器人都要手工搭建，每当界面变了，又要手工修复。",
        "一段录制好的脚本用机器人的指针重放同样的杂务。在一个延长的和弦中它停了下来，一位专员手工逐个写出每个步骤。供应商改版了登录页面；机器人点击按钮原来所在的位置，步骤以“找不到元素”失败，专员又回来修复。",
      ],
      [
        "现在，由 AI 来搭建。",
        "打上勾的三个地方下方出现标题：自动化由 AI 搭建。运行它的，是你的电脑。",
      ],
      [
        "说出要做的工作，Kitewell 会把每个步骤列出来给你检查。",
        "在 Kitewell 的聊天窗口中输入请求：“每个工作日 9 点，从 Harbor Supply 门户收集新发票，录入 Ledger，并用邮件给我发一份摘要。”Kitewell 以卡片形式提出工作流，步骤画成一张图；应用后，工作流在编辑器中自动绘出。",
      ],
      [
        "也可以通过 MCP，在 Claude Code 或 Codex 里搭建。",
        "面向开发者：先是工作流的 YAML，然后是一个终端，编程智能体通过 Kitewell 的 MCP 工具修改它，先检查草稿，再保存。",
      ],
      [
        "第一次运行时，AI 在你的浏览器里学会这项工作。之后，你的电脑每天运行它。",
        "在同一台电脑上针对代用供应商门户进行的真实 Kitewell 运行。首次运行的记录里，每个操作都是边做边推算出来的，旁边是浏览器看到的画面；然后是下一次运行，登录操作都标记为“已回放”。",
      ],
      [
        "网站一变，AI 会找到新的做法，并记住它。",
        "门户移动了登录按钮。在下一次运行的记录中，“点击登录”标记为“已恢复”：AI 找到了新按钮。再下一次运行时，同一个操作标记为“已回放”。",
      ],
      [
        "在关键之处，它会停下来等你批准。",
        "一条通知提示有一个步骤在等这个人处理。点一下即可批准，运行记录显示每个步骤都已完成，以及由谁批准。",
      ],
      [
        "有一份 Excel 列表？它会逐行运行，并把结果写回去。",
        "一张关联到 orders.xlsx 的工作表为每一行运行一次工作流；然后，工作簿本身填入了每一行的结果。",
      ],
      [
        "编程智能体也一样。Claude Code 写修复，Codex 审查，你批准之前什么都不会发出。",
        "演示仓库上的一个真实工作流：Claude Code 修复一个失败的测试，如果它失败，由 Codex、再由 Gemini 接手；Codex 审查改动；运行停在带有“批准”和“退回”的审批处等待，之后才把修复提交到一个本地分支。",
      ],
      [
        "它在你的电脑上运行，你的密码也留在那里。",
        "在接手这个项目的另一台电脑上，门户密码只有名称、没有填值，那里的人设置这个值，页面注明这些值只保存在各自的设备上。",
      ],
      [
        "在每台电脑上运行，并从云端统一查看。运行失败或电脑没了动静，你都会收到通知。",
        "两台电脑向 Dagu Console 报告各自的运行，画面中是它真实的电脑页面。Kitewell 关于失败运行的提醒出现在团队聊天中，Dagu Console 的邮件则说明有一台电脑停止了报告。注释说明，Kitewell 的提醒需要 Personal 或 Team，Dagu Console 的停止报告提醒需按电脑逐台开启。",
      ],
      [
        "Kitewell。它自己飞翔，线握在你手中。",
        "风筝离开标志飞上天，线一直连到最后一个词。kitewell.app。一个项目免费，支持 macOS 和 Windows。",
      ],
    ],
  },
  ko: {
    ...englishCut,
    label: "Kitewell 소개 영상(74초, 영어 내레이션)",
    link: "Kitewell 소개 영상 보기.",
    caption: ["74초 · 영어 내레이션 · 영어 자막과 일본어 자막", "Kitewell의 실제 화면과 대역 공급업체 포털에서의 실제 실행입니다. 회사, 포털, Ledger, 팀 채팅, 이메일은 가상입니다"],
    transcript: "영상 내레이션을 텍스트로 읽기",
    scenes: [
      [
        "아직도 손으로 하고 있는 클릭, 입력, 복사.",
        "한 사람의 포인터가 월요일의 잡무를 빠르게 처리합니다. 공급업체 포털에 로그인하고, 청구서를 내려받고, PDF에서 합계를 복사해 오래된 데스크톱 회계 앱에 붙여 넣고, 요약을 보냅니다. 카메라가 그 사람의 컴퓨터로 물러나면, 세 개의 라벨이 그 일이 있는 곳을 가리킵니다. 로그인이 필요한 사이트, API가 없는 앱, 그리고 Excel 파일.",
      ],
      [
        "RPA가 그 일을 덜어 주겠다고 약속했습니다. 하지만 로봇은 모두 손으로 만들었고, 화면이 바뀔 때마다 손으로 고쳐야 했습니다.",
        "녹화된 스크립트가 로봇의 포인터로 같은 잡무를 재생합니다. 길게 이어지는 화음에서 멈추고, 전문 담당자가 단계를 하나하나 손으로 작성합니다. 공급업체가 로그인 페이지를 새로 디자인하자, 로봇은 버튼이 있던 자리를 클릭하고, 단계는 “요소를 찾을 수 없음”으로 실패하며, 담당자가 다시 고치러 옵니다.",
      ],
      [
        "이제는 AI가 만듭니다.",
        "체크 표시가 된 세 곳 아래에 제목이 나타납니다. 자동화는 AI가 만듭니다. 실행은 내 컴퓨터가 합니다.",
      ],
      [
        "할 일을 말하면, Kitewell이 확인할 수 있도록 모든 단계를 펼쳐 보여 줍니다.",
        "Kitewell 채팅 창에 요청을 입력합니다. “평일 9시마다 Harbor Supply 포털에서 새 청구서를 모아 Ledger에 입력하고, 요약을 이메일로 보내 줘.” Kitewell은 단계를 그래프로 그린 카드로 워크플로를 제안하고, 적용하면 편집기에 워크플로가 그려집니다.",
      ],
      [
        "또는 MCP로 Claude Code나 Codex에서 만들 수도 있습니다.",
        "개발자를 위한 장면입니다. 워크플로의 YAML, 이어서 코딩 에이전트가 Kitewell의 MCP 도구로 이를 수정하는 터미널. 초안을 확인한 뒤 저장합니다.",
      ],
      [
        "첫 실행에서 AI가 브라우저에서 일을 익힙니다. 그다음부터는 내 컴퓨터가 매일 실행합니다.",
        "같은 컴퓨터에 띄운 대역 공급업체 포털에 대한 실제 Kitewell 실행입니다. 첫 실행의 기록에는 진행하면서 하나씩 알아낸 동작이 브라우저가 본 화면 옆에 놓이고, 다음 실행에서는 로그인 동작이 ‘재생됨’으로 표시됩니다.",
      ],
      [
        "사이트가 바뀌면, AI가 새 방법을 찾아 기억합니다.",
        "포털이 로그인 버튼의 위치를 옮깁니다. 다음 실행의 기록에서 “로그인 클릭”은 ‘복구됨’으로 표시됩니다. AI가 새 버튼을 찾은 것입니다. 그다음 실행에서는 같은 동작이 ‘재생됨’으로 표시됩니다.",
      ],
      [
        "중요한 곳에서는 멈추고 내 승인을 기다립니다.",
        "알림이 한 단계가 사람을 기다리고 있다고 알려 줍니다. 한 번 클릭해 승인하면, 실행 기록에 모든 단계의 완료와 승인한 사람이 표시됩니다.",
      ],
      [
        "Excel 목록이 있나요? 모든 행을 실행하고 결과를 다시 적어 넣습니다.",
        "orders.xlsx에 연결된 시트가 행마다 워크플로를 한 번씩 실행하고, 이어서 통합 문서 자체에 각 행의 결과가 채워집니다.",
      ],
      [
        "코딩 에이전트도 마찬가지입니다. Claude Code가 고치고, Codex가 리뷰하며, 승인하기 전에는 아무것도 내보내지 않습니다.",
        "데모 저장소에서 실제로 실행한 워크플로입니다. Claude Code가 실패한 테스트를 고치고, 실패하면 Codex, 다음은 Gemini가 이어받습니다. Codex가 변경을 리뷰하고, 실행은 ‘승인’과 ‘돌려보내기’가 있는 승인 단계에서 기다린 뒤 수정을 로컬 브랜치에 커밋합니다.",
      ],
      [
        "내 컴퓨터에서 실행되고, 비밀번호도 그곳에 남습니다.",
        "프로젝트를 받은 다른 컴퓨터에는 포털 비밀번호의 이름만 있고 값은 비어 있습니다. 그곳의 사람이 값을 설정하고, 화면에는 값이 각 기기에 머문다는 안내가 표시됩니다.",
      ],
      [
        "모든 컴퓨터에서 실행하고, 클라우드에서 한꺼번에 지켜보세요. 실행이 실패하거나 컴퓨터가 조용해지면 알려 드립니다.",
        "두 컴퓨터가 실행을 Dagu Console에 보고하고, 화면에는 그 실제 컴퓨터 페이지가 담깁니다. 실패한 실행에 대한 Kitewell의 알림이 팀 채팅에 도착하고, Dagu Console의 이메일은 한 컴퓨터가 보고를 멈췄다고 알립니다. Kitewell의 알림에는 Personal 또는 Team이 필요하고, Dagu Console의 보고 중단 알림은 컴퓨터마다 켠다는 설명이 붙습니다.",
      ],
      [
        "Kitewell. 스스로 날아오릅니다. 줄은 당신의 손에.",
        "연이 로고를 떠나 날아오르고, 그 줄은 마지막 단어까지 이어집니다. kitewell.app. 프로젝트 1개 무료, macOS와 Windows 지원.",
      ],
    ],
  },
  fr: {
    ...englishCut,
    label: "Film Kitewell, 74 secondes, narration en anglais",
    link: "Regarder le film Kitewell.",
    caption: ["74 secondes · Narration en anglais · Sous-titres anglais et japonais", "Les vrais écrans de Kitewell et de vraies exécutions sur un portail fournisseur de substitution ; l’entreprise, son portail, Ledger, le chat d’équipe et l’e-mail sont fictifs"],
    transcript: "Lire la narration du film",
    scenes: [
      [
        "Les clics, la saisie et les copier-coller que vous faites encore à la main.",
        "Le pointeur d’une personne enchaîne les corvées d’un lundi : se connecter au portail d’un fournisseur, télécharger des factures, copier un total depuis un PDF, le coller dans une vieille application de comptabilité de bureau, puis envoyer un récapitulatif. La caméra recule jusqu’à son ordinateur, où trois étiquettes indiquent où se trouve ce travail : derrière une connexion, dans une application sans API et dans un fichier Excel.",
      ],
      [
        "La RPA promettait de vous en décharger. Mais chaque robot était construit à la main, et réparé à la main dès qu’un écran changeait.",
        "Un script enregistré rejoue les mêmes corvées avec le pointeur d’un robot. Sur un accord tenu, il s’arrête, et un spécialiste écrit chaque étape à la main. Le fournisseur refait sa page de connexion ; le robot clique là où se trouvait le bouton, l’étape échoue avec « Élément introuvable », et le spécialiste revient la réparer.",
      ],
      [
        "Désormais, c’est l’IA qui la construit.",
        "Les trois endroits, cochés, au-dessus du titre : L’IA construit l’automatisation. Votre ordinateur l’exécute.",
      ],
      [
        "Décrivez la tâche, et Kitewell détaille chaque étape pour que vous la vérifiiez.",
        "Dans la fenêtre de chat de Kitewell, la demande est saisie : « Chaque jour de semaine à 9 h, récupère les nouvelles factures du portail Harbor Supply, saisis-les dans Ledger et envoie-moi un résumé par e-mail. » Kitewell propose le workflow sous forme de carte, ses étapes dessinées en graphe ; une fois appliqué, le workflow se dessine dans l’éditeur.",
      ],
      [
        "Ou construisez-la depuis Claude Code ou Codex, via MCP.",
        "Pour les développeurs : le YAML du workflow, puis un terminal où un agent de codage le modifie avec les outils MCP de Kitewell, vérifie le brouillon, puis l’enregistre.",
      ],
      [
        "À la première exécution, l’IA apprend la tâche dans votre navigateur. Ensuite, votre ordinateur l’exécute, chaque jour.",
        "De vraies exécutions de Kitewell sur un portail fournisseur de substitution, sur le même ordinateur. Le journal de la première exécution, chaque action déterminée au fil de l’eau, à côté de ce que voyait le navigateur ; puis l’exécution suivante, ses actions de connexion marquées Rejoué.",
      ],
      [
        "Quand un site change, l’IA trouve la nouvelle façon de faire, et la garde.",
        "Le portail déplace son bouton de connexion. Dans le journal de l’exécution suivante, « Cliquer sur Se connecter » est marqué Récupéré : l’IA a trouvé le nouveau bouton. À l’exécution d’après, la même action est marquée Rejoué.",
      ],
      [
        "Là où c’est important, il attend votre accord.",
        "Une notification indique qu’une étape attend la personne. Un clic l’approuve, et le journal de l’exécution montre chaque étape terminée et qui l’a approuvée.",
      ],
      [
        "Une liste dans Excel ? Il traite chaque ligne et y réécrit les résultats.",
        "Une feuille liée à orders.xlsx exécute le workflow une fois par ligne ; puis le classeur lui-même se remplit du résultat de chaque ligne.",
      ],
      [
        "Les agents de codage aussi. Claude Code écrit le correctif, Codex le relit, et rien ne part avant votre approbation.",
        "Un vrai workflow sur un dépôt de démonstration : Claude Code corrige un test en échec, avec Codex puis Gemini en relais s’il échoue ; Codex relit la modification ; l’exécution attend à l’approbation, avec Approuver et Renvoyer, avant que le correctif soit commité sur une branche locale.",
      ],
      [
        "Il tourne sur votre ordinateur, et vos mots de passe y restent.",
        "Sur un autre ordinateur qui a repris le projet, le mot de passe du portail est nommé mais vide ; la personne sur place saisit la valeur, et la page précise que les valeurs restent sur chaque appareil.",
      ],
      [
        "Exécutez-le sur chaque ordinateur, et surveillez-les tous depuis le cloud. Si une exécution échoue ou si un ordinateur se tait, vous êtes prévenu.",
        "Les deux ordinateurs rapportent leurs exécutions à Dagu Console, dont la vraie page des ordinateurs occupe l’écran. L’alerte de Kitewell pour une exécution en échec arrive dans le chat de l’équipe, et l’e-mail de Dagu Console signale qu’un ordinateur ne rapporte plus. Des notes précisent que les alertes de Kitewell demandent Personal ou Team, et que les alertes de Dagu Console s’activent ordinateur par ordinateur.",
      ],
      [
        "Kitewell. Il vole tout seul. Vous tenez le fil.",
        "Le cerf-volant quitte le logo et s’envole, son fil courant jusqu’au dernier mot. kitewell.app. Gratuit pour un projet, sur macOS et Windows.",
      ],
    ],
  },
  de: {
    ...englishCut,
    label: "Kitewell-Film, 74 Sekunden, englischer Sprecher",
    link: "Den Kitewell-Film ansehen.",
    caption: ["74 Sekunden · Englischer Sprecher · Englische und japanische Untertitel", "Die echten Bildschirme von Kitewell und echte Ausführungen gegen ein Ersatzportal eines Lieferanten; das Unternehmen, sein Portal, Ledger, der Team-Chat und die E-Mail sind erfunden"],
    transcript: "Den Sprechertext des Films lesen",
    scenes: [
      [
        "Das Klicken, Tippen und Kopieren, das Sie immer noch von Hand erledigen.",
        "Der Mauszeiger einer Person jagt durch die Routinearbeiten eines Montags: im Portal eines Lieferanten anmelden, Rechnungen herunterladen, eine Summe aus einem PDF kopieren, sie in eine alte Buchhaltungs-App auf dem Desktop einfügen und eine Zusammenfassung senden. Die Kamera fährt zurück auf den Computer, wo drei Beschriftungen zeigen, wo diese Arbeit liegt: hinter einer Anmeldung, in einer App ohne API und in einer Excel-Datei.",
      ],
      [
        "RPA versprach, Ihnen das abzunehmen. Doch jeder Roboter wurde von Hand gebaut und von Hand repariert, sobald sich ein Bildschirm änderte.",
        "Ein aufgezeichnetes Skript spielt dieselben Aufgaben mit dem Zeiger eines Roboters ab. Bei einem gehaltenen Akkord hält es an, und ein Spezialist schreibt jeden Schritt von Hand. Der Lieferant gestaltet seine Anmeldeseite neu; der Roboter klickt dorthin, wo die Schaltfläche früher war, der Schritt schlägt mit „Element nicht gefunden“ fehl, und der Spezialist kommt zurück, um ihn zu reparieren.",
      ],
      [
        "Jetzt baut sie die KI.",
        "Die drei Orte, abgehakt, über der Überschrift: Die KI baut die Automatisierung. Ihr Computer führt sie aus.",
      ],
      [
        "Beschreiben Sie die Aufgabe, und Kitewell legt jeden Schritt zur Prüfung vor.",
        "Im Chatfenster von Kitewell wird die Anfrage eingegeben: „Hole an jedem Werktag um 9 Uhr die neuen Rechnungen aus dem Portal von Harbor Supply, trage sie in Ledger ein und schick mir eine Zusammenfassung per E-Mail.“ Kitewell schlägt den Workflow als Karte vor, die Schritte als Graph gezeichnet; nach dem Übernehmen zeichnet sich der Workflow im Editor.",
      ],
      [
        "Oder bauen Sie sie aus Claude Code oder Codex heraus, über MCP.",
        "Für Entwickler: das YAML des Workflows, dann ein Terminal, in dem ein Coding-Agent ihn über die MCP-Werkzeuge von Kitewell ändert, den Entwurf prüft und ihn dann speichert.",
      ],
      [
        "Beim ersten Lauf lernt die KI die Aufgabe in Ihrem Browser. Danach führt Ihr Computer sie aus, jeden Tag.",
        "Echte Kitewell-Ausführungen gegen ein Ersatzportal eines Lieferanten auf demselben Computer. Das Protokoll des ersten Laufs, jede Aktion unterwegs ermittelt, neben dem, was der Browser sah; dann der nächste Lauf, seine Anmeldeaktionen als Wiederholt markiert.",
      ],
      [
        "Ändert sich eine Website, findet die KI den neuen Weg und behält ihn.",
        "Das Portal verschiebt seine Anmelden-Schaltfläche. Im Protokoll des nächsten Laufs ist „Auf Anmelden klicken“ als Wiederhergestellt markiert: Die KI hat die neue Schaltfläche gefunden. Im Lauf danach ist dieselbe Aktion als Wiederholt markiert.",
      ],
      [
        "Wo es darauf ankommt, wartet es auf Ihr OK.",
        "Eine Benachrichtigung meldet, dass ein Schritt auf die Person wartet. Ein Klick genehmigt ihn, und das Protokoll der Ausführung zeigt jeden erledigten Schritt und wer ihn genehmigt hat.",
      ],
      [
        "Eine Liste in Excel? Es arbeitet jede Zeile ab und schreibt die Ergebnisse zurück.",
        "Eine mit orders.xlsx verknüpfte Tabelle führt den Workflow einmal pro Zeile aus; dann füllt sich die Arbeitsmappe selbst mit dem Ergebnis jeder Zeile.",
      ],
      [
        "Auch Coding-Agenten. Claude Code schreibt den Fix, Codex prüft ihn, und nichts geht raus, bevor Sie genehmigen.",
        "Ein echter Workflow an einem Demo-Repository: Claude Code repariert einen fehlschlagenden Test, mit Codex und dann Gemini dahinter, falls es scheitert; Codex prüft die Änderung; die Ausführung wartet an der Genehmigung mit Genehmigen und Zurückgeben, bevor der Fix in einem lokalen Branch committet wird.",
      ],
      [
        "Es läuft auf Ihrem Computer, und Ihre Passwörter bleiben dort.",
        "Auf einem anderen Computer, der das Projekt übernommen hat, ist das Portalpasswort benannt, aber nicht ausgefüllt; die Person dort setzt den Wert, und die Seite weist darauf hin, dass Werte auf jedem Gerät bleiben.",
      ],
      [
        "Lassen Sie es auf jedem Computer laufen, und behalten Sie alle aus der Cloud im Blick. Schlägt ein Lauf fehl oder wird ein Computer still, erfahren Sie es.",
        "Die beiden Computer melden ihre Läufe an Dagu Console, deren echte Computerseite das Bild füllt. Die Benachrichtigung von Kitewell über einen fehlgeschlagenen Lauf kommt im Team-Chat an, und die E-Mail von Dagu Console meldet, dass ein Computer nichts mehr meldet. Hinweise erklären, dass die Benachrichtigungen von Kitewell Personal oder Team erfordern und die Meldung von Dagu Console pro Computer eingeschaltet wird.",
      ],
      [
        "Kitewell. Er fliegt von allein. Sie halten die Schnur.",
        "Der Drachen löst sich vom Logo und fliegt, seine Schnur reicht bis zum letzten Wort. kitewell.app. Kostenlos für ein Projekt, auf macOS und Windows.",
      ],
    ],
  },
};
