---
title: Build a workflow
---

Build a workflow by choosing what each task should do, then connecting the
steps. Commands, Docker images, AI agents, remote servers, and human decisions
can share one workflow. The graph shows the order; selecting a step opens its
settings beside it.

## Example: build a daily report

Read a CSV of orders, calculate the totals with Python, and save a Markdown
report. This example uses three sample orders and runs entirely on your
computer. It requires Python 3.

**Read orders → Build report → Save report**

### Set up the sample

Create a folder named `daily-report`. Download [orders.csv](/examples/orders.csv)
into it, or save this text as `orders.csv`:

```csv
order_id,amount_usd
1001,1200.00
1002,800.00
1003,450.00
```

Choose **Create a job**, name it **Daily sales report**, and open
**Tools → Edit YAML**. Replace the contents with this workflow.
Change `working_dir` to the absolute path of your `daily-report` folder.

You can also download [the workflow YAML](/examples/daily-report.yaml).

```yaml
type: graph
# Replace this with the absolute path to the folder containing orders.csv.
working_dir: /absolute/path/to/daily-report
steps:
  - id: read_orders
    name: Read orders
    run: cat orders.csv
    output: ORDERS

  - id: build_report
    name: Build report
    depends: [read_orders]
    run: |
      #!/usr/bin/env python3
      import csv
      import io
      import os
      from decimal import Decimal

      orders = list(csv.DictReader(io.StringIO(os.environ["ORDERS"])))
      revenue = sum(Decimal(order["amount_usd"]) for order in orders)
      print("# Daily sales report\n")
      print(f"- Orders: {len(orders)}")
      print(f"- Revenue: ${revenue:,.2f}")
      print(f"- Average order: ${revenue / len(orders):,.2f}")
    output: REPORT

  - id: save_report
    name: Save report
    depends: [build_report]
    run: |
      printenv REPORT > report.md
      cat report.md
```

If Runstead cannot find `python3`, replace `/usr/bin/env python3` with the
absolute path returned by `command -v python3` in Terminal.

### Run it and inspect the result

Choose **Tools → Visual editor** to see the three steps. **Read orders** saves
the CSV as `ORDERS`; **Build report** reads that value and saves its result as
`REPORT`. Each step waits for the one before it.

Choose **Tools → Check workflow**, then **Review & run → Save and run… → Start
run**. Open **Runs & logs** and select **Save report**. Its output should be:

```markdown
# Daily sales report

- Orders: 3
- Revenue: $2,450.00
- Average order: $816.67
```

The same text is written to `report.md` in your `daily-report` folder. Each run
replaces that file. Change an amount in `orders.csv` and run again to see the
totals change.

After the manual run works, open **Schedule** to choose a daily time and
timezone. Keep the computer awake and Runstead running at that time. See
[Scheduling](/docs/scheduling/) for background operation and missed runs.

### Add your own steps

In **Build**, use **+** to add another task. **Continue the flow after** inserts
it before the next steps; those steps wait for it. **Add a branch after** creates
another path. **Start independently** adds work that does not wait for that step.

## Use an imported API

[Import an OpenAPI spec into the API library](/docs/apis/), then add
**Use an API action** to your workflow. Choose the connected API and an
operation. Runstead builds the request fields from the spec, including required
parameters and the request body.

In a later step, open **Variables** and choose a response field from the API
step. Runstead saves the value and connects the steps so the request finishes
before its result is used.

## Run a Docker image

Start Docker on your device. In the task picker, choose **Run in Docker**.

1. Choose an **Image**, including its tag. Search the image suggestions or use
   **Browse images**. **Inspect** reads the image's ports, folder, and variables
   to help configure the step.
2. Enter the command to run inside it. Use **Shell script** for multiple lines,
   pipes, or shell variables; that image must include `/bin/sh`.
3. Expand the options you need: working folder, mounts, environment, published
   ports, or network. Files created inside a container need a mount if you want
   them to remain available outside it.
4. Use **Check Docker** to check the connection. **Run this step** executes the
   configured image and command, so review its mounts and effects first.

Runstead does not install or start Docker. Containers are removed after a run
unless **Keep container after run** is enabled. Your mounted files and Docker
volumes need their own backups.

## Ask an AI agent or model

Set up a named agent or model under **Agents & models**, then add it to the
workflow:

- **Ask an AI agent** runs an installed command-line agent. Select the agent,
  write its prompt, and use **Agent settings and context** to set its project
  folder and optional context.
- **Ask a model** sends a prompt directly to a configured API model. Select the
  model and describe the answer you need.

Save a result as a variable when a later step needs it. Type `${` in a supported
field to select workflow inputs, secrets, or results from earlier steps. Make
sure a step that uses a result waits for the step producing it.

**Tools → Review AI prompts** shows the authored instructions before execution.
Runtime values are filled in when the workflow runs. See
[AI agents and models](/docs/ai/) for credentials, permissions, and provider
requirements.

## Pause for a person

Choose **Ask a person** to add instructions and, optionally, a form. A task can
ask for acknowledgement or collect values such as a choice, comment, or number.
The run waits until someone completes it.

To review an automatic step's result, open that step's **Approval** section and
enable **Pause for approval after this step runs**. Enter the question and any
values to collect. **Sending back re-runs** selects the step to repeat if the
reviewer requests changes.

An approval gate pauses **after** its step has executed. To require permission
before a remote command or other action, put an **Ask a person** task before
that action, or attach approval to an earlier preparation step.

Find paused runs under **Runs & logs → Waiting**, then open **Waiting for you**.
A human task offers **Complete task**. An approval gate offers **Approve**,
**Send back**, or **Reject run**. Sending back repeats the selected step and
following work; rejecting ends the run.

## Run commands on servers or groups

Open **Servers** in the project's sidebar. Add each server's address, username,
and authentication details. Store passwords in [Secrets](/docs/secrets/) or use
a local private key. Check and approve the host fingerprint through **Test
connection** when using the default approved-key verification.

Create a group to give several servers one target. Put them in the required
order, choose how many may run at once, and choose whether a failure stops the
rollout or lets it continue.

In the workflow, add **Run on another machine**. Select the server or group in
**Where it runs**, then enter the remote command. A group produces a separate
step for each machine, so its result appears separately in **Runs & logs**.

To send all command and script steps to the same target, use the workflow's
**Settings → Where it runs**. A group at this level runs the workflow on each
machine in turn, with a separate run per machine. Docker, AI, HTTP, imported
API, and sub-workflow steps still execute from the device running Runstead;
this setting does not move the entire engine to a server.

## Check, run, and schedule

Use **Tools → Check workflow** to validate the draft. **Review & run** brings
together the schedule, inputs, and task details. **Save and run…** saves it and
opens the input form; **Start run** begins execution.

Open **Runs & logs** and select a step to inspect its output. Once the manual
run works, configure **Schedule** and enable saved schedules. See
[Schedules and background operation](/docs/scheduling/) for device availability
and missed runs.
