---
title: Kitewell documentation
---

Kitewell runs workflows on your own machine. Combine scripts, AI agents, containers,
and API calls; schedule the result; inspect each run in one interface.
[Import an OpenAPI spec](/docs/apis/) to choose API operations and fill in
request forms generated from the spec.
Share a project across your devices or team, with each device supplying its own
credentials and choosing which workflows to run.

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
Kitewell account. Pro is planned at $15/month for up to ten projects of 200
workflows each, any number of API keys, and [alerts](/docs/alerts/). Projects
hold separate workflows, history, and secrets.

## What runs where

Kitewell manages a local Dagu workflow engine. Workflows run with the
permissions of the user account running Kitewell. Only run workflow definitions
and commands you trust.

On macOS, closing the window keeps Kitewell in the menu bar; **Quit Kitewell**
stops the service and engines.

Your computer must be awake and your user signed in for scheduled work to run.
Kitewell does not provide a hosted machine. AI providers, remote servers,
containers, and external services have their own requirements and costs.
