---
title: Troubleshooting
---

## A command works in Terminal but fails in Kitewell

The application's environment can differ from your interactive shell. Use
absolute executable paths, set a working folder, and provide required
variables explicitly. Check whether the command needs an interactive prompt
or a credential stored only in the shell session.

## A scheduled job did not run

Confirm the saved schedule is enabled, its timezone is correct, the project
engine is running, and the computer was awake with your user logged in. Check
the workflow's **Schedule → Missed schedules** and the workflow defaults before
expecting a missed schedule to run later.

The **Overview** also points out what stops scheduled work: a stopped project
engine, a workflow the engine will not accept (everything else keeps
running), workflows that arrived paused, and secrets that still need a value
on this device.

## A run failed

Open the run from **Runs & logs**. **Inspect failure** shows the failed step
and its log. **Fix in editor** lets you correct the workflow and continue the
run from a step you choose, and **Ask the assistant** looks into it for you.
With [failure diagnosis](/docs/ai/#failure-diagnosis) on, the run says whether
to try again, what needs you, or what to change. See
[Runs and logs](/docs/runs/#fix-a-failed-run).

## A website step fails

Check the step's screenshots in the run's artifacts first: a sign-in page,
cookie banner, or bot check often explains it. Also check that:

- Chrome is installed and **Check the browser** succeeds;
- the page's hosts are in **Allowed websites**, if you set it;
- waits are long enough for the page;
- no instruction contains a secret; use **Values the browser types**;
- the step or workflow has a model chosen.

If a site changed and a replayed action no longer works, clear it under
**Project settings → Storage → Replay cache**. See
[Automate a website](/docs/browser/).

## A desktop step fails

Check the step's screenshots in the run's artifacts first. Then check that:

- **Device settings → Desktop automation → Check desktop access** reports
  every permission as allowed; on macOS, **Kitewell Agent** needs Screen
  Recording and Accessibility, and on Windows, Kitewell must run in your
  signed-in session, not as a service;
- the screen is unlocked and the computer is awake; a locked screen fails
  every desktop step;
- on Windows, the app does not run as administrator while Kitewell does not;
- the task fits within **Most actions per task**, or is split into smaller
  tasks;
- the model has a computer-use tool, or the step uses **Plain tools, for any
  vision model**;
- no instruction contains a secret; use **Values the step types**.

A step that waited for the desktop to be free was paused by your own mouse or
keyboard; on a computer nobody works at, shorten or turn off the wait under
**Desktop settings**. If an app changed and a replayed task no longer works,
clear it under **Project settings → Storage → Replay cache**. See
[Automate a desktop app](/docs/desktop/).

## Google says "This app is blocked"

Until Google finishes reviewing Kitewell's Gmail access, it blocks Kitewell's
browser sign-in for most accounts, and the page offers no way past it. Close
it, return to Kitewell, and choose **Use an app password instead**. See
[Automate email](/docs/email/).

## A mailbox needs reconnecting

A run that names a mailbox this computer cannot sign in to is refused, and
the Overview says which address to connect or reconnect. Open **Mail
accounts** and choose **Reconnect**. Common causes:

- the account's password changed, or an administrator revoked sessions;
- a Google sign-in went unused for six months, or a Microsoft sign-in was
  refreshed more than 90 days ago because the computer was off;
- an app password was deleted on the provider's site;
- a Microsoft 365 administrator turned off IMAP or Authenticated SMTP, or
  requires admin approval for Kitewell; the error carries the link to send
  them;
- a Google Workspace administrator blocks third-party apps.

A project that arrived from a teammate or from Dagu Cloud lists its
mailboxes as not connected until you connect them here. See
[Automate email](/docs/email/).

## A run is missing from history

Runs older than the run history retention are removed, and editors can delete
runs. See [Runs and logs](/docs/runs/#delete-runs).

## Docker is unavailable

Start the local Docker daemon and use **Check Docker** in the workflow editor.
Kitewell does not install or start Docker. Check that mounts and file paths
exist on the machine where the container runs.

## An AI task fails

Verify the agent is installed and signed in, or that the selected model has a
valid provider credential. **Test agent** and **Test model** in **Agents &
models** check this before a run. Review the recorded prompt, task stderr, provider
limits, and billing status. Keep real credentials out of issue reports.

## An update check fails

Check the network and [release status](/releases/). The public update feed is
not active before the first public release. Report a persistent checksum or
installer verification failure instead of bypassing it.

## Windows shows a SmartScreen notice

Windows may warn about an installer from a new publisher. Check that the
downloaded file's SHA256 matches the one on the [download page](/download/),
then choose **More info → Run anyway**. If Windows reports that the
installer's signature is invalid, stop and [report it](/support/) instead.

## Kitewell asks to install WebView2

Kitewell's window needs the Microsoft Edge WebView2 runtime. The installer
sets it up when it is missing; if Kitewell still opens without it, choose
**Install WebView2** in the window. It downloads the runtime from Microsoft
and takes about a minute.

## Find logs

Start with **Runs & logs** for a task failure. Open **This device →
Diagnostics** to view, search, or download service and project engine logs.
Each log rotates at 10 MiB and keeps three archives. Service logs are under
`~/Library/Application Support/Kitewell/logs` on macOS and
`%LOCALAPPDATA%\Kitewell\logs` on Windows, where `shell.log` also records
what the app itself did: starts, restarts, and quits.

If the guides do not resolve the issue, [open a support issue](/support/) with
versions, reproduction steps, and sanitized output.
