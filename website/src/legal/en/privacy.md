---
title: Privacy Policy
description: How Kitewell handles your data. Workflows, run history, credentials, and connected mailboxes, calendars, and Google files stay on your device.
updated: 2026-11-14
---

Descarty, Inc. ("Descarty", "we") publishes Kitewell. This policy explains what
information the Kitewell application and the kitewell.com website (also served
at kitewell.app) handle, where it goes, and what we receive.

The short version: Kitewell runs on your device. Your workflows, run history,
logs, credentials, and connected mailboxes, calendars, and Google files stay
there. We do not receive them. In Kitewell Cloud and Kitehand, Kitewell runs
instead in a session we operate in Google Cloud, which keeps them for you
(section 3).
If you sync a project, its definitions and the status of its runs go to Dagu
Cloud, which we run (section 4).
If you connect ChatGPT or Claude, what it reads through Kitewell's tools
passes through our relay without being stored. If you turn on a webhook,
requests other services send to it wait at our relay until your device takes
them, for at most 7 days.

## 1. Data that stays on your device

Kitewell stores workflow definitions, run records, logs, output files,
settings, and backups on the device where it runs. Saved secrets are encrypted
on that device. We do not receive this data, and Kitewell does not send it to
us, except the definitions and run status of a project you sync (section 4).
An AI app you connect reaches it only as described in section 5.

Workflows can read and change the files that the account running Kitewell can
reach. Run output can contain personal information or credentials; review logs
before you share them. Backups and project exports are not encrypted. Keep them
private. Removing the app does not remove its workspace, backups, or
credentials; the uninstall guide describes how to remove them.

## 2. Connections you choose

Workflows send data to the destinations you configure, such as AI providers,
APIs, command-line agents, containers, SSH servers, email servers, Slack, and
Microsoft Teams. Prompts, context, files, and output may be sent to those
destinations as your workflows define. Each destination handles that data under
its own terms and privacy policy.

**Kitewell's included model.** On a device signed in to Dagu Cloud, and in
Kitewell Cloud and Kitehand, prompts and their context for the included model
go through Dagu Cloud to OpenRouter, Inc., which passes them to a host that
runs the model. Dagu Cloud keeps no prompt text. OpenRouter may send them only
to hosts that neither keep nor train on them (its Zero Data Retention policy).
DeepSeek V4.1 Flash runs only on hosts headquartered in the United States or
the European Union, never DeepSeek itself or a host based in China; OpenAI
GPT-6.1 Terra, which reads screenshots, runs only on Microsoft Azure in the
EU. The model may change; the
[AI models page](/docs/ai/#which-model-and-where-it-runs) names the current one.

## 3. Connected mailboxes, calendars, and files (Gmail, Microsoft 365, IMAP, Google Calendar, Google Sheets, and Google Drive)

You can connect a mailbox so your workflows can find, read, organize, and send
email in it. This section describes how Kitewell handles the data it receives
from that mailbox, including data received through Google APIs.

**What Kitewell requests.** When you connect a Google account, Kitewell asks
Google for your email address (`openid`, `email`) and for permission to read,
organize, and send your Gmail (`https://www.googleapis.com/auth/gmail.modify`).
Kitewell reaches Gmail through the Gmail API. This permission lets it read email,
change labels such as read and unread, move email to the trash, and send email;
it does not let Kitewell delete email permanently. The Microsoft sign-in asks for
permission to read and send email over IMAP and SMTP. Other mailboxes connect with
an app password.

**How Kitewell uses it.** Kitewell uses your email address to confirm that the
account you signed in with is the mailbox you entered. It uses mail access only
to do what you ask in Kitewell: test the connection, list folders, and run the
email steps in your workflows, which search, read, mark, move, and send email
in that mailbox.

**Where it is stored.** When Kitewell runs on your device, your sign-in token,
or the app password you enter, is stored only there, in two places: Kitewell's mailbox file and the
workflow engine's secret store. Both are encrypted (see "How it is protected"
below). Email your workflows read is stored on your device in run output and
logs, under the run's retention. Tokens never enter workflow files, logs,
backups, exports, or Dagu Cloud.

**Who receives it.** Descarty does not sell, share, transfer, or disclose data
from your mailbox, including Google user data, to anyone. From your device,
none of it is sent to Descarty to be stored, and no one at Descarty can read
it. It leaves your device only in these cases, each at your direction:

- **Destinations your workflows send it to.** A workflow step you write can
  send email content to the destination you choose, such as an AI provider
  (for example OpenAI or Anthropic), an API, or an email address. Each
  destination handles it under its own terms and privacy policy.
- **An AI app you connect (section 5).** If you turn on remote access and
  connect ChatGPT or Claude, the app can read run output, which can contain
  email your workflows read. It travels encrypted through Kitewell's relay at
  mcp.kitewell.app, which runs on Cloudflare and does not store it, to OpenAI
  or Anthropic.
- **MCP Events (section 5).** An event for a step waiting for a person carries
  its question or task text, which can quote email, to the HTTPS address the
  subscribing app provided.

For a mailbox connected on your device, Descarty holds no data from it, so it
has none to disclose, including in response to a legal request.

**In a cloud session.** Kitewell Cloud and Kitehand run Kitewell for you in a
session in Google Cloud, operated by Descarty, instead of on your device.
There, your mailbox's sign-in token or app password and the email your
workflows read are kept in that session and its storage, encrypted, in Google
Cloud's Iowa region (`us-central1`) in the United States, and a Google sign-in goes through
Kitewell's web client, which returns to app.kitewell.com or app.kitehand.ai.
A Kitehand assistant sends what it reads, which can include your email, to the
AI model provider that answers it (OpenRouter and the model host it routes to)
to do the work you asked for. The cases above, at your direction, are the only
other ways it leaves the session. Descarty's staff are not let into your
session by the product; access through Google Cloud by those who operate it
is not yet technically restricted.

**How it is protected.**

- **Encryption in transit.** Kitewell reaches Gmail through the Gmail API over
  HTTPS, and Microsoft and other mail servers over TLS or STARTTLS.
  Connections to the relay use HTTPS.
- **Encryption at rest.** Sign-in tokens and app passwords are encrypted with
  AES-256-GCM. The keys never leave your device, and only your user account
  on the device can read the files that hold the tokens and the keys. Email in
  run output and logs is protected by the same file permissions; turn on your
  operating system's disk encryption, such as FileVault or BitLocker, to
  encrypt it at rest as well.
- **Sign-in.** You sign in to Google or Microsoft in your own browser, so
  Kitewell never sees your account password. The sign-in uses OAuth 2.0 with
  PKCE and a one-time state value, and returns only to Kitewell at your
  device's loopback address or, in a cloud session, at app.kitewell.com or
  app.kitehand.ai.
- **Access control.** Remote access stays off until you turn it on. Each AI
  app you connect needs your approval, and you can revoke it at any time.
  Local MCP and REST clients need an API key limited to the projects you
  choose.
- **No credentials in output.** The workflow engine masks tokens and passwords
  in logs and run output.
- **Removal.** Disconnecting a mailbox deletes its token from your device, or
  from your session in a cloud session (see "Disconnecting" below).

**What Kitewell does not do.** Kitewell does not use data from your mailbox for
advertising, does not sell it, and does not use it to develop, improve, or train
AI or machine learning models. No one at Descarty reads it.

**Limited Use.** Kitewell's use and transfer of information received from
Google APIs to any other app will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

**Disconnecting.** Disconnecting a mailbox in Kitewell deletes its token from
your device. Kitewell then revokes its access to your Google account, unless
another project on the same device still uses that mailbox or a Google Calendar
of the same account is connected; revoking ends that account's Kitewell access
on every device. You can also
remove access at any time from your
[Google Account permissions](https://myaccount.google.com/permissions) page or,
for Microsoft, from your account's app permissions.

### Google Calendar

You can connect a Google Calendar so your workflows can read its events and,
when you build them to, add, change, or delete them. This
part describes how Kitewell handles the data it receives from Google Calendar,
which is Google user data received through Google APIs.

**What Kitewell requests.** When you connect Google Calendar, Kitewell asks
Google for your email address (`openid`, `email`), for the list of calendars
you are subscribed to
(`https://www.googleapis.com/auth/calendar.calendarlist.readonly`), for when
you are busy on the calendars you can open
(`https://www.googleapis.com/auth/calendar.events.freebusy`), and for
permission to view your events
(`https://www.googleapis.com/auth/calendar.events.readonly`) or, once Google
has approved it for Kitewell, to view and edit them
(`https://www.googleapis.com/auth/calendar.events`) in its place. These
permissions do not let Kitewell create, change, or delete calendars, or change
their sharing, and Kitewell asks for nothing more.

**How Kitewell uses it.** Kitewell uses your email address to show which
Google account a connection signed in as. It uses calendar access only to do
what you ask in Kitewell: run the Google Calendar steps in your workflows,
which list calendars, find busy times, list and read events, and add, change,
or delete events. Kitewell adds, changes, or deletes an event only when a step
of a workflow you built or approved does so, never on its own.

**Where it is stored.** Your sign-in token is stored only on your device,
encrypted with AES-256-GCM under a key that never leaves it, and is handed to
the workflow engine on your device when a step runs. Events your workflows
read are stored on your device in run output and logs, under the run's
retention. Tokens never enter workflow files, logs, backups, exports, or Dagu
Cloud.

**Who receives it.** Descarty does not sell, share, transfer, or disclose data
from your calendar, including Google user data, to anyone. From your device,
none of it is sent to Descarty to be stored, and no one at Descarty can read it. It leaves your
device only at your direction, in the same cases as mailbox data above:
destinations your workflows send it to, an AI app you connect, and MCP Events.

**In a cloud session.** Kitewell Cloud and Kitehand run Kitewell for you in a
session in Google Cloud, operated by Descarty, instead of on your device. There,
your sign-in token and the events your workflows read are kept in that session
and its storage, encrypted, in Google Cloud's Iowa region (`us-central1`) in the United States,
and you sign in to Google through Kitewell's web client, which returns to
app.kitewell.com or app.kitehand.ai. A Kitehand assistant sends what it reads,
which can include your events, to the AI model provider that answers it
(OpenRouter and the model host it routes to) to do the work you asked for.
Descarty's staff are not let into your session by the product; access through
Google Cloud by those who operate it is not yet technically restricted.

**How it is protected.** As for mailboxes above: HTTPS to Google, encryption
at rest, sign-in in your own browser with OAuth 2.0, PKCE, and a one-time
state value, access control for remote access, and tokens masked in logs and
run output.

**What Kitewell does not do.** Kitewell does not use data from your calendar
for advertising, does not sell it, and does not use it to develop, improve, or
train AI or machine learning models. No one at Descarty reads it.

**Limited Use.** Kitewell's use and transfer of information received from
Google APIs to any other app will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

**Disconnecting.** Disconnecting Google Calendar in Kitewell's API library
deletes its token from your device. Kitewell does not revoke the grant at
Google, because that would also end your mailbox connections made with the
same Google account; you can remove Kitewell's access at any time from your
[Google Account permissions](https://myaccount.google.com/permissions) page.

### Google Sheets and Google Drive

You can connect Google Sheets or Google Drive so your workflows can read and
write the files you choose. This part describes how Kitewell handles the data
it receives from them, which is Google user data received through Google APIs.

**What Kitewell requests.** When you connect Google Sheets or Google Drive,
Kitewell asks Google for your email address (`openid`, `email`) and for access
to the files you use with Kitewell
(`https://www.googleapis.com/auth/drive.file`). That permission reaches only
the files you choose in Google's file picker, which opens as you finish
signing in, and the files Kitewell creates for you. It does not let Kitewell
see the rest of your Google Drive, and Kitewell asks for nothing more.

**How Kitewell uses it.** Kitewell uses your email address to show which
Google account a connection signed in as. It uses file access only to do what
you ask in Kitewell: run the Google Sheets and Google Drive steps in your
workflows, which read cells, write cells, add rows, create spreadsheets and
folders, and list, read, export, copy, rename, or move the files you chose.

**Where it is stored.** As for Google Calendar above: your sign-in token is
stored only on your device, encrypted with AES-256-GCM under a key that never
leaves it, and file contents your workflows read are stored on your device in
run output and logs, under the run's retention.

**Who receives it.** Descarty does not sell, share, transfer, or disclose data
from your files, including Google user data, to anyone. From your device, none
of it is sent to Descarty to be stored, and no one at Descarty can read it. It leaves your
device only at your direction, in the same cases as mailbox data above.

**In a cloud session.** As for Google Calendar above: in Kitewell Cloud and
Kitehand, your sign-in token and the file contents your workflows read are
kept in your session and its storage, encrypted, in Google Cloud's Iowa
region (`us-central1`) in the United States, and a Kitehand assistant sends what it reads to
the AI model provider that answers it to do the work you asked for.

**How it is protected.** As for mailboxes above.

**What Kitewell does not do.** Kitewell does not use data from your files for
advertising, does not sell it, and does not use it to develop, improve, or
train AI or machine learning models. No one at Descarty reads it.

**Limited Use.** The Limited Use statement in the Google Calendar part above
applies to data from Google Sheets and Google Drive too.

**Disconnecting.** Disconnecting Google Sheets or Google Drive in Kitewell's
API library deletes its token from your device. Your files stay in your
Google Drive. You can remove Kitewell's access at any time from your
[Google Account permissions](https://myaccount.google.com/permissions) page.

## 4. Dagu Cloud account and project sync

Kitewell works without an account. Without one, Kitewell never contacts Dagu
Cloud.

If you sign in with Dagu Cloud, your device checks its plan and reports its
Kitewell version, device ID, and device name. It sends no workflows, settings,
run history, logs, or secrets. Kitewell stores your account identifiers, email address, license, and
device connection credential on your device.

If you choose to sync a project, Kitewell sends that project's definitions to
Dagu Cloud: workflows and schedules, agents and models, API connections,
servers, queues, secret names and descriptions, saved batch inputs, and project
defaults. Secret values are never sent. Text typed directly into workflow YAML,
batch inputs, or API addresses travels as written.

While a project is synced, each device that runs it also reports the status of
its runs to Dagu Cloud, about every two minutes: each run's workflow, status,
trigger, the times it was queued, started, and finished, and the names of the
steps that failed, with the device's Kitewell version, operating system, and
when Kitewell started. It never reports parameters, logs, outputs, sheet
values, or secret values.

The workspace owner sees the runs of every synced project in Dagu Console.
Other members of the workspace see the runs of the projects they have a role
on, and the devices that are theirs or ran those projects, with their names,
users, and Kitewell versions. Dagu Cloud keeps each run for 14 days, daily totals for 13
months, and alerts for 90 days after they resolve, and deletes what a device
reported once it has not reported for 30 days. The workspace owner can turn
this reporting off in Dagu Console, under Settings, with "Share Kitewell run
status"; devices then report only that they are running.

Dagu Cloud handles accounts, subscriptions, payments, team invitations, and
synced projects under the [Dagu Privacy Policy](https://dagu.sh/privacy).

## 5. Connecting AI apps (remote MCP)

You can connect ChatGPT or Claude to Kitewell on your device through
`https://mcp.kitewell.app/mcp`. This requires a Dagu Cloud account and stays
off until you turn on remote access in Kitewell.

**What passes through the relay.** The AI app's requests to your device and
your device's answers pass through Kitewell's relay, a Cloudflare Worker at
mcp.kitewell.app. They pass through in transit only, and their contents are
never stored, except the discovery answers described next.

**What the relay stores.** For each device, the relay stores only its name,
Kitewell version, last-seen time, and its last answers to the discovery calls
(`server/discover`, `initialize`, `tools/list`, `resources/list`, and
`resources/templates/list`), so the connector keeps working while your device
is offline. It deletes all of this 30 days after it last heard from the device.

**What Dagu Cloud stores.** You sign in to Dagu Cloud to connect an app. For
each connection, Dagu Cloud stores:

- the app's registration: its name and redirect URIs;
- the grant: your user and workspace, the device's ID and name, the app's name
  and redirect host, the permission, the project IDs, timestamps, and the
  state of its refresh token.

Your device reports its ID and name to Dagu Cloud while signed in (section 4).
A grant ends when it is revoked or when its refresh token goes unused for 90
days, and is deleted 7 days after it ends. A grant that was never completed is
deleted a day after its authorization code expires. A registered app is deleted
once it has no grants and hasn't been used for 180 days.

**What stays on your device.** Kitewell keeps the list of connected apps and
when each was last used.

**MCP Events.** If an app subscribes to events, your device sends each event
directly to the HTTPS address the app provided, signed with the app's secret.
An event holds the project, workflow, run ID, status, times, and the names of
failed steps, and, for a step waiting for a person, its question or task text.
Subscriptions and their secrets stay on your device.

**The AI provider.** OpenAI (ChatGPT) or Anthropic (Claude) receives whatever
the connected app reads through Kitewell's tools, and handles it under its own
terms and privacy policy.

**Stopping.** Turning off remote access in Kitewell, or revoking the app under
**Connected apps**, stops its access.

## 6. Webhooks

You can give a workflow a webhook URL at `https://hooks.kitewell.app`, so that
services you choose start it by sending a request. This requires a Dagu Cloud
account and Kitewell Personal or Team, and stays off until you turn it on for a workflow.

**What the relay stores.** Each request reaches Kitewell's relay, the Cloudflare
Worker described in section 5, with its body and headers. Cookies,
`Authorization`, and the headers Cloudflare adds are dropped. The relay stores
the request until your device takes it, then deletes it, and deletes any
request your device has not taken within 7 days. For each webhook it stores
only a hash of the secret part of the URL. Like the rest of a device's data,
everything is deleted 30 days after the relay last heard from the device.

**On your device.** A request's body and headers become inputs of the run they
start, and are kept with its run history for the retention you set. Kitewell
also keeps each workflow's latest 20 requests: when each arrived, its size, and
what became of it.

**The sender.** The service that sends a request decides what it holds, under
its own terms and privacy policy. A request can hold personal information, such
as the name and email address in a GitHub issue or a Stripe payment.

**Stopping.** When you turn off a workflow's webhook, your device tells the
relay, which then refuses its URL and deletes the requests still waiting for
it. A new URL replaces the old one the same way.

## 7. Updates and downloads

To check for updates, Kitewell requests the public version list from
kitewell.com, or kitewell.app in earlier builds: about once a day while the
app runs, and when you choose
**Check for Updates…**. Installers download from GitHub Releases, and engine
updates come from their release service. Like any web request, these reveal
your IP address to the service that receives them. They carry no workflow
data.

## 8. The kitewell.com website

The website, at kitewell.com and also at kitewell.app, is hosted on Cloudflare
Pages. We use PostHog to count visits: it
records the pages viewed, the referring site, and the device and browser type,
and stores an identifier in your browser to do so. It does not record your
screen or keystrokes. Cloudflare may keep request logs for security and
operations.

## 9. Support

Public GitHub issues are visible to anyone. Do not include secrets or private
workflow data. Security reports sent through GitHub's private reporting and
emails to us are seen only by the Kitewell team.

## 10. How we use the information we receive

The information we receive, website visit statistics and the messages you send
us, is used to run and improve Kitewell and its website, to answer your
questions, and to handle security reports. What the relay stores (sections 5
and 6) is used to run the connector and to deliver webhooks. We do not sell personal information and do not
provide it to third parties except with your consent or as required by law.

## 11. Services outside Japan

PostHog, Inc., Cloudflare, Inc. (which hosts the website and Kitewell's
relay), and GitHub, Inc. are companies in the United States and process
information on servers there. Kitewell Cloud and Kitehand sessions, and their storage,
are in Google Cloud's Iowa region (`us-central1`) in the United States. Information on the personal information
protection system of the United States is published by the
[Personal Information Protection Commission of Japan](https://www.ppc.go.jp/).

## 12. Your requests

To ask us to disclose, correct, delete, or stop using personal information we
hold about you, contact us at the address below. We will confirm your identity
and respond without undue delay, as required by law.

## 13. Changes to this policy

We will post any change on this page and update the date above. If a change
affects how Kitewell handles data from connected accounts, we will describe it
in the release notes before it takes effect.

## 14. Contact

Descarty, Inc.\
Shibuya Dogenzaka Tokyu Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan\
company@descarty.com

The Japanese version of this policy prevails if the two versions differ.
