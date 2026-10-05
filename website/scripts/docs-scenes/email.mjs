// Pictures for "Automate email": the Mail accounts page with a mailbox
// connected, and what a Find emails step asks for. The workflow is made by
// the seed and never run: it would reach a real mail server.

const WORDS = {
  en: {
    job: "Support intake (email docs)",
    description: "Finds unread requests and marks each one handled.",
    find: "Find new requests",
    each: "Handle each request",
    handle: "Turn it into a ticket",
    mark: "Mark it handled",
    note: "Replace this step with the work each email needs",
  },
  ja: {
    job: "問い合わせの受付（email ドキュメント）",
    description: "未読の問い合わせを探し、処理済みにします。",
    find: "新しい問い合わせを探す",
    each: "問い合わせを 1 件ずつ処理",
    handle: "チケットにする",
    mark: "処理済みにする",
    note: "このステップを、メールごとに必要な作業に置き換えてください",
  },
};

const MAILBOX = "me@example.com";

const spec = (w) => `type: graph
description: ${w.description}
steps:
  - id: find
    name: ${w.find}
    action: mail.search
    with:
      mailbox: ${MAILBOX}
      folder: INBOX
      unread: true
      limit: 20
  - id: each
    name: ${w.each}
    depends: [find]
    foreach:
      items: \${steps.find.outputs.messages}
      as: email
      key: \${foreach.email.id}
      max_concurrent: 1
      steps:
        - id: handle
          name: ${w.handle}
          run: echo "${w.note}"
        - id: mark_read
          name: ${w.mark}
          depends: [handle]
          action: mail.organize
          with:
            mailbox: ${MAILBOX}
            emails: \${foreach.email.id}
            mark: read
`;

async function jobID({ api, lang }) {
  const jobs = (await api("/jobs")).body ?? [];
  return (Array.isArray(jobs) ? jobs : []).find((job) => job.name === WORDS[lang].job)?.id ?? "";
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
    name: "mail-accounts",
    doc: "email",
    run: async ({ go, snap }) => {
      await go("#mail", 2500);
      await snap("mail-accounts");
    },
  },
  {
    name: "email-find-step",
    doc: "email",
    run: async (tools) => {
      const { page, go, snap } = tools;
      const id = await jobID(tools);
      await go("#jobs", 1500);
      await page.click(`[data-action="edit-job"][data-id="${id}"]`);
      await page.waitForTimeout(2500);
      await page.click('#dag-preview [data-node-id="find"]');
      await page.waitForTimeout(2000);
      await bring(page, "#builder-mail_mailbox", 220);
      await snap("email-find-step");
    },
  },
];
