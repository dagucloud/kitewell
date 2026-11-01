---
title: Call Kitewell from another system
---

A workflow platform such as Camunda, intra-mart, or n8n, a job scheduler, or
an EAI tool can hand Kitewell one task in its own flow. It starts a Kitewell
workflow, passes values in, and takes the result back. Kitewell does the part
with no API, such as a website or a desktop app.

There are two ways in. Choose by how the other system wants the result back.

| | Webhook | REST API |
| --- | --- | --- |
| Starts a run with | A `POST` to the workflow's webhook URL | `POST /api/jobs/{id}/run` |
| Values go in | The request body | `params` in the request body |
| The result comes back | From the workflow's last step | By reading the run |
| Reaches your computer | Through Kitewell's relay, with nothing to set up | At an address you set up |
| While the computer sleeps | Requests wait at the relay for up to 7 days | No call reaches it |

## What you need

- A saved workflow that does the task.
- Kitewell open on the computer that holds it. Runs start only while that
  computer is awake.
- For a webhook, Kitewell [signed in](/docs/cloud-sync/#sign-in) to Dagu Cloud.
- For REST, an API key with the **Run workflows** permission, made as in
  [Connect an assistant on this computer](/docs/mcp/#connect-an-assistant-on-this-computer).

## Start it with a webhook

A webhook suits a system that sends an HTTP `POST` and carries on. No port is
opened on your network.

1. Turn on the workflow's webhook and copy its URL, as in
   [Turn on a webhook](/docs/webhooks/#turn-on-a-webhook).
2. In the other system, add a step that posts to that URL, with the values
   the task needs in the body, such as JSON.
3. Have it send one request. In Kitewell, under **Recent requests**, choose
   **Details** beside it, then **Build steps from this request**. The
   assistant adds steps that pick the values out of the body.

Steps read the body from `WEBHOOK_PAYLOAD`. It holds whatever the sender sent,
so treat it as untrusted; see
[Read the request in a step](/docs/webhooks/#read-the-request-in-a-step).

The relay answers `202` at once, with a body such as `{"id": "…"}`. That says
the request arrived, not how the run went.

Anyone with the URL can start the workflow unless it
[checks who sent the request](/docs/webhooks/#check-who-sent-the-request), so
keep it as private as a password. A URL takes up to 60 requests a minute; see
[Limits](/docs/webhooks/#limits).

## Start it with the REST API

REST suits a system that starts a run and then follows it to the end. Every
request carries `Authorization: Bearer <your key>`.

1. Find the workflow's ID with `GET /api/jobs`.
2. Start a run with `POST /api/jobs/{id}/run`. Put the values under `params`,
   named as the workflow's
   [inputs](/docs/workflow-builder/#what-can-change-each-time).
3. If the key reaches more than one project, name the project with
   `?projectId=<id>`; see [Choosing the project](/docs/mcp/#choosing-the-project).

```http
POST /api/jobs/{id}/run HTTP/1.1
Host: your-host
Authorization: Bearer <Kitewell API key>
Content-Type: application/json

{"params":{"region":"west"}}
```

Kitewell listens at `127.0.0.1:19742`, for this computer only. A system on
another server needs an HTTPS address that you set up and operate, through
your own proxy or with a certificate in Kitewell. See
[Another computer's client](/docs/mcp/#another-computers-client).

## Get the result back

Over REST, read the run. `GET /api/runs` lists runs, and
`GET /api/runs/{jobId}/{id}` reads one; read it again until it has finished.
`GET /api/runs/{jobId}/{id}/logs` returns what the steps wrote. Give `stepId`
and `stream=stdout` to read only the step that prints the result.

Over a webhook, the workflow sends the result itself. End it with a
**Call a web service** step or an [imported API](/docs/apis/) action that
calls the other system. Have that system put its own reference, such as its
process ID, in the body, and send the reference back with the result.

## When a step waits for a person

A workflow can stop for a person: an approval after a step, or an
**Ask a person** step before one. See
[Stop and ask a person](/docs/workflow-builder/#stop-and-ask-a-person). The
run waits there, and the other system's task waits with it.

Either side can settle the step:

- A person, in Kitewell under **Runs & logs → Waiting**. An
  [alert](/docs/alerts/) can tell them a run needs input.
- The other system, over REST with **Run workflows**:
  `POST /api/runs/{jobId}/{id}/approvals/{stepId}/approve`, `/reject`, or
  `/push-back` for an approval, and
  `POST /api/runs/{jobId}/{id}/human-tasks/{stepId}/complete` for a person's
  task.

A platform with its own task list can show the approval to its users there,
and pass their answer to Kitewell.
