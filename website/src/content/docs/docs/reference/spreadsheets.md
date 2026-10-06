---
title: Excel reference
---

Everything about workbooks that [Automate Excel](/docs/spreadsheets/) leaves
out. Spreadsheet steps are in every plan.

## Two ways to use a workbook

As the rows of a sheet: link the workbook to a sheet, and each row becomes one
run whose result goes back into that row. Use this when the workbook *is* the
job, a list of work to get through.

As steps inside a workflow: add a task from the **Spreadsheets** group of the
task picker and give it the file's path, and it reads or writes at that point
in the run.

Use this when a workbook is one part of a larger job — a file that arrives by
email, a monthly invoice filled from a template.

## What Kitewell reads

It reads the workbooks your office already has. A title row above the table, a
header merged across two rows, subtotals in the middle, notes underneath,
full-width digits, Japanese era dates, postal codes with leading zeros:
Kitewell works out where the table is and what each column holds.

When you link a workbook, each row of the preview offers
**Use row 3 as column names**, and **No column names** is there for a bare
list. Rows above the names, blank rows, and total rows are left out, each
counted.

One tickbox offers to include the total rows after all, and another to leave
out rows that are hidden in Excel.

Only a column whose values never repeat and are never blank can be chosen
under **Rows are found again by**; the rest are shown greyed as "values repeat
or are missing". **Row position** is the fallback, and then you must not sort
or insert rows while results are pending.

## What goes back into your file

A column of the written-back name on the sheet is used; a new name adds a
column at the right. No run ID, no internal key column, and no cell comments
are added. **Run at** is written as `2026-10-01 09:30`.

The words follow the language of the workbook's own headers: a sheet whose
headers are in Japanese gets 状態, エラー, 実行日時 and 済 / 一部失敗 / 失敗 /
中止 / 却下.

If Excel was closed without saving and left its lock file behind,
**It isn't open** clears it. A Japanese file name gets `(結果)` rather than
`(results)` on a copy.

**Undo** refuses if you have edited the workbook since the write, rather than
discard your edits, and leaves the current file beside itself as
`supplier-invoices (before undo).xlsx`.

**Read the workbook again** reports what it found — "1 new · 1 updated · 1 no
longer in the sheet". If the header row has lost the key column or a column an
input takes, the read stops and names what is gone; relink the workbook to pick
the columns again.

**Unlink** ends the connection: the rows stay in the sheet and results stop
going back.

## Spreadsheet steps

Inside a workflow, the **Spreadsheets** group of the task picker offers ten
tasks:

| Task | Does |
| --- | --- |
| Read a spreadsheet | Rows from a sheet, only the rows you want, each column read as text, number, or date |
| Check a spreadsheet | Stop before anything else happens when cells are wrong |
| Write results back | Status and values into the rows they came from |
| Write a spreadsheet | A new workbook or sheet, replaced or appended |
| Add rows to a spreadsheet | Rows under the last row, matched to the header |
| Fill a template | Cells or named cells of a template, saved as a copy |
| Convert a spreadsheet | A sheet to CSV (UTF-8 or Shift_JIS), JSON, or JSON Lines |
| Add, copy, rename, or delete a sheet | Start a month from a template sheet, safely rerun |
| Describe a workbook | Sheets, headers, and types for later steps |
| Read a form | Fields from a quote or an order laid out as a form, whatever its layout |

Choosing the **Workbook** in a step shows its sheets as tabs and the first 20
rows converted as the step will read them, with the detected table and header
row named.

**Check** asks the engine whether the step would fail on this computer — a
missing workbook, sheet, or column — before you run anything. Every cell
address in its answer is a button that shows you that cell.

**Test** shows the rows as a table. A step that writes only reports what it would change during a
test, unless you tick **Save the file during tests**. Convert a spreadsheet is
the exception: a test of it really writes its output file.

A column a later step refers to needs a short name in plain letters, such as
`invoice` for "Invoice No". **Name for later steps** beside each column in
**Read a spreadsheet** takes it, and the editor suggests one.

Every step that writes has three settings: **Dry run** reports the changes
without saving; a wait of up to a few minutes, during which a workbook open in
Excel is retried before the step fails; and, on by default, saving through a
temporary file so a half-written workbook is never left behind.

## The same job as steps

When the workbook is one part of a larger workflow, build the invoice job as
steps instead of a linked sheet:

1. **Read a spreadsheet** reads the Invoices sheet. Under
   **Only rows where…**, choose the Status column and leave the value empty,
   so only the invoices not done yet are read.
2. **For each item** goes through those rows one at a time.
3. Inside the loop, the step that registers the invoice on the portal: a
   [website step](/docs/browser/), a [desktop step](/docs/desktop/), or a
   command. It produces the receipt number.
4. **Write results back**, still inside the loop, writes `Done` into Status
   and the receipt number into Receipt No, in the row the invoice came from.

Because the write-back sits inside the loop, a row that failed keeps its empty
Status and the next run picks it up again. The spreadsheet steps stay off the
screen whatever sits between them.

## Forms, not tables

A quote or an order laid out as a form — labels and values scattered over the
sheet rather than rows under a header — is read by **Read a form**.

Under **What this form is, and what to find**, say what the form is. Under
**Fields to find**, name each field, its type, and what its label looks like
on the sheet, in the sheet's own language.

A model answers with the cell each field is in, and the engine then reads the
values from those cells itself, so no value is invented.

Turning off
**Send the cells' values to the model** leaves the model seeing only what
kind of thing is in each cell, which keeps amounts and dates on this computer.

**Remember this layout, so the same form is read without the model** is on by
default, so the same template costs no further model calls.
**Forget remembered cells** makes the next run ask again — use it when a
form's layout changed, or when a field was read from the wrong cell.

## Privacy

- The workbook is read on this computer, by Kitewell. The file is never
  uploaded, and its path never leaves the device.
- **Set up from this file** asks the assistant to build the workflow from the
  open workbook. It sends the column names, the type seen in each, and the
  first 10 rows, with each cell cut to one line. **Send only column names**
  sends the names alone.
- A workbook with a password is opened only on this computer. The password is
  kept as a [secret](/docs/secrets/) reference under
  **Password, as a secret reference**, never written into the workflow and
  never logged. A protected workbook cannot be previewed, and cannot be
  imported at all until the password is removed in Excel.
- The link that [syncs with Dagu Cloud](/docs/cloud-sync/) carries the file's
  name, the sheet, which device holds it, and the column mapping — never the
  path. The sheet's rows travel with it, and they hold the cell values read
  from the workbook.
- The file's path, which Excel row each sheet row came from, the results read
  from runs, and the copies kept for Undo stay on the device that ran the
  sheet. A [workspace backup](/docs/backups/) does include those copies.

See [What leaves your computer](/docs/data-flow/) for the whole picture.

## Limits

- `.xlsx` and `.xlsm`. An `.xls` or `.ods` file has to be saved as `.xlsx` in
  Excel first.
- One read holds 5,000 rows and about 900 KB. Over either, the step says what
  it kept and asks for a narrower range, fewer columns, or a row filter.
- A sheet holds 5,000 rows and 30 result columns, and a loop runs 1,000 items.
  An imported file is at most 16 MiB.
- A linked workbook's hidden rows are read along with the rest. Only an
  imported file offers to leave them out.
- Charts, pivot tables, conditional formatting, and validation rules already
  in a file are kept, but none are created, and a pivot table is not
  refreshed. On Windows a macro step can refresh one.
- Google Sheets is not supported yet.

A step that drives a website or a desktop app still needs that application, so
only the spreadsheet steps are free of the screen.
