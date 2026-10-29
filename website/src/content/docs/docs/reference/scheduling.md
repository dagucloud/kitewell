---
title: Schedule reference
---

Everything about schedules that [Schedules and background
operation](/docs/scheduling/) leaves out.

## What the verdict means

Every scheduled workflow carries one of five verdicts, under its next start
in the **Workflows** list and under the forecast in the schedule editor.

- **Will run**, or **Will run, signed in or not** once the Windows service is
  on: nothing stands in the way. A note after it, such as the device being on
  battery, says what to know.
- **Runs only while you're signed in**: the run happens, but only if someone
  is signed in with Kitewell open. On Windows that is the case while the
  service is off, and for a workflow with a desktop step or a visible browser
  window even with it on.
- **Won't run**: something blocks it. The reason and its fix follow.
- **Paused**: the workflow's schedule is paused.
- **Manual runs only**: the workflow has no schedule.

The reasons a verdict can name, worst first:

- the sign-in service cannot start the engine: a refused or missing
  password, a locked, disabled or expired account, or the right to log on as
  a batch job denied;
- the project is paused, or its engine or its scheduler is not running;
- the workflow is held, or its schedule cannot be read;
- a password is about to expire;
- the power plan refuses wake timers;
- the device is on battery;
- a browser sign-in needs your password;
- the schedule's timezone differs from the device's.

Each reason has one fix, offered as a button where the reason is shown:
turn the service on, update or add the password, copy the text for IT,
resume the project, start or restart the engine, edit the workflow or its
schedule, or open Device settings.

The verdicts are worked out again within a minute of any change, and at
once after a workflow is saved or an engine starts or stops.

## The first schedule

The first time a workflow on a device gets a live schedule, a card above the
**Workflows** list says so once, with the verdict and **Test the schedule
now**. **Got it** dismisses it.

## Test the schedule now

Runs the workflow once through the same queue and under the same rules a
scheduled run would use, and opens the run. The run is listed as
**Schedule test**. It never stands in for a scheduled time that was missed.

## The Windows sign-in service

With **Run when nobody is signed in** on, a Windows service named Kitewell
sign-in starts the engine when the PC starts, as the run account, and keeps
it running. It needs Kitewell Team, or the trial; on Kitewell Personal,
schedules run only while you are signed in.

The run account is you, signed in without a password the way Windows Task
Scheduler runs a task that keeps none; on Windows Server, a local account
Kitewell creates, `Kitewell Runner`; or another account you name, with its
password.

What that gives you:

- Schedules run after a restart before anyone signs in.
- The PC is held awake from five minutes before a scheduled run until two
  minutes after it, and a wake timer is set a minute before the next run,
  when the power plan allows wake timers.
- When you sign in, the engine moves into your session, so desktop steps
  reach your screen; when you sign out, it moves back.

What it does not do:

- Give a desktop step or a visible browser window a screen while nobody is
  signed in. Those workflows read **Runs only while you're signed in**.
- Reach network shares, or sign-ins Windows protects with your password,
  until you add the password with **Use my password…**. The verdict names
  the workflows that need it.
- Change where your files go: runs still happen as you, with your folders
  and settings.

Setup.exe installs Kitewell for your account with no administrator prompt,
so it does not set the service up. Turn it on from **Device settings → Run
when nobody is signed in** once the app opens. A declined prompt or a setup
that stopped is recorded; the Device card says so and offers the feature
again.

After an update, a signed Kitewell brings the service's copy of the programs
up to the new version by itself, with no prompt.

The service's programs live in `C:\Program Files\Kitewell` and its data in
`C:\ProgramData\Kitewell`, moved there once from your own data folder.
Turning the feature off removes the service and keeps the data where it is.

Every start, stop, refused sign-in and setup is in Event Viewer under the
source **Kitewell sign-in**. A password you add is kept by Windows in the
same protected store it keeps service passwords in, never in a Kitewell
file.

## Missed runs

A scheduled time that went by without a run is written down with one of four
reasons:

| Reason shown | What happened |
| --- | --- |
| the device was asleep | The computer slept through the time |
| Kitewell wasn't running | Kitewell, or on Windows the service, was not running |
| the project engine wasn't running | The project was paused or its engine was down |
| no run started | Everything was up and the engine did not start it |

The first three are the device's doing, the last the workflow's. In **Runs &
logs**, a **Missed** row sits at the scheduled time among the runs, with the
reason, and the **Missed** tab lists them alone.

The row says **Catch-up is on; the engine runs it when it can**, **Catch-up
is off, so it will not run later**, or **Caught up by a run at** a time,
which opens that run. Missed rows cannot be retried or deleted; they age out
with the run history.

On Windows, the line shown at sign-in after a night away counts them: "12
runs, 1 failed; 2 scheduled runs didn't start".

## Catch-up

Catch-up runs the starts that were missed once the computer is back. Change
it for one workflow under **Schedule → Missed schedules**:

- **Catch up missed schedules**: **Follow the project default**, **Off**, or
  **Custom lookback**.
- **Lookback window**: how far back to look, up to 30 days. The default is
  24 hours.
- **Missed schedule policy**: **Run every missed occurrence**,
  **Run only the latest missed occurrence**, or **Skip while a run is active**.

**Project settings → Workflow defaults** sets the same for a project, and
**Device settings → Workflow defaults** sets the starting values for new
projects only. At most 1,000 missed starts are kept per workflow.

With Kitewell Personal or Team, a [missed-schedule alert](/docs/alerts/) says
how many scheduled runs did not start and why.

## More schedules, pauses, and webhooks

A workflow can have more than one schedule, and can be told to stop or
restart at a time: **Additional schedules** holds those. **Pause schedule**
on the **Workflows** list takes one workflow out of the rota; a project
downloaded from a workspace arrives with its workflows paused.

A workflow can also start when another service sends it a request. Turn on
its **Webhook** in the **Schedule** view. [Start a workflow from a
webhook](/docs/webhooks/) says what a request carries.

A webhook address looks like `https://hooks.kitewell.app/…`; a request must
be a POST, and the reply is `202`. A step reads the body from
`$WEBHOOK_PAYLOAD` and the headers from `$WEBHOOK_HEADERS`.

A webhook accepts about 60 requests a minute, a body up to 512 KiB, and
headers up to 16 KiB; the last 20 requests are kept under **Recent
requests**. On Windows, a body over roughly 32,000 characters may not start
a run, because of a limit on how long a command line may be.

## Queues

Queues stop everything starting at once. Every project has a **default**
queue that runs 5 at a time; change it, or add your own, under **More →
Queues** with **Simultaneous runs**. A workflow picks its queue in its
**Settings**.

A queue paces manual starts, catch-up runs, retries, webhook runs, schedule
tests and [batch](/docs/batches/) rows; a run its schedule starts on time is
not held back. A queue a project does not define admits one run at a time.

## Before you leave it running alone

- A command runs with the permissions of the run account.
- A Docker step needs Docker running.
- An AI step needs its model or agent set up on this device.
- A step on another machine needs that machine reachable and its host key
  accepted.
- A [website step](/docs/browser/) needs Chrome and a successful
  **Check the browser**.
- A run that needs a secret with no value on this device fails at the start.

## Menu items

The menu bar and notification-area items are in the language you read
Kitewell in: **Open Kitewell**, **Quit Kitewell**, **Keep awake while
workflows run**, and **Open at Login** on a Mac or **Start at login** on
Windows.

A Mac also has **Keep Running in Menu Bar**, and Windows with the service on
adds **Update the background service…**.

Both menus list the projects, so you can start and stop each on its own. On
a Mac, **Quit Kitewell** stops everything and warns first if runs are in
progress. On Windows with the service on, it closes the window and leaves
the engine and its runs to the service.

## Details

- Run history is kept for 30 days to begin with, under **Device settings →
  Run history retention**. See [Runs and logs](/docs/runs/).
- Sleep protection on a Mac, **Device settings → Sleep protection**, keeps
  the computer awake while work is running. It is off to begin with, and does
  not wake the computer for a schedule that has not started.
- The Windows service is `kitewell-signin.exe`, registered as
  `KitewellSignin`; `sc query KitewellSignin` shows its state. Its setup log
  is `%LOCALAPPDATA%\Kitewell\logs\signin-setup.log`.
