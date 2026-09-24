---
title: Share workflows with your team
---

Build a workflow once and share its project with another device, teammate, or
team in your organization. Each device can run its own copy with its own
credentials. Teammates can also use MCP or REST clients to work with workflows
on one shared host.

## Send a project to another device

1. Open the project selector and choose **Manage projects**.
2. Choose **Export** beside the project. Kitewell downloads a `.tgz` project
   archive.
3. Share the file through your team's chosen channel.
4. On the receiving device, open **Manage projects → Import project** and select
   the archive. If that project name already exists, choose another name.
5. Review the setup needs shown after import, open the project, and configure
   that device's credentials and tools.

Import creates a new project; it does not replace an existing one. It counts
against that device's project limit: one on Free, up to ten on Pro. A project
with more workflows than the plan holds (10 on Free, 200 on Pro) cannot be
imported.

## What travels with a project

The archive includes workflow definitions and schedules, named agents and
models, imported OpenAPI specifications and API connection settings, server
addresses and groups, queues, image registry definitions, saved batch input
sets, and project workflow defaults. API connections retain their secret references. Create those secrets
in the imported project, or choose other secrets in that project, before
running its API actions.

The receiving device supplies its own:

- Managed secret values and registry passwords.
- SSH private key paths and approved host keys.
- Custom agent commands, installed tools, and agent sign-ins.
- External scripts, input files, and Docker-mounted data.

Run history, logs, device settings, and Kitewell client API keys are not part
of a project export. The archive is unencrypted. Credentials entered directly
into workflow commands, OpenAPI specifications, source URLs, or other project
configuration are not removed automatically. Review those fields before
sharing the archive.

## Choose where schedules run

Imported workflows arrive paused. Run a manual check, then enable saved
schedules only for the workflows this device should run.

If two devices enable the same schedule, both run it independently. For a team
routine that should run once, choose one execution host and leave the other
copies' schedules paused. That host must remain running and available at the
scheduled time. See [Schedules and background operation](/docs/scheduling/).

## Keep a shared definition in version control

Project definitions are ordinary JSON and YAML files. A team can review and
version them in its own Git repository. Kitewell does not push, pull, or merge
that repository for you.

On the current Mac app, each project's portable files are under:

```text
~/Library/Application Support/Kitewell/data/workspace/project-<id>/
  project.json
  workflows/
  batch-sets/
  agents/  apis/  queues/  registries/  server-groups/  servers/
```

`project.json` holds the project name, description, and workflow defaults;
`workflows` holds its workflow files, `batch-sets` its saved batch inputs, and
each other folder one JSON file per agent, API, queue, registry, server group,
or server. Version the whole `project-<id>` folder. Use the project name inside `project.json` to identify
the right directory. Preserve the existing file structure and document IDs
when applying updates to that project.

Quit Kitewell before replacing files or applying changes from version control,
resolve conflicts, then reopen it and review the project before running it.
Share this project's portable files rather than the entire Kitewell data
folder: device credentials, secrets, and execution data belong to each host.
New recipients can use **Import project** to start from a reviewed export.

A project export is a snapshot. Changes made after sharing do not automatically
appear on other devices; distribute a new export or update the versioned files
through your team's process.

## Work together on one host

For workflows that should run on a single team machine, create a separate
API key for each client under **This device → MCP**. Choose **Read only**,
**Run jobs**, or **Edit and run** for each client's role. Teammates use
compatible MCP or REST clients to inspect, run, or edit workflows on that host.

Limit each key to the projects its client needs; a key cannot reach projects
outside its list. Every workflow still runs as the host's user, so project
limits are not an operating-system sandbox. The local graphical interface and
its optional login are managed by the host's owner; these API keys do not
create individual GUI accounts.

Remote clients require a reachable HTTPS endpoint and your own secure network
configuration. Kitewell does not supply a hosted execution machine or automatic
cloud synchronization. See [MCP and API access](/docs/mcp/) for connection and
permission details.
