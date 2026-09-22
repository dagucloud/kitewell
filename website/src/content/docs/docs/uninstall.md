---
title: Uninstall Runstead
---

Uninstalling the app and deleting workspace data are separate actions.
These instructions preserve your workflows and backups.

1. Save your work, let active jobs finish, and choose **Quit Runstead**.
2. Remove Runstead from **System Settings → General → Login Items** if it is
   configured to start at login. Labels can vary by macOS version.
3. Move **Runstead.app** from Applications to the Trash.

## Remove a leftover background registration

If a Runstead launch agent remains, run these commands
in Terminal as the same macOS user who ran the app:

```sh
launchctl bootout "gui/$(id -u)/xyz.runstead.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.runstead.agent.plist"
rm -f "$HOME/Library/Application Support/Runstead/xyz.runstead.agent.plist"
rm -f "$HOME/Library/Application Support/Runstead/native-token"
```

These remove the per-user service registration and native connection token.
They do not delete workflow data or backups.

## Workspace data

Your remaining data is in `~/Library/Application Support/Runstead`. Keep it to
reinstall later. If you want to remove it permanently, first copy any needed
backups and external files, then remove that folder using Finder.
