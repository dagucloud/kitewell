---
title: Automate email
---

Email steps find, organize, and send email in a mailbox connected on this
computer: Gmail and Google Workspace, Microsoft 365 and Outlook.com, iCloud,
Yahoo, Fastmail, or any IMAP mailbox. A workflow names the mailbox by its
address; the sign-in stays on the device.

With the rest of a workflow, email steps handle the work that starts or ends
in an inbox:

- File each unread invoice's attachment and record its total.
- Turn support requests into tickets through an imported API.
- Summarize what arrived in the last 24 hours and send the digest.
- Sort incoming mail into folders, with a model choosing where each goes.
- Draft a reply to each request, have you approve it, then send it.

Email steps are included in every plan.

## Connect a mailbox

Open **Mail accounts** in the project, or choose **Connect a mailbox…** in the
**Mailbox** field of any email task, and type the address. Kitewell recognizes
the provider from the domain, or from where a custom domain's mail goes, and
**Choose provider** corrects a wrong guess.

| Provider | Connects with |
| --- | --- |
| Gmail, Google Workspace | An app password while Google reviews Kitewell; sign in through the browser after |
| Microsoft 365, Outlook.com | Sign in through the browser |
| iCloud, Yahoo, Fastmail | An app password made on the provider's site, which the dialog links to; servers are filled in |
| Any other mailbox | IMAP and SMTP host, port, security, user name, and password |

Browser sign-in opens the provider's page in your browser, waits, and
continues on its own once you approve. Kitewell then signs in once, lists the
folders, and reports how many unread emails the inbox holds, or why the
sign-in failed. Nothing is saved until that check passes.

Things to know per provider:

- **Google** blocks Kitewell's browser sign-in for most accounts until it
  finishes reviewing Kitewell's Gmail access; its page says "This app is
  blocked" and offers no way past it. Until then the dialog starts a Gmail
  mailbox from an app password: turn on 2-Step Verification, make an app
  password named Kitewell, and paste it. A browser sign-in that works must use
  the address you typed and tick the Gmail box. A Google Workspace
  administrator who restricts third-party apps must allow Kitewell under **API
  controls**.
- **Microsoft 365** mailboxes need IMAP and Authenticated SMTP turned on, which
  an administrator does in the Microsoft 365 admin center under the user's
  **Mail → Manage email apps**. An organization that allows only approved apps
  gets a link for its administrator to approve Kitewell once. A shared
  mailbox connects by signing in as a member who can open it.
- **App passwords** are made on the provider's site and can be revoked there.

A connection lasts until the provider ends it, since Kitewell renews browser
sign-ins while the computer is on. A mailbox whose sign-in stopped working
shows **Reconnect** on Mail accounts, on the Overview, and beside any run it
failed.

## Build your first email workflow

This example finds unread email in a support inbox, creates a ticket for
each through an imported API, and marks each email read once its ticket
exists.

1. Create a job and add **Find emails** from the task picker. Choose the
   mailbox, keep **Folder** on Inbox and **Unread only** on, and give the step
   an ID such as `find`. Choose **Test** to see the matching emails.
2. Turn on **For each email**. Kitewell adds a loop over what the step found,
   ending in an **Organize emails** task that marks the current email read.
3. Inside the loop, before that task, add **Use an API action** with the
   ticket system's "Create issue" operation. In its fields, the variable
   picker offers the current email's sender, subject, date, and text.
4. Add a [schedule](/docs/scheduling/), such as every five minutes.

The same workflow in YAML:

```yaml
type: graph
steps:
  - id: find
    name: Find unread requests
    action: mail.search
    with:
      mailbox: support@example.com
      unread: true
  - id: each
    name: Handle each request
    depends: [find]
    foreach:
      items: ${steps.find.outputs.messages}
      as: email
      key: ${foreach.email.id}
      steps:
        - id: ticket
          name: Create a ticket
          action: api.request
          # the imported "Create issue" operation, with the email's fields
        - id: done
          name: Mark it handled
          depends: [ticket]
          action: mail.organize
          with:
            mailbox: support@example.com
            emails: ${foreach.email.id}
            mark: read
```

## What the steps do

- **Find emails** lists matching email in a folder, oldest first, with sender,
  subject, date, and text. Filter by read state, sender, subject, age, and
  attachments; **Save attachments into the run's files** puts the files with
  the run's artifacts.
  At most 50 emails per run, 20 by default, so a backlog drains in order.
  Finding never marks email read. Later steps read the list as
  `${steps.<id>.outputs.messages}`.
- **Organize emails** marks email read, unread, flagged, or unflagged, and
  moves it to a folder (created if missing), archives it, or trashes it.
  Nothing is ever deleted permanently. An item can carry its own destination,
  so a model answering `[{"id": "…", "move_to": "Invoices"}, …]` files every
  email in one task. **Test** only previews the change.
- **Send email** sends from the mailbox, with attachments. Inside a loop over
  found emails, **Reply to the current email** threads the reply under it,
  addressed to its sender with `Re:` and its subject. Gmail and Microsoft 365
  keep a copy in Sent; other providers may not.

## Handle each email once

Keep **Unread only** on, and mark each email read — or move it — inside the
loop, right after that email's own tasks. A failed email then stays unread, so
the next run retries only it.

Marking after the loop instead would leave every email unread when one fails,
and the next run would repeat the work already done for the rest. For work on
the whole batch, such as a digest, one **Organize emails** task at the end is
right.

**Review & run** warns when found email is never marked, when it is marked
only after the loop, and when email text reaches a command or an AI agent
that runs commands. Whoever sent the email controls that text; for a model
that reads email, use an **Ask a model** task, which has no tools.

## Run it as a team

A mailbox address travels inside the workflow like any other text, but
connections never do. A project that arrives from a teammate or from
[Dagu Cloud](/docs/cloud-sync/) lists the mailboxes to connect on its
Overview, and a run that needs one is refused until it is connected. Turn a
mailbox workflow on for one computer only: two computers running it would
process the same email.

## Privacy

- **Connections stay here.** Credentials are excluded from backups, exports,
  and sync; a restored device asks you to connect again.
- **Email a step reads** is stored with the run on this computer, under the
  run's retention. It leaves only where your workflow sends it, such as to the
  model you choose in an AI task.
- **A Gmail browser sign-in** asks to read, label, trash, and send email
  (`gmail.modify`), never to delete it permanently. The consent page and the
  [privacy policy](/privacy/) say so.
- **An app password** gives IMAP and SMTP access to the whole mailbox.

## Limits

- At most 50 emails per Find emails run.
- No forwarding, drafts, or per-email triggers yet; a schedule with **Unread
  only** does the same job.
- Microsoft 365 tenants that turn off IMAP or Authenticated SMTP cannot
  connect.

When a sign-in stops working, see
[Troubleshooting](/docs/troubleshooting/#a-mailbox-needs-reconnecting).
