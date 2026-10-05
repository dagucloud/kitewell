---
title: Install Kitewell
---

Kitewell is one app you install on your own Mac or Windows PC. Installing it
takes a few minutes and leaves you with an empty project, ready for your first
workflow.

## What you need

- A Mac running macOS 13 or later, or a PC running Windows 10 version 1809 or
  later, or Windows 11, 64-bit.
- An installer for your system. The [download page](/download/) lists what is
  available. If your system is not listed, its package is still being
  prepared.

You do not need an account, and you do not need Python, Docker, or any AI
tool. Install those later, only if a workflow of yours uses them.

## Install on a Mac

1. Open the [download page](/download/) and choose the download for your Mac.
   **Apple menu → About This Mac** tells you whether it has an Apple chip or
   an Intel one.
2. Open the `.pkg` file you downloaded and follow the installer. It puts
   Kitewell in Applications and asks for an administrator password.
3. Open **Kitewell** from Applications.
4. Choose **Start on this device**. Kitewell makes your first project and
   opens it. Choose **Sign in with Dagu Cloud** instead if you already have an
   account and want to [sync your projects](/docs/cloud-sync/).

Kitewell turns on **Start at login** the first time it runs, so your schedules
keep running after you restart the Mac. Turn it off in the menu bar menu
whenever you like.

Then [build your first workflow](/docs/getting-started/).

## Install on Windows

1. Open the [download page](/download/) and download
   `Kitewell-<version>-amd64-setup.exe`.
2. Open the file you downloaded. Windows may show a SmartScreen notice,
   because Kitewell is a new publisher. Check that the file's SHA256 matches
   the one shown beside the download, then choose **More info** and
   **Run anyway**.
3. Follow the installer. It offers to **Start Kitewell when you sign in**,
   which is ticked already. Leave it ticked so your schedules keep running
   after you restart the PC.

   ![The Windows installer offering to start Kitewell when you sign in](../../../assets/docs/en/windows-installer-start-at-login.png)

4. At the end, leave **Open Kitewell** ticked and finish. Kitewell opens.
5. Choose **Start on this device**. Kitewell makes your first project and
   opens it. Choose **Sign in with Dagu Cloud** instead if you already have an
   account and want to [sync your projects](/docs/cloud-sync/).

Closing the window does not stop Kitewell. It keeps running in the tray, the
small group of icons beside the clock. Left-click the Kitewell icon there to
open the window again.

Then [build your first workflow](/docs/getting-started/).

## If something goes wrong

- Windows says the installer is from an unknown publisher. Compare the
  file's SHA256 with the one on the [download page](/download/), then choose
  **More info** and **Run anyway**. If Windows says the signature is
  *invalid*, stop and [report it](/support/) rather than running it.
- Kitewell is installed but does not open. The installer says so in a
  message, and writes the same line to
  `%LOCALAPPDATA%\Kitewell\logs\shell.log`. Windows Smart App Control refuses
  to load an unsigned build of Kitewell, and a build downloaded from the
  release page is signed. See
  [Troubleshooting](/docs/troubleshooting/#kitewell-was-installed-but-did-not-start).
- The window is blank, or Kitewell asks to install WebView2. Choose
  **Install WebView2**. It takes about a minute. See
  [Troubleshooting](/docs/troubleshooting/#kitewell-asks-to-install-webview2).
- macOS says it cannot verify the installer. Stop, and
  [report the exact message](/support/) with the download URL and the version.

## Install a newer version over an old one

Save your edits and let running workflows finish first. Your projects, runs,
and the start-at-login choice are all kept, and runs already in progress keep
going.

- On a Mac, run the new `.pkg`. It closes the running app, replaces it,
  and restarts the background service. Unsaved drafts in the editor are lost.
  If the app will not close, choose **Quit Kitewell** from the menu bar and
  run the installer again.
- On Windows, run the new setup file. It asks the running Kitewell to
  leave; if the editor holds unsaved changes, Kitewell asks whether to discard
  them, and waits for your answer. It then replaces the app and opens the new
  version. If the installer says Kitewell is still running, choose
  **Quit Kitewell** from the tray menu and run it again.

Kitewell can also fetch the new version itself. See [Updates](/docs/updates/).

## Details

- Windows installs per user, under `%LOCALAPPDATA%\Programs\Kitewell`, with no
  administrator prompt. Your data lives separately, under
  `%LOCALAPPDATA%\Kitewell`.
- The Windows installer runs Microsoft's WebView2 installer when that runtime
  is missing. Kitewell's window is built on it.
- **Start Kitewell when you sign in** and the tray's **Start at login** write
  the same Windows setting, so an upgrade starts out matching whatever you
  last chose in the tray rather than whatever you chose during the last
  install.
- On a Mac, the `.pkg` needs an administrator password because it installs
  into Applications. Copying `Kitewell.app` into your own `~/Applications`
  folder instead works without one.
- Kitewell is built for Macs with an Apple chip and for Macs with an Intel
  processor, and for 64-bit Windows PCs with an Intel or AMD processor.
