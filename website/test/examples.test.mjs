import assert from "node:assert/strict";
import test from "node:test";
import yaml from "js-yaml";
import { audiences, examples, kinds, labelsFor } from "../src/lib/examples.mjs";

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

test("every example is complete in both languages", () => {
  const slugs = new Set();
  for (const example of examples) {
    assert.match(example.slug, /^[a-z0-9-]+$/, example.slug);
    assert.ok(!slugs.has(example.slug), `duplicate ${example.slug}`);
    slugs.add(example.slug);
    assert.ok(audiences.includes(example.audience), `${example.slug}: audience`);
    for (const kind of example.steps) {
      assert.ok(kinds.includes(kind), `${example.slug}: step kind ${kind}`);
    }
    for (const locale of ["en", "ja"]) {
      const copy = example[locale];
      for (const field of ["title", "summary", "intro", "prompt"]) {
        assert.ok(copy[field]?.trim(), `${example.slug} ${locale}: ${field}`);
      }
      assert.ok(copy.steps.length > 0, `${example.slug} ${locale}: steps`);
      for (const [name, detail] of copy.steps) {
        assert.ok(name.trim() && detail.trim(), `${example.slug} ${locale}: step text`);
      }
      const labels = labelsFor(example, locale);
      assert.ok(labels.needs.length > 0 && labels.docs.length > 0, `${example.slug} ${locale}: labels`);
    }
    assert.equal(example.en.steps.length, example.ja.steps.length, `${example.slug}: step counts differ`);
  }
});

test("every workflow parses as YAML and uses only documented actions", () => {
  for (const example of examples) {
    const workflow = yaml.load(example.yaml);
    assert.ok(Array.isArray(workflow.steps) && workflow.steps.length > 0, `${example.slug}: steps`);
    const found = new Set();
    const visit = (steps) => {
      for (const step of steps) {
        assert.ok(step.id, `${example.slug}: a step has no id`);
        if (step.action) {
          found.add(step.action);
        }
        if (step.foreach?.steps) {
          visit(step.foreach.steps);
        }
      }
    };
    visit(workflow.steps);
    for (const action of found) {
      assert.ok(Object.values(actions).includes(action) || /^mail\./.test(action), `${example.slug}: action ${action}`);
    }
    // Every action the YAML uses is named among the example's step kinds.
    for (const action of found) {
      const kind = Object.keys(actions).find((key) => actions[key] === action) ?? (action.startsWith("mail.") ? "email" : null);
      assert.ok(example.steps.includes(kind), `${example.slug}: ${action} is not listed as a step kind`);
    }
  }
});
