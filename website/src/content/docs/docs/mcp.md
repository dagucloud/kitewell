---
title: MCP and API access
---

MCP lets a compatible AI client work with Kitewell workflows. REST access is
available for scripts and other integrations.

## Connect a local client

1. Open **This device → MCP**.
2. Choose **Connect an AI agent**, name the client, and pick its permission
   (**Read only**, **Run workflows**, or **Edit and run**), the projects it can
   reach, and an optional expiry.
3. Use the endpoint and connection information shown in Kitewell. The default
   local MCP endpoint is `http://127.0.0.1:19742/mcp`.
4. Configure the client to send the key as a Bearer credential. The client must
   support custom Bearer credentials; OAuth sign-in is only for
   [ChatGPT and Claude](#connect-chatgpt-or-claude).

Each key reaches only the projects you allow: selected projects, or all
current and future projects. A key limited to selected projects does not gain
projects created later. Ask the client to list projects first, then pass the
selected `projectId` with project-specific MCP calls or REST requests. A key
that reaches exactly one project can omit the ID; a key that reaches several
must name one.

The free plan holds one API key or connected app in total; Kitewell Personal
and Team hold any number. A key or app added earlier keeps working if the paid
plan lapses, and
revoking one makes room for another.

## Connect ChatGPT or Claude

ChatGPT and Claude, on the web, desktop, and mobile, reach Kitewell on your
computer through `https://mcp.kitewell.app/mcp`. Your computer checks every
call against the app's permission and projects, as it does for a key. This
needs a Dagu Cloud account, with Kitewell on the computer
[signed in](/docs/cloud-sync/#sign-in) to it.

1. In Kitewell, open **This device → MCP** and choose **Connect ChatGPT** or
   **Connect Claude**.
2. Choose what the app may do: the permission (**Read only**, **Run workflows**,
   or **Edit and run**) and the projects. Then choose **Save and show the steps**.
   This turns on remote access and shows the URL with the steps for that app.
   Kitewell keeps the choice for the next time you connect the same app.
3. Add Kitewell to the app as a custom connector with that URL, as described
   below.
4. The app opens Dagu Cloud (console.dagu.sh). Sign in with the account
   Kitewell is signed in to.
5. The consent page opens with your choice filled in. Check the computer, the
   permission, and the projects, change anything you like, then allow it.

The app then appears under **Connected apps** in **This device → MCP**, with
its permission, projects, and last use. Change its permission there, or
revoke it; the change applies to its next call. Turning off **Remote access**
closes the connection; connected apps stay listed and work again when it is
back on.

### Claude

1. Open **Customize → Connectors**, choose **+ Add**, then **Add custom
   connector**.
2. Name it Kitewell, paste the URL, and choose **Continue**. Keep the
   suggested sign-in settings and choose **Add**.
3. Sign in, check the permission and projects, and allow access.

On Team and Enterprise plans, an owner first adds the connector under
**Organization settings → Connectors**; members then choose **Connect** on it.
Claude's Free plan allows one custom connector.

### ChatGPT

ChatGPT connects on the web only, through developer mode.

- On Plus and Pro, ChatGPT can use only Kitewell's read-only tools, such as
  `read` and `show`. Starting runs and editing workflows need ChatGPT
  Business, Enterprise, or Edu.
- On Business, only admins and owners can use developer mode. On Enterprise and
  Edu, an admin first grants it.

To give the plugin Kitewell's icon,
<a href="/kitewell-icon-256.png" download>download the Kitewell icon (PNG)</a>
first. It is 256 × 256 px, within ChatGPT's 10 KB limit.

1. Open **Plugins**, choose **Add**, then **Create custom MCP server**. If it
   isn't there, first turn on **Developer mode** in **Settings → Security and
   login**, or on Business, Enterprise, and Edu in **Settings → Apps →
   Advanced settings**.
2. Name it Kitewell, optionally add the Kitewell icon, paste the URL under
   **Server URL**, keep **OAuth**, tick **I understand and want to continue**,
   and choose **Create as a plugin**.
3. Choose **Proceed to Kitewell**, sign in to Dagu Cloud, check the permission
   and projects, and choose **Allow**.
4. Choose **Try in chat**. In any chat, you can also type **@** and pick
   Kitewell, or choose it from the **+** tools menu.

Kitewell then appears under **Plugins → Personal → Created by you**, and its
page shows the connected account.

### What the computer needs

The computer must be on, awake, and running Kitewell. Otherwise the app still
lists Kitewell's tools, but every call answers that Kitewell on that computer
is not reachable. Open Kitewell on that computer and try again. See
[Troubleshooting](/docs/troubleshooting/#chatgpt-and-claude) if it still
fails.

## MCP Events

ChatGPT can subscribe to events and receive a signed webhook when one happens:

- `run.finished`: a run finished. It can name one `runId`, or the statuses to
  report.
- `run.needs_input`: a run waits at an approval, a human task, or a question.
- `batch.finished`: a [batch](/docs/batches/) of a sheet's rows finished.
- `schedule.missed`: a scheduled run was missed.

Subscriptions appear under their app in **Connected apps**, with the last
delivery, and **Remove** deletes one. Kitewell on your computer finds the
events and sends them, so they arrive only while it is running. MCP Events are
part of Kitewell Personal and Team, like [alerts](/docs/alerts/).

## What a client can do

Kitewell offers five tools: `read`, `show`, `preview_api`, `change`, and
`execute`. Each one either only reads or only writes. A connection, through a
key or a connected app, lists only the tools its permission allows, so a
read-only connection never sees a tool that writes:

| Permission | Tools it lists |
| --- | --- |
| **Read only** | `read`, `show` |
| **Run workflows** | `read`, `show`, `execute` |
| **Edit and run** | `read`, `show`, `preview_api`, `change`, `execute` |

A call its permission does not allow, such as one from a tool list the client
kept from an earlier permission, is refused with where in Kitewell to change
the permission.

- **`read`** reads projects, workflows and their schema, runs with their logs
  and artifacts, agents and API models, servers, queues, workflow defaults,
  imported APIs, [batch sheets](/docs/batches/) with their values, and the
  project's [knowledge](/docs/knowledge/). A failed run carries its
  [failure diagnosis](/docs/ai/#failure-diagnosis) when there is one.
  Previewing which steps a rerun can reuse (**Run workflows**) and checking a
  workflow's YAML without saving it (**Edit and run**) are reads too. It
  changes nothing and reaches nothing outside your computer. Call it with
  `target: "reference"` for the usage guide.
- **`show`** draws a workflow's dependency graph and, for a run, each step's
  state. ChatGPT and Claude display it as an interactive view that follows a
  run in progress; other clients receive the steps in order as text, with
  each state. It only reads.
- **`preview_api`** reads an OpenAPI document you give, or fetches it from a
  URL, and lists its operations, saving nothing. It only reads, but fetching
  a URL reaches outside your computer.
- **`change`** creates, replaces, or deletes workflows, agents and models,
  servers and server groups, queues, workflow defaults, API connections,
  sheets, including the schedule a sheet runs on this device, and knowledge
  pages. It can overwrite or delete what you have, importing an API fetches
  its source URL, and saving an enabled schedule may run the workflow.
- **`execute`** starts, retries, reruns, or cancels runs; approves, rejects,
  sends back, or completes a step waiting for a person; answers or restarts a
  website or desktop step waiting for input; and runs a sheet's rows, reads
  their values, or cancels them. With **Edit and run**, it also refreshes a
  sheet's rows from their source and links a sheet to an Excel workbook.
  Workflow commands can change files and reach other services, and cancelling
  cannot undo what already ran.

To follow a run without polling, pass `wait`, up to 60 seconds, to `execute`
when starting, retrying, or rerunning, or to `read` with `target: "run"`. The
call answers as soon as the run finishes or stops at a step waiting for a
person. If the time runs out first, it answers with the run as it stands;
read it again with `wait` to keep following. Clients that support
[MCP Events](#mcp-events) can subscribe to `run.finished` instead.

Every replacement or deletion needs the `version` returned by the latest
read, so a client never overwrites a change it has not seen. On a conflict,
read again, review, and resubmit deliberately.

## Work with imported APIs

MCP clients with edit access can import an OpenAPI spec, save an API connection,
and build workflows from its operations. Clients can inspect the imported
request and response schemas to choose inputs and use results in later steps.
Running the workflow requires run or edit access and appears in its run history.

Use this flow:

1. Preview with the `preview_api` tool and either `spec` (JSON or YAML text)
   or `url`. Previewing does not save the connection or execute an API
   operation.
2. Save with `change`, `type: "upsert_api"`, an `id`, and an `api` definition.
   Provide `api.spec`, or omit it to fetch `api.sourceUrl` once. Set
   `api.auth.type` to `none`, `bearer`, `apiKey`, or `basic`. For authentication,
   use `api.auth.secretRef` to name an existing project secret. Create or
   rotate secret values in the local GUI.
3. Discover with `read`: `target: "apis"` lists connections;
   `target: "api_operations"` searches an API by `id` and optional `query`;
   `target: "api_operation"` with `id` and `operationId` returns its inputs,
   responses, and a starting workflow step.
4. Add `api.request` steps to a workflow, then validate, save, and run through
   the usual workflow tools. The returned step is a template: review examples
   and replace placeholders before running it.

Updating with `upsert_api` replaces the entire connection. First read
`target: "api"` with its `id`, retain the fields you still need, and pass its
`definitionVersion` as `version`. `change`, `type: "delete_api"`, with the
`id` and `version` removes a connection only when no saved workflow uses it. See [Import an API](/docs/apis/) for supported specs,
authentication, exports, and update behavior.

API imports and connection management are available through the GUI and MCP.
The public REST API exposes workflow operations, including running workflows
that use saved API connections, and batch sheets: listing, saving,
scheduling, and deleting sheets, launching and cancelling their rows, and
reading their values. It does not expose API catalog management or secret administration.

## Permissions

Start with the least access that supports the task. Read access inspects
workflows and history. Run access can trigger work. Edit access can change
workflow definitions, including commands that execute as the user running Kitewell.
Revoke a key or connected app in Kitewell when it is no longer needed.

## Remote clients

The listener defaults to loopback. ChatGPT and Claude connect through
Kitewell's relay instead, as described above. Any other remote client needs a
reachable HTTPS endpoint and a secure network configuration that you operate. Keep the
administrative interface on localhost. Do not publish an unprotected HTTP
listener to the Internet.

Store client credentials securely and remove them from screenshots or issue
reports. [Contact support](/support/) if a client's authentication options are
unclear.
