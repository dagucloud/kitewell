---
title: Schedules and background operation
---

## Choose a schedule

In the workflow editor, **Schedule** offers manual, daily, weekday, weekly,
hourly, and custom schedules. Check the timezone, save your changes, and
confirm **Enable saved schedules** is enabled.

## Keep Kitewell running

On macOS:

- Closing the window or choosing **Keep Running in Menu Bar** (⌘Q) hides the
  window while the service and project engines continue running.
- **Open Kitewell** restores the interface.
- **Quit Kitewell** stops the service and project engines. When runs are in
  progress, it warns first and then interrupts them. Save drafts and let
  active workflows finish first.
- **Start at login** opens Kitewell in the menu bar when you sign in.

On Windows:

- Closing the window hides it while the service and project engines continue
  running; Kitewell stays in the tray (the notification area).
- Left-click the tray icon, or choose **Open Kitewell** in its menu, to
  restore the interface.
- **Quit Kitewell** stops the service and project engines. When runs are in
  progress, it warns first and then interrupts them. Save drafts and let
  active workflows finish first.
- **Start at login** opens Kitewell in the tray when you sign in.

The menu bar menu and the tray menu list projects with individual Start and
Stop controls. Switching projects in the interface does not stop other
projects' schedules.

## Sleep, logout, and missed runs

The computer must be awake and your user logged in. Kitewell does not wake a
sleeping computer. A powered-off, sleeping, or logged-out machine cannot run work at the
scheduled time. **Device settings → Sleep protection**, or **Keep awake while
workflows run** in the menu bar menu on macOS or the tray menu on Windows,
keeps the computer from idle sleep while work is running; it is off by default.

By default, schedules missed in the previous 24 hours run after the computer
wakes. Change it for a project under **Project settings → Workflow defaults**,
or for one workflow under **Schedule → Missed schedules**:

- look back up to 30 days;
- run every missed occurrence, only the latest, or skip while a run is active;
- up to 1,000 missed starts per workflow are kept.

**Device settings → Workflow defaults** only sets the starting values for new
projects. Verify the behaviour with your own schedule rather than assuming
every missed run is replayed after the computer wakes.

With Kitewell Pro, a [missed-schedule alert](/docs/alerts/) says how many
scheduled runs did not start, and why.

## Queues

Queues limit how many runs go at once. Every project has a **default** queue
that runs 5 at a time; change it, or add queues, under **More → Queues**. A
workflow chooses its queue in its settings, and a queue the project does not
define admits one run at a time.

A queue paces manual starts, catch-up runs, retries, and
[batch](/docs/batches/) rows: each waits for a free slot. A run its schedule
starts on time is not held back. A batch sheet has a schedule of its own, set
on the sheet, separate from its workflow's. **Runs & logs** shows how many runs each
queue is running and how many are waiting, and lets you remove waiting runs.

## Run history

Kitewell keeps run history for 30 days by default. Change it under **Device
settings → Run history retention → Keep run history for**. Older runs are
removed once a day, for every workflow. See [Runs and logs](/docs/runs/) to
delete runs yourself.

## Task requirements

A command runs with the permissions of the user running Kitewell. Docker tasks need a running
Docker daemon. AI tasks need their configured tool or provider. Remote tasks
need a reachable server and accepted SSH host key. [Website
steps](/docs/browser/) need Chrome, a successful **Check the browser**, and
usually a hidden browser window. A run that needs a secret without a value on
this device fails at start. Test those prerequisites before scheduling
unattended work.

Workflows imported or downloaded from elsewhere arrive paused; the
**Overview** asks you to enable the ones this device should run.
