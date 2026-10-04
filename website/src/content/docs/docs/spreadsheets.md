---
title: Automate Excel
---

Spreadsheet steps read, check, write, and fill `.xlsx` and `.xlsm` workbooks
on this computer. They open the file directly: Excel is never started, no
window appears, and nothing touches the screen. A locked screen at night stops
nothing, and no spreadsheet process is left hanging.

They read the workbooks your office already has. Title rows above the table,
headers merged across two rows, subtotals in the middle, notes underneath,
full-width digits, 和暦 dates, postal codes with leading zeros: Kitewell works
out where the table is and what each column holds. Nobody reshapes a file for
the robot.

The work that starts and ends in a workbook:

- Register each row of an order list on a supplier's portal, and write the
  受付番号 back beside it.
- Check a workbook that arrived by email, load it into a database, and reply
  with the row count.
- Fill a monthly 請求書 from a template and mail it.
- Add 単価 to each row, looked up from 商品マスタ.xlsx by 商品コード.
- Merge every branch's workbook in a folder into one list.
- Read a folder of quotes, each laid out differently, into a single table.
- Every morning, process the rows a shared order list has added, and mark them.

Spreadsheet steps are included in every plan.

## Two ways to use a workbook

**As steps in a workflow.** Add a task from the **Spreadsheets** group of the
task picker, give it the file's path, and it reads or writes when the workflow
runs. Use this when the workbook is one part of a larger job, or when the
workflow runs on a [schedule](/docs/scheduling/).

**As the source of a sheet.** **New → From a spreadsheet**, or drop an `.xlsx`
file on the Kitewell window, and Kitewell reads the rows, runs your workflow
once for each, and writes each result back into the row it came from. Use this
when the workbook *is* the job: a list of work to get through. The rest of a
sheet's behaviour — progress, rerunning only failed rows, alerts — is covered
in [Run a workflow over a sheet](/docs/batches/).

## Link a workbook and run it

1. **New → From a spreadsheet**, and choose the file. Dropping an `.xlsx` or
   `.xlsm` file anywhere on the window does the same.
2. Kitewell shows what it found: the table it detected, how many rows will
   run, and — counted by reason — the rows that will not. Title rows,
   subtotals, totals, blank rows and notes are left out. **Show** lists them.
   Dragging across the grid corrects a wrong guess.
3. A cell that will not convert is highlighted: 数量 holding 十二, say.
   **Open in Excel** opens the file, and **Check again** re-reads it after you
   fix it.
4. Under the grid, write what should happen for each row in plain words —
   「取引先ポータルで受注を登録して、受付番号を控える」 — and the assistant
   proposes the workflow and the sheet together, as one card you **Apply**.
   **Use an existing workflow** picks a saved one instead.
5. **Try the first row** runs row 1 alone. When it does what you meant,
   **Run the other 244 rows** starts the rest.

Nothing is written into your workbook until there are results and you have
agreed, once, to the columns that change.

## Results in your own file

Before results are written, the link names the columns they go into, each one
editable and each skipped if you clear its name:

| Column | Holds |
| --- | --- |
| 状態 | 済, 一部失敗, or 失敗, in the language of the sheet's own headers |
| One per result | A value the workflow produced, such as 受付番号 |
| エラー | Why a row failed, in one line |
| 実行日時 | When the row last ran |

A column of that name on the sheet is used; a new name adds a column at the
right, copying the style of the one beside it. No run ID, no internal key
column, and no cell comments are added.

- **Undo.** Kitewell copies the file before every write, so **Undo** on the
  sheet puts it back. If you have edited the workbook since, Undo refuses and
  copies the file aside as `受注一覧 (before undo).xlsx` rather than discard
  your edits. The copies stay on this computer and are deleted with the sheet.
- **A file open in Excel means waiting, not failing.** The sheet says
  "Results are ready. They are written when 受注一覧.xlsx is closed in Excel",
  and the write happens by itself when you close it. **Save results to a copy
  now** writes `受注一覧 (結果).xlsx` beside it instead.
- **Results never land on the wrong row.** Rows are told apart by a column
  whose values do not repeat — an order number — and Kitewell proves the key
  is still where it was before writing. Sorting or filtering in Excel between
  runs is safe. A row that moved is left out, named, and every other row is
  written.

## Read the workbook again

When the file changes on disk, the sheet says so and offers **Read the
workbook again**, which reports "1 new · 1 updated · 1 no longer in the
sheet": a new row joins, a changed cell updates its row, a row the sheet no
longer holds is marked no longer listed, and a row that moved is followed. If
the header row has lost the key column, the read stops and names the column
that is gone.

## Every morning

A linked sheet can run on a [schedule](/docs/scheduling/), which asks two
more things: whether to read the workbook first, and **Which rows run** —
every row, or only the rows the workbook added or changed. With the latter,
each due time reads the file, runs what changed, writes the results back, and
starts no run at all when nothing changed.

This is the job people buy RPA for: a shared order list worked every morning,
with no robot PC and nobody watching. A linked sheet runs on the computer that
holds the file, so schedule it there.

## The steps

| Task | Does |
| --- | --- |
| Read a spreadsheet | Rows from a sheet, only the rows you want, each column as text, number, or date |
| Check a spreadsheet | Stops before anything else happens when cells are wrong |
| Write results back | Status and values into the rows they came from |
| Write a spreadsheet | A new workbook or sheet, replaced or appended |
| Add rows to a spreadsheet | Rows under the last row, matched to the header |
| Fill a template | Cells or named cells of a template, saved as a copy |
| Convert a spreadsheet | A sheet to CSV (UTF-8 or Shift_JIS), JSON, or JSON Lines |
| Add, copy, rename, or delete a sheet | Start a month from a template sheet, safely rerun |
| Describe a workbook | Sheets, headers, and types for later steps |
| Read a form | Fields from a quote or an order laid out as a form, whatever its layout |

Choosing a workbook in a step shows its sheets as tabs and the first 20 rows
converted as the step will read them, with the detected table and header row
named. **Check** asks the engine whether the step would fail on this computer
— a missing workbook, sheet, or column — before you run anything, and
**Test** shows the rows as a table. A writer only reports what it would change
during a test; nothing is saved unless you turn that on.

The same workflow in YAML:

```yaml
type: graph
steps:
  - id: orders
    name: Read the orders not done yet
    action: xlsx.read
    with:
      path: ~/Documents/受注一覧.xlsx
      sheet: 受注
      columns:
        - 受注番号: order_no
        - 数量: qty
      types:
        数量: integer
      where:
        状態: ""
  - id: each
    name: For each order
    depends: [orders]
    foreach:
      items: ${steps.orders.outputs.rows}
      as: row
      key: ${foreach.row.order_no}
      steps:
        - id: register
          name: Register it on the portal
          action: http.request
          with:
            method: POST
            url: https://portal.example.com/orders
            headers:
              Content-Type: application/json
            body: '{"order_no": "${foreach.row.order_no}", "qty": ${foreach.row.qty}}'
      collect:
        order_no: ${foreach.row.order_no}
        receipt: ${steps.register.outputs.body}
    output: DONE
  - id: write
    name: Write the 受付番号 back
    depends: [each]
    action: xlsx.update_rows
    with:
      path: ~/Documents/受注一覧.xlsx
      sheet: 受注
      rows: ${DONE}
      key: 受注番号
      set:
        受付番号: receipt
        状態:
          value: 済
```

A column a later step refers to needs an ASCII name, which is what `columns`
above gives it; the editor offers one, and the review asks for it when a loop
refers to a Japanese header. Each row keeps its Japanese header as its title
on the sheet.

A portal with no API takes a [website step](/docs/browser/) in place of the
request above, and an application with neither takes a
[desktop step](/docs/desktop/). The spreadsheet steps around them stay off the
screen either way.

## Reading values

Cells are converted once, so no step ever sees a date as a serial number.

- **Numbers and dates.** A date or time becomes an ISO 8601 string, 和暦 eras
  and the 1900 and 1904 date systems included. Text in a column you have
  pinned to a type is parsed first: full-width digits and commas, ¥ and 円,
  △, ▲ and parentheses as negatives, and dates such as 2026/10/1,
  令和8年10月1日, R8.10.1 and 元年.
- **Text stays text.** Leading zeros survive, so 郵便番号 and 社員番号 are not
  turned into numbers. A value written back is written as the type it is: text
  that looks like a number stays text, and a value from a website can never
  become a formula.
- **Formulas** give their cached value, or the formula itself if you ask.
  `#N/A` and friends read as empty, with a warning naming the cell.
- **Merged cells** in the body repeat their value into every cell they cover.
  A write into a merged cell that reaches outside its column is refused, with
  the range to unmerge, rather than guessed.

## Forms, not tables

A quote or an order laid out as a form — labels and values scattered over the
sheet rather than rows under a header — is read by **Read a form**. Say what
the form is and which fields to find, and a model answers with the cell each
one is in; the engine then reads the values from those cells itself. The
answered cells are remembered by the sheet's shape, so the same template costs
no further model calls. **Forget remembered cells** makes the next run ask
again.

## Privacy

- The workbook is read on this computer, by Kitewell. The file is never
  uploaded, and its path never leaves the device.
- Setting a sheet up from a file with the assistant sends the column names,
  their types, and up to ten rows to the model you chose, and the screen says
  so. **Send only column names** sends the names alone. The rows themselves
  are read by Kitewell, not by the model.
- A workbook with a password is opened only on this computer, and the password
  is kept as a [secret](/docs/secrets/) reference, never logged.
- The copies kept for Undo, and which Excel row each sheet row came from, stay
  on this computer. They are not in project exports, backups, or
  [Dagu Cloud](/docs/cloud-sync/) sync, which carries the file's name and
  which computer holds it, never a cell.

See [What leaves this computer](/docs/data-flow/) for the whole picture.

## Limits

- `.xlsx` and `.xlsm`. An `.xls` or `.ods` file needs **Save As** `.xlsx` in
  Excel first.
- One read holds 5,000 rows and about 900 KB. Over either, the step says what
  it kept and asks for a narrower range, fewer columns, or a row filter.
- A sheet holds 5,000 rows, and a loop runs 1,000 items.
- Charts, pivot tables, conditional formatting and validation rules are kept
  as they are, but none are created. A pivot table is not refreshed; a
  documented macro step can do that on Windows.
- Google Sheets is not supported yet.

A step that drives a website or a desktop app still needs that application, so
only the spreadsheet steps are free of the screen.

If a spreadsheet step fails, see
[Troubleshooting](/docs/troubleshooting/#a-spreadsheet-step-fails).
