---
title: Schedules and background operation
---

## Choose a schedule

In the workflow editor, **Schedule** offers manual, daily, weekday, weekly,
hourly, and custom schedules. Check the timezone, save your changes, and
confirm **Enable saved schedules** is enabled.

## Keep Runstead running

- Closing the window or choosing **Keep Running in Menu Bar** hides the window
  while the service and project engines continue running.
- **Open Runstead** restores the interface.
- **Quit Runstead** stops the service and project engines. Save drafts and let
  active jobs finish first.
- **Start at login** opens Runstead in the menu bar when you sign in.

The menu bar lists projects with individual Start and Stop controls. Switching
projects in the interface does not stop other projects' schedules.

## Sleep, logout, and missed runs

The Mac must be awake and your user logged in. Runstead does not wake a sleeping
Mac. A powered-off, sleeping, or logged-out machine cannot run work at the
scheduled time.

Missed-run behavior depends on the workflow and project catch-up settings.
Check the catch-up period and missed-run policy in workflow defaults, then
verify the behavior with your own schedule. Do not assume every missed run will
be replayed after the Mac wakes.

## Task requirements

A command runs with your macOS user's permissions. Docker tasks need a running
Docker daemon. AI tasks need their configured tool or provider. Remote tasks
need a reachable server and accepted SSH host key. Test those prerequisites
before scheduling unattended work.
