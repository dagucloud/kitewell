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
4. Choose **Sign in to use Kitewell's AI**. Your browser opens Dagu Cloud
   with a code to match. Once you confirm it, Kitewell makes your first
   project and opens it with its AI ready: no API key, and 100 free credits
   to start. To use your own AI key, or no AI, choose **Start on this
   device** instead.

Kitewell turns on **Open at Login** the first time it runs, so your schedules
keep running after you restart the Mac. Turn it off in the menu bar menu
whenever you like.

Then [build your first workflow](/docs/getting-started/).

## Install on Windows

1. Open the [download page](/download/) and download
   `Kitewell-<version>-win-x64-Setup.exe`.
2. Open the file you downloaded. Windows may show a SmartScreen notice,
   because Kitewell is a new publisher. Check that the file's SHA256 matches
   the one shown beside the download, then choose **More info** and
   **Run anyway**.
3. Kitewell installs itself for your user account, with nothing to answer and
   no administrator password, and opens when it is done.
4. Choose **Sign in to use Kitewell's AI**. Your browser opens Dagu Cloud
   with a code to match. Once you confirm it, Kitewell makes your first
   project and opens it with its AI ready: no API key, and 100 free credits
   to start. To use your own AI key, or no AI, choose **Start on this
   device** instead.

Kitewell turns on **Start at login** the first time it runs, so your schedules
keep running after you restart the PC. Turn it off in the tray menu whenever
you like. To keep schedules running before anyone signs in, open **Device
settings** and turn on **Run when nobody is signed in**; Windows asks once
for administrator approval, with no password, to set up the small Kitewell
sign-in service.

Closing the window does not stop Kitewell. It keeps running in the tray, the
small group of icons beside the clock. Left-click the Kitewell icon there to
open the window again.

Then [build your first workflow](/docs/getting-started/).

## If something goes wrong

- Windows says the installer is from an unknown publisher. Compare the
  file's SHA256 with the one on the [download page](/download/), then choose
  **More info** and **Run anyway**. If Windows says the signature is
  *invalid*, stop and [report it](/support/) rather than running it.
- Kitewell is installed but does not open. Windows Smart App Control refuses
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
- On Windows, run the new Setup.exe. It closes the running Kitewell,
  replaces it, and opens the new version; unsaved drafts in the editor are
  lost, so save first. With the sign-in service on, Kitewell brings the
  service up to the new version by itself when it next opens.

Kitewell can also fetch the new version itself. See [Updates](/docs/updates/).

## Details

- Windows installs the app per user, under `%LOCALAPPDATA%\Kitewell.App`,
  with no administrator prompt. Your data lives separately, under
  `%LOCALAPPDATA%\Kitewell`. The sign-in service is the one thing that needs
  the prompt: it copies the programs to `C:\Program Files\Kitewell` and moves
  the data to `C:\ProgramData\Kitewell`, once. See
  [Schedules](/docs/scheduling/#run-with-nobody-signed-in-windows).
- A silent install (`Setup.exe --silent`) shows nothing and never asks for
  the administrator prompt; the sign-in service is set up only from Device
  settings.
- Kitewell's window is built on the Microsoft Edge WebView2 runtime. When it
  is missing, Kitewell offers to install it as it opens.
- **Start at login** is turned on by a fresh install and left as you last
  set it in the tray across updates.
- On a Mac, the `.pkg` needs an administrator password because it installs
  into Applications. Copying `Kitewell.app` into your own `~/Applications`
  folder instead works without one.
- Kitewell is built for Macs with an Apple chip and for Macs with an Intel
  processor, and for 64-bit Windows PCs with an Intel or AMD processor.
