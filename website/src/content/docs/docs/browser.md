---
title: Automate a website
---

An **Automate a website** step opens a site in a browser and works through it
in plain language: open pages, click and type, collect information, check
what the page shows, and download files. An API model decides what to do on
each page.

## Before the first run

- **Chrome**: install Google Chrome in `/Applications`, or set **Device
  settings → Browser → Browser executable**.
- **Check the browser**, on the step or in **Device settings**, opens the
  browser once from Kitewell's background service, so macOS can ask its
  questions before a scheduled run needs an answer. It also reports a browser
  or engine that macOS has not allowed to open yet.
- **A model**: choose one on the step, or set **Default model for browser
  steps** in the workflow's **Settings**. Use an Anthropic, OpenAI, or Gemini
  model; small local models usually cannot drive a browser. Every browser
  step sends the page's text and layout to this model. Values the browser
  types and secrets are never sent.

## Build the steps

Add operations in order:

- **Open a page**
- **Do something on the page**, described in plain language
- **Collect information**, returned as text, a number, yes or no, or a list
  for later steps
- **Make sure that…**, which fails the step when the page does not show it
- **Wait**
- **Take a screenshot**
- **Ask me for input**, which pauses the run for a person's answer

**Only if… and time limit** makes an operation conditional or bounds how long
it may take. Values the step should type, such as a customer number, go under
**Values the browser types** and are written as `%name%` in the
instructions. Choose a secret there for anything sensitive: it stays out of
the instructions, the model, and the logs.

## Browser settings

- **Stay signed in between runs** keeps cookies and storage on this device,
  so a sign-in lasts. Backups do not carry the sign-in, and parallel loop
  items cannot share one.
- **Show the browser window** is useful while you build; hide it for
  scheduled runs.
- **Save screenshots** saves them with the run's artifacts when a step fails,
  after every step, or never.
- **Allowed websites** limits the browser to the hosts you list, including
  any sign-in and image servers the site needs.
- **Window width** and **Window height** set the page size.

To sign in once, start from the **Sign in once, then collect** example: a
first step waits for you to sign in, and later runs reuse the sign-in.
**Project settings → Storage → Sign-ins** lists saved sign-ins, with **Forget
sign-in…**.

## Replay

Actions that worked are remembered and replayed on later runs without asking
the model, which is faster and costs nothing. When the site changes and a
replayed action fails, the model is asked again. **Decide again on every run**
turns replay off for one action, and **Project settings → Storage → Replay
cache** clears remembered actions. A run shows how many actions in each step
were replayed. **Collect information** and plain-language checks ask the model
every run.

## Answer a question

**Ask me for input** pauses the run. Open it under **Runs & logs → Waiting**
and use **Answer**, or **Reject** to fail the step. The answer is recorded with
the run, so do not type passwords; use a secret instead. If the browser closed
before you answered, **Restart the browser step** runs it again from its first
operation.

Screenshots and downloaded files appear in the run's artifacts.
