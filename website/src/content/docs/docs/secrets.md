---
title: Secrets
---

Use project secrets for API tokens and other single-line credentials instead
of putting their values directly in workflow definitions.

## Add a credential

1. Open **Secrets** and choose **Create secret**.
2. Enter a reference such as `services/api-token` and its value.
3. In the workflow editor, choose that secret for the field that needs it, or
   use **Use in a DAG** to obtain the reference syntax.

Saved values cannot be read back through Runstead. **Replace value** rotates a
credential without changing its reference. Disabling or deleting it prevents
future resolution of that secret.

## Reuse a secret in imported APIs

In **API library**, open a connection, choose its authentication type, and
select or enter the existing **Secret reference** from that project. Every
workflow action using the connection receives its authentication automatically.
Use **Replace value** in **Secrets** to rotate the credential while keeping
the same reference; the connection and workflows do not need to be edited.
See [Import an API](/docs/apis/#connect-credentials) for the supported types.

## Understand the boundary

Secrets are encrypted on disk by Dagu. Tasks receive credentials when they run.
A client that can edit and execute workflows can write commands that access
those credentials. Project separation is not an operating-system sandbox.

Literal secret values are masked in execution logs, but encoded or transformed
values may not be. Avoid printing credentials. Multiline values are not
supported.

## Exports and backups

Project exports retain secret references, including those in imported API
connections, but exclude managed secret values. Create the referenced secrets
in the receiving project before running its workflows.

Workspace backups also exclude managed secrets and their decryption keys.
After a restore, enter the required credentials again. Keep a separate secure
record of credentials you need to recover.

Both archive types are unencrypted. Credentials written directly into
workflows, OpenAPI specifications, or source URLs remain in the archive;
backups can also contain sensitive device settings. Review archives before
sharing and apply your own encryption before moving them to shared storage.
