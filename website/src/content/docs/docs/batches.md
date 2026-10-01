---
title: Batches
---

A batch runs one workflow once for every row of a sheet. Put the items to
process in rows, such as customers, listings, pages, or files. Each row runs
the workflow with its own inputs, and result columns collect what each run
found.

## Create a sheet

Open **More → Batches** in the sidebar and choose **New sheet**, then pick the workflow and name the
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
- **Import**: choose an Excel workbook (`.xlsx` or `.xlsm`) or a CSV file,
  drop one anywhere on the sheet, or paste cells or one value per line. A
  preview shows the first rows with the row of column names picked for you;
  pick another row, or none. Columns whose names match an input's name or title
  are mapped for you, and with column names any other column is skipped; map
  any column to an input, to **Label**, or to **Skip column**. Rows above the
  column names, blank rows, and total rows such as 合計 or Subtotal are left
  out, with a choice to include the totals. A workbook opens on the sheet Excel
  opens on, offers its other sheets, and lets you leave out rows hidden in
  Excel. Kitewell only reads the file; it never changes it.
- **Shared inputs**: values every row uses unless the row sets its own. An
  empty cell shows, in grey, the shared value or workflow default it will use.
- **From a workflow's run**: let a run find the items, such as the listings a
  search turns up, and keep the rows up to date. See
  [Fill rows from a workflow's run](#fill-rows-from-a-workflows-run).

Each value is read by its input's type: text as typed, numbers, `true` or
`false`, and lists or objects as JSON. A value that does not fit, such as text
in a whole-number input after the workflow changed, is kept and outlined in
red with the reason. The sheet still saves, and that row does not run until
the value is fixed.

A workbook's cells arrive the way Excel shows them: dates as `2026-10-01` and
times as `09:30:00`, numbers without separators or currency signs, percentages
as fractions (12% is `0.12`), TRUE and FALSE as `true` and `false`, and codes
such as `00123` with their zeros. A cell merged down over several rows repeats
on each, a formula gives the result Excel last saved, and a cell that shows an
Excel error such as `#N/A` arrives empty and is counted. An older `.xls` file or
a workbook protected with a password is not read: save it as `.xlsx`, or remove
the password, first. A file can be up to 16 MiB.

The sheet saves as you edit.

## Fill rows from a workflow's run

Rows can come from a list a workflow's run finds, so new items become rows
without anyone adding them. Under **Import**, or below a new sheet's blank row,
choose **Fill rows from a workflow's run**.

1. Pick the **Workflow**, which may be the sheet's own, and the **List** its
   runs publish: a [website](/docs/browser/) or [desktop](/docs/desktop/)
   step's **List of items**, the emails a **Find emails** step finds, or an
   output read as JSON.
2. Check the first items of its latest run. When it has not run, or its fields
   are only known from a run, choose **Run it now**.
3. Under **What fills each input**, each input takes the item field of the
   same name, rows are matched by an address or ID, and a title labels them.
   Change any of these, and set the inputs the list's run takes.
4. Choose **Fill rows**. The workflow runs once and adds a row for each item.

The toolbar then shows where rows come from, and **Refresh rows** runs the
workflow again. When the run succeeds:

- An item fills the row with the same key, such as its URL. A row you added by
  hand with that key is taken over rather than repeated.
- A new item adds a row, marked **New** until it runs.
- A row whose item is gone stays, greyed as **No longer listed**, and comes back
  when its item does. Running all rows, failed rows, or changed rows leaves it
  out; select it to run it anyway. The **No longer listed** filter shows these
  rows and can remove them together.
- Items without a key, and items repeating another's key, are skipped and
  counted.

A banner says what changed, with **Show new rows** and **Show rows no longer
listed**. A failed run changes nothing and says why. Inputs filled from the
list carry a small mark, and edits you make while a refresh runs are kept.

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
left. The **default** queue runs 5 at a time across the project. When a site
turns away bursts of requests, choose **Change how many run at once** in the
banner to open that queue on the **Queues** page.

- **Cancel queued rows** cancels rows still waiting. Running rows continue.
- **Stop all** stops running rows as well.

A launch keeps its own copy of the workflow and of each row's values, so
editing the sheet or the workflow later does not change runs already queued.
A row whose inputs changed since its run shows **Changed**; the **Changed
since last run** filter lists them. Retrying a row's run or changing a step's
status from **Runs & logs** updates the row as well.

Select a failed row's last run to see the step it stopped at and that step's
error. **Set up retries for** the step opens it in the workflow editor with its
retry limit, interval, and backoff ready to set: a site that refuses a burst
usually lets a later try through. New retry rules apply when the rows run
again.

## Collect results

A result column collects one value from each run. It gets that value in one of
two ways, chosen under **Where the value comes from** when you add the column.

### Copy a value the workflow publishes

When a step already collects the value, such as a price a
[website step](/docs/browser/) extracts, the column copies it from each run as
it is: no model, no cost, and exactly what the step found, as soon as the run
finishes. Rows that ran before the column existed fill in too.

- A new sheet whose workflow publishes values lists them, ticked, under **This
  workflow publishes these values. Add them as columns?** Untick any you do not
  want and add the rest.
- **Result column** starts from a published value no column copies yet, named
  and typed after it, with what the latest run published beside it.
- A value that does not fit the column's type, such as `¥12,800` in a number
  column, shows as published and marked. Its details offer **Change the column
  to Text** or **Let a model read it**.
- A column whose value the workflow no longer publishes is marked in its header.

Only values that reach a run's outputs can be copied: those of website and
desktop extracts, email steps, and results a command step declares, not a
person's form answers or the steps inside a loop. When two steps publish the
same name, the one that ran last wins.

### Have a model read the run

For any other value, choose **A model reads the run**, name the column, choose a
type (**Text**, **Number**, **Yes or no**, **Choice**, or **Level**), and
describe what to read, such as the unit and which value to take when there are
several. A model column whose name matches a published value offers to copy it
instead.

These columns are filled by API models from **Agents & models**. Under
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

## Run on a schedule and see what changed

To watch values over time, such as prices or listings checked every morning,
choose **Schedule** in the sheet's toolbar and pick when every row runs again:
**Every hour**, **Every day**, **Weekdays**, **Every week** at a time, or a
**Custom schedule** in cron form. A sheet runs at most once an hour. The toolbar
and the sheet list show the next run.

- **The schedule belongs to this device.** It never syncs with the sheet, so a
  sheet a teammate shares runs only where someone schedules it, and never on
  two computers by accident.
- **It runs while this computer is awake.** For a run missed while it was off or
  asleep, choose what happens when it is back: run it unless the next run is
  already nearer (the default), always run it, or skip it unless it is back
  within five minutes. At most one missed run happens either way.
- A due time that finds the last run still going is skipped. A run that did not
  start shows a mark on the schedule with why.
- A sheet whose rows come from a workflow's run refreshes them first, so new
  items run as new rows and rows no longer listed are left out. The due time
  waits however long the list takes. Untick **Refresh rows from … first** to
  run the rows as they are.

Each row keeps the values its previous run with the same inputs read. A result
that changed since is marked in its cell: an arrow for a number that went up or
down, a dot for anything else, with what it was on hover and in the cell's
details. A banner counts the changes, and **Show them** applies the **Results
changed** filter. Values that differ only in spacing or letter case count as
unchanged, but a model can word the same value differently from run to run, so
copy what a step publishes where you can.

## Export, duplicate, and delete

- **Export Excel** and **Export CSV** save the inputs, the values, each
  judgment's probability, what each changed result was before, and each row's
  run, in a file named after the sheet and the day. The workbook opens with a
  frozen header with filters, numbers and dates as cells Excel can sort, and
  each row's status coloured. Importing it again maps its inputs for you.
- The sheet menu (**Sheet actions**, ⋯) offers **Duplicate**, a copy with the same rows,
  inputs, result columns, and models, and **Duplicate without rows**, the same
  setup with one empty row. Copies start without results, since values belong
  to the runs that produced them.
- **Delete sheet** removes the sheet and the values read on this device. Runs
  stay in **Runs & logs**. A sheet cannot be deleted while its batch is still
  running.

## Alerts, the assistant, and MCP

- With Kitewell Pro, the **Finishes a batch** [alert](/docs/alerts/) tells
  you once every row of a launch has finished and its values were read: how
  many did not succeed and what changed by column, such as "Price: 9 dropped,
  3 rose", and, when the rows were refreshed first, how many are new or no
  longer listed. A scheduled run where every row succeeded and nothing changed
  stays quiet, and a scheduled run that could not start says why. Batch rows do not
  raise run alerts one by one, except when a row waits for a person.
- The assistant can propose adding or changing rows and columns. The proposal
  shows in the open sheet until you apply it, apply it and run the rows it
  touches, or reject it. An applied change can be undone.
- [MCP clients](/docs/mcp/) can list and read sheets, with what each workflow
  publishes and what each changed value was; create, replace, and delete them;
  copy published values into columns; fill rows from a workflow's run and
  refresh them; schedule them on this device; run rows, read values, and cancel
  runs.

## What stays on this device

The sheet itself belongs to the project, so it travels with project exports
and [syncs with Dagu Cloud](/docs/cloud-sync/), including where its rows come
from and which rows are no longer listed. Row statuses, the values read from
runs, what they were before, the latest refresh, and the sheet's schedule stay
on the device that ran them.
