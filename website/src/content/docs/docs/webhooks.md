---
title: Start a workflow from a webhook
---

A workflow can start when another service sends it a request: GitHub when an
issue opens, Stripe when a payment succeeds, a form when someone submits it,
or Zapier and Make for the apps they connect. Your computer has no public
address, so the request goes to Kitewell's relay, which hands it to Kitewell
on your computer. No port to open, no tunnel to set up.

Webhooks are part of Kitewell Pro, and need Kitewell
[signed in](/docs/cloud-sync/#sign-in) to Dagu Cloud.

## Turn on a webhook

1. Open a saved workflow and choose **Schedule**, or the **When this runs**
   card.
2. Under **Webhook**, choose **Turn on**. The URL appears after a moment:
   `https://hooks.kitewell.app/…`.
3. Choose **Copy** and paste the URL into the service that sends requests.
4. Choose **Send test request** to try the whole way: Kitewell sends a request
   to its own URL, and it comes back through the relay like any other. It
   starts a run, as a real request would.

The **When this runs** card then shows **Webhook on**. Only people who can
edit the workflow see its URL. API keys and connected apps cannot read it.

## Read the request in a step

Each request starts one run, and run history shows its trigger as
**Webhook**. Steps read the request from two environment variables:

- `WEBHOOK_PAYLOAD` holds the body as it was sent.
- `WEBHOOK_HEADERS` holds the headers as JSON: lowercase names, each with a
  list of values, such as `{"x-github-event":["issues"]}`. `Authorization`
  and cookies are left out.

You don't declare either one as an input. To pick a field out of a JSON body,
use a `jq.filter` step, which works the same on macOS and Windows:

```yaml
steps:
  - id: issue
    action: jq.filter
    with:
      data: ${env.WEBHOOK_PAYLOAD}
      filter: .issue.title
    output:
      title: {from: stdout, decode: json}
```

Later steps read the title as `${steps.issue.outputs.title}`. An AI step can
take the whole body in its prompt as text.

The body is whatever the sender sent, so treat it as untrusted. A command
reads it from its environment, as `"$WEBHOOK_PAYLOAD"` in a macOS shell or
`$env:WEBHOOK_PAYLOAD` in PowerShell on Windows. Never write
`${env.WEBHOOK_PAYLOAD}`, or a value taken from it, into the command text,
where its quotes would become code. The [assistant](/docs/ai/#the-assistant)
knows these variables: ask it to build the workflow from the request you
expect.

## Set up the sender

### GitHub

1. In the repository, or the organization, open **Settings → Webhooks** and
   choose **Add webhook**.
2. Paste the URL into **Payload URL**.
3. Set **Content type** to `application/json`. GitHub's default sends the body
   as form data (`payload=…`), which is not JSON.
4. Under **Which events would you like to trigger this webhook?**, choose
   **Let me select individual events** and pick only the ones the workflow
   needs. Every event GitHub sends starts a run.

GitHub's **Recent Deliveries** tab shows each request with Kitewell's answer,
`202` when the relay took it.

### Other services

Any service that sends an HTTP `POST` works. In Stripe, add an endpoint with
the URL and choose the events. In Zapier or Make, add a webhook action that
posts to the URL. A form service usually has a webhook or "notify a URL"
setting.

## When your computer is asleep or offline

The relay answers the sender at once, whether or not your computer is
reachable. Requests wait at the relay for up to 7 days, and run, oldest first,
when Kitewell connects again. Up to 1,000 can wait for one computer; after
that, senders are asked to try again later.

## Recent requests

The Webhook section lists the latest 20 requests: when each arrived, its size,
and its result, with **View run →** or the reason it started nothing.

| Result | Meaning |
| --- | --- |
| **Run started** | The request started a run. A request the relay sent twice starts one run. |
| **Failed** | The run could not be queued, for example because the project's engine is stopped. Kitewell retries a busy or recovering engine for 10 minutes first. |
| **Ignored** | Kitewell Pro has lapsed. |

## Keep the URL private

Anyone who has the URL can start the workflow. Treat it like a password.

- **New URL** replaces it at once; the old URL answers `404`. Paste the new one
  wherever the old one was.
- **Turn off** stops the URL the same way. Turning the webhook on again makes a
  new URL.

A webhook URL belongs to one computer. Turning on the same workflow's webhook
on a teammate's computer gives that computer its own URL. A restored backup
starts with webhooks off.

## Limits

| Limit | Value |
| --- | --- |
| Request body | 512 KiB of text |
| Requests per URL | 60 a minute |
| Requests waiting for a computer | 1,000, for up to 7 days |

The relay answers:

| Status | Meaning |
| --- | --- |
| `202` | Accepted. The body is `{"id": "…"}`. |
| `404` | Not a webhook URL, or it was turned off or replaced. |
| `413` | The body is over 512 KiB. |
| `415` | The body is not UTF-8 text. |
| `429` | More than 60 requests this minute; retry after the `Retry-After` seconds. |
| `503` | 1,000 requests are already waiting for this computer. |

On Windows, a body larger than about 30,000 characters may fail to start a
run, and the request shows **Failed**. GitHub push and pull request events can
be that large. A fix is on the way.

If Kitewell Pro lapses, the URL still accepts requests, but they start nothing
and show **Ignored**. Signing up again needs no new URL.

## Where the request goes

The request passes through Kitewell's relay at hooks.kitewell.app, on
Cloudflare. The relay keeps it only until your computer takes it, for at most
7 days, and stores only a hash of the secret part of each URL. On your
computer, the body is kept with its run, like any run input, for the retention
you set. See [What leaves your computer](/docs/data-flow/).

## Troubleshooting

- **"Getting the URL from Kitewell's relay…" doesn't go away.** Check that
  Kitewell is signed in to Dagu Cloud and the computer is online, then turn
  the webhook off and on.
- **A new URL answers `404`.** Wait a few seconds for Kitewell to give the
  relay the new URL.
- **A step cannot parse the body from GitHub.** Set **Content type** to
  `application/json` in the GitHub webhook.
- **A request shows Failed.** The row gives the reason. For a stopped project,
  start it from the menu bar menu or the tray menu, then send the request
  again.
