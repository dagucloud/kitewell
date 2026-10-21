import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import yaml from "js-yaml";
import { choreBySlug, chores, groups, needsFor } from "../src/lib/chores.mjs";
import { kindNames } from "../src/lib/kinds.mjs";

// The YAML action each step kind stands for, when it is an action step.
const actions = {
  agent: "harness.run",
  model: "chat.completion",
  decision: "decision.evaluate",
  browser: "browser.run",
  desktop: "computer.run",
  template: "template.render",
  api: "api.request",
  http: "http.request",
  ssh: "ssh.run",
  sftp: "sftp.upload",
  human: "human.task",
  subworkflow: "dag.run",
  router: "router.route",
  jq: "jq.filter",
};
// Families of actions that share a prefix, such as mail.search and mail.send.
const families = { "mail.": "email", "xlsx.": "excel", "file.": "file" };
const kindOf = (action) =>
  Object.keys(actions).find((kind) => actions[kind] === action) ??
  Object.entries(families).find(([prefix]) => action.startsWith(prefix))?.[1] ??
  null;
const workflow = (slug) => yaml.load(readFileSync(`src/workflows/${slug}.yaml`, "utf8"));

test("every chore is told in full in both languages", () => {
  const slugs = new Set();
  for (const chore of chores) {
    assert.match(chore.slug, /^[a-z0-9-]+$/, chore.slug);
    assert.ok(!slugs.has(chore.slug), `duplicate ${chore.slug}`);
    slugs.add(chore.slug);
    assert.ok(groups.includes(chore.group), `${chore.slug}: group`);
    const film = chore.film ?? {};
    for (const locale of ["en", "ja"]) {
      const copy = chore[locale];
      const where = `${chore.slug} ${locale}`;
      for (const field of ["when", "chore", "tally", "sentence"]) {
        assert.ok(copy[field]?.trim(), `${where}: ${field}`);
      }
      // A search title, when a chore has one, is given in both languages.
      if (chore.en.title || chore.ja.title) assert.ok(copy.title?.trim(), `${where}: title`);
      assert.ok(copy.motions.length >= 3, `${where}: motions`);
      assert.ok(copy.moment.title && copy.moment.text, `${where}: moment`);
      assert.ok(copy.good.length > 0, `${where}: good to know`);
      for (const [kind, name, detail] of copy.steps) {
        assert.ok(kindNames.includes(kind), `${where}: step kind ${kind}`);
        assert.ok(name.trim() && detail.trim(), `${where}: step text`);
      }
      // Each section shows either the film or a drawing of its own.
      assert.ok(film.after || copy.artifact, `${where}: what the person gets`);
      if (film.run) assert.ok(copy.run && copy.ok && film.ok, `${where}: film captions`);
      if (film.after) assert.ok(copy.after, `${where}: film caption after`);
      if (chore.film) assert.ok(copy.film, `${where}: film credit`);
      assert.equal(needsFor(chore, locale).length, chore.needs.length, `${where}: needs`);
    }
    assert.equal(chore.en.steps.length, chore.ja.steps.length, `${chore.slug}: step counts differ`);
    assert.equal(chore.en.motions.length, chore.ja.motions.length, `${chore.slug}: motion counts differ`);
  }
});

test("related chores exist and lead elsewhere", () => {
  for (const chore of chores) {
    assert.ok(chore.related.length > 0, chore.slug);
    for (const slug of chore.related) {
      assert.ok(choreBySlug(slug), `${chore.slug}: ${slug} is not a chore`);
      assert.notEqual(slug, chore.slug, `${chore.slug} lists itself`);
    }
  }
});

test("every film clip a chore plays is published in both languages", () => {
  for (const chore of chores) {
    for (const clip of Object.values(chore.film ?? {})) {
      for (const locale of ["en", "ja"]) {
        for (const extension of ["mp4", "webp"]) {
          const file = `public/videos/chores/${locale}/${clip}.${extension}`;
          assert.ok(existsSync(file), `${chore.slug}: ${file}`);
        }
      }
    }
  }
});

// The story must not promise a step the workflow behind it cannot take.
test("every chore is backed by a workflow that uses only documented actions", () => {
  for (const chore of chores) {
    const flow = workflow(chore.slug);
    assert.ok(Array.isArray(flow.steps) && flow.steps.length > 0, `${chore.slug}: steps`);
    const found = new Set();
    const visit = (steps) => {
      for (const step of steps) {
        assert.ok(step.id, `${chore.slug}: a step has no id`);
        if (step.action) found.add(step.action);
        if (step.approval) found.add("approval");
        if (step.foreach?.steps) visit(step.foreach.steps);
      }
    };
    visit(flow.steps);
    for (const action of found) {
      if (action === "approval") {
        assert.ok(chore.uses.includes("approval"), `${chore.slug}: approval is not listed`);
        continue;
      }
      const kind = kindOf(action);
      assert.ok(kind, `${chore.slug}: action ${action}`);
      assert.ok(chore.uses.includes(kind), `${chore.slug}: ${action} is not listed among its uses`);
    }
    // A chore that says it waits for approval has a gate in its workflow.
    const waits = chore.en.steps.some(([kind]) => kind === "approval");
    assert.equal(waits, found.has("approval"), `${chore.slug}: approval in story and workflow differ`);
    assert.equal(chore.scheduled, Boolean(flow.schedule), `${chore.slug}: schedule`);
  }
});

test("every workflow file tells a chore", () => {
  for (const file of readdirSync("src/workflows")) {
    assert.ok(choreBySlug(file.replace(/\.yaml$/, "")), `${file} has no chore`);
  }
});

// A request is pasted into a person's own chat, where the assistant can look
// things up on the web, so it names nothing an example made up: the
// companies, apps, folders, and addresses each example invents. Those names
// are read from the examples' own copy; what a person must fill in is a
// [placeholder].
const realNames = new Set([
  ...["AI", "API", "CI", "CSV", "Claude", "Claude Code", "Code", "Codex", "Excel", "GitHub", "Issue", "Kitewell"],
  ...["Markdown", "OK", "PDF", "PR", "Python", "SSH", "URL", "Web", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
]);
const placeholders = /\[[^\]]+\]/g;
// Capitalized names inside a sentence, not at its start.
const latinNames = (text) =>
  [...text.matchAll(/(?<![.!?:]\s|^)\b[A-Z][A-Za-z0-9]+(?: [A-Z][A-Za-z0-9]+)*/gm)].map(([name]) => name);
// Addresses, files, and folders written out.
const specifics = (text) => text.match(/\S+@\S+|https?:\/\/\S+|\b[\w-]+\.(?:com|app|net|org|io|xlsx|csv|md|pdf)\b|\w+\/\w+/g) ?? [];
// A Japanese example names its world before the site or portal it runs on,
// or, in kanji or katakana, right before the word for an app.
const japaneseNames = (text) => [
  ...[...text.matchAll(/(?<=^|[、。\s「])([ぁ-んァ-ヶ一-龠ー]+?)の(?:ポータル|サイト)/gm)].map(([, name]) => name),
  ...[...text.matchAll(/(?<=^|[、。\s「])([ァ-ヶ一-龠ー]+)アプリ/gm)].map(([, name]) => name),
];

// names says whether a text uses a name as a word of its own, not as part
// of a longer one: 報告 in バグ報告 is not the 報告 app.
const names = (text, name) =>
  new RegExp(`(?<![\\wァ-ヶ一-龠ー])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w])`).test(text);

test("each chore's request names nothing its example made up", () => {
  const madeUp = { en: new Set(), ja: new Set() };
  for (const chore of chores) {
    const copy = (locale) => [chore[locale].chore, chore[locale].sentence, ...chore[locale].motions, ...chore[locale].steps.flat()].join("\n");
    for (const name of latinNames(copy("en"))) if (!realNames.has(name)) madeUp.en.add(name);
    for (const name of japaneseNames(copy("ja"))) madeUp.ja.add(name);
  }
  // The examples' world, read back as a check that the reading works.
  for (const name of ["Harbor Supply", "Ledger", "Depot"]) assert.ok(madeUp.en.has(name), name);
  for (const name of ["みなと資材", "台帳"]) assert.ok(madeUp.ja.has(name), name);
  for (const chore of chores) {
    for (const locale of ["en", "ja"]) {
      const request = chore[locale].request;
      assert.ok(request, `${chore.slug} ${locale}: request`);
      const plain = request.replace(placeholders, "");
      assert.deepEqual(specifics(request), [], `${chore.slug} ${locale}: written-out address or file`);
      assert.deepEqual(latinNames(plain).filter((name) => !realNames.has(name)), [], `${chore.slug} ${locale}: unknown name`);
      for (const name of [...madeUp.en, ...madeUp.ja]) {
        assert.ok(!names(request, name), `${chore.slug} ${locale}: names ${name}`);
      }
    }
    assert.equal(
      chore.en.request.match(placeholders)?.length ?? 0,
      chore.ja.request.match(placeholders)?.length ?? 0,
      `${chore.slug}: both languages leave the same blanks`,
    );
  }
});
