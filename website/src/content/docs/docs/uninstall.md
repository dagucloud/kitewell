---
title: Uninstall Kitewell
---

Uninstalling the app and deleting workspace data are separate actions.
These instructions preserve your workflows and backups.

1. Save your work, let active jobs finish, and choose **Quit Kitewell**.
2. Remove Kitewell from **System Settings → General → Login Items** if it is
   configured to start at login. Labels can vary by macOS version.
3. Move **Kitewell.app** from Applications to the Trash.

## Remove a leftover background registration

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

## Workspace data

Your remaining data is in `~/Library/Application Support/Kitewell`. Keep it to
reinstall later. If you want to remove it permanently, first copy any needed
backups and external files, then remove that folder using Finder.
