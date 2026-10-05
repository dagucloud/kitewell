---
title: Uninstall Kitewell
---

Uninstalling the app and deleting workspace data are separate actions.
These instructions preserve your workflows and backups.

## macOS

1. Save your work, let active workflows finish, and choose **Quit Kitewell**
   from the menu bar or the application menu. ⌘Q only hides the window.
2. Turn off **Start at login** in the menu bar menu before quitting, or remove
   Kitewell from **System Settings → General → Login Items**. Labels can vary
   by macOS version.
3. Move **Kitewell.app** from Applications to the Trash.

### Remove a leftover background registration

If a Kitewell launch agent remains, run these commands
in Terminal as the same macOS user who ran the app:

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

These remove the per-user service registration and native connection token.
They do not delete workflow data or backups.

## Windows

1. Save your work and let active workflows finish. The uninstaller does not
   cancel runs that are in progress; to end them first, choose **Quit Kitewell**
   from the tray menu.
2. Open **Settings → Apps → Installed apps**, find **Kitewell**, and choose
   **Uninstall**. The uninstaller asks the running Kitewell to leave, stops
   its service, removes the app from your user account, and removes the
   start-at-login entry. It keeps your data.

## Workspace data

Your remaining data is in `~/Library/Application Support/Kitewell` on macOS
and `%LOCALAPPDATA%\Kitewell` on Windows. Keep it to reinstall later. If the
device synced projects with [Dagu Cloud](/docs/cloud-sync/), they stay there,
and the device keeps one of your three places in the workspace until a fourth
device replaces it. If you want to remove it permanently, first copy any
needed backups and external files, then remove that folder using Finder or
File Explorer.
