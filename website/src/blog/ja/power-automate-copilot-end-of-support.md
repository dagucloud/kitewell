---
title: Power Automate の Copilot が 11 月 30 日で終了：影響と代わりの方法
description: 2026 年 11 月 30 日、Power Automate のクラウドフローとエージェントフローのデザイナーにある Copilot と、「Describe it to design it」のサポートが終わります。既存のフローへの影響、Microsoft が案内する代わりの方法（GitHub Copilot CLI と Claude Code の Power Automate プラグイン、Copilot Studio MCP）、管理者がやることをまとめました。
published: 2026-11-08
updated: 2026-11-08
---

Microsoft は 2026 年 11 月、Microsoft 365 管理センターのメッセージセンターで 2 つの告知を出しました。2026 年 11 月 30 日で、Power Automate のデザイナーにある Copilot と、説明文からフローを作る「Describe it to design it」のサポートが終わります。

この記事では、告知と Microsoft Learn の内容をもとに、何が使えなくなり、何が残るか、言葉でフローを作り続けるにはどうすればよいかをまとめます。内容は 2026 年 11 月 8 日時点のものです。

## 要点

- 2026 年 11 月 30 日で、クラウドフローとエージェントフローのデザイナーの Copilot（MC1540258）と、「Describe it to design it」（MC1537406）のサポートが終わります。
- 既存のフローは削除も移動も変更もされません。Copilot で作ったり直したりしたフローも、そのまま動きます。
- デザイナーでの作成、編集、テスト、実行は続けられます。テンプレートから作ること、式エディター、フローチェッカー、実行履歴も使えます。
- 言葉でフローを作り続けるには、Microsoft は GitHub Copilot CLI か Claude Code に入れる Power Automate プラグインか、Copilot Studio MCP を案内しています。どちらも、ターミナルで動く AI アシスタントを使う方法です。

## 終わる機能

| 告知 | 公開日 | 終わるもの | 終了日 |
| --- | --- | --- | --- |
| MC1540258 | 2026 年 11 月 5 日 | クラウドフローとエージェントフローのデザイナーの Copilot | 2026 年 11 月 30 日 |
| MC1537406 | 2026 年 11 月 3 日 | 説明文から新しいクラウドフローを作る「Describe it to design it」 | 2026 年 11 月 30 日 |

デザイナーの Copilot は、デザイナーの中で頼むと、フローにアクションを足したり、フローを直したりする機能です。「Describe it to design it」は、作りたいフローを文章で書くと、トリガーとアクションの案を作る機能です。11 月 30 日のあとは、どちらも使えなくなります。

Power Platform の「Important changes (deprecations) coming」のページにも、「Describe it to design it」が 2026 年 11 月 30 日にすべてのお客様で廃止されると載っています。

## 変わらないこと

- **既存のフロー**：クラウドフローもエージェントフローも、削除、移動、変更はされません。Copilot で作成または編集したフローも同じです。
- **デザイナー**：フローの作成、編集、テスト、実行、テンプレートからの作成、式エディター、フローチェッカー、実行履歴は、これまでどおり使えます。
- **Power Automate for desktop**：今回の 2 つの告知が対象にしているのは、クラウドフローとエージェントフローです。Power Automate for desktop（デスクトップフロー）の名前はありません。

## 11 月 30 日のあと、言葉でフローを作るには

Microsoft が告知で案内している方法は 2 つです。

### 1. Power Automate プラグイン（GitHub Copilot CLI、Claude Code）

ターミナルで動く AI コーディングアシスタント、GitHub Copilot CLI と Claude Code のためのプラグインです。Microsoft Learn の手順のページは 2026 年 9 月に公開されました。

作りたいフローを言葉で伝えると、プラグインがトリガーとアクションを決め、必要な接続を探し、フローの定義を組み立てて確かめます。できたフローは、確認してから有効にできるよう、停止した状態で作られます。既存のフローの編集、失敗した実行の調査、接続の確認や修復、環境内のフローの一覧づくりも頼めます。デスクトップフローは一覧と実行だけで、Power Automate Desktop のスクリプトは編集できません。

必要なもの：

- Node.js 18 以上
- Azure CLI（Power Automate と同じ職場アカウントでサインインする）
- GitHub Copilot CLI か Claude Code と、その利用契約
- Power Automate が使える Power Platform 環境と、使うフローやコネクターに合った Power Automate のライセンス

Claude Code の場合の手順です。

1. Azure CLI でサインインする：`az login --allow-no-subscriptions`
2. Claude Code で、Power Platform Skills のマーケットプレイスを追加する：`/plugin marketplace add microsoft/power-platform-skills`
3. Power Automate プラグインを入れる：`/plugin install power-automate@power-platform-skills`
4. Claude Code を起動し直し、`/setup` で準備ができているか確かめる

そのあとは、「SharePoint のリストに項目が追加されたら、Teams にメッセージを投稿するフローを作って」のように頼みます。GitHub Copilot CLI でのプラグインの入れ方は、GitHub のドキュメントに載っています。

Microsoft は、AI が作ったフローの定義や変更は不正確なことがあるので、公開する前に確認とテストをするよう書いています。プラグインはサインインしたアカウントで Power Automate を操作し、そのアカウントの権限、ライセンス、コネクターのポリシー、テナントの制限がそのまま適用されます。

### 2. Copilot Studio MCP

Copilot Studio のツールを、MCP に対応した CLI や開発ツール（Visual Studio Code や GitHub Copilot CLI など）から使う方法です。クライアントが npm パッケージ `@microsoft/copilot-studio-mcp` を起動し、サインインして環境を選ぶと、Copilot Studio のエージェントとワークフローの作成、テスト、公開、実行の調査などを言葉で頼めます。

### どちらも、ターミナルが前提

2 つとも、Node.js、CLI でのサインイン、AI アシスタントの利用契約が要ります。開発者には自然な方法ですが、ブラウザーの画面で Copilot に頼んでフローを作ってきた人には、ハードルが上がります。会社の PC にソフトを入れるには、情報システム部門の許可が要ることも多いでしょう。

## 管理者と推進担当がやること

1. **利用者に知らせる。** Microsoft も告知で、Power Automate と Copilot Studio の利用者への周知を求めています。既存のフローは止まらないことも一緒に伝えると、問い合わせが減ります。
2. **手順書と研修資料を直す。** Copilot や「Describe it to design it」を使う手順は、11 月 30 日のあとは使えません。
3. **言葉でフローを作り続けるなら、許可する AI アシスタントを決める。** GitHub Copilot CLI か Claude Code の契約に加え、Node.js と Azure CLI を配る必要があります。
4. **AI が作ったフローを有効にする前の確認を決める。** プラグインはフローを停止した状態で作ります。誰が中身を確かめて有効にするかを決めておきます。

## 同じ時期の、ほかの変更

- 2026 年 11 月 1 日以降に購入または更新した対象のライセンスには、AI Builder クレジットが付きません（MC1526652）。AI Builder は、AI Builder クレジットがなくなると Copilot Credits を使い、どちらもないと実行が止まります。
- Power Automate のモバイルアプリ（iOS、Android）は、2026 年 8 月 31 日で非推奨になりました。
- 2026 年 11 月 15 日から、Dataverse for Teams の環境と、管理されていない開発者環境は新しく作れなくなります。

## ターミナルを使わずに、言葉で自動化を作るなら

[Kitewell](/ja/) は、Descarty がつくっている自動化ツールです。やってほしい仕事を言葉で伝えると、AI がワークフローを作ります。Web サイトやデスクトップアプリの操作は、AI が一度やってみせて覚え、2 回目からは覚えた操作をくり返します。画面が変わったときは AI が覚え直し、大事なところは人の承認を待ちます。

Power Automate のクラウドフローを置き換えるものではありません。SharePoint、Teams、承認をつなぐ仕事は、Power Automate のほうが向いています。Kitewell が向いているのは、API がなく、画面を操作するしかない仕事です。

- [スプレッドシートの行を Web フォームに入力する](/ja/examples/form-from-sheet/)
- [Excel から、API のないデスクトップアプリに入力する](/ja/examples/desktop-data-entry/)
- [PDF の請求書を Excel に転記する](/ja/examples/pdf-invoices-to-excel/)
- [毎朝のメールをまとめる](/ja/examples/inbox-digest/)

頼むのはアプリの画面からでも、[ChatGPT や Claude から MCP 経由](/ja/docs/mcp/)でもかまいません。ターミナルも Node.js も要りません。ブラウザーで使う Kitewell Cloud か、自分のコンピューターで動かせます。[カード登録なしで 14 日間無料](/ja/pricing/)で試せます。

## よくある質問

### Copilot で作ったフローは、11 月 30 日のあとも動きますか

動きます。告知は、Copilot で作成または編集したフローも含めて、既存のフローを削除、移動、変更しないとしています。

### Copilot で作ったフローは、あとから直せますか

デザイナーで手で直せます。言葉で直したい場合は、Power Automate プラグインに既存のフローの編集を頼めます。

### Power Automate for desktop の Copilot も終わりますか

今回の 2 つの告知が対象にしているのは、クラウドフローとエージェントフローです。Power Automate for desktop の名前はありません（2026 年 11 月 8 日時点）。

### Power Automate プラグインに費用はかかりますか

プラグインそのものは、GitHub の microsoft/power-platform-skills で公開されています。使うには、GitHub Copilot CLI か Claude Code の利用契約と、Power Automate のライセンスが要ります。

## 出典

いずれも 2026 年 11 月 8 日に確認しました。

- [MC1540258：Power Automate のデザイナーにおける Copilot のサポート終了（メッセージセンターの写し）](https://mc.merill.net/message/MC1540258)
- [MC1537406：「Describe it to design it」のサポート終了（メッセージセンターの写し）](https://mc.merill.net/message/MC1537406)
- [Microsoft Learn：Get started with the Power Automate plugin for GitHub Copilot CLI and Claude Code](https://learn.microsoft.com/en-us/power-automate/power-automate-plugin-external-tools)
- [Microsoft Learn：Connect to Microsoft Copilot Studio with MCP](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/copilot-studio-mcp)
- [Microsoft Learn：Important changes (deprecations) coming in Power Platform](https://learn.microsoft.com/en-us/power-platform/important-changes-coming)
- [MC1526652：AI Builder クレジットの廃止（メッセージセンターの写し）](https://mc.merill.net/message/MC1526652)
- [GitHub：microsoft/power-platform-skills](https://github.com/microsoft/power-platform-skills)
