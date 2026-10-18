---
title: Updates
---

Kitewell keeps itself current. It downloads a new version in the background,
checks that Kitewell signed it, and installs it at a moment when you are not
using it. Running workflows keep going across the restart. The workflow
engine underneath, Dagu, ships inside each Kitewell release and changes only
when Kitewell does.

## How an update arrives

**Update Kitewell automatically** is on from the start, under **This device →
Device settings → Updates**. With it on, Kitewell:

1. Looks for a new version a minute after it opens, and then every six hours.
2. Downloads it in the background and checks its signature. Nothing is shown.
3. Installs it at the next safe moment: the next time you quit Kitewell, sign
   in, or restart the computer, or a quiet moment while no Kitewell window is
   open or you have been away from it for half an hour. The icon in the menu
   bar or the tray disappears for a few seconds and comes back, and a window
   that was open opens again on the same page.

Afterwards, one notification says **Kitewell updated to x.y.z** with
**What's new**, which opens the release notes on kitewell.app.

A new version reaches devices over two days, so not every computer sees it on
the same day. **Check for Updates…** in the Kitewell menu, the menu bar menu
on a Mac or the tray icon's menu on Windows, looks right away and gets the
release at once; otherwise it says **Kitewell is up to date**.

## What an update waits for

An update never interrupts work. It waits while:

- the assistant is thinking;
- a running workflow still has a desktop step ahead of it;
- an MCP client used Kitewell within the last two minutes;
- a Kitewell window holds unsaved edits.

Workflows never hold an update. They keep running on the engine they started
with, and the restarted Kitewell finds them again.

While an update waits, the Kitewell menu shows **Restart to Update to Kitewell
x.y.z**, which installs it now. It asks about unsaved edits and names anything
the restart would interrupt, with **Restart Now** and **When Idle**. If an
update has waited seven days, one notification says **Restart Kitewell to
finish updating**; if unsaved edits alone have held it for a day, one
notification asks you to save or discard them. Edits are never discarded for
an update.

## With automatic updates off

Kitewell still checks. When a new version is out, you get one notification,
and the menu reads **Update to Kitewell x.y.z…**. Choose it to download the
version, with progress shown in the menu; Kitewell then offers **Restart to
Update** or **Later**. Nothing installs until you choose it.

## When Dagu Cloud needs a newer Kitewell

Dagu Cloud can stop serving a version it no longer supports. Workflows,
schedules, and the local MCP server keep running; syncing, remote MCP,
webhooks, and run status stop until this computer updates. A banner in the
window says so and offers **Update Now**, which fetches the release at once,
whatever the settings, and installs it at the next safe moment or asks you to
restart after an hour.

## On a Mac that needs a password

Kitewell replaces itself without a password only when your macOS user owns
the app and can write to Applications. On a standard (non-administrator)
account, or when Kitewell was installed by another user or by device
management, nothing downloads in the background. The menu shows **Update to
Kitewell x.y.z…** with one notification; choosing it downloads the update and
shows macOS's administrator prompt. Kitewell never shows that prompt unasked.

## If something goes wrong

- A download or its check fails. Kitewell tries again at the next check,
  quietly. The menu says why if you open it.
- An install fails. The installed version stays in place and Kitewell starts
  it again; the next safe moment retries. After three failed installs of one
  version, Kitewell stops trying it and shows **Kitewell couldn't update.
  Download the installer** with a link to the [download page](/download/).
- The check fails. Check your network and the
  [release status](/releases/). Until the first public release for your
  system, there is no update feed to read, and a check that cannot reach one
  says so rather than claiming you are up to date.
- You need to go back a version. Older installers stay on the
  [GitHub releases page](https://github.com/dagucloud/kitewell/releases).
  Installing an older app does not bring back older data; restore a
  [backup](/docs/backups/) for that.

When you report a problem, include the Kitewell version, the engine version,
and your operating system version. The sidebar shows the Kitewell version at
the bottom left. The pill in the top bar shows the Kitewell version and the
engine version together. On a Mac, **About Kitewell** in the application menu
shows the Kitewell version; on Windows, the top of the tray menu shows the app
and service versions.

## Details

- Public builds read their update feed from
  `https://kitewell.app/updates/macos/latest.json` on a Mac and
  `https://kitewell.app/updates/windows/latest.json` on Windows.
- Checking and downloading leave workflows running. Only installing restarts
  anything.
- A download waits for 2 GB of free disk space and for a connection that is
  not metered. A downloaded update that has not installed yet is dropped when
  the release is paused or replaced.
- The notification after an update comes once per version, and only where
  Kitewell's notifications are allowed.
- On Windows, the update stops the background service for the few seconds of
  the swap, but not the runs under it: each run has a process group of its
  own. Only **Quit Kitewell** cancels runs.
- The engine Kitewell runs is the Dagu release built into that version of
  Kitewell, named in the release notes and on the
  [third-party licenses page](/third-party/).
