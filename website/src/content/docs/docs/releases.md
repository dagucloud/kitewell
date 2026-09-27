---
title: Releases and staged projects
---

Run each environment as its own project, such as **Dev**, **Staging**, and
**Prod**. Build and test in Dev, then cut a **release** and apply it to the next
project. Each project keeps its own servers, models, API connections, queues,
and secret values, so the same workflow runs against each environment's own
settings. Several projects on one device need Kitewell Pro.

## Cut a release

1. Open **Jobs** in the project you work in. The line above the list shows the
   newest release and how many workflows changed since.
2. Choose **Release…**, compare the changes, and give the release a title.
3. Kitewell creates the next number, such as **v13**: a frozen copy of the
   project's workflows and the names of the secrets they read.

A release never changes, so edits you make afterwards stay out of it until the
next one. Kitewell keeps the 20 newest releases. In a synced project, releases
sync like everything else, so every teammate can apply the same one.

## Apply a release

1. Choose **Releases**, then **Apply to…** beside a release.
2. Pick the project it goes to. The preview shows, for each workflow, whether it
   is new, updated, or unchanged, and says when a workflow would not run there,
   calls a workflow the project lacks, or changes its schedule.
3. Choose **Apply**.

New workflows arrive paused; turn on the ones this project should run. A
workflow that exists already keeps whether it is on and where it runs. The
project also gets the names of the secrets the release reads; set their values
on each of its devices from **Secrets** or the Overview.

## See what runs where

A project that took a release shows its source and number above its jobs, such
as **From Dev v13**, and each workflow shows the release it came from. This
works on every device that syncs the project. If someone edits a workflow there
afterwards, it is marked **edited here**. The next release keeps that edit by
default when the release did not change the same workflow; if it did, the
preview warns you and lets you keep the project's version.

## Roll back

Apply an older release the same way. Workflows a newer release added are listed
and removed only if you tick them. Every replaced workflow also stays in the
project's history on this device, so it can be restored on its own.
