---
title: AI agents and models
---

Kitewell can use locally installed AI command-line tools and API-based models.
It does not supply AI credits or sign in to those tools for you. Configure
them in **Agents & models**.

## Command-line agents

Install and sign in to the command-line agent you want to use, such as Claude
Code, Codex, Cursor, Gemini, GitHub Copilot, OpenCode, Aider, Amp, Cline,
DeepSeek, Droid, Goose, Kiro, Pi, or Qwen, or run any other tool with a
**Custom command**. Tools installed on this device that no agent uses yet
appear under **Found on this device**.

Choose **Add CLI agent**, select its harness and model, and use **Test agent**
to check that the tool is installed and signed in. Add an **Ask an AI agent**
task to a workflow, choose the agent, and enter its prompt and context. Review
the working folder and permissions. An agent can act on files and tools
available to its process.

## API models

Choose **Add API model** and pick a provider: Anthropic, OpenAI, Google
Gemini, OpenRouter, Z.ai, OpenCode Zen, or a local server such as Ollama or
vLLM. Put the provider API key in a project [secret](/docs/secrets/) and
select that secret as the model's credential. A local server needs no key,
and its **Base URL** is optional when it runs at the usual local address. For
OpenRouter, OpenCode Zen, and a running local server, **Model ID** lists every
model the provider offers; type part of a name to search. **Test model** sends
a short request to confirm the setup.

API models are used by **Ask a model** tasks, the assistant, failure
diagnosis, the result columns of [batch sheets](/docs/batches/), and
**Automate a website** and **Automate a desktop app** tasks. See
[What leaves your computer](/docs/data-flow/) for what each sends.

**Add decision model** configures a model on OpenRouter or TypeSafe. **Make an
AI decision** tasks use it to classify, score, or answer yes/no questions with
structured answers that later steps can branch on, and a batch sheet can use
it to judge yes-or-no, choice, and level columns with a probability.

## The assistant

The assistant builds and fixes workflows with you. Open it with **Assistant**
on any project page, or press ⌘J (Ctrl+J). It is available to editors and
uses one of the project's API models. If the project has none, an
administrator can connect one from the panel; the API key is stored as a
project secret.

- **Workflows**: it proposes a new or changed workflow as a card with the
  change and a graph preview. Nothing is saved until you choose **Apply**; you
  can also **Edit in editor** or **Reject**. A new scheduled workflow is saved
  paused unless you tick **Turn on its schedule**. After applying, **Run now**
  opens the run form, and an update can be undone. The assistant cannot run or
  delete workflows itself.
- **Sheets**: it proposes rows and columns for a [batch sheet](/docs/batches/),
  shown in the open sheet until you apply or reject them.
- **Questions and pages**: it can ask you a short form of questions, and read
  a public web page you point it to. Addresses on this device or its network
  are refused.
- **Secrets**: it can ask for a secret by name. You type the value into its
  card, it is saved to the project's secret store, and the assistant never
  sees it. Administrators' assistants can list secret names, never values.
- **Knowledge**: it reads the project's [knowledge](/docs/knowledge/) every
  message and writes down what it learns as you work, with a receipt and
  **Undo**. After it has read a web page or run output, it
  [asks first](/docs/knowledge/#what-the-assistant-does).

On a failed run, **Ask the assistant** asks it to find out why and propose a
fix. Conversations stay on this device; **Device settings → Assistant** sets
how many are kept per project.

## Failure diagnosis

Kitewell can explain why a run failed. Turn it on in **Project settings →
Failure diagnosis** with **Diagnose failed runs automatically**, choose the
API model to use, and set each workflow to follow the project or be on or off.

The first failure of each streak is diagnosed, not every failed run. The
result on the failed run says what to do: **Try again**, **Needs you**,
**Workflow change**, or **Unclear**, with the cause and a next step. Use
**Diagnose** on any failed run, or **Diagnose again** for a fresh answer. The
model receives the failed steps' results, log excerpts, and the workflow's
definition, and cannot run tools. Diagnoses stay on this device and are
deleted with their runs.

## Inspect a run

Use **Tools → Review AI prompts** to inspect the authored prompt before
running. After a run, open **Runs & logs** to review the recorded prompt and
task output.

AI prompts and context are sent to the provider or tool you select, including
the logs, artifacts, and run outputs the assistant, diagnosis, and batch
sheets read. Provider billing, retention, and privacy rules apply. A local
Kitewell workspace does not mean every task stays offline.
