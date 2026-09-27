---
title: Your first workflow
---

This guide creates a local command workflow. It does not contact an external
service or require an AI account.

## Create a job

1. Open Kitewell. On first launch, choose **Start on this device** to create
   your project; afterwards, choose the project in the sidebar. The first time
   you open a project, a short tour shows where things are; **?** in the top
   bar shows it again.
2. Choose **Create a job** and enter **Morning check-in** as the workflow
   name.
3. A new workflow offers to describe it to the assistant or to start from an
   example. This guide builds it by hand: pick **Run a command or script** for
   its first task.
4. Enter this command:

```sh
printf 'Kitewell is ready.\n'
```

The graph shows how tasks connect. Select a task to edit its fields in the
right-hand inspector. Add more tasks with the graph's **+** control.

## Review and run

Choose **Review & run**, then **Save and run…**. Review the inputs and select
**Start run**. Open **Runs & logs** to inspect the result and task output.

Saving and running are separate actions. **Save** checks and stores a workflow
without starting it. **Tools → Check workflow** checks a draft against the
installed engine.

## Add a schedule

Return to the workflow, open **Schedule**, choose a daily time and timezone,
and save. Confirm **Enable saved schedules** is enabled. Keep the computer awake
and Kitewell running for the scheduled time.

See [Scheduling](/docs/scheduling/) before relying on unattended runs.

## Bring your own work

Replace the sample command with a script you already use. Use absolute paths
for executables and working folders when needed: the app's environment can
differ from an interactive Terminal session. Add input fields for values that
change between runs, and keep credentials in [Secrets](/docs/secrets/).

See [Build a workflow](/docs/workflow-builder/) to connect Docker images, AI
agents, human decisions, and commands on server groups. To run the workflow
once for each item in a list, use a [batch sheet](/docs/batches/).

With an API model set up, you can also describe a workflow in plain language
and let [the assistant](/docs/ai/#the-assistant) draft it; nothing is saved
until you apply its proposal.
