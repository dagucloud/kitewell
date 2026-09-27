---
title: Batches
---

A batch runs one workflow once for every row of a sheet. Put the items to
process in rows, such as customers, listings, pages, or files. Each row runs
the workflow with its own inputs, and result columns collect what each run
found.

## Create a sheet

Open **Batches** and choose **New sheet**, then pick the workflow and name the
sheet. You can also start from a workflow's run dialog: switch from **Single
run** to **Batch sheet**, and the values you typed become the new sheet's
shared inputs.

The sheet has one input column for each of the workflow's parameters, with
their types, defaults, and allowed values. **Label** names a row and is not
passed to the workflow. When the workflow accepts parameters it does not
declare, an **Other inputs (JSON)** column takes them as a JSON object.

A sheet holds up to 5,000 rows and 30 result columns.

## Add rows

- **Type or paste**: edit cells directly, or paste cells copied from a
  spreadsheet, starting at the focused cell. Rows are added as needed.
- **Import**: paste cells or one value per line, or choose a CSV file. Map
  each column to an input, to **Label**, or to **Skip column**. Headers that
  match an input's name are mapped for you.
- **Shared inputs**: values every row uses unless the row sets its own. An
  empty cell shows, in grey, the shared value or workflow default it will use.

Each value is read by its input's type: text as typed, numbers, `true` or
`false`, and lists or objects as JSON. A value that does not fit, such as text
in a whole-number input after the workflow changed, is kept and outlined in
red with the reason. The sheet still saves, and that row does not run until
the value is fixed.

The sheet saves as you edit.

## Run rows

The run button starts the rows that have not run yet, or the rows you
selected. **More ways to run** offers failed rows again, rows changed since
their last run, and all rows.

Before anything starts, every row is checked against the workflow's
parameters. If a row is missing a required input or has a value the workflow
does not accept, nothing starts, and the row shows why.

Each row then becomes its own run in the workflow's queue. The banner shows
how many have finished, how many run at once, the queue's name when the
workflow shares one, and, once a few rows have finished, about how long is
left. The **default** queue runs 5 at a time across the project; change that
on the **Queues** page.

- **Cancel queued rows** cancels rows still waiting. Running rows continue.
- **Stop all** stops running rows as well.

A launch keeps its own copy of the workflow and of each row's values, so
editing the sheet or the workflow later does not change runs already queued.
A row whose inputs changed since its run shows **Changed**; the **Changed
since last run** filter lists them. Retrying a row's run or changing a step's
status from **Runs & logs** updates the row as well.

## Collect results

A result column describes one value to find in each run. Choose **Add a result
column**, name it, choose a type (**Text**, **Number**, **Yes or no**,
**Choice**, or **Level**), and describe what to read, such as the unit and
which value to take when there are several.

Result columns are filled by API models from **Agents & models**. Under
**Choose models**:

- The **Extraction model** reads text and number columns, and the other
  columns when there is no decision model. Each value comes with a quote from
  the run, marked when the quote was not found word for word.
- A **Decision model** is optional. It judges yes-or-no, choice, and level
  columns with a probability, faster and at lower cost, without a quote.
  **Mark judgments unsure below** sets when a judgment is flagged for review.

Values are read after each run succeeds. The model receives the run's outputs,
logs, and text files, so choose a provider you trust with them. **Fill**
reads finished rows that are missing values, and **Read again** in a row's
details reads one run again. Neither runs the workflow again. Values read
before a column was changed are marked out of date.

## Export, duplicate, and delete

- **Export CSV** saves the inputs, the values, each judgment's probability,
  and each row's run.
- The sheet menu (**⋯**) offers **Duplicate**, a copy with the same rows,
  inputs, result columns, and models, and **Duplicate without rows**, the same
  setup with one empty row. Copies start without results, since values belong
  to the runs that produced them.
- **Delete sheet** removes the sheet and the values read on this device. Runs
  stay in **Runs & logs**. A sheet cannot be deleted while its batch is still
  running.

## Alerts, the assistant, and MCP

- With Kitewell Pro, the **Finishes a batch** [alert](/docs/alerts/) tells
  you when every row of a launch has finished, with how many did not succeed.
  Batch rows do not raise run alerts one by one, except when a row waits for a
  person.
- The assistant can propose adding or changing rows and columns. The proposal
  shows in the open sheet until you apply it, apply it and run the rows it
  touches, or reject it. An applied change can be undone.
- [MCP clients](/docs/mcp/) can list and read sheets, create, replace, and
  delete them, run rows, read values, and cancel runs.

## What stays on this device

The sheet itself belongs to the project, so it travels with project exports
and [syncs with Dagu Cloud](/docs/cloud-sync/). Row statuses and the values
read from runs stay on the device that ran them.
