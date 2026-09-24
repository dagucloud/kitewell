---
title: Backups and recovery
---

## Create a backup

Open **This device → Backups** and create a manual snapshot. Download the
archive to a location you control. You can also configure scheduled local
backups. Backups cover all projects on the device.

A backup on the same device is useful for undoing a change but does not protect
against losing that device. Keep a separate protected copy when needed.

## What is included

Snapshots include workspace settings, projects, workflow definitions, imported
OpenAPI specifications and API connection settings, and run history. API
connections retain secret references. Snapshots exclude managed secret values
and their decryption keys, run output log directories, local edit history, and
this device's GUI login and API key hashes. Restoring a snapshot also clears
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

Managed secrets are not restored. Enter the credentials needed by your workflows
and project resources again, and review anything reported as needing attention.
Archives are limited to 2 GiB of uncompressed data.

## Find local data

On macOS, Kitewell stores its data under:

```text
~/Library/Application Support/Kitewell
```

The `data`, `backups`, `runtime`, and `logs` folders serve different purposes.
Quit Kitewell before manually moving its data. Do not delete that directory to
fix an installation problem without preserving a backup.
