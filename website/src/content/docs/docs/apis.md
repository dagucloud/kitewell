---
title: Import an API
---

Import an OpenAPI specification to use its operations as workflow steps.
Kitewell builds input forms from the specification and exposes response
fields for later steps. Connections belong to a project and can be reused
across its workflows.

## Import and connect

1. Open **API library** in the project sidebar and choose **Import an API**.
2. Choose **Upload file**, **From URL**, or **Paste specification**. Supply an
   OpenAPI 3.0 or 3.1 document in JSON or YAML.
3. Select **Preview actions**. Search by action name, path, or tag, and inspect
   an action's inputs and responses. Unsupported actions show a reason.
4. Review the **Name**, **API identifier**, and **Server URL**. Enter the server
   URL if the specification does not provide one.
5. Choose **Authentication** and connect a project secret if required. Select
   **Connect API** to save.

The **API identifier** is the name workflows use to find this connection.
The imported specification is stored in the project, including when it came
from a URL. Previewing or connecting an API does not call its operations.
If the specification URL requires authentication, download it separately and
use **Upload file** or **Paste specification**.

## Connect credentials

Choose **No authentication**, **Bearer token**, **API key**, or **Username and
password**, according to the API's requirements. For an API key, enter its
**Key name** and choose whether to send it in a header, query parameter, or
cookie.

Select or enter an existing **Secret reference** from the same project, such
as `services/support-token`. If your role cannot list secrets, enter the
reference supplied by an administrator. Administrators can also use
**Store a new secret** in the connection form.

For bearer or API key authentication, the secret contains the token or key.
For **Username and password**, enter the username in the connection and use
a secret for the password. The connection stores the reference and supplies
authentication to every API action that uses it; credentials stay in project
secrets. See [Secrets](/docs/secrets/) for rotation and access details.

OAuth sign-in and token refresh are not included. For an API that accepts an
OAuth access token, obtain the token separately and connect it as a bearer
token. Replace the secret when the token expires.

## Use an action in a workflow

1. In the workflow's **Build** tab, add a task and choose **Use an API action**.
2. Choose a **Connected API**, then use **Find an API action** to select an
   operation.
3. Fill in the generated inputs. Required fields appear first; expand
   **Optional parameters** when needed. A **Request body** form appears when
   the operation defines one.
4. Use the variable picker beside an input to insert workflow inputs or values
   from earlier steps.
5. Check the workflow, then run it and inspect its output in **Runs & logs**.

You can also open a saved connection in **API library**, select an action, and
choose **Create workflow with this action**.

## Pass response fields to another step

Expand **Response fields** on the API step to see the fields described by the
specification. In another step, open **Variables** beside an input and choose
a field from that API response. Kitewell adds the output mapping and connects
the steps so the receiving step waits for the API call.

For example, a customer lookup can provide its returned `id` to a later action
that creates a ticket. Available fields depend on the response schema in the
imported specification.

## Update a specification

Kitewell keeps the imported snapshot until you replace it. A change at the
original URL does not update the project automatically.

Open the connection in **API library**, choose **Update specification**, and
upload, fetch, or paste the replacement. Choose **Preview actions**, review the
operations, then select **Save connection**. Kitewell validates dependent
workflows before saving. If the replacement invalidates a saved workflow,
the update is rejected and the previous connection is kept. Update affected
workflows first, or import the replacement under a different API identifier.

Kitewell also refuses to delete a connection while a saved workflow uses it.

## Share a connection without its credentials

Use [project export](/docs/sharing/) to share the imported specification and
connection settings, including the server URL, authentication type, and secret
reference. Managed secret values are excluded. On the receiving device,
create the referenced secret in the imported project before running its API
actions, or change the connection to use another secret in that project.

Exports retain the specification and its source URL. Credentials entered
directly into those fields or workflow inputs are not removed automatically.

## Import limits

- Import one JSON or YAML document, up to 8 MiB. Swagger 2 documents must be
  converted to OpenAPI 3.0 or 3.1 first.
- References must point within the same document. Bundle external references
  before importing.
- Request bodies can use JSON, URL-encoded forms, or text. Multipart bodies,
  including file uploads, and binary request bodies are not supported by API
  actions.
- An action cannot require multiple credentials at once. Unsupported
  authentication schemes are marked in the action picker.
- Pagination is not automatic. Supply page or cursor inputs and control
  repeated requests in the workflow.

The same imported actions and schemas are available through
[MCP](/docs/mcp/).
