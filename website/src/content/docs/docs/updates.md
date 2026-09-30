---
title: Updates
---

Kitewell has two separate update flows: the application and its Dagu engine.

## Update the application

Choose **Check for Updates…**: on macOS in the application menu or the menu
bar menu, on Windows in the tray menu. When an update is available,
**Download and Install** downloads the matching installer and checks its
SHA256 checksum before anything runs.

- On macOS, it then opens macOS Installer.
- On Windows, it then runs the installer on its own: Kitewell asks about
  unsaved changes and exits, and the installer replaces it, restarts its
  service, and opens the new version.

Save edits and let jobs finish before installing. Installation restarts
Kitewell and its service; runs in progress keep going, but unsaved drafts are
lost. Back up important workspace data first.

Public builds read their update feed from
`https://kitewell.app/updates/macos/latest.json` on macOS and
`https://kitewell.app/updates/windows/latest.json` on Windows. Until the
first public release for a system, its feed is not available. An unavailable
feed is an update-check failure, not proof that the installed app is current.

## Update the workflow engine

Dagu updates are managed separately in **Device settings → Updates**. New
installations update the engine automatically at 03:00 local time; change the
**Update hour** or turn off **Automatic engine updates** there. **Check for
updates** and **Install update** update it by hand. Kitewell installs the
latest stable Dagu release after checking its SHA256 checksum, keeps a copy of
the engine's data during the update, and restores it if the update fails.

An engine update waits until no project has a run running, queued, or
waiting; automatic updates try again every 15 minutes. Updating Dagu does not
replace the Kitewell application.

## Recover from a problem

Report the app version, engine version, and operating system version with the error.
The sidebar shows the app version, the top bar shows the app and engine
versions, and **About Kitewell** shows the app version.
Older published installers remain on the [GitHub releases page](https://github.com/dagucloud/kitewell/releases).
Installing an older app does not itself restore older workspace data; use a
suitable backup when recovery requires restoring data.
