---
title: Kitewell documentation
---

Kitewell runs workflows on your own machine: one app that does the work your
team does by hand, on a schedule, with every run on record.

- **[Build a workflow](/docs/workflow-builder/)** from commands, scripts,
  containers, SSH, HTTP requests, AI steps, and human approvals.
- **[Automate a website](/docs/browser/)**, a
  **[desktop app](/docs/desktop/)**, or **[email](/docs/email/)** in plain
  language.
- **[Automate Excel](/docs/spreadsheets/)**: read the workbooks your office
  already has, and write each result back into the row it came from.
- **[Run it over a sheet](/docs/batches/)** once per row, and collect what
  each run found.
- **[Ask the assistant](/docs/ai/#the-assistant)** to draft and fix workflows,
  and have a failed run [diagnosed](/docs/ai/#failure-diagnosis).
- **[Import an OpenAPI spec](/docs/apis/)** and fill in request forms
  generated from it.
- **[Share a project](/docs/sharing/)** with a teammate, or
  **[sync it with Dagu Cloud](/docs/cloud-sync/)** so every copy matches. Each
  device supplies its own credentials and enables only what it should run.

:::note[Early releases]
Kitewell is new, so features and limits may still change. The
public installers target macOS and Windows. Linux support is planned. Check
[Downloads](/download/) for current release availability.
:::

## Start here

1. [Install Kitewell](/docs/install/).
2. [Create your first workflow](/docs/getting-started/).
3. [Connect Docker, AI, human decisions, and remote servers](/docs/workflow-builder/).
4. [Automate a website](/docs/browser/): sign in, click, type, and collect
   information in plain language.
5. [Automate Excel](/docs/spreadsheets/): read the workbooks you already have,
   and write each result back into the row it came from.
6. [Run a workflow over a sheet](/docs/batches/).
7. [Set a schedule and understand background operation](/docs/scheduling/).
8. [Share workflows with your team](/docs/sharing/).

One project with up to 10 workflows and one API key or connected app is free,
and needs no Kitewell account. Projects hold separate workflows, history, and
secrets.

Pro is planned at $25 per person per month: ten projects of 100 workflows
each, any number of API keys and connected apps, [alerts](/docs/alerts/), and
a team that syncs its projects.

## What runs where

Kitewell runs a local Dagu workflow engine for each project. Workflows run with the
permissions of the user account running Kitewell. Only run workflow definitions
and commands you trust.

Your projects stay on your device unless you
[sync one with Dagu Cloud](/docs/cloud-sync/), and secret values never leave
it. Assistant conversations, failure diagnoses, and the values read into
sheets stay on the device too.

AI features send what they read — run output, workflow definitions — to the
model provider you choose. [What leaves your computer](/docs/data-flow/) lists
every destination.

Closing the window keeps Kitewell running in the menu bar on macOS or the tray
on Windows; **Quit Kitewell** stops the service and engines.

Your computer must be awake and your user signed in for scheduled work to run.
Kitewell does not provide a hosted machine. AI providers, remote servers,
containers, and external services have their own requirements and costs.
