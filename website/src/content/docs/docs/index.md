---
title: Kitewell documentation
---

Kitewell runs workflows on your own machine. Combine scripts, AI agents, containers,
and API calls; schedule the result; inspect each run in one interface.
[Import an OpenAPI spec](/docs/apis/) to choose API operations and fill in
request forms generated from the spec.
Export a project and import it on another device or for a teammate, or
[sync it with Dagu Cloud](/docs/cloud-sync/) to keep every copy the same; each
device supplies its own credentials and enables only the workflows it should
run.

:::note[Platform availability]
The first public installers target macOS. Linux and Windows support is planned.
Check [Downloads](/download/) for current release availability.
:::

## Start here

1. [Install Kitewell](/docs/install/).
2. [Create your first workflow](/docs/getting-started/).
3. [Connect Docker, AI, human decisions, and remote servers](/docs/workflow-builder/).
4. [Set a schedule and understand background operation](/docs/scheduling/).
5. [Share workflows with your team](/docs/sharing/).

One project with up to 10 workflows and one API key is free and needs no
Kitewell account. Pro is planned at $15 per person per month for up to ten
projects of 200 workflows each, any number of API keys, [alerts](/docs/alerts/),
and a team that syncs its projects. Projects hold separate workflows, history,
and secrets.

## What runs where

Kitewell runs a local Dagu workflow engine for each project. Workflows run with the
permissions of the user account running Kitewell. Only run workflow definitions
and commands you trust.

Your projects stay on your device unless you choose to
[sync one with Dagu Cloud](/docs/cloud-sync/), and secret values never leave it.

On macOS, closing the window keeps Kitewell in the menu bar; **Quit Kitewell**
stops the service and engines.

Your computer must be awake and your user signed in for scheduled work to run.
Kitewell does not provide a hosted machine. AI providers, remote servers,
containers, and external services have their own requirements and costs.
