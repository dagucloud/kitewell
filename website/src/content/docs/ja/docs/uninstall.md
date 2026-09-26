---
title: Kitewell のアンインストール
---

アプリのアンインストールとワークスペースデータの削除は、別々の操作です。以下の手順では、ワークフローとバックアップは保持されます。

1. 作業を保存し、実行中のジョブが終わるのを待ってから、**Quit Kitewell** を選びます。
2. ログイン時に起動するよう設定している場合は、**システム設定 → 一般 → ログイン項目**から Kitewell を削除します。表示名は macOS のバージョンによって異なる場合があります。
3. **Kitewell.app** を「アプリケーション」フォルダーからゴミ箱に移動します。

## 残ったバックグラウンド登録を削除する

Kitewell の launch agent が残っている場合は、アプリを実行していたのと同じ macOS ユーザーで、ターミナルから次のコマンドを実行します。

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

これらのコマンドは、ユーザー単位のサービス登録とネイティブ接続トークンを削除します。ワークフローのデータやバックアップは削除しません。

## ワークスペースデータ

残りのデータは `~/Library/Application Support/Kitewell` にあります。後で再インストールする場合は、そのまま残しておいてください。完全に削除する場合は、先に必要なバックアップと外部ファイルをコピーしてから、Finder でこのフォルダーを削除してください。
