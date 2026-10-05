import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { readEvents } from "../src/lib/plan-events.mjs";
import { jsonFields, sse } from "../src/lib/plan-stream.mjs";

const sketch = {
  fit: "yes",
  title: "Friday timesheets",
  when: "Every Friday at 17:00",
  steps: [
    { kind: "website", name: "Export the timesheets", detail: "Signs in to the HR site and downloads this week's sheet.", you: null },
    { kind: "approval", name: "Wait for your OK", detail: "Shows the hours before they go anywhere.", you: "Approve the hours" },
    { kind: "excel", name: "Add the hours to payroll", detail: 'Writes each person\'s hours into "Payroll.xlsx".', you: null },
  ],
  moment: "Waiting for you: add 126 hours to Payroll.xlsx?",
  sentence: "Every Friday at 5 pm, export the timesheets and add the hours to Payroll.xlsx after I approve.",
  needs: ["Google Chrome", "An Anthropic, OpenAI, or Gemini model"],
  leaves: "The website step sends page text to your model; your password never reaches it.",
  caveats: [],
  note: null,
};
const sketchText = JSON.stringify(sketch, null, 2);

// Feeds text to the scanner in pieces of every size, the way a stream does.
function scan(text, size) {
  const fields = {};
  const items = [];
  const push = jsonFields({ arrayKey: "steps", onField: (key, value) => (fields[key] = value), onItem: (item) => items.push(item) });
  for (let at = 0; at < text.length; at += size) push(text.slice(at, at + size));
  return { fields, items };
}

test("a streamed sketch arrives field by field and step by step, whatever the chunking", () => {
  const { steps, ...rest } = sketch;
  for (const size of [1, 2, 3, 7, 64, sketchText.length]) {
    const { fields, items } = scan(sketchText, size);
    assert.deepEqual(fields, rest, `chunks of ${size}`);
    assert.deepEqual(items, steps, `chunks of ${size}`);
  }
});

test("compact JSON scans the same as indented JSON", () => {
  const { fields, items } = scan(JSON.stringify(sketch), 5);
  assert.equal(fields.note, null);
  assert.deepEqual(fields.caveats, []);
  assert.equal(items.length, 3);
});

test("server-sent events read back across chunk boundaries", async () => {
  const wire = sse("field", { key: "fit", value: "yes" }) + sse("step", sketch.steps[0]) + sse("done", {});
  const bytes = new TextEncoder().encode(wire);
  const body = new ReadableStream({
    start(controller) {
      for (let at = 0; at < bytes.length; at += 9) controller.enqueue(bytes.slice(at, at + 9));
      controller.close();
    },
  });
  const events = [];
  for await (const message of readEvents(body)) events.push(message);
  assert.deepEqual(
    events.map((message) => message.event),
    ["field", "step", "done"],
  );
  assert.deepEqual(events[1].data, sketch.steps[0]);
});

// The endpoint, against a stand-in for the Anthropic API that streams the
// sketch above as structured output.
let server;
let onRequestPost;
const seen = [];

before(async () => {
  server = createServer((request, response) => {
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => {
      seen.push(JSON.parse(body));
      response.writeHead(200, { "content-type": "text/event-stream" });
      const event = (type, data) => response.write(`event: ${type}\ndata: ${JSON.stringify({ type, ...data })}\n\n`);
      event("message_start", {
        message: { id: "msg_1", type: "message", role: "assistant", model: "claude-opus-5-5", content: [], stop_reason: null, stop_sequence: null, usage: { input_tokens: 10, output_tokens: 1 } },
      });
      event("content_block_start", { index: 0, content_block: { type: "text", text: "" } });
      for (let at = 0; at < sketchText.length; at += 40) {
        event("content_block_delta", { index: 0, delta: { type: "text_delta", text: sketchText.slice(at, at + 40) } });
      }
      event("content_block_stop", { index: 0 });
      event("message_delta", { delta: { stop_reason: "end_turn", stop_sequence: null }, usage: { output_tokens: 300 } });
      event("message_stop", {});
      response.end();
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  process.env.ANTHROPIC_BASE_URL = `http://127.0.0.1:${server.address().port}`;
  // A data center's cache, as Cloudflare provides it to functions.
  const store = new Map();
  globalThis.caches = {
    default: {
      match: async (request) => store.get(request.url)?.clone(),
      put: async (request, response) => void store.set(request.url, response),
    },
  };
  ({ onRequestPost } = await import("../functions/api/plan.js"));
});

after(() => server.close());

const site = "https://kitewell.app";
function call(body, { origin = site, env = { ANTHROPIC_API_KEY: "test-key" }, address = "192.0.2.1" } = {}) {
  const pending = [];
  const request = new Request(`${site}/api/plan`, {
    method: "POST",
    headers: { "content-type": "application/json", origin, "cf-connecting-ip": address },
    body: JSON.stringify(body),
  });
  return onRequestPost({ request, env, waitUntil: (promise) => pending.push(promise) });
}

test("a described chore streams back as a sketch", async () => {
  const response = await call({ chore: "Every Friday I export timesheets from our HR site into payroll.", locale: "ja" });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /text\/event-stream/);
  const fields = {};
  const steps = [];
  let done = false;
  for await (const message of readEvents(response.body)) {
    if (message.event === "field") fields[message.data.key] = message.data.value;
    if (message.event === "step") steps.push(message.data);
    if (message.event === "done") done = true;
  }
  assert.ok(done);
  assert.equal(fields.title, sketch.title);
  assert.equal(fields.moment, sketch.moment);
  assert.deepEqual(steps, sketch.steps);
  // The request names the page's language and wraps the visitor's words.
  const sent = seen.at(-1);
  assert.match(sent.messages[0].content, /^Language: Japanese/);
  assert.match(sent.messages[0].content, /<chore>\nEvery Friday I export/);
  assert.equal(sent.output_config.format.type, "json_schema");
});

test("the endpoint turns away what it should not sketch", async () => {
  const chore = "Every Friday I export timesheets from our HR site into payroll.";
  assert.equal((await call({ chore }, { env: {} })).status, 503);
  assert.equal((await call({ chore }, { origin: "https://elsewhere.example" })).status, 403);
  const short = await call({ chore: "help" });
  assert.equal(short.status, 400);
  assert.equal((await short.json()).code, "short");
  assert.equal((await call({ chore: "x".repeat(601) })).status, 400);
  assert.equal((await call({ chore }, { env: { ANTHROPIC_API_KEY: "k", TURNSTILE_SECRET_KEY: "s" } })).status, 403);
});

test("one address is slowed down after a burst of sketches", async () => {
  const chore = "Every Friday I export timesheets from our HR site into payroll.";
  const statuses = [];
  for (let i = 0; i < 14; i++) {
    const response = await call({ chore }, { address: "198.51.100.7" });
    statuses.push(response.status);
    if (response.ok) for await (const message of readEvents(response.body));
  }
  assert.deepEqual(statuses.slice(0, 12), Array(12).fill(200));
  assert.equal(statuses.at(-1), 429);
});
