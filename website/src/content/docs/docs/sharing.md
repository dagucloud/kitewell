---
title: Share workflows with your team
---

Build a workflow once and share its project with another device, teammate, or
team in your organization. Each device can run its own copy with its own
credentials. Teammates can also use MCP or REST clients to work with workflows
on one shared host.

## Send a project to another device

1. Open the project selector and choose **Manage projects**.
2. Choose **Export** beside the project. Runstead downloads a `.tgz` project
   archive.
3. Share the file through your team's chosen channel.
4. On the receiving device, open **Manage projects → Import project** and select
   the archive. If that project name already exists, choose another name.
5. Review the setup needs shown after import, open the project, and configure
   that device's credentials and tools.

Import creates a new project; it does not replace an existing one. It counts
against that device's project limit: one on Free, up to ten on Pro.

## What travels with a project

The archive includes workflow definitions and schedules, named agents and
models, server addresses and groups, queues, image registry definitions, and
project workflow defaults.

The receiving device supplies its own:

- Managed secret values and registry passwords.
- SSH private key paths and approved host keys.
- Custom agent commands, installed tools, and agent sign-ins.
- External scripts, input files, and Docker-mounted data.

Run history, logs, device settings, and API keys are not part of a project
export. The archive is unencrypted. Review workflow commands and project
configuration for credentials entered directly before sharing it.

## Choose where schedules run

Imported workflows arrive paused. Run a manual check, then enable saved
schedules only for the workflows this device should run.

If two devices enable the same schedule, both run it independently. For a team
routine that should run once, choose one execution host and leave the other
copies' schedules paused. That host must remain running and available at the
scheduled time. See [Schedules and background operation](/docs/scheduling/).

## Keep a shared definition in version control

Project definitions are ordinary JSON and YAML files. A team can review and
version them in its own Git repository. Runstead does not push, pull, or merge
that repository for you.

On the current Mac app, each project's portable files are under:

```text
~/Library/Application Support/Runstead/data/workspace/project-<id>/
  project.json
  workflows/
```

`project.json` contains the project name and shared configuration; `workflows`
holds its workflow files. Use the project name inside `project.json` to identify
the right directory. Preserve the existing file structure and document IDs
when applying updates to that project.

Quit Runstead before replacing files or applying changes from version control,
resolve conflicts, then reopen it and review the project before running it.
Share this project's portable files rather than the entire Runstead data
folder: device credentials, secrets, and execution data belong to each host.
New recipients can use **Import project** to start from a reviewed export.

A project export is a snapshot. Changes made after sharing do not automatically
appear on other devices; distribute a new export or update the versioned files
through your team's process.

## Work together on one host

For workflows that should run on a single team machine, create a separate
API key for each client under **This device → MCP**. Choose read-only, run, or
edit-and-run access for each client's role. Teammates use compatible MCP or
REST clients to inspect, run, or edit workflows on that host.

Each key reaches every project on the host. Use separate hosts when teams need
an access boundary between their projects. The local graphical interface and
its optional login are managed by the host's owner; these API keys do not
create individual GUI accounts.

Remote clients require a reachable HTTPS endpoint and your own secure network
configuration. Runstead does not supply a hosted execution machine or automatic
cloud synchronization. See [MCP and API access](/docs/mcp/) for connection and
permission details.
