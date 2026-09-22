---
title: Updates
---

Runstead has two separate update flows: the Mac application and its Dagu engine.

## Update the application

Choose **Check for Updates…** in the application menu or menu bar. When an
update is available, **Download and Install** downloads the matching installer,
checks its SHA256 checksum, and opens macOS Installer.

Save edits and let jobs finish before installing. Installation restarts
Runstead and its service. Back up important workspace data first.

Public builds use `https://runstead.dev/updates/macos/latest.json`. Until the
first public release, that feed is not available. An unavailable feed is an
update-check failure, not proof that the installed app is current.

## Update the workflow engine

Dagu updates are managed separately in device settings. Manual and scheduled
engine updates support verification, backup, and rollback. Updating Dagu does
not replace the Runstead Mac application.

## Recover from a problem

Report the app version, engine version, and macOS version with the error.
Older published installers remain on the [GitHub releases page](https://github.com/dagucloud/runstead/releases).
Installing an older app does not itself restore older workspace data; use a
suitable backup when recovery requires restoring data.
