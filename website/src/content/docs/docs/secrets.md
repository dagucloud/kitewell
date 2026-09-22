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

## Understand the boundary

Secrets are encrypted on disk by Dagu. Tasks receive credentials when they run.
A client that can edit and execute workflows can write commands that access
those credentials. Project separation is not an operating-system sandbox.

Literal secret values are masked in execution logs, but encoded or transformed
values may not be. Avoid printing credentials. Multiline values are not
supported.

## Backups

Workspace backups exclude managed secrets and their decryption keys. After a
restore, enter the required credentials again. Keep a separate secure record of
credentials you need to recover.

Backup archives are unencrypted and can still contain sensitive settings and
values written directly into workflows. Store them privately and apply your own
encryption before moving them to shared storage.
