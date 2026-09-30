---
title: Privacy Policy
description: How Kitewell handles your data. Workflows, run history, credentials, and connected mailboxes stay on your device.
updated: 2026-09-27
---

Descarty, Inc. ("Descarty", "we") publishes Kitewell. This policy explains what
information the Kitewell application and the kitewell.app website handle, where
it goes, and what we receive.

The short version: Kitewell runs on your device. Your workflows, run history,
logs, credentials, and connected mailboxes stay there. We do not receive them.

## 1. Data that stays on your device

Kitewell stores workflow definitions, run records, logs, output files,
settings, and backups on the device where it runs. Saved secrets are encrypted
on that device. We do not receive this data, and Kitewell does not send it to
us.

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
Google for your email address (`openid`, `email`) and for access to Gmail
(`https://mail.google.com/`). Kitewell reads and sends email over IMAP and SMTP,
and Google offers no narrower permission for them. The Microsoft sign-in asks
for the equivalent IMAP and SMTP permissions. Other mailboxes connect with an app
password.

**How Kitewell uses it.** Kitewell uses your email address to confirm that the
account you signed in with is the mailbox you entered. It uses mail access only
to do what you ask in Kitewell: test the connection, list folders, and run the
email steps in your workflows, which search, read, mark, move, and send email
in that mailbox.

**Where it is stored.** The access token is stored on your device as an
encrypted project secret. Email your workflows read is stored on your device in
run output and logs, under the run's retention. Tokens never enter workflow
files, logs, backups, exports, or Dagu Cloud.

**Where it goes.** Email content leaves your device only where your own
workflows send it, for example to an AI provider or an email address you
chose. Descarty does not receive, store, or have access to your email or to
any data from your Google account.

**What Kitewell does not do.** Kitewell does not use data from your mailbox for
advertising, does not sell it, and does not use it to develop, improve, or train
AI or machine learning models. No one at Descarty reads it.

**Limited Use.** Kitewell's use and transfer of information received from
Google APIs to any other app will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

**Disconnecting.** Disconnecting a mailbox in Kitewell deletes its token from
your device and revokes Kitewell's access to your Google account. You can also
remove access at any time from your
[Google Account permissions](https://myaccount.google.com/permissions) page or,
for Microsoft, from your account's app permissions.

## 4. Dagu Cloud account and project sync

Kitewell works without an account. Without one, Kitewell never contacts Dagu
Cloud.

If you sign in with Dagu Cloud, your device checks its plan and reports its
Kitewell version. It sends no workflows, settings, run history, logs, or
secrets. Kitewell stores your account identifiers, email address, license, and
device connection credential on your device.

If you choose to sync a project, Kitewell sends that project's definitions to
Dagu Cloud: workflows and schedules, agents and models, API connections,
servers, queues, secret names and descriptions, saved batch inputs, and project
defaults. Secret values are never sent. Text typed directly into workflow YAML,
batch inputs, or API addresses travels as written.

Dagu Cloud handles accounts, subscriptions, payments, team invitations, and
synced projects under the [Dagu Privacy Policy](https://dagu.sh/privacy).

## 5. Updates and downloads

To check for updates, Kitewell requests the public version list from
kitewell.app. Installers download from GitHub Releases, and engine updates come
from their release service. Like any web request, these reveal your IP address
to the service that receives them. They carry no workflow data.

## 6. The kitewell.app website

The website is hosted on Cloudflare Pages. We use PostHog to count visits: it
records the pages viewed, the referring site, and the device and browser type,
and stores an identifier in your browser to do so. It does not record your
screen or keystrokes. Cloudflare may keep request logs for security and
operations.

## 7. Support

Public GitHub issues are visible to anyone. Do not include secrets or private
workflow data. Security reports sent through GitHub's private reporting and
emails to us are seen only by the Kitewell team.

## 8. How we use the information we receive

The information we receive, website visit statistics and the messages you send
us, is used to run and improve Kitewell and its website, to answer your
questions, and to handle security reports. We do not sell personal information
and do not provide it to third parties except with your consent or as required
by law.

## 9. Services outside Japan

PostHog, Inc., Cloudflare, Inc., and GitHub, Inc. are companies in the United
States and process information on servers there. Information on the personal
information protection system of the United States is published by the
[Personal Information Protection Commission of Japan](https://www.ppc.go.jp/).

## 10. Your requests

To ask us to disclose, correct, delete, or stop using personal information we
hold about you, contact us at the address below. We will confirm your identity
and respond without undue delay, as required by law.

## 11. Changes to this policy

We will post any change on this page and update the date above. If a change
affects how Kitewell handles data from connected accounts, we will describe it
in the release notes before it takes effect.

## 12. Contact

Descarty, Inc.\
Shibuya Dogenzaka Tokyu Bldg. 2F-C, 1-10-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043, Japan\
company@descarty.com

The Japanese version of this policy prevails if the two versions differ.
