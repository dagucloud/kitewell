---
title: Data flow reference
---

Every destination Kitewell can reach, what it receives, and how to stop it:
the long form of [What leaves your computer](/docs/data-flow/).

## Where data goes

| When you use this | What is sent | To whom | How to stop it |
| --- | --- | --- | --- |
| A model step, the assistant, failure diagnosis, or a sheet column a model reads | The prompt and the material it reads: run output, logs and artifacts you pass, a page's visible text and layout, a screenshot of the whole screen, a sheet row's inputs and its run's results, a failed run's steps and definition, the project's knowledge | The model provider you chose under [Agents & models](/docs/ai/) | Add no model, or point the model at a server you run. A workflow with no AI step sends nothing |
| A sheet column judged yes/no, by choice, or on a scale | The same material, plus each column's question and the meaning of each option | The decision model's provider: OpenRouter, TypeSafe, or an address you set | Choose a column that copies a published value instead; it needs no model |
| An **Ask an AI agent** task | The prompt and whatever the agent reads in its working folder, under that tool's own terms | Whichever service that command-line tool signs in to | Use a different task |
| [Importing an API](/docs/apis/) by its address, or asking the assistant to check a web page | A plain request for the document or the page, with no credentials | The address you gave | Upload the OpenAPI file instead of giving an address |
| A website, command, file, API, Docker, or remote step | Whatever the step sends | The sites, servers, APIs, image registries, and computers your steps name | Remove the step |
| An email step | The message, and the search you asked for | Your mailbox's own mail server, or the Gmail API for a Google mailbox. Signing in goes to Google or Microsoft | Disconnect the mailbox in **Mail accounts** |
| [Alerts](/docs/alerts/) | The alert: what happened, how urgent, the project, the workflow, and a link back | Your mail server, a Slack or Teams address, PagerDuty, or a webhook of your own | Remove the channel |
| Signing in to Dagu Cloud | Which plan the workspace has, the Kitewell version, and this computer's ID and name, every six hours | Dagu Cloud, run by Descarty | Sign out in **Device settings** |
| [Syncing a project](/docs/cloud-sync/) | That project's workflows, its models, servers, API connections, queues and registries, secret names and descriptions, sheets, knowledge pages, releases, and — for a workflow that works a mailbox — which signed-in person's device runs it | Dagu Cloud | **Stop syncing** that project |
| [ChatGPT or Claude connected to Kitewell](/docs/mcp/) | Whatever the app asks Kitewell's tools for: workflows, runs and their logs, artifacts, sheets, knowledge, and — with edit permission — the rows of an Excel file on this computer | The app, through Kitewell's relay at `mcp.kitewell.app` | Turn **Remote access** off, or **Revoke** the app |
| An event an app or API key subscribed to | Each event: the project, workflow, run, how it ended, the times, failed step names, a waiting step's question, a sheet launch's counts, or why a schedule was missed | The address the subscriber gave | **Remove** the subscription |
| A workflow's **Webhook** | Nothing goes out. Requests come in and wait at Kitewell's relay, with their headers and body, until this computer takes them | Kitewell's relay at `hooks.kitewell.app` holds them, for at most 7 days | **Turn off** that webhook |
| Update checks | A request that says nothing about you or your work | GitHub for the workflow engine, and kitewell.app for the Kitewell app | Turn **Automatic engine updates** off. The app is checked only when you ask |
| **Install WebView2** on Windows | A download request | Microsoft | The installer normally carries it, so this appears only if the runtime is missing |

Kitewell sends nothing else. There is no usage tracking, no crash reporting,
and no analytics in the app, and Descarty never receives the data your runs
work on.

## What never leaves your computer

| What | Where it lives |
| --- | --- |
| Secret values | Encrypted in each project's engine, masked in logs, never read back, exported, backed up, or synced. A synced project carries a secret's name and description; each computer holds its own value. See [Secrets](/docs/secrets/) |
| Sign-ins | Mailbox connections, saved website sign-ins, SSH keys and host trust, and image registry passwords. All encrypted or kept in a file only your user can read, and all left out of backups |
| Runs, logs, and artifacts | The data folder, for 30 days by default, per project. See [Runs and logs](/docs/runs/). A synced project syncs definitions, never runs |
| Assistant conversations and failure diagnoses | The data folder, per project |
| Excel workbooks | Read and written in place on the computer that holds the file. A sheet linked to one carries the file's name and which computer has it, never a cell. Its path, which row each result goes back to, and the copies kept for Undo stay on that computer. See [Automate Excel](/docs/spreadsheets/) |
| Workflow definitions and knowledge | The data folder, until you export, share, or sync them |

Two things to know about these. A snapshot you [download](/docs/backups/)
carries run output, assistant conversations, and the Excel copies kept for
Undo, so treat a downloaded snapshot as the sensitive file it is.

A workbook's cells do leave the computer if you ask a model or a connected app
to read them; [Know the boundaries](#know-the-boundaries) says when.

## Choose where AI runs

Every AI feature names a model you added under [Agents & models](/docs/ai/).
Kitewell ships no model and no key of its own.

- The providers are Anthropic, OpenAI, Google Gemini, OpenRouter, Z.ai,
  OpenCode Zen, or any OpenAI-compatible server you run, such as Ollama or
  vLLM. A decision model uses OpenRouter or TypeSafe.
- A server of your own keeps prompts, page text, and screenshots inside your
  network. Small local models usually cannot drive a browser or a desktop, so
  choose per task.
- Through OpenRouter, the reads Kitewell makes itself — the assistant,
  failure diagnosis, and a sheet's result columns — ask OpenRouter to route
  only to providers that neither store nor train on what they receive. A model
  step inside a workflow is sent by the engine and does not ask for that.

A value a website or desktop step types, such as a password, is written as
`%name%`. Only the name reaches the model.

## Know the boundaries

- Workflows run with the permissions of whoever is running Kitewell. A command
  step can read anything you can, the data folder included. Only run
  definitions and commands you trust.
- A desktop step's screenshot includes every window on the screen. Close what
  should not be seen, or use a computer nobody else works at.
- Email is untrusted input. Text from an email that reaches a command, or an
  agent that runs commands, can steer it. **Review & run** warns you when a
  workflow does that.
- A webhook request is untrusted input too, and anyone with the URL can start
  that workflow. Kitewell does not yet check a sender's signature. See
  [Start a workflow from a webhook](/docs/webhooks/#keep-the-url-private).
- Asking the assistant or a connected app to read an Excel file sends its
  cells on: a column list and ten sample rows when you build a sheet from a
  file, and the rows themselves when you ask for them by name.
- Backups and project exports are not encrypted. They leave secret values and
  sign-ins out, but hold definitions, sheets, knowledge, run output, and
  settings as written. Encrypt them yourself before moving them to shared
  storage.
- Alert channel credentials, such as a Slack address, are stored in a file
  only your user can read, not in the system keychain.
- Remote access over MCP or REST reaches Kitewell only on this computer's
  local address. The exceptions are ChatGPT and Claude through Kitewell's
  relay, and a client you put your own HTTPS in front of. See
  [MCP and API access](/docs/mcp/).

## Where the data folder is

- macOS: `~/Library/Application Support/Kitewell/`
- Windows: `%LOCALAPPDATA%\Kitewell\`

[Backups and recovery](/docs/backups/) says what each part holds, and
[Uninstall](/docs/uninstall/) how to remove it all.

## Details

### Model providers

A model step reaches `api.anthropic.com`, `api.openai.com`,
`generativelanguage.googleapis.com`, `openrouter.ai`, `api.z.ai`,
`opencode.ai`, or the base address you set. Decision models reach
`openrouter.ai/api/alpha` or `api.typesafe.ai/v1`, over HTTPS only. Choosing a
provider in the model form also fetches that provider's public model list from
OpenRouter or OpenCode Zen; the request carries no key and nothing about you.

A sheet's read sends at most 48 KiB per row: the row's label and inputs, each
step's result, the outputs the run published, up to five text files it
produced, and the end of the last and failed steps' logs.

### Dagu Cloud

Requests go to `console.dagu.sh` over HTTPS, with
`User-Agent: Kitewell/<version>`. A synced document over 256 KiB is uploaded
to Dagu Cloud's storage through a signed address it hands back. This
computer's cloud credential is a file at the top of the data folder, next to
its settings, and is never in a backup.

### The relay

The relay is a Cloudflare Worker with one object per device. The computer
dials out to it over a WebSocket, so nothing on your network listens for
incoming connections.

It stores this computer's name, the Kitewell version,
the last time it was heard from, and the last answers to the tool-listing
calls, and deletes all of it 30 days after the device was last heard from.
MCP requests and responses pass through unstored.

Webhook bodies and headers are the exception. They are stored until the device
takes them: at most 7 days, at most 1,000 waiting, 512 KiB a body, 16 KiB of
headers, and 60 requests a minute to one URL.

Webhook tokens are stored only as hashes. The relay writes no logs of its own. Webhooks are part of Kitewell
Personal and Team.

Event deliveries do not go through the relay. They go straight from this
computer to the subscriber's address: HTTPS only, to public addresses, no
proxy, no redirects, at most 256 KiB, signed in the Standard Webhooks format,
retried for up to 24 hours.

### Updates

The engine check reads the latest release of `dagucloud/dagu` from
`api.github.com`, and the download comes from GitHub's release files for that
repository.

The Kitewell app reads a signed manifest from the HTTPS address
the build was given, and verifies the installer's SHA-256 before running it.
On Windows, **Install WebView2** fetches Microsoft's own bootstrapper from
`go.microsoft.com` and checks Microsoft's signature before running it.

### Encryption at rest

Secrets use the engine's AES-256-GCM registry, with its key on this device.
Mailbox passwords and refresh tokens are sealed with AES-256-GCM under a
per-device key in `mail.key`, which no backup carries. The data and backup
folders can be read only by your user account.
