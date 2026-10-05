---
title: Kitewell のアンインストール
---

Kitewell アプリを取り除くことと、作ったものを消すことは別の操作です。このページのとおりに進めると、アプリだけが消え、プロジェクト、実行履歴、バックアップはそのまま残ります。あとで入れ直せば、そのまま続きから使えます。データも消したい場合は、最後の節を読んでください。

## 始める前に

作業を保存し、実行中のワークフローが終わるのを待ってください。アンインストールはそれを待ちません。今すぐ終わらせたい場合は、Mac ではメニューバー、Windows ではトレイメニューで **Quit Kitewell** を選びます。すべてのプロジェクトのエンジンも一緒に止まります。

## Mac の場合

1. メニューバーのメニューで **Start at login** をオフにします。次回のログイン時に Kitewell が起動されなくなります。すでに Kitewell を消してしまった場合は、**システム設定 → 一般 → ログイン項目** から削除してください。表示名は macOS のバージョンによって異なります。
2. メニューバー、または画面上部の Kitewell のメニューで **Quit Kitewell** を選びます。⌘Q は **Keep Running in Menu Bar** で、ウィンドウを隠すだけです。
3. **Kitewell.app** を「アプリケーション」フォルダーからゴミ箱に移動します。

### バックグラウンド登録が残っていたら

Kitewell はバックグラウンドサービスを macOS の launch agent として動かし、終了時に解除します。解除されずに残った場合や、古いバージョンが `~/Library/LaunchAgents` に残した場合は、Kitewell を使っていたのと同じ macOS ユーザーで、ターミナルから次の行を実行すると消えます。

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

これらは登録と、アプリが自分のサービスに接続するために使っていたトークンを削除します。ワークフローやバックアップには触れません。

## Windows の場合

1. **設定 → アプリ → インストールされているアプリ** を開き、**Kitewell** を探して **アンインストール** を選びます。
2. アンインストーラーは実行中の Kitewell に終了を求め、バックグラウンドサービスを停止し、ユーザーアカウントからアプリを削除します。データは残ります。
3. そのあとも **設定 → アプリ → スタートアップ** に Kitewell が残っている場合は、そこでオフにしてください。

## 残るデータ

残るものは 1 つのフォルダーにまとまっています。

- Mac：`~/Library/Application Support/Kitewell`
- Windows：`%LOCALAPPDATA%\Kitewell`

この中に、プロジェクト、実行履歴、シークレット、バックアップ、ログが入っています。入れ直す可能性があるなら、残しておいてください。

完全に消す場合は、先に必要なバックアップやファイルをコピーしてから、Finder またはエクスプローラーでこのフォルダーを削除します。元には戻せません。

このデバイスで [Dagu Cloud](/ja/docs/cloud-sync/) とプロジェクトを同期していた場合、プロジェクトは Dagu Cloud に残ります。このデバイスは、別のコンピューターを接続して置き換えるまで、ワークスペースのプランの台数に数えられたままです。枠を空けるには、Dagu Cloud の **Kitewell** ページでこのデバイスの接続を解除してください。
