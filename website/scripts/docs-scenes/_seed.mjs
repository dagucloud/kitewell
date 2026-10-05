// The project every picture starts from: a small business that pays its
// suppliers, named as the launch film names it, with the workflows the pages
// walk through. Commands are the few that behave the same in PowerShell and
// sh, since the pictures are taken on either system.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// mailSealer seals mailbox credentials the way the app does: AES-256-GCM
// under the device's mail.key, nonce then ciphertext then tag, base64. The
// key is made when the device has none yet. repair reseals a record written
// before this seed sealed anything, so an older data folder still lists its
// mailbox; a credential the key already opens is left alone.
function mailSealer(dataDir) {
  const keyFile = path.join(dataDir, "mail.key");
  if (!fs.existsSync(keyFile)) {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(keyFile, crypto.randomBytes(32), { mode: 0o600 });
  }
  const key = fs.readFileSync(keyFile);
  const seal = (value) => {
    const nonce = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, nonce);
    const body = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
    return Buffer.concat([nonce, body, cipher.getAuthTag()]).toString("base64");
  };
  const opens = (sealed) => {
    try {
      const data = Buffer.from(sealed, "base64");
      if (data.length < 28) return false;
      const decipher = crypto.createDecipheriv("aes-256-gcm", key, data.subarray(0, 12));
      decipher.setAuthTag(data.subarray(data.length - 16));
      decipher.update(data.subarray(12, data.length - 16));
      decipher.final();
      return true;
    } catch {
      return false;
    }
  };
  const repair = (file) => {
    const boxes = JSON.parse(fs.readFileSync(file, "utf8"));
    let changed = false;
    for (const box of Object.values(boxes)) {
      for (const field of ["password", "refreshToken"]) {
        if (box[field] && !opens(box[field])) {
          box[field] = seal("demo");
          changed = true;
        }
      }
    }
    if (changed) fs.writeFileSync(file, JSON.stringify(boxes, null, 2), { mode: 0o600 });
  };
  return { seal, repair };
}

const WORDS = {
  en: {
    project: "Harbor Supply",
    description: "Invoices, orders, and the morning check-in.",
    secret: "portal-password",
    secretNote: "Harbor Supply portal password",
    mailbox: "me@example.com",
    checkin: { name: "Morning check-in", description: "Says hello every morning." },
    invoices: { name: "Weekday invoice run", description: "Harbor Supply invoices into Ledger every weekday, then a summary by email." },
    backup: { name: "Nightly backup check", description: "Confirms last night's backup landed." },
    steps: {
      collect: "Collect new invoices",
      enter: "Enter them in Ledger",
      save: "Save them in Ledger",
      summary: "Email me a summary",
      approval: "Save these bills in Ledger? Check the before-save screenshot.",
    },
    lines: ["HS-20418  2026-10-02  1240.00", "HS-20422  2026-10-02  2318.50", "HS-20431  2026-10-03  624.00"],
    entered: "3 bills entered in Ledger, not saved yet",
    saved: "3 bills saved",
    sent: "Sent to me@example.com",
    ready: "Kitewell is ready.",
    missing: "Backup folder D:\\Backups\\nightly was not found",
  },
  ja: {
    project: "みなと資材",
    description: "請求書、注文、そして朝のチェック。",
    secret: "portal-password",
    secretNote: "みなと資材ポータルのパスワード",
    mailbox: "me@example.com",
    checkin: { name: "朝のチェック", description: "毎朝あいさつします。" },
    invoices: { name: "平日の請求書処理", description: "みなと資材の請求書を毎平日、台帳に入力し、概要をメールで送ります。" },
    backup: { name: "夜間バックアップ確認", description: "昨夜のバックアップが保存されたか確かめます。" },
    steps: {
      collect: "新しい請求書を集める",
      enter: "台帳に入力する",
      save: "台帳に保存する",
      summary: "概要をメールで送る",
      approval: "この伝票を台帳に保存しますか？保存前のスクリーンショットを確認してください。",
    },
    lines: ["MS-20418  2026-10-02  124000", "MS-20422  2026-10-02  231850", "MS-20431  2026-10-03  62400"],
    entered: "台帳に伝票を3件入力（未保存）",
    saved: "伝票を3件保存しました",
    sent: "me@example.com に送信しました",
    ready: "Kitewell is ready.",
    missing: "バックアップ用フォルダー D:\\Backups\\nightly が見つかりません",
  },
};

const echo = (text) => `echo "${text}"`;
// Each step is one line joined with semicolons, which both shells accept. A
// multi-line script with Japanese in it is handed to Windows PowerShell as a
// file it reads in the wrong encoding, and the run fails to parse.
const line = (...parts) => parts.join("; ");

export const specs = (w) => ({
  checkin: `type: graph
description: ${w.checkin.description}
steps:
  - id: hello
    name: ${w.checkin.name}
    run: ${echo(w.ready)}
`,
  invoices: `type: graph
description: ${w.invoices.description}
schedule: "0 9 * * 1-5"
steps:
  - id: collect
    name: ${w.steps.collect}
    run: ${line("sleep 3", ...w.lines.map(echo))}
  - id: enter
    name: ${w.steps.enter}
    depends: [collect]
    run: ${line("sleep 2", echo(w.entered))}
    approval:
      prompt: ${w.steps.approval}
  - id: save
    name: ${w.steps.save}
    depends: [enter]
    run: ${line("sleep 2", echo(w.saved))}
  - id: summary
    name: ${w.steps.summary}
    depends: [save]
    run: ${line("sleep 1", echo(w.sent))}
`,
  backup: `type: graph
description: ${w.backup.description}
steps:
  - id: check
    name: ${w.backup.name}
    run: ${line(echo(w.missing), "exit 1")}
`,
});

// words gives a scene the names the seed used, in the page's language.
export const words = (lang) => WORDS[lang];

export async function seed({ page, base, lang, dataDir, t, api, until }) {
  const w = WORDS[lang];
  await page.goto(base, { waitUntil: "networkidle" });
  // A fresh service shows the choice to start without an account; a seeded
  // one opens its project.
  const start = page.getByRole("button", { name: await t("Start on this device") });
  if (await start.count()) {
    await start.click();
    await page.waitForTimeout(2000);
    await page.getByRole("button", { name: await t("Skip tour") }).click().catch(() => {});
  }
  const project = (await api("/projects")).body.projects[0];
  if (project.name !== w.project) {
    await api(`/projects/${project.id}`, {
      method: "PATCH",
      headers: { "If-Match": `"${project.version}"` },
      body: JSON.stringify({ name: w.project, description: w.description }),
    });
  }
  const secrets = (await api("/secrets")).body ?? [];
  const has = (ref) => (Array.isArray(secrets) ? secrets : secrets.secrets ?? []).some((s) => s.ref === ref);
  if (!has(w.secret)) await api("/secrets", { method: "POST", body: JSON.stringify({ ref: w.secret, description: w.secretNote, value: "demo-password" }) });
  if (!has("openrouter-key")) await api("/secrets", { method: "POST", body: JSON.stringify({ ref: "openrouter-key", value: "sk-or-demo" }) });
  await api("/agents/claude", { method: "PUT", body: JSON.stringify({ name: "Claude Sonnet", kind: "api", provider: "openrouter", model: "anthropic/claude-sonnet-5.5", apiKeyRef: "openrouter-key" }) });
  // A mailbox that is connected on paper: its record is written straight into
  // the data folder, since connecting one for real asks a live server. The
  // password is sealed under the device's mail key, as the app seals every
  // mailbox credential; a record it cannot open is refused, not listed.
  if (dataDir) {
    const seal = mailSealer(dataDir);
    const file = path.join(dataDir, "device", project.id, "mail.json");
    if (!fs.existsSync(file)) {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(
        file,
        JSON.stringify({ [w.mailbox]: { provider: "imap", imap: { host: "imap.example.com", port: 993, security: "tls" }, smtp: { host: "smtp.example.com", port: 465, security: "tls" }, password: seal.seal("demo"), state: "connected", connectedAt: new Date().toISOString() } }),
        { mode: 0o600 },
      );
    } else {
      seal.repair(file);
    }
  }
  const jobs = (await api("/jobs")).body ?? [];
  const byName = (name) => jobs.find((j) => j.name === name);
  const s = specs(w);
  const made = {};
  for (const key of ["checkin", "invoices", "backup"]) {
    const existing = byName(w[key].name);
    made[key] = existing ?? (await api("/jobs", { method: "POST", body: JSON.stringify({ name: w[key].name, description: w[key].description, spec: s[key], enabled: true }) })).body;
  }
  // One run of each, so the lists have history: the check-in succeeds, the
  // backup check fails, and the invoice run stops at its approval and is
  // approved, all once.
  const runs = (await api("/runs")).body;
  const history = Array.isArray(runs) ? runs : runs?.runs ?? [];
  const ran = (id) => history.some((r) => r.jobId === id);
  if (!ran(made.checkin.id)) await api(`/jobs/${made.checkin.id}/run`, { method: "POST", body: "{}" });
  if (!ran(made.backup.id)) await api(`/jobs/${made.backup.id}/run`, { method: "POST", body: "{}" });
  // The invoice run stops at its approval; the seed approves it the way the
  // page would, through the run's own route, and waits for it to finish.
  const invoiceRuns = () => api("/runs").then((r) => (Array.isArray(r.body) ? r.body : r.body?.runs ?? []).filter((x) => x.jobId === made.invoices.id));
  if (!(await invoiceRuns()).length) await api(`/jobs/${made.invoices.id}/run`, { method: "POST", body: "{}" });
  const settled = ["succeeded", "failed", "cancelled", "partially_succeeded", "rejected"];
  await until(async () => {
    const [run] = await invoiceRuns();
    if (!run) return false;
    if (run.status === "waiting") await api(`/runs/${made.invoices.id}/${run.id}/approvals/enter/approve`, { method: "POST", body: "{}" });
    return settled.includes(run.status);
  }, 90_000, 2000);
  await page.waitForTimeout(2000);
}
