---
title: Runs and logs
---

**Runs & logs** lists every run in the project, newest first, and opens each
one to its steps, logs, and files.

## Find a run

Filter by workflow, by **Created within** (the last 7 days by default, or any
period up to all time), or by **Run ID**, and switch between all runs, runs
running or queued, waiting, failed, succeeded, and cancelled. The summary
shows runs in progress, failed runs, and the success rate. **Pause updates**
stops the list from refreshing, and **Export page** saves the runs shown.
Queued runs appear with their queue, and **Batches** opens the
[batch sheets](/docs/batches/).

## Read a run

A run opens on its graph. Select a step for its output and logs:

- **Search entire log** finds text in the whole log, not only what is shown.
- **Download this log** saves one step's log; **All step logs (ZIP)** saves
  every step's.
- **Output**, **Step details**, **Parameters**, and **Artifacts** show what the
  run produced and ran with. **Items** lists the items a loop processed.
- **Waiting for you** holds the step a person must act on, such as an
  approval, a human task, or a website step's question.

## Act on a run

- **Retry…** runs a finished run again under the same run ID; **Retry from
  this step** repeats one step and, optionally, what follows it.
- **New run…** starts a fresh run with the recorded inputs, which you can
  change.
- **Cancel run** stops a run that is running or queued.
- **Change status…** marks a step succeeded or failed, for example after you
  fixed its effect by hand.

## Fix a failed run

A failed run offers several ways forward:

- **Inspect failure** opens the failed step.
- **Fix in editor** opens the workflow at that run. Edit it, then choose
  **Save and continue…**, pick where to **Start from**, and review which steps
  run again and which results are reused. This starts a new run with the same
  inputs and files; the failed run stays in history.
- **Ask the assistant** asks [the assistant](/docs/ai/#the-assistant) to find
  out why and propose a fix.
- With [failure diagnosis](/docs/ai/#failure-diagnosis) on, the run also shows
  what the failure calls for and the next step.

## Delete runs

Editors can delete a finished run with **Delete run**, or select several and
choose **Delete…**. Runs still in progress are kept. Deleting a workflow can
also delete its run history. Kitewell removes runs older than **Device
settings → Run history retention** (30 days by default) once a day, and
**Project settings → Storage** shows how much each workflow's history uses,
with **Delete history…**.

## Artifacts

**Artifacts** lists the files every finished run in the project saved, newest
first. A step saves a file when it writes to `$DAG_RUN_ARTIFACTS_DIR` or has an
**Artifact name**; website steps save screenshots and downloads there.

Filter by workflow, period, or **File name**, and by kind: Markdown, images,
data, or text and logs. Select a file to preview it, open it in **Full view**,
or use **Open run →**. **Show older files** loads earlier runs. The
**Overview** shows the newest files. Artifacts are removed with their runs and
are included in [backups](/docs/backups/).
