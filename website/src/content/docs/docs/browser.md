---
title: Automate a website
---

An **Automate a website** step drives a real browser on your computer from
instructions in plain language: open pages, click and type, collect
information, check what a page shows, download files, and ask you for a code
when a site needs one. You describe what to do instead of recording clicks or
writing selectors, and an API model works out how on each page.

Combined with schedules, [batch sheets](/docs/batches/), and the rest of a
workflow, it covers the work robotic process automation (RPA) tools do:

- Download this month's invoices from a supplier portal and file them.
- Look up the status of every order in a spreadsheet and collect the results.
- Copy figures from a web dashboard into a daily report or another system.
- Fill in the same web form for each row of a list.
- Check that a site's sign-in and checkout still work after a release.

It runs on your computer, in your Chrome, with sign-ins that stay on the
device.

## Before the first run

- **Chrome**: on macOS, install Google Chrome in `/Applications`; on Windows,
  Kitewell uses the installed Chrome or Microsoft Edge. For Chromium, Brave,
  Edge on macOS, or Chrome elsewhere, set **Device settings → Browser →
  Browser executable**.
- **Check the browser**, on the step or in **Device settings**, opens the
  browser once from Kitewell's background service, the way a run does, so a
  browser that cannot start is found now rather than during a scheduled run.
  On macOS, it also lets macOS ask its questions first, and reports a browser
  or engine that macOS has not allowed to open yet.
- **A model**: choose an API model from [Agents & models](/docs/ai/) on the
  step, or set **Default model for browser and desktop steps** in the workflow's
  **Settings**. Use an Anthropic, OpenAI, or Gemini model; small local models
  usually cannot drive a browser.

## Build your first website step

This example looks up an order on a shop's website and passes its status to
the next step.

1. Create a job and add **Automate a website** from the task picker. Give the
   step an ID such as `order`, so later steps can read what it collects.
2. Choose the **Model**, and set **Start page (optional)** to the page to begin
   on, such as `https://shop.example.com/orders`.
3. Under **Values the browser types**, add `order`, set to the order number:
   typed text, a workflow input, or a secret.
4. Under **Steps in the browser**, add:
   - **Do something on the page**: `Type %order% into the order search box and
     press Enter`
   - **Make sure that…**: `The order's details are shown`
   - **Collect information**: look for `The order's status and expected
     delivery date`, and collect `status` and `delivery` as **Text**.
5. Turn on **Show the browser window** and choose **Test** to watch the step
   work on its own.
6. Add a later step that uses `${steps.order.outputs.status}`.

The same workflow in YAML:

```yaml
type: graph
steps:
  - id: order
    name: Look up an order
    action: browser.run
    with:
      url: https://shop.example.com/orders
      variables:
        order: "10042"
      do:
        - act: Type %order% into the order search box and press Enter
        - expect: The order's details are shown
        - extract:
            instruction: The order's status and expected delivery date
            schema:
              type: object
              properties:
                status:
                  type: string
                delivery:
                  type: string
  - id: report
    name: Report the status
    depends: [order]
    run: echo "${steps.order.outputs.status} (${steps.order.outputs.delivery})"
```

**Or start from an example** in a new workflow offers **Collect data from a
website** and **Sign in once, then collect**.

## What the browser can do

Operations run in order in one browser. Describe one action per operation.

- **Open a page**: go to a **Web address**.
- **Do something on the page**: **What to do, in plain words**, such as
  `Click Download next to the latest invoice`. `%name%` types one of the
  values the browser types, or an earlier answer.
- **Collect information**: **What to look for**, and under **What to
  collect**, each value's name, type (**Text**, **Number**, **Yes or no**, or
  **List**), and a description for the model. Each value becomes a result
  later steps read as `${steps.<id>.outputs.<name>}`.
- **Make sure that…**: what **The page should…** show. The step fails when it
  does not. The model judges a check written in plain words; **Page contains
  the text**, **Address contains**, and **Element appears (CSS selector)**
  read the page without the model, so they give the same answer on every run.
  **Keep checking for** gives the page time to get there.
- **Wait**: **For a fixed time**, or **Until an element appears (CSS
  selector)**.
- **Take a screenshot**: saved as a PNG with the run's artifacts.
- **Ask me for input**: shows **Question to show you** and pauses until you
  answer, such as for a one-time code. **Use the answer as** names it for
  later operations.

**Only if… and time limit** runs an operation only when a condition holds, and
sets how long it may take. Downloaded files are saved with the run's
artifacts.

## Values and secrets

**Values the browser types** holds what the step types, such as a customer
number, a workflow input, or a password, written as `%name%` in the
instructions. The model only ever sees the name. For anything sensitive,
choose a secret there: it stays out of the instructions, the model, and the
logs. A step whose instructions contain a secret's value fails rather than
send it.

## Browser settings

- **Stay signed in between runs** keeps cookies and storage on this device,
  so a sign-in lasts. Backups do not carry the sign-in.
- **Show the browser window** is useful while you build; keep it hidden for
  scheduled runs, or Chrome opens while you work.
- **Save screenshots**: **When a step fails**, **When a step fails, and at the
  end**, **After every step**, or **Never**.
- **Allowed websites** limits the browser to the hosts you list, such as
  `example.com` or `*.example.com`. List every host the site needs, including
  its sign-in and image servers.
- **Window width** and **Window height** set the page size in pixels.

## Sign in once

Start from the **Sign in once, then collect** example. Its first step opens the
window and waits for you to sign in, and later steps and runs reuse the
saved sign-in. **Project settings → Storage → Sign-ins** lists saved sign-ins,
with **Forget sign-in…**. A restored device asks you to sign in again, as it
asks for secrets.

Runs that share a saved sign-in take turns. A loop whose items run at once
cannot share one; run it one item at a time or turn sign-in off.

## Replay

Actions that worked are remembered and replayed on later runs without asking
the model, which is faster and costs nothing. When the site changed and a
replayed action no longer works, the model is asked again. **Decide again on
every run** turns replay off for one action, and **Project settings → Storage
→ Replay cache** clears remembered actions after a redesign. A run shows how
many actions in each step were replayed. **Collect information** and checks
written in plain words ask the model on every run.

## Run it for many items

- **A list in a spreadsheet**: give the workflow an input such as the order
  number, then run it from a [batch sheet](/docs/batches/), one row per item.
  Result columns copy what each run's extract collected, with no model, and
  the sheet shows progress, failures, and time left. Schedule the sheet to check
  every row again each morning and see which values changed.
- **A list inside one run**: put the step in a **For each item** loop.
- **On a schedule**: add a [schedule](/docs/scheduling/), hide the browser
  window, and let [alerts](/docs/alerts/) tell you when a run fails or waits
  for an answer.

## Answer a question

**Ask me for input** pauses the run. Open it under **Runs & logs → Waiting**,
or from the notification, and use **Answer**, or **Reject** to fail the step.
The answer is recorded with the run, so use it for short-lived codes, not
passwords. If the browser closed before you answered, **Restart the browser
step** runs it again from its first operation.

## Cost and privacy

Every operation the model handles sends the page's visible text and layout to
the model's provider and is billed by that provider; the step shows the tokens
it used. Replayed actions and checks that read the page directly cost nothing.
Values the browser types and secrets are never sent to the model.

## Limits

- It runs Chrome or another Chromium-based browser on this computer, which
  must be awake for scheduled runs.
- Some sites block automated browsers. A saved sign-in and a start page past a
  cookie banner get around the common cases; CAPTCHAs are not solved.
- Allowed websites accept host names only, not local addresses or ports.

When a step fails, look at its screenshot first; see
[Troubleshooting](/docs/troubleshooting/#a-website-step-fails).
