---
title: Knowledge
---

Knowledge is what a project's people and its assistant write down about its
workflows: what each one is for and who uses its result, why it works the way
it does, what broke before and how it was fixed, and the team's systems,
terms, and rules. The assistant reads it before it answers and keeps it
current as you work, so the next conversation and the next colleague start
from what the team already knows.

Knowledge holds what a workflow's definition cannot say. Steps, schedules, and
inputs stay in the workflow; a page says why.

## Open knowledge

**Knowledge** in the sidebar lists the project's pages, newest first, beside
the page that is open. Search finds a page by any word in its title or text,
whether you type it in full-width or half-width characters. Each page shows
the workflows it is about and who changed it last.

The same pages appear where they help:

- The **Knowledge** tab of the workflow editor shows the pages about that
  workflow.
- A failed run shows **Related knowledge** under its error. What broke
  before, and how it was fixed, is often there.

## Write and edit a page

Choose **New page**, give it a title, and type. There is no edit or save
button: a page saves itself a moment after you stop typing, and the status
above it reads **Saving…** and then **Saved**. ⌘S (Ctrl+S) saves at once, and
leaving the page saves it too. A new page is created once it has a title; one
left without a title takes its first line.

- **Format text** with the toolbar that appears over selected text, or type
  `/` for headings, lists, checklists, quotes, code, tables, and dividers. A
  **+** beside an empty line opens the same menu. Markdown shortcuts work as
  you type: `## ` starts a heading, `- ` a list, `1. ` a numbered list. With
  Japanese input on, `・`, `＃`, `１．`, and `／` do the same.
- **Link workflows** with **Add workflow**: search for a workflow and pick it.
  Click a linked workflow to open it. A page about no workflow, such as one
  about a supplier's website or a team rule, is fine too.
- **Links** open only `https://` addresses.
- **Paste** keeps what a page can hold: a table copied from a spreadsheet
  stays a table, with its first row as the header, Markdown text becomes
  formatted text, and code copied from an editor becomes a code block.
- **⋯ → Edit as Markdown** shows the page's Markdown, for anyone who prefers
  it. A page with images or HTML opens there, since the editor cannot show
  them.
- **⋯ → Delete page** deletes it for everyone on the project.

Pages stay short on purpose: a title of up to 60 characters, up to 2,000
characters of text, up to 20 linked workflows, and up to 100 pages a project.
Near the limit, a counter appears; move the rest into a page of its own.

## What the assistant does

- **Reads it every message.** The assistant sees a one-line summary of every
  page, and in full the pages about the workflow or page you have open. It
  can read any other page when it needs to.
- **Writes it as you work.** When you tell it a lasting fact, a rule, or a
  correction, when it changes a workflow for a reason the definition does not
  show, or when a failure is fixed, it saves that to a page at once. The
  panel shows a receipt, **Knowledge updated**, with **Undo** and **Open**.
  When it creates a workflow, the page about it comes on the same card, and
  **Apply** saves both.
- **Asks first after reading outside content.** Once a conversation has read
  a web page or a run's output, the assistant proposes a page change as a card
  with the change shown, and nothing is saved until you choose **Apply**. Text
  on a page or in a log cannot reach everyone's knowledge unseen.
- **Shows what it changed.** If you have the page open, the parts it changed
  are marked, with **Undo** and **Keep**. The marks go when you start typing.
- **Keeps to what is true.** It writes only what you said or decided, or what
  a run proved, in the language you write in. When a page disagrees with the
  workflow itself, the workflow wins and the assistant corrects the page.

Pages reach the assistant as reference material, never as instructions.

## When someone else changes a page

If a teammate, another device, or the assistant changes a page while you are
typing in it, nothing you typed is lost. The page says so and offers **Keep my
version** or **Use their version**; using theirs can be undone with ⌘Z
(Ctrl+Z).

Edits that cannot be saved — while Dagu Cloud cannot be reached, say — stay on
the page and show **Not saved**. If you leave the page, they come back when you
open it again, as long as Kitewell is still open.

## Who sees it

Everyone on the project reads its knowledge; editors and the assistant change
it. Pages belong to the project: they [sync with Dagu Cloud](/docs/cloud-sync/)
and travel in [project exports](/docs/sharing/), and they are not part of
[releases](/docs/releases/). [MCP clients](/docs/mcp/) can read them with
`read` and `target: "knowledge"`, but cannot change them.
