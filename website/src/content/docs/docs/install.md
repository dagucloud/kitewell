---
title: Install Kitewell
---

Kitewell runs on macOS and Windows. Check the [download page](/download/)
for current release availability: if no installer is listed for your system,
the public package is still being prepared.

## macOS

### Requirements

- macOS 13 or later.
- An Apple Silicon or Intel Mac. Check **Apple menu → About This Mac**.
- Administrator access to install the package in Applications.

You do not need Go, Node.js, or Xcode to use the packaged app. Install Python,
Docker, command-line AI agents, or other tools only when a workflow uses them.

### Install the app

1. Open the [download page](/download/) and select your Mac's architecture.
2. Open the downloaded `.pkg` and follow macOS Installer.
3. Open **Kitewell** from Applications. Choose **Start on this device**, or
   **Sign in with Dagu Cloud** to [sync projects](/docs/cloud-sync/). Kitewell
   turns on **Start at login**, so it keeps running your schedules from the
   menu bar; turn it off in the menu bar menu.
4. [Create your first workflow](/docs/getting-started/). No account is needed
   for the free project.

## Windows

### Requirements

- Windows 10 version 1809 or later, or Windows 11, 64-bit (x64).
- Microsoft Edge WebView2. Most PCs already have it. The installer sets it up
  when it is missing, and Kitewell offers **Install WebView2** if it opens
  without it.
- No administrator access: the installer sets Kitewell up for your user
  account.

Nothing else needs to be installed first. Install Python, Docker,
command-line AI agents, or other tools only when a workflow uses them.

### Install the app

1. Open the [download page](/download/) and download
   `Kitewell-<version>-amd64-setup.exe`.
2. Open the installer. Because Kitewell is a new publisher, Windows may show a
   SmartScreen notice. Check that the file's SHA256 matches the one on the
   download page, then choose **More info → Run anyway**.
3. Follow the installer. It installs Kitewell for your user account, under
   `%LOCALAPPDATA%\Programs\Kitewell`, without an administrator prompt, and
   offers **Start Kitewell when you sign in**.
4. Kitewell opens when the installer finishes. Choose **Start on this device**,
   or **Sign in with Dagu Cloud** to [sync projects](/docs/cloud-sync/).
   Kitewell turns on **Start at login** the first time it runs, so it keeps
   running your schedules from the tray; turn it off in the tray menu.
   Closing the window keeps Kitewell running in the tray (the notification
   area); left-click the tray icon to open it again.
5. [Create your first workflow](/docs/getting-started/). No account is needed
   for the free project.

## Update an existing installation

Save edits and let active workflows finish before installing. Workspace data and
the start-at-login preference are preserved, and runs already in progress
keep going.

- On macOS, the installer closes the running Kitewell app, so unsaved drafts
  are lost, and restarts its service. If the app does not close, quit
  Kitewell and run the installer again.
- On Windows, the installer asks the running Kitewell to leave. If the editor
  holds unsaved changes, Kitewell asks whether to discard them first. The
  installer then replaces the app and opens the new version when it
  finishes. If it reports that Kitewell is still running, quit Kitewell from
  the tray menu and run the installer again.

See [Updates](/docs/updates/) for the app's update flow. If macOS reports that
it cannot verify an installer, or Windows reports that an installer's
signature is invalid, stop and [report the exact message](/support/) along
with the download URL and version.
