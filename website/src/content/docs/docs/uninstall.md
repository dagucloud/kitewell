---
title: Uninstall Kitewell
---

Removing the Kitewell app and deleting your work are two separate things.
Following this page removes the app and leaves your projects, runs, and
backups where they are, so a later reinstall picks them up again. The last
section removes the data as well, when that is what you want.

## Before you start

Save your work and let running workflows finish. Uninstalling does not wait
for them. To end them now, choose **Quit Kitewell** from the menu bar on a Mac
or from the tray menu on Windows. That stops every project engine with it.

## On a Mac

1. Turn off **Start at login** in the menu bar menu, so nothing tries to open
   Kitewell at the next login. If Kitewell is already gone, remove it under
   **System Settings → General → Login Items** instead. The wording there
   varies by macOS version.
2. Choose **Quit Kitewell** from the menu bar, or from the Kitewell menu at
   the top of the screen. ⌘Q is **Keep Running in Menu Bar**, which only hides
   the window.
3. Drag **Kitewell.app** from Applications to the Trash.

### If a background registration is left behind

Kitewell runs its background service through a macOS launch agent and unloads
it when you quit. A copy left loaded, or one left in `~/Library/LaunchAgents`
by an older version, is removed by running these lines in Terminal, as the
same macOS user who ran Kitewell:

```sh
launchctl bootout "gui/$(id -u)/xyz.kitewell.agent" 2>/dev/null || true
rm -f "$HOME/Library/LaunchAgents/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/xyz.kitewell.agent.plist"
rm -f "$HOME/Library/Application Support/Kitewell/native-token"
```

They remove the registration and the token the app used to reach its own
service. They do not touch your workflows or backups.

## On Windows

1. Open **Settings → Apps → Installed apps**, find **Kitewell**, and choose
   **Uninstall**.
2. The uninstaller asks the running Kitewell to leave, stops its background
   service, and removes the app from your user account. Your data stays.
3. If Kitewell still appears under **Settings → Apps → Startup** afterwards,
   turn it off there.

## Your data

What is left behind sits in one folder:

- On a Mac: `~/Library/Application Support/Kitewell`
- On Windows: `%LOCALAPPDATA%\Kitewell`

It holds your projects, their run history, their secrets, your backups, and
the logs. Keep it if you might reinstall.

To remove it for good, first copy out any backups and files you still want,
then delete that folder in Finder or File Explorer. This cannot be undone.

If this device synced projects with [Dagu Cloud](/docs/cloud-sync/), the
projects stay there. The device still counts toward the computers the
workspace's plan holds until you connect another computer that replaces it.
Disconnect it on the **Kitewell** page in Dagu Cloud to free the place.
