// Pictures for "Run a workflow over a sheet": a sheet of invoices, one run to
// a row, with the results that came back.
//
// The seed makes its own workflow and sheet rather than touching the shared
// ones, since a sheet's rows need a workflow that declares named inputs. Both
// are found again by name, so the service can be captured again and again.

const WORDS = {
  en: {
    job: "Register one invoice",
    jobNote: "Registers one invoice on the supplier portal and notes the receipt number.",
    step: "Register it on the portal",
    sheet: "October invoice batch",
    titles: { invoice: "Invoice No", customer: "Customer", amount: "Amount" },
    rows: [
      ["HS-20418", "Northwind Supply", 1240],
      ["HS-20422", "Contoso Metals", 2318.5],
      ["HS-20431", "Fabrikam Ltd", 624],
      ["HS-20433", "Tailspin Freight", 1807.25],
      ["HS-20440", "Litware Electric", 395],
      ["HS-20447", "Proseware Chemical", 2064],
    ],
  },
  ja: {
    job: "請求書を 1 件登録",
    jobNote: "請求書を 1 件、取引先ポータルに登録して受付番号を控えます。",
    step: "ポータルに登録する",
    sheet: "10 月の請求書バッチ",
    titles: { invoice: "請求書番号", customer: "取引先", amount: "金額" },
    rows: [
      ["MS-20418", "山田商事", 124000],
      ["MS-20422", "鈴木工業", 231850],
      ["MS-20431", "田中物産", 62400],
      ["MS-20433", "高橋運輸", 180725],
      ["MS-20440", "伊藤電機", 39500],
      ["MS-20447", "渡辺化学", 206400],
    ],
  },
  zh: {
    job: "登记一张发票",
    jobNote: "在供应商门户上登记一张发票，并记下回执编号。",
    step: "在门户上登记",
    sheet: "10 月发票批次",
    titles: { invoice: "Invoice No", customer: "Customer", amount: "Amount" },
    rows: [
      ["HS-20418", "Northwind Supply", 1240],
      ["HS-20422", "Contoso Metals", 2318.5],
      ["HS-20431", "Fabrikam Ltd", 624],
      ["HS-20433", "Tailspin Freight", 1807.25],
      ["HS-20440", "Litware Electric", 395],
      ["HS-20447", "Proseware Chemical", 2064],
    ],
  },
  ko: {
    job: "청구서 1건 등록",
    jobNote: "공급업체 포털에 청구서 1건을 등록하고 접수 번호를 기록합니다.",
    step: "포털에 등록하기",
    sheet: "10월 청구서 일괄 처리",
    titles: { invoice: "Invoice No", customer: "Customer", amount: "Amount" },
    rows: [
      ["HS-20418", "Northwind Supply", 1240],
      ["HS-20422", "Contoso Metals", 2318.5],
      ["HS-20431", "Fabrikam Ltd", 624],
      ["HS-20433", "Tailspin Freight", 1807.25],
      ["HS-20440", "Litware Electric", 395],
      ["HS-20447", "Proseware Chemical", 2064],
    ],
  },
  fr: {
    job: "Enregistrer une facture",
    jobNote: "Enregistre une facture sur le portail fournisseurs et note le numéro d’accusé de réception.",
    step: "L’enregistrer sur le portail",
    sheet: "Lot de factures d’octobre",
    titles: { invoice: "Invoice No", customer: "Customer", amount: "Amount" },
    rows: [
      ["HS-20418", "Northwind Supply", 1240],
      ["HS-20422", "Contoso Metals", 2318.5],
      ["HS-20431", "Fabrikam Ltd", 624],
      ["HS-20433", "Tailspin Freight", 1807.25],
      ["HS-20440", "Litware Electric", 395],
      ["HS-20447", "Proseware Chemical", 2064],
    ],
  },
  de: {
    job: "Eine Rechnung eintragen",
    jobNote: "Trägt eine Rechnung im Lieferantenportal ein und notiert die Eingangsnummer.",
    step: "Im Portal eintragen",
    sheet: "Rechnungsstapel Oktober",
    titles: { invoice: "Invoice No", customer: "Customer", amount: "Amount" },
    rows: [
      ["HS-20418", "Northwind Supply", 1240],
      ["HS-20422", "Contoso Metals", 2318.5],
      ["HS-20431", "Fabrikam Ltd", 624],
      ["HS-20433", "Tailspin Freight", 1807.25],
      ["HS-20440", "Litware Electric", 395],
      ["HS-20447", "Proseware Chemical", 2064],
    ],
  },
};

// The workflow declares named inputs, which is what a sheet's columns are
// made of, and publishes one value, which a result column copies. Each step
// is one line, so Windows PowerShell and sh both run it.
const spec = (w) => `type: graph
description: ${w.jobNote}
params:
  type: object
  properties:
    invoice:
      type: string
      title: ${w.titles.invoice}
    customer:
      type: string
      title: ${w.titles.customer}
    amount:
      type: number
      title: ${w.titles.amount}
  required: [invoice]
steps:
  - id: register
    name: ${w.step}
    run: echo "R-2026-\${invoice}"
    output:
      receipt: {from: stdout}
`;

const words = (lang) => WORDS[lang];

export async function seed({ lang, api, until }) {
  const w = words(lang);
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
          rows: w.rows.map(([invoice, customer, amount]) => ({ label: `${invoice} ${customer}`, params: { invoice, customer, amount } })),
          columns: [{ name: w.titles.invoice === "Invoice No" ? "Receipt No" : "受付番号", type: "text", output: "receipt" }],
        }),
      })
    ).body;
  }
  if (!set?.id) return;
  // Run the rows once, so the picture shows results rather than an empty
  // column. A sheet that has already run is left alone.
  const sheet = (await api(`/jobs/${job.id}/batch-sets/${set.id}/sheet`)).body ?? {};
  const ran = Object.values(sheet.rows ?? {}).some((row) => row?.status);
  if (!ran) {
    await api(`/jobs/${job.id}/batches`, {
      method: "POST",
      body: JSON.stringify({ requestId: `docs-batches-${set.id}`, setId: set.id, setVersion: set.version, rowIds: set.rows.map((row) => row.id) }),
    });
    await until(async () => {
      const now = (await api(`/jobs/${job.id}/batch-sets/${set.id}/sheet`)).body ?? {};
      const states = Object.values(now.rows ?? {});
      return states.length >= set.rows.length && states.every((row) => ["succeeded", "failed", "partially_succeeded"].includes(row?.status));
    }, 120_000, 3000);
  }
  seeded[lang] = { jobId: job.id, setId: set.id };
}

const seeded = {};

export const scenes = [
  {
    name: "batch-sheet",
    doc: "batches",
    run: async ({ go, lang, page, snap }) => {
      const made = seeded[lang];
      if (!made) throw new Error("the batch sheet was not seeded");
      const projectId = await page.evaluate(async () => (await (await fetch("/gui/api/projects")).json()).projects[0]?.id);
      await go(`#batches?projectId=${projectId}&jobId=${made.jobId}&setId=${made.setId}`, 4000);
      await snap("batch-sheet");
    },
  },
];
