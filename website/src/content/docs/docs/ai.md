---
title: AI agents and models
---

Runstead can use locally installed AI command-line tools and API-based models.
It does not supply AI credits or sign in to those tools for you.

## Command-line agents

Install and sign in to the command-line agent you want to use, such as Codex,
Claude Code, or another supported harness. Configure a named agent in the
project, select its harness and model, and check that Runstead can find the
executable.

Add an **Ask an AI agent** task to a workflow, choose the agent, and enter its prompt and
context. Review the working folder and permissions. An agent can act on files
and tools available to its process.

## API models

Configure a named model with its provider and model ID. Put the provider API
key in a project [secret](/docs/secrets/) and select that secret as the model's
credential. For a local model server, provide its reachable base URL.

## Inspect a run

Use **Tools → Review AI prompts** to inspect the authored prompt before running. After a
run, open **Runs & logs** to review the recorded prompt and task output.

AI prompts and context are sent to the provider or tool you select. Provider
billing, retention, and privacy rules apply. A local Runstead workspace does
not mean every task stays offline.
