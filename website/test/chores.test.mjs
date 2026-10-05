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
};
const kindOf = (action) => Object.keys(actions).find((kind) => actions[kind] === action) ?? (action.startsWith("mail.") ? "email" : null);
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
