---
title: Kitewell のアンインストール
---

アプリのアンインストールとワークスペースデータの削除は、別々の操作です。以下の手順では、ワークフローとバックアップは保持されます。

## macOS

1. 作業を保存し、実行中のワークフローが終わるのを待ってから、メニューバーまたはアプリケーションメニューで **Quit Kitewell** を選びます。⌘Q はウィンドウを隠すだけです。
2. 終了する前にメニューバーのメニューで **Start at login** をオフにするか、**システム設定 → 一般 → ログイン項目**から Kitewell を削除します。表示名は macOS のバージョンによって異なる場合があります。
3. **Kitewell.app** を「アプリケーション」フォルダーからゴミ箱に移動します。

### 残ったバックグラウンド登録を削除する

Kitewell の launch agent が残っている場合は、アプリを実行していたのと同じ macOS ユーザーで、ターミナルから次のコマンドを実行します。

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

これらのコマンドは、ユーザー単位のサービス登録とネイティブ接続トークンを削除します。ワークフローのデータやバックアップは削除しません。

## Windows

1. 作業を保存し、実行中のワークフローが終わるのを待ちます。アンインストーラーは実行中の処理を中断しません。先に終わらせたい場合は、トレイメニューで **Quit Kitewell** を選んでください。
2. **設定 → アプリ → インストールされているアプリ** を開き、**Kitewell** の **アンインストール** を選びます。アンインストーラーは実行中の Kitewell に終了を求め、サービスを停止し、ユーザーアカウントからアプリを削除して、ログイン時に起動する登録も取り除きます。データは残ります。

## ワークスペースデータ

残りのデータは次の場所にあります。後で再インストールする場合は、そのまま残しておいてください。

- macOS：`~/Library/Application Support/Kitewell`
- Windows：`%LOCALAPPDATA%\Kitewell`

[Dagu Cloud](/ja/docs/cloud-sync/)とプロジェクトを同期していた場合、プロジェクトは Dagu Cloud に残ります。このデバイスは、4 台目のデバイスに置き換えられるまで、ワークスペースで使える 3 台分の枠の 1 つを使い続けます。

完全に削除する場合は、先に必要なバックアップと外部ファイルをコピーしてから、Finder またはエクスプローラーでこのフォルダーを削除してください。
