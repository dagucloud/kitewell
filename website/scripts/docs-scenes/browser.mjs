// Pictures for "Automate a website": the task picker where a website step is
// added, and a finished website step with its instructions filled in. The
// workflow the pictures show is made by the seed, never run: a browser step
// needs a model key and a real site.
const WORDS = {
  en: {
    job: "Order lookup (browser docs)",
    description: "Looks up one order on the supplier portal.",
    step: "Look up the order",
    report: "Write down the status",
    typeIt: "Type %order% into the order search box",
    clickIt: "Click the Search button",
    expect: "The order's details are shown",
    extract: "The order's status and the expected delivery date",
    done: "Status collected",
  },
  ja: {
    job: "注文状況の確認（browser ドキュメント）",
    description: "仕入れ先ポータルで注文を 1 件調べます。",
    step: "注文を調べる",
    report: "状況を書き出す",
    typeIt: "注文番号の検索欄に %order% を入力する",
    clickIt: "「検索」ボタンをクリックする",
    expect: "注文の詳細が表示されている",
    extract: "注文の状況と配達予定日",
    done: "状況を取得しました",
  },
};

const spec = (w) => `type: graph
description: ${w.description}
steps:
  - id: order
    name: ${w.step}
    action: browser.run
    with:
      llm:
        model: kitewell-agent-claude
      url: https://shop.example.com/orders
      variables:
        order: "10042"
      do:
        - act: ${w.typeIt}
        - act: ${w.clickIt}
        - expect: ${w.expect}
        - extract:
            instruction: ${w.extract}
            schema:
              type: object
              properties:
                status:
                  type: string
                delivery:
                  type: string
  - id: report
    name: ${w.report}
    depends: [order]
    run: echo "${w.done} \${steps.order.outputs.status}"
`;

// jobID finds the workflow this page's pictures use, whatever order the
// scenes run in.
async function jobID({ api, lang }) {
  const jobs = (await api("/jobs")).body ?? [];
  return (Array.isArray(jobs) ? jobs : []).find((job) => job.name === WORDS[lang].job)?.id ?? "";
}

// openEditor opens the workflow editor on this page's workflow, with the
// website step selected.
async function openEditor(tools, { select = "order" } = {}) {
  const { page, go } = tools;
  const id = await jobID(tools);
  await go("#jobs", 1500);
  await page.click(`[data-action="edit-job"][data-id="${id}"]`);
  await page.waitForTimeout(2500);
  if (select) {
    await page.click(`#dag-preview [data-node-id="${select}"]`);
    await page.waitForTimeout(1500);
  }
}

// bring scrolls the editor's right-hand pane until what the picture is about
// sits a little below its top edge, so the window around it stays in frame.
async function bring(page, selector, offset = 90) {
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
    name: "browser-task-picker",
    doc: "browser",
    run: async (tools) => {
      const { page, snap } = tools;
      await openEditor(tools, { select: "order" });
      await page.click('[data-action="studio-add"]');
      await page.waitForTimeout(1200);
      await bring(page, '[data-builder-task="browser"]', 420);
      await snap("browser-task-picker");
    },
  },
  {
    name: "browser-step",
    doc: "browser",
    run: async (tools) => {
      const { page, snap } = tools;
      await openEditor(tools);
      // The start page and the first instruction together: what the step
      // opens, and what it is told to do there.
      await bring(page, '[data-browser-op="0"]', 120);
      await snap("browser-step");
    },
  },
];
