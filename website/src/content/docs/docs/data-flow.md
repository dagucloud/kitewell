---
title: What leaves your computer
---

Kitewell runs on your computer. Workflows, run history, logs, secrets, and
sign-ins live in its data folder, and nothing is sent anywhere unless a step,
a sync, or a sign-in you chose sends it. This page lists every destination,
so you know what leaves and when.

## Where data goes

| Destination | What it receives | When |
| --- | --- | --- |
| The AI provider you choose | What the task reads: a prompt and its context, run output, logs and artifacts you pass, the visible text and layout of a page (website steps), a screenshot of the whole screen (desktop steps), a sheet's rows (result columns a model reads; columns that copy a published value send nothing), a failed run's steps and workflow (failure diagnosis), the project's knowledge (the assistant: a summary of every page, and the pages about what you have open) | Only when a task, the assistant, diagnosis, or a sheet uses that model |
| A command-line agent's provider | The prompt and whatever the agent reads in its working folder, under that tool's own terms | When an **Ask an AI agent** task runs |
| Sites, servers, APIs, and mailboxes | What your steps send them | When those steps run |
| Dagu Cloud (Descarty) | Which plan the workspace has and the Kitewell version, every six hours; a synced project's definitions, secret names and descriptions, sheets, and knowledge | Only after you sign in; project data only after you sync that project |
| kitewell.app and GitHub | An update check; the installer you download | On the update schedule, and when you install |

Kitewell itself sends nothing else. The app has no usage tracking, and
Descarty never receives the data your runs process.

## What stays

- **Secret values.** Stored encrypted (AES-256-GCM) in each project's engine,
  masked in logs, and never read back, exported, backed up, or synced.
  A synced project carries a secret's name and description; each device holds
  its own value. See [Secrets](/docs/secrets/).
- **Sign-ins**: mailbox connections, saved website sign-ins, SSH keys and
  host trust, and registry passwords stay on the device and out of backups.
- **Runs, logs, and artifacts.** Kept in the data folder for 30 days by
  default, per project; see [Runs and logs](/docs/runs/). A synced project
  syncs definitions, never runs.
- **Assistant conversations, failure diagnoses, and the values read into
  sheets.** Kept on the device.
- **Workflow definitions and knowledge** stay on the device until you export,
  share, or sync them.

## Choose where AI runs

Every AI feature names a model you added under [Agents & models](/docs/ai/).
Providers: Anthropic, OpenAI, Google Gemini, OpenRouter, Z.ai, OpenCode Zen,
or an OpenAI-compatible server you run, such as Ollama or vLLM, on this
computer or in your own network. A local server keeps prompts, page text, and
screenshots inside your network; small local models usually cannot drive a
browser or a desktop, so choose them per task. A workflow with no AI task
sends nothing to any provider. Through OpenRouter, the assistant's requests
go only to providers that neither store nor train on them.

Values a website or desktop step types, such as a password, are written as
`%name%` and never reach the model; only the name does.

## Know the boundaries

- Workflows run with the permissions of the user running Kitewell. A command
  step can read anything you can, including the data folder. Only run
  definitions and commands you trust.
- A desktop step's screenshots include every window on the screen. Close what
  should not be seen, or use a computer nobody else works at.
- Email is untrusted input. Text from an email that reaches a command or an
  agent that runs commands can steer it; **Review & run** warns when a
  workflow does that.
- Backups and project exports are not encrypted. They leave secret values and
  sign-ins out, but hold workflow definitions, sheets, knowledge, and settings
  as written. Encrypt them yourself before moving them to shared storage.
- Alert channel credentials, such as a Slack webhook, are stored in a file only
  your user can read, not in the system keychain.
- Remote access through MCP or REST reaches a Kitewell host only on this
  computer's local address unless you put your own HTTPS in front of it; see
  [MCP and API access](/docs/mcp/).

## Where the data folder is

- macOS: `~/Library/Application Support/Kitewell/`
- Windows: `%LOCALAPPDATA%\Kitewell\`

[Backups and recovery](/docs/backups/) describes what each part holds, and
[Uninstall](/docs/uninstall/) how to remove it all.
