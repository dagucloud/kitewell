---
title: Install Kitewell
---

## Requirements

- macOS 13 or later.
- An Apple Silicon or Intel Mac. Check **Apple menu → About This Mac**.
- Administrator access to install the package in Applications.

You do not need Go, Node.js, or Xcode to use the packaged app. Install Python,
Docker, command-line AI agents, or other tools only when a workflow uses them.

## Install the app

1. Open the [download page](/download/) and select your Mac's architecture.
2. Open the downloaded `.pkg` and follow macOS Installer.
3. Open **Kitewell** from Applications. Choose **Start on this device**, or
   **Sign in with Dagu Cloud** to [sync projects](/docs/cloud-sync/). Kitewell
   turns on **Start at login**, so it keeps running your schedules from the
   menu bar; turn it off in the menu bar menu.
4. [Create your first workflow](/docs/getting-started/). No account is needed
   for the free project.

Check the [download page](/download/) for current release availability.
If no installer is listed, the public package is still being prepared.

## Update an existing installation

Save edits and let active jobs finish before installing. The installer
closes the running Kitewell app, so unsaved drafts are lost, and restarts its
service; runs already in progress keep going. Workspace data and the
start-at-login preference are preserved. If the app does not close, quit
Kitewell and run the installer again.

See [Updates](/docs/updates/) for the app's update flow. If macOS reports that
it cannot verify an installer, stop and [report the exact message](/support/)
along with the download URL and version.
