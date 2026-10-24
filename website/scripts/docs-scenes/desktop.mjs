// Pictures for "Automate a desktop app": what a desktop step holds, and where
// a device says whether desktop steps may use its screen. The workflow the
// first picture shows is made by the seed and never run: a desktop step needs
// a model key and the device's own screen.
const WORDS = {
  en: {
    job: "Invoice lookup (desktop docs)",
    description: "Reads the newest invoice out of the accounting app.",
    step: "Find the latest invoice",
    report: "Write down the invoice",
    task: "Open the invoice list and find the newest row for %client%",
    read: "The invoice number and the total in that row",
    client: "Acme Joinery",
    done: "Invoice found",
  },
  ja: {
    job: "請求書の確認（desktop ドキュメント）",
    description: "会計アプリから最新の請求書を読み取ります。",
    step: "最新の請求書を探す",
    report: "請求書を書き出す",
    task: "請求書の一覧を開き、%client% の最新の行を探す",
    read: "その行の請求書番号と合計金額",
    client: "明石建具",
    done: "請求書が見つかりました",
  },
  zh: {
    job: "发票查询（desktop 文档）",
    description: "从会计软件中读取最新的发票。",
    step: "查找最新发票",
    report: "记下发票信息",
    task: "打开发票列表，找到 %client% 的最新一行",
    read: "该行的发票号和总额",
    client: "Acme Joinery",
    done: "已找到发票",
  },
  ko: {
    job: "청구서 조회(desktop 문서)",
    description: "회계 앱에서 최신 청구서를 읽어 옵니다.",
    step: "최신 청구서 찾기",
    report: "청구서 기록하기",
    task: "청구서 목록을 열고 %client%의 가장 최근 행 찾기",
    read: "그 행의 청구서 번호와 총액",
    client: "Acme Joinery",
    done: "청구서를 찾았습니다",
  },
  fr: {
    job: "Recherche de facture (doc desktop)",
    description: "Lit la facture la plus récente dans l’app de comptabilité.",
    step: "Trouver la dernière facture",
    report: "Noter la facture",
    task: "Ouvrir la liste des factures et trouver la ligne la plus récente pour %client%",
    read: "Le numéro de facture et le total de cette ligne",
    client: "Acme Joinery",
    done: "Facture trouvée",
  },
  de: {
    job: "Rechnungsabfrage (Desktop-Doku)",
    description: "Liest die neueste Rechnung aus der Buchhaltungs-App aus.",
    step: "Neueste Rechnung suchen",
    report: "Rechnung notieren",
    task: "Rechnungsliste öffnen und die neueste Zeile für %client% suchen",
    read: "Die Rechnungsnummer und der Gesamtbetrag in dieser Zeile",
    client: "Acme Joinery",
    done: "Rechnung gefunden",
  },
};

const spec = (w) => `type: graph
description: ${w.description}
steps:
  - id: invoice
    name: ${w.step}
    action: computer.run
    with:
      llm:
        model: kitewell-agent-claude
      variables:
        client: ${w.client}
      do:
        - launch: ledger.exe
        - act: ${w.task}
        - extract:
            instruction: ${w.read}
            schema:
              type: object
              properties:
                number:
                  type: string
                total:
                  type: number
  - id: report
    name: ${w.report}
    depends: [invoice]
    run: echo "${w.done} \${steps.invoice.outputs.number}"
`;

async function jobID({ api, lang }) {
  const jobs = (await api("/jobs")).body ?? [];
  return (Array.isArray(jobs) ? jobs : []).find((job) => job.name === WORDS[lang].job)?.id ?? "";
}

async function openEditor(tools, select = "invoice") {
  const { page, go } = tools;
  const id = await jobID(tools);
  await go("#jobs", 1500);
  await page.click(`[data-action="edit-job"][data-id="${id}"]`);
  await page.waitForTimeout(2500);
  await page.click(`#dag-preview [data-node-id="${select}"]`);
  await page.waitForTimeout(1500);
}

// bring scrolls the editor's right-hand pane until what the picture is about
// sits a little below its top edge, so the window around it stays in frame.
async function bring(page, selector, offset = 120) {
  await page.evaluate(
    ({ selector, offset }) => {
      const element = document.querySelector(selector);
      if (!element) return;
      let pane = element.parentElement;
      while (pane && pane.scrollHeight <= pane.clientHeight + 4) pane = pane.parentElement;
      if (!pane) return;
      pane.scrollTop += element.getBoundingClientRect().top - pane.getBoundingClientRect().top - offset;
    },
    { selector, offset },
  );
  await page.waitForTimeout(600);
}

async function clipTo(page, selector) {
  const box = await page.locator(selector).first().boundingBox();
  if (!box) return undefined;
  const margin = 8;
  const x = Math.max(0, box.x - margin), y = Math.max(0, box.y - margin);
  return { x, y, width: Math.min(1440 - x, box.width + margin * 2), height: Math.min(900 - y, box.height + margin * 2) };
}

export async function seed({ api, lang }) {
  const w = WORDS[lang];
  const jobs = (await api("/jobs")).body ?? [];
  if ((Array.isArray(jobs) ? jobs : []).some((job) => job.name === w.job)) return;
  await api("/jobs", {
    method: "POST",
    body: JSON.stringify({ name: w.job, description: w.description, spec: spec(w), enabled: false }),
  });
}

export const scenes = [
  {
    name: "desktop-step",
    doc: "desktop",
    run: async (tools) => {
      const { page, snap } = tools;
      await openEditor(tools);
      // The app it opens and the task it is given, one under the other.
      await bring(page, '[data-browser-op="1"]', 90);
      await snap("desktop-step");
    },
  },
  {
    name: "desktop-access",
    doc: "desktop",
    run: async (tools) => {
      const { page, go, snap } = tools;
      await go("#settings", 2000);
      // The whole section, so the picture carries the heading beside the
      // check as well as the check itself.
      const section = 'xpath=//div[@id="desktop-setup"]/ancestor::section[1]';
      await page.locator(section).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await snap("desktop-access", { clip: await clipTo(page, section) });
    },
  },
];
