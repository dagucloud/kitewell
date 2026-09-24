---
title: Troubleshooting
---

## A command works in Terminal but fails in Kitewell

The application's environment can differ from your interactive shell. Use
absolute executable paths, set a working folder, and provide required
variables explicitly. Check whether the command needs an interactive prompt
or a credential stored only in the shell session.

## A scheduled job did not run

Confirm the saved schedule is enabled, its timezone is correct, the project
engine is running, and the computer was awake with your user logged in. Check
the workflow's **Schedule → Missed schedules** and the workflow defaults before
expecting a missed schedule to run later.

## Docker is unavailable

Start the local Docker daemon and use **Check Docker** in the workflow editor.
Kitewell does not install or start Docker. Check that mounts and file paths
exist on the machine where the container runs.

## An AI task fails

Verify the agent is installed and signed in, or that the selected model has a
valid provider credential. **Test agent** and **Test model** in **Agents &
models** check this before a run. Review the recorded prompt, task stderr, provider
limits, and billing status. Keep real credentials out of issue reports.

## An update check fails

Check the network and [release status](/releases/). The public update feed is
not active before the first public release. Report a persistent checksum or
installer verification failure instead of bypassing it.

## Find logs

Start with **Runs & logs** for a task failure. Open **This device →
Diagnostics** to view, search, or download service and project engine logs.
Each log rotates at 10 MiB and keeps three archives. On macOS, service logs
are under `~/Library/Application Support/Kitewell/logs`.

If the guides do not resolve the issue, [open a support issue](/support/) with
versions, reproduction steps, and sanitized output.
