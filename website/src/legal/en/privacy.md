---
title: Privacy Policy
description: How Kitewell handles your data. Workflows, run history, credentials, and connected mailboxes stay on your device.
updated: 2026-10-05
---

Descarty, Inc. ("Descarty", "we") publishes Kitewell. This policy explains what
information the Kitewell application and the kitewell.app website handle, where
it goes, and what we receive.

The short version: Kitewell runs on your device. Your workflows, run history,
logs, credentials, and connected mailboxes stay there. We do not receive them.
If you connect ChatGPT or Claude, what it reads through Kitewell's tools
passes through our relay without being stored.

## 1. Data that stays on your device

Kitewell stores workflow definitions, run records, logs, output files,
settings, and backups on the device where it runs. Saved secrets are encrypted
on that device. We do not receive this data, and Kitewell does not send it to
us. An AI app you connect reaches it only as described in section 5.

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

## 3. Connected mailboxes (Gmail, Microsoft 365, and IMAP)

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

**Where it is stored.** Your sign-in token, or the app password you enter, is
stored only on your device, in two places: Kitewell's mailbox file and the
workflow engine's secret store. Both are encrypted (see "How it is protected"
below). Email your workflows read is stored on your device in run output and
logs, under the run's retention. Tokens never enter workflow files, logs,
backups, exports, or Dagu Cloud.

**Who receives it.** Descarty does not sell, share, transfer, or disclose data
from your mailbox, including Google user data, to anyone. None of it is sent to
Descarty to be stored, and no one at Descarty can read it. It leaves your
device only in these cases, each at your direction:

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

Because Descarty holds no data from your mailbox, it has none to disclose,
including in response to a legal request.

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
  device's loopback address.
- **Access control.** Remote access stays off until you turn it on. Each AI
  app you connect needs your approval, and you can revoke it at any time.
  Local MCP and REST clients need an API key limited to the projects you
  choose.
- **No credentials in output.** The workflow engine masks tokens and passwords
  in logs and run output.
- **Removal.** Disconnecting a mailbox deletes its token from your device (see
  "Disconnecting" below).

**What Kitewell does not do.** Kitewell does not use data from your mailbox for
advertising, does not sell it, and does not use it to develop, improve, or train
AI or machine learning models. No one at Descarty reads it.

**Limited Use.** Kitewell's use and transfer of information received from
Google APIs to any other app will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

**Disconnecting.** Disconnecting a mailbox in Kitewell deletes its token from
your device. Kitewell then revokes its access to your Google account, unless
another project on the same device still uses that mailbox; revoking ends that
account's Kitewell access on every device. You can also
remove access at any time from your
[Google Account permissions](https://myaccount.google.com/permissions) page or,
for Microsoft, from your account's app permissions.

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
A grant is kept until it is revoked, or until its refresh token goes unused for
90 days. A registered app that never received a grant is deleted after 30
days.

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

## 6. Updates and downloads

To check for updates, Kitewell requests the public version list from
kitewell.app. Installers download from GitHub Releases, and engine updates come
from their release service. Like any web request, these reveal your IP address
to the service that receives them. They carry no workflow data.

## 7. The kitewell.app website

The website is hosted on Cloudflare Pages. We use PostHog to count visits: it
records the pages viewed, the referring site, and the device and browser type,
and stores an identifier in your browser to do so. It does not record your
screen or keystrokes. Cloudflare may keep request logs for security and
operations.

## 8. Support

Public GitHub issues are visible to anyone. Do not include secrets or private
workflow data. Security reports sent through GitHub's private reporting and
emails to us are seen only by the Kitewell team.

## 9. How we use the information we receive

The information we receive, website visit statistics and the messages you send
us, is used to run and improve Kitewell and its website, to answer your
questions, and to handle security reports. What the relay stores (section 5)
is used to run the connector. We do not sell personal information and do not
provide it to third parties except with your consent or as required by law.

## 10. Services outside Japan

PostHog, Inc., Cloudflare, Inc. (which hosts the website and Kitewell's
relay), and GitHub, Inc. are companies in the United States and process
information on servers there. Information on the personal information
protection system of the United States is published by the
[Personal Information Protection Commission of Japan](https://www.ppc.go.jp/).

## 11. Your requests

To ask us to disclose, correct, delete, or stop using personal information we
hold about you, contact us at the address below. We will confirm your identity
and respond without undue delay, as required by law.

## 12. Changes to this policy

We will post any change on this page and update the date above. If a change
affects how Kitewell handles data from connected accounts, we will describe it
in the release notes before it takes effect.

## 13. Contact

Descarty, Inc.\
Shibuya Dogenzaka Tokyu Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan\
company@descarty.com

The Japanese version of this policy prevails if the two versions differ.
