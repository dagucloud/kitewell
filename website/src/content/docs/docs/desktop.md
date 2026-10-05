---
title: Automate a desktop app
---

An **Automate a desktop app** step has a model use the apps on your computer
the way a person does: it looks at the screen, then clicks and types. You
describe a task in plain words, such as "Create an invoice for %client% and
save it", and the model works until it is done.

It runs on macOS and Windows, on your own screen, so it reaches the accounting
package or the ERP client that has no API and no web version.

Combined with [website steps](/docs/browser/), [email steps](/docs/email/),
schedules, and [batch sheets](/docs/batches/), it covers the desktop side of
what robotic process automation (RPA) tools do:

- Copy each row of a spreadsheet into an accounting or sales-management app.
- Read a figure from a desktop dashboard and pass it to the next step.
- Export a report from an app that only exports through its menus.
- Check that an app shows what it should after an update.

## Before the first run

- **A computer-use model**: choose an API model from
  [Agents & models](/docs/ai/) whose provider offers a computer-use tool, such
  as Claude Sonnet 5, GPT-5.4, or Gemini 3.5 and later, or set **Default model
  for browser and desktop steps** in the workflow's **Settings**. **How the
  model uses the desktop**, under **Desktop settings**, is **Automatic**; **Plain
  tools, for any vision model** lets a model without a computer-use tool work
  through plain click-and-type tools, more slowly and less reliably.
- **Desktop access**: open **Device settings → Desktop automation** and choose
  **Check desktop access**.
  - On macOS, the system must allow **Kitewell Agent**, Kitewell's background
    service, to record the screen and to control the Mac. The check makes
    macOS ask for both, and each row opens the matching pane of System
    Settings.
  - On Windows, Kitewell must run in your signed-in session rather than as a
    Windows service. A desktop step cannot click or type into an app that
    runs as administrator unless Kitewell does too.
- **An unlocked screen** with your user signed in. Desktop steps use the
  screen you see, so a locked or sleeping computer cannot run them.

## Build your first desktop step

This example opens a spreadsheet app, finds a client's latest invoice, and
passes its number to the next step.

1. Create a workflow and add **Automate a desktop app** from the task picker.
   Give the step an ID such as `copy`.
2. Choose the **Model**.
3. Under **Values the step types**, add `client`, set to the client's name:
   typed text, a workflow input, or a secret.
4. Under **Steps on the desktop**, add:
   - **Open an app**: on macOS, **Choose an app…** and pick Numbers; on
     Windows, **Choose a program…** and pick the program.
   - **Do a task**: `Open the invoices spreadsheet and find the latest row for
     %client%`
   - **Read from the screen**: look for `The invoice number and total in that
     row`, and read `number` as **Text** and `total` as **Number**.
5. Choose **Test**, take your hands off the mouse and keyboard, and watch.
6. Add a later step that uses `${steps.copy.outputs.number}`.

The same workflow in YAML:

```yaml
type: graph
llm:
  model: kitewell-agent-fast
params:
  - CLIENT: Acme
steps:
  - id: copy
    name: Find the latest invoice
    action: computer.run
    with:
      variables:
        client: ${params.CLIENT}
      do:
        - launch: {command: open, args: [-a, Numbers]}
        - act: Open the invoices spreadsheet and find the latest row for %client%
        - extract:
            instruction: The invoice number and total in that row
            schema:
              type: object
              properties:
                number: {type: string}
                total: {type: number}
  - id: report
    name: Report the invoice
    depends: [copy]
    run: echo "${steps.copy.outputs.number}"
```

On Windows, **Open an app** takes the program's path, such as
`launch: notepad.exe`, or `{command, args}` to pass arguments.

## What the step can do

Operations run in order on your screen. A task can be a whole job; the model
takes as many actions as it needs, up to the limit.

- **Open an app**: starts an app or program. It does not wait for the app to
  close.
- **Do a task**: **The task, in plain words**. `%name%` types one of the
  values the step types, or an earlier answer. **Most actions per task**, in
  **Desktop settings**, caps how many clicks and keystrokes one task may take;
  the default is 50, and a task can set its own. A task that needs more fails,
  so split it or raise the limit.
- **Read from the screen**: **What to look for**, and under **Values to
  read**, each value's name, type, and a description. Each value becomes a
  result later steps read as `${steps.<id>.outputs.<name>}`.
- **Make sure that…**: what **The screen should…** show. The step fails when
  it does not. **Keep checking for** gives the app time to get there.
- **Wait**: for a fixed time.
- **Take a screenshot**: saved as a PNG of the whole screen with the run's
  artifacts.
- **Ask me for input**: pauses until you answer, such as for a one-time code.
  **Use the answer as** names it for later operations.

**Only if… and time limit** runs an operation only when a condition holds, and
sets how long it may take; the default is five minutes.

## Values and secrets

**Values the step types** holds what the step types, written as `%name%` in
the instructions. The model only ever sees the name. For anything sensitive,
choose a secret there: it stays out of the instructions, the model, and the
logs. A step whose instructions contain a secret's value fails rather than
send it.

## Sharing the screen with you

Desktop steps run one at a time on the device's one screen. Before a step
clicks or types, it waits until nobody has used the mouse or keyboard for
15 seconds, and it pauses whenever you use them, so it never takes the input
from under you. **Wait until nobody has used the mouse or keyboard for**, under
**Desktop settings**, changes the wait, or turns it off on a computer nobody
works at.

While a desktop step runs, the Kitewell icon in the menu bar or tray changes,
and its menu names the step and offers **Stop**. The run view shows each
operation with its screenshots and says when the step waited for the desktop
to be free.

## Confirmations

When the model's provider wants a person to confirm an action, such as a
purchase, the step stops. **When the model provider asks to confirm an
action**, under **Desktop settings**, can be set to **Go ahead** instead; the
safer pattern is an **Ask me for input** operation before the task, so you
decide.

## Replay

A task that finished is remembered, and later runs repeat it without asking
the model while the screen looks the same, which is faster and costs
nothing. When an app changed, **Decide again on every run** turns replay off
for one task, and **Project settings → Storage → Replay cache** clears a
workflow's remembered tasks. The cache stays on this device and is not carried
in backups.

## Cost and privacy

Every operation the model handles sends a **screenshot of the whole screen,
other open windows included**, to the model's provider, and is billed by that
provider; the step shows the tokens it used. Close what should not be seen
before a run, or use a computer nobody else works at. Values the step types
and secrets are never sent to the model. Screenshots saved with the run stay
on this device under the run's retention.

## Limits

- macOS and Windows only, on this computer's own screen, which must be
  unlocked and awake for scheduled runs.
- One desktop step at a time; a second waits for the first.
- The model needs a computer-use tool, or generic mode with a vision model
  that can call tools. Small local models usually cannot drive a desktop.
- Apps that block screen recording, or that run as administrator on Windows
  while Kitewell does not, cannot be operated.

When a step fails, look at its screenshots first; see
[Troubleshooting](/docs/troubleshooting/#a-desktop-step-fails).
