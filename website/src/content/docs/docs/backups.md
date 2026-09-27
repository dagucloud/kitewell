---
title: Backups and recovery
---

## Create a backup

Open **This device → Backups** and choose **Create backup**. Download the
archive to a location you control. Backups cover all projects on the device.
To back up every day, turn on **Device settings → Automatic backups → Daily
backups** and choose the **Backup hour**; Kitewell keeps the 10 newest
automatic snapshots, and manual ones until you delete them.

A backup or restore waits until no run is running, queued, or waiting,
including a run waiting for approval; an automatic backup tries again every
15 minutes. Project engines stop briefly while a snapshot is taken.

A backup on the same device is useful for undoing a change but does not protect
against losing that device. Keep a separate protected copy when needed.

## What is included

Snapshots include workspace settings, projects, workflow definitions, imported
OpenAPI specifications and API connection settings, batch sheets, releases,
secret names, run history, and artifacts. API
connections retain secret references. Snapshots exclude managed secret values
and their decryption keys, run output log directories, local edit history,
[website](/docs/browser/) sign-ins and replay caches, alert history, and this
device's GUI login and API key hashes. Restoring a snapshot also clears
local edit history.

The archive is not encrypted. Credentials entered directly into workflow
definitions, OpenAPI specifications, or source URLs are not removed. Treat
downloaded snapshots as sensitive.

[Alert](/docs/alerts/) channels and rules are included, but the secrets that
reach them are not: the email server password, Slack and Teams addresses,
webhook URLs and signing secrets, and PagerDuty keys stay on the device. Enter
them again after restoring on another computer.

External scripts, their input files, Docker volumes, mounted directories, and
third-party services are not copied into a Kitewell backup. Back those up
separately. Cloud device credentials are excluded from workspace backups.

## Restore

Finish active work, open **This device → Backups**, and choose **Restore backup**
for a saved snapshot. Restore creates a safety backup, replaces workspace data
and settings, and reloads the workspace. This device keeps its GUI login, API keys,
and which projects are stopped.

Managed secrets are not restored. The restore reports, for each project, which
secrets to enter again and which website steps must sign in again. Review
anything reported as needing attention. A restore never writes to Dagu Cloud:
a [synced project](/docs/cloud-sync/) comes back as it was in the backup, and
its next update takes Dagu Cloud's copy.
Archives are limited to 2 GiB of uncompressed data.

## See what uses space

**Project settings → Storage** shows how much space the project uses and how
much is free on the disk, and warns when it runs low. It lists each
workflow's run history with **Delete history…**, website sign-ins with
**Forget sign-in…**, the replay cache with **Clear**, and other project data.
Run history older than **Device settings → Run history retention** is removed
automatically.

## Find local data

On macOS, Kitewell stores its data under:

```text
~/Library/Application Support/Kitewell
```

The `data`, `backups`, `runtime`, and `logs` folders serve different purposes.
Quit Kitewell before manually moving its data. Do not delete that directory to
fix an installation problem without preserving a backup.
