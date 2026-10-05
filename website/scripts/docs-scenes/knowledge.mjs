// Pictures for "Knowledge": the project's pages beside the one that is open.
// The pages are written for the demo project's invoice run, so the picture
// says what the page beside it says.
import { words } from "./_seed.mjs";

const PAGES = {
  en: [
    {
      title: "Supplier portal sign-in",
      text: [
        "The portal password is the secret portal-password. Nobody needs to know it; the workflow reads it.",
        "",
        "## Watch out",
        "",
        "- Sign-in asks for a one-time code on the first run of each month. The code goes to the shared office phone.",
        "- The portal is down for maintenance on the first Sunday of the month. A failed run that day is expected.",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "Invoice run: what to watch",
      text: [
        "Every weekday at 9:00 this run collects the new invoices, enters them in Ledger, waits for someone to approve, saves them, and emails the office a summary.",
        "",
        "## Watch out",
        "",
        "- The approval holds the run until someone answers it. Nobody approves on a holiday, so Monday's run can carry Friday's invoices too.",
        "- Ledger turns away an invoice with no order number. Those are meant to fail: send them back to the supplier.",
        "",
        "## Fixed before",
        "",
        "2026-09-14: the run stopped at Enter them in Ledger because Ledger renamed its amount field. The step now reads the field by its label.",
      ].join("\n"),
      job: "invoices",
    },
  ],
  ja: [
    {
      title: "取引先ポータルのサインイン",
      text: [
        "ポータルのパスワードはシークレット portal-password です。人が覚える必要はなく、ワークフローが読みます。",
        "",
        "## 注意",
        "",
        "- 毎月はじめの実行では、サインインでワンタイムコードを求められます。コードは共用の事務所の電話に届きます。",
        "- 毎月第 1 日曜はポータルのメンテナンス日です。その日の失敗は想定どおりです。",
      ].join("\n"),
      job: "invoices",
    },
    {
      title: "請求書処理で見ておくこと",
      text: [
        "この実行は毎平日 9:00 に新しい請求書を集め、台帳に入力し、承認を待ち、保存して、概要をメールで送ります。",
        "",
        "## 注意",
        "",
        "- 承認があるまで実行は止まったままです。休日は誰も承認しないので、月曜の実行が金曜の分まで運ぶことがあります。",
        "- 注文番号のない請求書は台帳が受け付けません。これは失敗して当然なので、取引先に差し戻してください。",
        "",
        "## 過去の不具合",
        "",
        "2026-09-14: 台帳が金額の項目名を変えたため、「台帳に入力する」で止まりました。今は項目をラベルで読むようにしています。",
      ].join("\n"),
      job: "invoices",
    },
  ],
};

// seed writes the two pages the picture shows. A page already there is
// brought to this text rather than added again, so the service can be
// captured as often as it likes.
export async function seed({ lang, api }) {
  const w = words(lang);
  const jobs = (await api("/jobs")).body ?? [];
  const pages = ((await api("/knowledge")).body ?? {}).pages ?? [];
  for (const page of PAGES[lang]) {
    const job = jobs.find((item) => item.name === w[page.job].name);
    const body = JSON.stringify({ title: page.title, text: page.text, workflows: job ? [job.id] : [] });
    const existing = pages.find((item) => item.title === page.title);
    if (!existing) {
      await api("/knowledge", { method: "POST", body });
      continue;
    }
    if (existing.text === page.text) continue;
    await api(`/knowledge/${existing.id}`, { method: "PUT", headers: { "If-Match": `"${existing.version}"` }, body });
  }
}

export const scenes = [
  {
    name: "knowledge-pages",
    doc: "knowledge",
    run: async ({ go, snap }) => {
      await go("#knowledge", 2500);
      await snap("knowledge-pages");
    },
  },
];
