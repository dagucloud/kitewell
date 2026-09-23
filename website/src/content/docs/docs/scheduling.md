---
title: Schedules and background operation
---

## Choose a schedule

In the workflow editor, **Schedule** offers manual, daily, weekday, weekly,
hourly, and custom schedules. Check the timezone, save your changes, and
confirm **Enable saved schedules** is enabled.

## Keep Kitewell running

On macOS:

- Closing the window or choosing **Keep Running in Menu Bar** hides the window
  while the service and project engines continue running.
- **Open Kitewell** restores the interface.
- **Quit Kitewell** stops the service and project engines. Save drafts and let
  active jobs finish first.
- **Start at login** opens Kitewell in the menu bar when you sign in.

The menu bar lists projects with individual Start and Stop controls. Switching
projects in the interface does not stop other projects' schedules.

## Sleep, logout, and missed runs

The computer must be awake and your user logged in. Kitewell does not wake a
sleeping computer. A powered-off, sleeping, or logged-out machine cannot run work at the
scheduled time.

Missed-run behavior depends on the workflow and project catch-up settings.
Check the catch-up period and missed-run policy in workflow defaults, then
verify the behavior with your own schedule. Do not assume every missed run will
be replayed after the computer wakes.

## Task requirements

A command runs with the permissions of the user running Kitewell. Docker tasks need a running
Docker daemon. AI tasks need their configured tool or provider. Remote tasks
need a reachable server and accepted SSH host key. Test those prerequisites
before scheduling unattended work.
