---
title: MCP and API access
---

MCP lets a compatible AI client work with Runstead workflows. REST access is
available for scripts and other integrations.

## Connect a local client

1. Open **This device → MCP**.
2. Create an API key with the access level the client needs: read-only, run,
   or edit.
3. Use the endpoint and connection information shown in Runstead. The default
   local MCP endpoint is `http://127.0.0.1:19742/mcp`.
4. Configure the client to send the key as a Bearer credential. The client must
   support custom Bearer credentials; OAuth sign-in is not included.

Keys are device-wide and can reach every project. Ask the client to list
projects first, then pass the selected `projectId` with project-specific MCP
calls or REST requests. A device with one project can omit the ID; requests
must name a project when several exist.

## Work with imported APIs

MCP clients with edit access can import an OpenAPI spec, save an API connection,
and build workflows from its operations. Clients can inspect the imported
request and response schemas to choose inputs and use results in later steps.
Running the workflow requires run or edit access and appears in its run history.

Connections use project secret references. See [Import an API](/docs/apis/) for
supported specs, authentication, and explicit updates.

## Permissions

Start with the least access that supports the task. Read access inspects
workflows and history. Run access can trigger work. Edit access can change
workflow definitions, including commands that execute as the user running Runstead.
Revoke a key in Runstead when it is no longer needed.

## Remote clients

The listener defaults to loopback. A remote client needs a reachable HTTPS
endpoint and a secure network configuration that you operate. Keep the
administrative interface on localhost. Do not publish an unprotected HTTP
listener to the Internet.

Store client credentials securely and remove them from screenshots or issue
reports. [Contact support](/support/) if a client's authentication options are
unclear.
