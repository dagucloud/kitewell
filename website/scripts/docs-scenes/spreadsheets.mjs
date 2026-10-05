// Pictures for "Automate Excel": a sheet linked to a real .xlsx on this
// device, after one run of its rows, so the picture shows what the page
// promises — a list of invoices, one run per row, results written back.
//
// The workbook is written here rather than carried in the repository, so the
// seed owns it end to end and can be run again. It is written beside the
// service's data folder, which is where a linked workbook must live: a path
// inside the data folder is refused.
import fs from "node:fs";
import path from "node:path";
import { crc32 } from "node:zlib";

const WORDS = {
  en: {
    job: "Supplier invoices",
    jobNote: "Registers one supplier invoice on the portal and notes the receipt number.",
    step: "Register it on the portal",
    sheet: "Supplier invoices",
    file: "supplier-invoices.xlsx",
    tab: "Invoices",
    headers: ["Invoice No", "Supplier", "Amount", "Due date"],
    receipt: "Receipt No",
    rows: [
      ["HS-20418", "Northwind Supply", 1240, "2026-10-20"],
      ["HS-20422", "Contoso Metals", 2318.5, "2026-10-20"],
      ["HS-20431", "Fabrikam Ltd", 624, "2026-10-24"],
      ["HS-20433", "Tailspin Freight", 1807.25, "2026-10-24"],
      ["HS-20440", "Litware Electric", 395, "2026-10-31"],
      ["HS-20447", "Proseware Chemical", 2064, "2026-10-31"],
    ],
  },
  ja: {
    job: "取引先の請求書",
    jobNote: "取引先の請求書を 1 件ポータルに登録し、受付番号を控えます。",
    step: "ポータルに登録する",
    sheet: "取引先の請求書",
    file: "supplier-invoices.xlsx",
    tab: "請求書",
    headers: ["請求書番号", "取引先", "金額", "支払期日"],
    receipt: "受付番号",
    rows: [
      ["MS-20418", "山田商事", 124000, "2026-10-20"],
      ["MS-20422", "鈴木工業", 231850, "2026-10-20"],
      ["MS-20431", "田中物産", 62400, "2026-10-24"],
      ["MS-20433", "高橋運輸", 180725, "2026-10-24"],
      ["MS-20440", "伊藤電機", 39500, "2026-10-31"],
      ["MS-20447", "渡辺化学", 206400, "2026-10-31"],
    ],
  },
};

// The workflow declares the inputs the workbook's columns fill, and publishes
// the one value the result column copies. Its step is one line, so Windows
// PowerShell and sh both run it.
const spec = (w) => `type: graph
description: ${w.jobNote}
params:
  type: object
  properties:
    invoice:
      type: string
      title: ${w.headers[0]}
    supplier:
      type: string
      title: ${w.headers[1]}
    amount:
      type: number
      title: ${w.headers[2]}
    due:
      type: string
      title: ${w.headers[3]}
  required: [invoice]
steps:
  - id: register
    name: ${w.step}
    run: echo "R-2026-\${invoice}"
    output:
      receipt: {from: stdout}
`;

export async function seed({ lang, dataDir, api, until }) {
  const w = WORDS[lang];
  if (!dataDir) return;
  // Beside the data folder, never inside it: a workbook within Kitewell's own
  // data directory is refused.
  const file = path.resolve(dataDir, "..", w.file);
  if (!fs.existsSync(file)) writeWorkbook(file, w.tab, [w.headers, ...w.rows]);

  const jobs = (await api("/jobs")).body ?? [];
  let job = jobs.find((item) => item.name === w.job);
  if (!job) {
    job = (await api("/jobs", { method: "POST", body: JSON.stringify({ name: w.job, description: w.jobNote, spec: spec(w), enabled: true }) })).body;
  }
  if (!job?.id) return;

  const sets = ((await api(`/jobs/${job.id}/batch-sets`)).body ?? {}).sets ?? [];
  let set = sets.find((item) => item.name === w.sheet);
  if (!set) {
    set = (
      await api(`/jobs/${job.id}/batch-sets`, {
        method: "POST",
        body: JSON.stringify({
          name: w.sheet,
          rows: w.rows.map(([invoice, supplier, amount, due]) => ({ label: `${invoice} ${supplier}`, params: { invoice, supplier, amount, due } })),
          columns: [{ name: w.receipt, type: "text", output: "receipt" }],
        }),
      })
    ).body;
  }
  if (!set?.id) return;

  // Link the workbook. match lets the service find each sheet row in the file
  // again by its invoice number, so the link needs no Excel row numbers from
  // here, and it fills in the columns it writes back by itself.
  const linked = ((await api(`/jobs/${job.id}/batch-sets/${set.id}/workbook`)).body ?? {}).workbook;
  if (!linked?.fileName) {
    const reply = await api(`/jobs/${job.id}/batch-sets/${set.id}/workbook`, {
      method: "POST",
      body: JSON.stringify({
        path: file.replace(/\\/g, "/"),
        sheet: w.tab,
        header: 1,
        key: w.headers[0],
        label: w.headers[1],
        inputs: { invoice: w.headers[0], supplier: w.headers[1], amount: w.headers[2], due: w.headers[3] },
        match: true,
        version: set.version,
      }),
    });
    if (reply.status !== 200) throw new Error(`linking ${w.file} failed: ${JSON.stringify(reply.body)}`);
    set = reply.body.set ?? set;
  }

  // One run of the rows, so the picture shows receipt numbers rather than an
  // empty column, and the workbook has something to be written back into.
  const sheet = (await api(`/jobs/${job.id}/batch-sets/${set.id}/sheet`)).body ?? {};
  const done = (state) => ["succeeded", "failed", "partially_succeeded"].includes(state?.status);
  if (!Object.values(sheet.rows ?? {}).some((row) => row?.status)) {
    await api(`/jobs/${job.id}/batches`, {
      method: "POST",
      body: JSON.stringify({ requestId: `docs-spreadsheets-${set.id}`, setId: set.id, setVersion: set.version, rowIds: set.rows.map((row) => row.id) }),
    });
    await until(async () => {
      const now = (await api(`/jobs/${job.id}/batch-sets/${set.id}/sheet`)).body ?? {};
      const states = Object.values(now.rows ?? {});
      return states.length >= set.rows.length && states.every(done);
    }, 180_000, 3000);
  }
  // The results reach the workbook on the service's own sweep, a few seconds
  // after the rows finish. Wait for it, so the picture is of a settled sheet.
  await until(async () => {
    const status = ((await api(`/jobs/${job.id}/batch-sets/${set.id}/workbook`)).body ?? {}).workbook;
    return Boolean(status?.lastWrite) && !status?.pending;
  }, 180_000, 3000);
  seeded[lang] = { jobId: job.id, setId: set.id };
}

const seeded = {};

export const scenes = [
  {
    name: "excel-linked-sheet",
    doc: "spreadsheets",
    run: async ({ go, lang, page, snap }) => {
      const made = seeded[lang];
      if (!made) throw new Error("the linked sheet was not seeded");
      const projectId = await page.evaluate(async () => (await (await fetch("/gui/api/projects")).json()).projects[0]?.id);
      await go(`#batches?projectId=${projectId}&jobId=${made.jobId}&setId=${made.setId}`, 4000);
      await snap("excel-linked-sheet");
    },
  },
];

// writeWorkbook writes the smallest .xlsx a reader accepts: inline strings,
// one worksheet, stored entries. Numbers go in as numbers so the sheet's
// amount column is a number, and everything else as text.
function writeWorkbook(file, sheetName, rows) {
  const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const column = (n) => String.fromCharCode(65 + n);
  const body = rows
    .map(
      (cells, r) =>
        `<row r="${r + 1}">${cells
          .map((value, c) =>
            typeof value === "number"
              ? `<c r="${column(c)}${r + 1}"><v>${value}</v></c>`
              : `<c r="${column(c)}${r + 1}" t="inlineStr"><is><t>${esc(value)}</t></is></c>`,
          )
          .join("")}</row>`,
    )
    .join("");
  const head = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>`;
  const ns = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";
  const rel = "http://schemas.openxmlformats.org/package/2006/relationships";
  const doc = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  fs.writeFileSync(
    file,
    zip([
      [
        "[Content_Types].xml",
        `${head}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
      ],
      ["_rels/.rels", `${head}<Relationships xmlns="${rel}"><Relationship Id="rId1" Type="${doc}/officeDocument" Target="xl/workbook.xml"/></Relationships>`],
      ["xl/workbook.xml", `${head}<workbook xmlns="${ns}" xmlns:r="${doc}"><sheets><sheet name="${esc(sheetName)}" sheetId="1" r:id="rId1"/></sheets></workbook>`],
      [
        "xl/_rels/workbook.xml.rels",
        `${head}<Relationships xmlns="${rel}"><Relationship Id="rId1" Type="${doc}/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="${doc}/styles" Target="styles.xml"/></Relationships>`,
      ],
      [
        "xl/styles.xml",
        `${head}<styleSheet xmlns="${ns}"><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs></styleSheet>`,
      ],
      ["xl/worksheets/sheet1.xml", `${head}<worksheet xmlns="${ns}"><sheetData>${body}</sheetData></worksheet>`],
    ]),
  );
}

// zip packs the parts without compressing them, which is all an .xlsx needs
// to be readable and keeps this to one short function.
function zip(entries) {
  const locals = [];
  const central = [];
  let offset = 0;
  for (const [name, text] of entries) {
    const title = Buffer.from(name, "utf8");
    const data = Buffer.from(text, "utf8");
    const sum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6); // names are UTF-8
    local.writeUInt16LE(0, 8); // stored
    local.writeUInt16LE(0x21, 12); // 1980-01-01, so the file never changes
    local.writeUInt32LE(sum, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(title.length, 26);
    locals.push(local, title, data);
    const dir = Buffer.alloc(46);
    dir.writeUInt32LE(0x02014b50, 0);
    dir.writeUInt16LE(20, 4);
    dir.writeUInt16LE(20, 6);
    dir.writeUInt16LE(0x0800, 8);
    dir.writeUInt16LE(0, 10);
    dir.writeUInt16LE(0x21, 14);
    dir.writeUInt32LE(sum, 16);
    dir.writeUInt32LE(data.length, 20);
    dir.writeUInt32LE(data.length, 24);
    dir.writeUInt16LE(title.length, 28);
    dir.writeUInt32LE(offset, 42);
    central.push(dir, title);
    offset += local.length + title.length + data.length;
  }
  const body = Buffer.concat(locals);
  const directory = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(body.length, 16);
  return Buffer.concat([body, directory, end]);
}
