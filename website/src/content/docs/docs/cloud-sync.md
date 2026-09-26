---
title: Sync projects with Dagu Cloud
---

Sync a project through [Dagu Cloud](https://console.dagu.sh) to keep it the
same on every device you use, and to share it with your team. Dagu Cloud keeps
the project's definitions; every device still runs the workflows itself, with
its own credentials, and secret values never leave it. Syncing is optional: a
project stays on its device until you choose to sync it.

## What syncs

A synced project carries what a [project export](/docs/sharing/) carries:
workflow definitions and schedules, agents and models, API connections and
imported specifications, servers and groups, queues, image registries, saved
batch inputs, and project workflow defaults.

:::note[Secrets stay on your device]
Secret values are never sent to Dagu Cloud. A synced workflow names a secret by
reference, and each device stores its own value, set on that device. Only text
typed directly into workflow YAML, batch inputs, or API addresses travels as
written, so keep credentials in [secrets](/docs/secrets/).
:::

Each device also keeps its own registry sign-ins, SSH keys and host keys,
working directories, which workflows are enabled, alerts, run history, and
logs. None of these reach Dagu Cloud either.

## Sign in

1. Open **This device → Device settings** and choose **Sign in with Dagu
   Cloud**.
2. Your browser opens Dagu Cloud. Sign in, check that the code matches the one
   Kitewell shows, and connect the device.

Each person can connect up to three devices; connecting a fourth disconnects
their oldest. A free account syncs one project. Kitewell Pro syncs up to ten
projects per team.

## Sync a project

1. Open the project selector and choose **Manage projects**.
2. Choose **Sync to Dagu Cloud** beside the project, and confirm.

From then on, every save goes to Dagu Cloud first. Workflow YAML, batch inputs,
and API addresses are shared as written, so remove any secret typed into them
before syncing.

To work on the project from another device, sign in there, open **Manage
projects → Download from Dagu Cloud**, and choose **Download**. Its workflows
arrive paused: enable the ones this device should run.

## Stay up to date

Kitewell takes changes made elsewhere when it starts, when you open the
project, and when you open a workflow to edit it. To check at any other time,
choose **Update from Dagu Cloud** in **Manage projects**.

Taking a change restarts the project's engine. Runs already in progress
continue with the definition they started with. A workflow that is new to the
device arrives paused; a workflow already here keeps its schedule setting,
working directory, and alerts.

If someone saved the same item since you opened it, your save stops and shows
**Changed in Dagu Cloud**. Choose **Overwrite** to replace their change with
yours, or **Cancel** to keep your edit without saving it.

Kitewell manages a synced project's files. Edits made to them outside Kitewell
are replaced by the next update.

## Work as a team

A team shares synced projects under Kitewell Pro, which costs $15 per person
per month. The team's owner pays for every seat; members need no subscription
of their own.

The owner manages the team on the **Kitewell** page in Dagu Cloud:

- **Invite** a person by email. The invitation holds a seat until it is
  accepted, revoked, or expires after seven days. The person signs in to Dagu
  Cloud with that email address to accept it.
- **Seats** sets how many people the subscription pays for.
- **Synced projects** lists every project the team syncs, and gives each member
  a role on each project:
  - **Viewer** reads and downloads the project.
  - **Editor** also saves changes to it.
  - **Admin** can also delete it from Dagu Cloud.
  - **No access** hides it.

The owner opens every project. A member who syncs a project becomes its admin.

:::caution
An editor's saved changes run on every device that syncs the project, once
that device takes the update. Give the editor role only to people you trust to
run commands on your team's devices.
:::

A member connects a device the same way, choosing the team's workspace when
Dagu Cloud asks.

## Stop syncing

**Stop syncing** in **Manage projects** keeps the project on this device and in
Dagu Cloud; later saves on this device stay local. **Delete from Dagu Cloud**
in the download list removes a project that this device does not sync, and
frees its place in the plan.

If a project is deleted from Dagu Cloud, or you lose access to it, it stays on
your device as a local project.

While a device is offline or signed out, saves to its synced projects are
refused. Enabled workflows keep running from the device's copy.
