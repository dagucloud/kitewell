---
title: Runstead documentation
---

Runstead runs workflows on your own machine. Combine scripts, AI agents, containers,
and web requests; schedule the result; inspect each run in one interface.
Share a project across your devices or team, with each device supplying its own
credentials and choosing which workflows to run.

:::note[Platform availability]
The first public installers target macOS. Linux and Windows support is planned.
Check [Downloads](/download/) for current release availability.
:::

## Start here

1. [Install Runstead](/docs/install/).
2. [Create your first workflow](/docs/getting-started/).
3. [Connect Docker, AI, human decisions, and remote servers](/docs/workflow-builder/).
4. [Set a schedule and understand background operation](/docs/scheduling/).
5. [Share workflows with your team](/docs/sharing/).

One project is free and needs no Runstead account. Pro is planned at $15/month
for up to ten projects. Projects hold separate workflows, history, and secrets.

## What runs where

Runstead manages a local Dagu workflow engine. Workflows run with the
permissions of the user account running Runstead. Only run workflow definitions
and commands you trust.

On macOS, closing the window keeps Runstead in the menu bar; **Quit Runstead**
stops the service and engines.

Your computer must be awake and your user signed in for scheduled work to run.
Runstead does not provide a hosted machine. AI providers, remote servers,
containers, and external services have their own requirements and costs.
