---
title: AI agents and models
---

Kitewell can use locally installed AI command-line tools and API-based models.
It does not supply AI credits or sign in to those tools for you.

## Command-line agents

Install and sign in to the command-line agent you want to use: Codex, Claude
Code, OpenCode, GitHub Copilot, Gemini, or Cursor. Configure a named agent in
**Agents & models**, select its harness and model, and use **Test agent** to
check that the tool is installed and signed in.

Add an **Ask an AI agent** task to a workflow, choose the agent, and enter its prompt and
context. Review the working folder and permissions. An agent can act on files
and tools available to its process.

## API models

Configure a named model with its provider (Anthropic, OpenAI, Gemini,
OpenRouter, Z.ai, or a local server) and model ID. Put the provider API key in
a project [secret](/docs/secrets/) and select that secret as the model's
credential. For a local model server, provide its reachable base URL. **Test
model** sends a short request to confirm the setup. Add an **Ask a model** task
to use it.

**Add decision model** configures a model on OpenRouter or TypeSafe for **Make
an AI decision** tasks, which classify, score, or answer yes/no questions with
structured answers that later steps can branch on.

## Inspect a run

Use **Tools → Review AI prompts** to inspect the authored prompt before running. After a
run, open **Runs & logs** to review the recorded prompt and task output.

AI prompts and context are sent to the provider or tool you select. Provider
billing, retention, and privacy rules apply. A local Kitewell workspace does
not mean every task stays offline.
