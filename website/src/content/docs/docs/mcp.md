---
title: MCP and API access
---

MCP lets a compatible AI client work with Kitewell workflows. REST access is
available for scripts and other integrations.

## Connect a local client

1. Open **This device → MCP**.
2. Choose **Connect an AI agent**, name the client, and pick its permission
   (**Read only**, **Run jobs**, or **Edit and run**), the projects it can
   reach, and an optional expiry.
3. Use the endpoint and connection information shown in Kitewell. The default
   local MCP endpoint is `http://127.0.0.1:19742/mcp`.
4. Configure the client to send the key as a Bearer credential. The client must
   support custom Bearer credentials; OAuth sign-in is not included.

Each key reaches only the projects you allow: selected projects, or all
current and future projects. A key limited to selected projects does not gain
projects created later. Ask the client to list projects first, then pass the
selected `projectId` with project-specific MCP calls or REST requests. A key
that reaches exactly one project can omit the ID; a key that reaches several
must name one.

The free plan issues one API key; Kitewell Pro issues any number. A key issued
earlier keeps working if Pro lapses, and revoking a key makes room for another.

## Work with imported APIs

MCP clients with edit access can import an OpenAPI spec, save an API connection,
and build workflows from its operations. Clients can inspect the imported
request and response schemas to choose inputs and use results in later steps.
Running the workflow requires run or edit access and appears in its run history.

The MCP server exposes three tools: `read`, `change`, and `execute`. Call
`read` with `target: "reference"` for the usage guide, then use this flow:

1. Preview with `change`, `type: "preview_api"`, and either `spec` (JSON or
   YAML text) or `url`. Previewing does not save the connection or execute an
   API operation.
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
`target: "api"` with its `id` and retain the fields you still need.
`change`, `type: "delete_api"`, with the `id` removes a connection only when
no saved workflow uses it. See [Import an API](/docs/apis/) for supported specs,
authentication, exports, and update behavior.

API imports and connection management are available through the GUI and MCP.
The public REST API exposes workflow operations, including running workflows
that use saved API connections; it does not expose API catalog management or
secret administration.

## Permissions

Start with the least access that supports the task. Read access inspects
workflows and history. Run access can trigger work. Edit access can change
workflow definitions, including commands that execute as the user running Kitewell.
Revoke a key in Kitewell when it is no longer needed.

## Remote clients

The listener defaults to loopback. A remote client needs a reachable HTTPS
endpoint and a secure network configuration that you operate. Keep the
administrative interface on localhost. Do not publish an unprotected HTTP
listener to the Internet.

Store client credentials securely and remove them from screenshots or issue
reports. [Contact support](/support/) if a client's authentication options are
unclear.
