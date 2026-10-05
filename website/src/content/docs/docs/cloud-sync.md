---
title: Sync projects with Dagu Cloud
---

Sync a project through [Dagu Cloud](https://console.dagu.sh) to keep it the
same on every device you use, and to share it with your team. Dagu Cloud keeps
the project's definitions; every device still runs the workflows itself, with
its own credentials, and secret values never leave it. Syncing is optional: a
project stays on its device until you choose to sync it.

## What syncs

Nothing reaches Dagu Cloud until you sync a project. Without an account,
Kitewell never contacts Dagu Cloud. Signed in, a device only checks its plan
and reports its Kitewell version and its own ID and name; it sends no
workflows, settings, run history, logs, or secrets. Syncing sends only the projects you choose, and never their
secret values.

A synced project carries what a [project export](/docs/sharing/) carries:
workflow definitions and schedules, agents and models, API connections and
imported specifications, servers and groups, queues, image registries, secret
names and descriptions, batch sheets, project workflow defaults, and the
project's [knowledge](/docs/knowledge/). It also carries the project's
[releases](/docs/releases/), which exports do not.

:::note[Secrets stay on your device]
Secret values are never sent to Dagu Cloud. A synced project lists the secrets
it uses by name, and each device stores its own value, set on that device;
**Secrets** shows **Value needed** until it is. Only text
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

A device syncs with one workspace, shown as **Workspace** in **Device
settings**. Each person can connect up to three devices to a workspace;
connecting a fourth disconnects their oldest. A Kitewell Team workspace holds
up to 20 devices in all; once it has 20, connecting another is refused until
one is disconnected. A free account syncs one project. Kitewell Personal syncs
up to ten projects and Kitewell Team up to 30, each with up to 100 workflows;
syncing a project the plan has no room for is refused and says why. Synced projects count toward the workspace's plan, not the device's
project limit.

## Sync a project

1. Open the project selector and choose **Manage projects**.
2. Choose **Sync to Dagu Cloud** beside the project, and confirm.

From then on, every save goes to Dagu Cloud first. Workflow YAML, batch inputs,
and API addresses are shared as written, so remove any secret typed into them
before syncing.

To work on the project from another device, sign in there, open **Manage
projects → Download from Dagu Cloud**, and choose **Download**. **Projects in
Dagu Cloud** marks projects already **On this device** and those you may only
view. A project with the same name as one already on the device is refused
until you rename one of them. Downloaded workflows arrive paused: enable the
ones this device should run.

If an upload is cut short, the project shows **Upload incomplete**; choose
**Resume upload**. Saves wait until the upload finishes.

## Stay up to date

Kitewell takes changes made elsewhere when it starts, when you open the
project, and when you open a workflow to edit it, asking Dagu Cloud at most
once a minute. On Personal and Team, a device also checks on its own about every
five minutes, so a device that runs workflows unattended takes a new version
without anyone opening it.

To check at any other time, choose **Update from Dagu Cloud** in **Manage
projects**. A workflow open in the editor takes the update in place when you
have not typed anything.

Taking a change restarts the project's engine. Runs already in progress
continue with the definition they started with. A workflow that is new to the
device arrives paused; a workflow already here keeps its schedule setting,
working directory, and alerts.

If someone saved the same item since you opened it, your save stops and shows
**Changed in Dagu Cloud**. Choose **Overwrite** to replace their change with
yours, or **Cancel** to keep your edit without saving it.

Kitewell manages a synced project's files. Edits made to them outside Kitewell
are replaced when a change to them arrives from Dagu Cloud or they are next
saved in Kitewell.

## View-only projects

A project where your role is **Viewer** shows **View only** in the page header
and in the download list. You can run its workflows, set its secret values on
your device, and enable the workflows this device should run, but Kitewell
hides the edits Dagu Cloud would refuse, such as changing workflows, cutting
or applying releases, and declaring secrets.

## Work as a team

A team shares synced projects under Kitewell Team, which costs $199 a month
for the workspace and holds up to 10 people; a larger team takes
[Enterprise](/pricing/#enterprise). The team's owner pays for the workspace;
members need no subscription of their own. Kitewell Personal is for one person
and cannot invite anyone.

To move between plans, open the **Kitewell** page in Dagu Cloud and choose
**Switch to Kitewell Team** or **Switch to Kitewell Personal**. Stripe adjusts
your next invoice for the change. Before moving to Personal, remove the other
people and revoke their invitations.

The owner manages the team on the **Kitewell** page in Dagu Cloud:

- **Invite** a person by email. The invitation counts toward the 10 people
  until it is accepted, revoked, or expires after seven days. The person signs
  in to Dagu Cloud with that email address to accept it.
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
in the download list, offered where your role is **Admin**, removes a project
that this device does not sync, and frees its place in the plan. Copies on
other devices can no longer save to Dagu Cloud. A project synced with another
workspace shows **Another workspace** and only offers **Stop syncing**.

If a project is deleted from Dagu Cloud, or you lose access to it, it stays on
your device as a local project.

While a device is offline, saves to its synced projects are refused; changes
that stay on the device, such as enabling workflows or setting secret values,
still work, and enabled workflows keep running from the device's copy. If Dagu
Cloud stops accepting the device's connection, use **Reconnect account** in
**Device settings**.
