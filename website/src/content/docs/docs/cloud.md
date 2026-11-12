---
title: Kitewell Cloud
---

Kitewell Cloud is Kitewell in your browser, with nothing to install. Each
project you make there gets its own machine in the cloud, so its schedules run
with your computer closed. Build and fix workflows from a browser or your
phone.

## Start

1. Open [app.kitewell.com](https://app.kitewell.com/) and sign in to Dagu
   Cloud, or create an account.
2. Choose **Create project** and give it a name. Kitewell sets up the
   project's machine, which takes about 20 seconds.
3. Tell the assistant what the job is, as in
   [your first workflow](/docs/getting-started/).

Your first project starts the 14-day trial, with no card. The trial holds one
project. Subscribe to Kitewell Personal or Team for more.

## Cloud minutes

Kitewell Cloud is billed apart from the plans, by the minutes its runs take.
Each run is rounded up to a whole minute. Waiting for a person's approval
counts nothing, and neither does building with the assistant.

- Every workspace has 1,000 free minutes a month, on any plan.
- Past them, a minute costs $0.007 (¥1 in Japan) before tax, up to a monthly
  budget the workspace's owner sets on the account page, after adding a card.
- Without a budget, Kitewell Cloud starts no new runs once the free minutes
  are used, until the month resets, and the app says so. Nothing is charged.
- Meanwhile you can still open projects, read past runs, and export.
- Runs on your own computer are never metered.

## Work as a team

On Kitewell Team, the trial included, the workspace owner invites people from
the browser:

1. Choose the gear beside your name to open **Account**. Under **Team**, enter
   the person's email address and choose **Invite**. Kitewell emails them a
   link, and shows it to you once so you can send it too.
2. They open the link, sign in or sign up with that address, and choose to
   join. Kitewell opens your workspace for them.
3. Under **Synced projects**, give them **Editor** or **Admin** on each project
   they work on, and choose **Save access**. Opening a cloud project takes one
   of the two.

Everyone keeps their own workspace as well. Once someone belongs to more than
one, the open workspace's name shows under their name, and choosing it
switches to another.

## How it runs

- Each project runs on its own machine in Google Cloud, with the same Kitewell
  engine as the desktop app.
- Website steps run in a real Chrome on that machine. Watch it in the page,
  and choose **Take over** to sign in to a site yourself.
- The machine sleeps when nothing is due, and wakes in time for the next
  scheduled run, with no page open.
- The project's files and sign-ins are kept encrypted in its own storage, in
  Google Cloud's Iowa region (`us-central1`) in the United States. The
  [privacy policy](/privacy/) says what is kept and where.
- Kitewell's included model runs only on zero data retention hosts
  headquartered in the US or EU, so what you send is neither kept nor used
  for training ([which model, and where it runs](/docs/ai/#which-model-and-where-it-runs)).

## What runs in the cloud, and what needs your computer

These run in Kitewell Cloud:

- [websites](/docs/browser/), including sign-ins;
- [email](/docs/email/);
- [Excel files](/docs/spreadsheets/) without macros;
- APIs and web requests;
- AI model steps, and the assistant;
- approvals, and [schedules](/docs/scheduling/) with your computer closed.

These need [Kitewell on your computer](/docs/install/):

- [desktop apps](/docs/desktop/);
- Excel macros and query refresh;
- printing;
- files on your own disk;
- sites you can reach only from your office network;
- client certificates kept on your computer;
- coding agents such as Claude Code and Codex, signed in with your own
  subscription.

## Cloud projects and desktop projects

A project made in the browser opens only in the browser, and a project on your
computer opens only in the desktop app. Each one runs where it was made.
