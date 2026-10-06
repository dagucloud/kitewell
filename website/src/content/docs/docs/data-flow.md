---
title: What leaves your computer
---

Kitewell runs on your computer. Your workflows, run history, logs, secrets,
and sign-ins stay in a folder on it. Nothing goes anywhere unless a step, a
sync, or a sign-in you set up sends it.

This page shows where data can go, and how to stop each one.

## Where data can go

<div class="kw-flow not-content">
<div class="kw-flow-env"><p class="kw-flow-env-label">Your computer</p>
<div class="kw-flow-app"><p class="kw-flow-app-name">Kitewell (engine: Dagu)</p>
<ul><li>Workflows and their change history</li><li>Run history, logs, output files, screenshots</li><li>Secrets, encrypted</li><li>Mailbox and website sign-ins</li><li>Conversations with the assistant</li></ul></div></div>
<ol class="kw-flow-out">
<li><p class="kw-flow-dest">The AI model you chose</p><dl><dt>Sends</dt><dd>Prompts, the text of pages a website step reads, screenshots a desktop step takes, and your conversations with the assistant.</dd><dt>When</dt><dd>A step uses AI, or you use the assistant.</dd><dt>To stop it</dt><dd>Add no model, or run a model on a server of your own; then nothing leaves your network.</dd></dl></li>
<li><p class="kw-flow-dest">Your own systems and websites</p><dl><dt>Sends</dt><dd>What the steps type, upload, and send.</dd><dt>When</dt><dd>A workflow runs, exactly as you built it.</dd><dt>To stop it</dt><dd>Remove the step.</dd></dl></li>
<li><p class="kw-flow-dest">Your mail server and alert channels</p><dl><dt>Sends</dt><dd>The email a step sends. For an alert: what happened, the workflow, and a link back — never a run's output.</dd><dt>When</dt><dd>You connect a mailbox or add an alert channel.</dd><dt>To stop it</dt><dd>Disconnect the mailbox, or remove the channel.</dd></dl></li>
<li><p class="kw-flow-dest">Dagu Cloud, run by Descarty</p><dl><dt>Sends</dt><dd>Your plan, the Kitewell version, and this computer's name and ID. For a synced project: its workflows and the names of its secrets, never their values.</dd><dt>When</dt><dd>You sign in or sync a project. The free plan needs no account and sends nothing.</dd><dt>To stop it</dt><dd>Sign out, or stop syncing the project.</dd></dl></li>
<li><p class="kw-flow-dest">ChatGPT or Claude, through Kitewell's relay</p><dl><dt>Sends</dt><dd>What the app asks Kitewell for: workflows, runs and their logs, sheets, knowledge. The relay passes it on and keeps none of it.</dd><dt>When</dt><dd>You connect an app.</dd><dt>To stop it</dt><dd>Turn remote access off, or revoke the app.</dd></dl></li>
</ol>
</div>

Kitewell sends nothing else. There is no usage tracking, no crash reporting,
and no analytics, and Descarty never receives the data your runs work on. The
one other request is a version check, which carries nothing about you.

## What never leaves

- **Secret values.** Encrypted on this computer, masked in logs, and never
  exported, backed up, or synced. A synced project carries a secret's name;
  each computer holds its own value.
- **Sign-ins.** Mailbox connections, saved website sign-ins, and SSH keys are
  encrypted or kept in a file only your user can read, and left out of
  backups.
- **Runs, logs, and output.** Kept in the data folder for 30 days by default.
  A synced project syncs definitions, never runs.
- **Excel files.** Read and written in place. Cells leave only if you ask a
  model or a connected app to read them.

## Choose where AI runs

Every AI feature uses a model you added under **Agents & models**. Kitewell
ships no model and no key of its own. A server you run yourself, such as
Ollama, keeps prompts, page text, and screenshots inside your network.

A password a website or desktop step types is written as `%name%`, so only
the name reaches the model.

## Four things to know

- Workflows run with your permissions. A command step can read anything you
  can, so only run definitions and commands you trust.
- A desktop step's screenshot shows the whole screen, other windows included.
  Close what should not be seen.
- Email and webhook requests are untrusted input: text from them can steer a
  command or an agent. **Review & run** warns you when a workflow does that.
- Backups and exports are not encrypted. They leave secrets and sign-ins out,
  but hold everything else as written.

## For a security review

Descarty's [security page](https://descarty.com/en/security/) summarizes this
for IT and security reviews, and its
[security overview](https://descarty.com/en/resources/) answers the questions
security questionnaires usually ask.

[Data flow reference](/docs/reference/data-flow/) lists every destination,
with addresses, sizes, retention, and how each is encrypted.
