// POST /api/plan: sketches how Kitewell would run a chore a visitor describes.
// The sketch streams back as server-sent events so its steps appear one by
// one. Nothing the visitor types is stored.
//
// Settings (Cloudflare Pages):
//   ANTHROPIC_API_KEY     required; without it the endpoint answers 503.
//   TURNSTILE_SECRET_KEY  optional; when set, every request needs a passed
//                         Turnstile check (PUBLIC_TURNSTILE_SITE_KEY at build).
//   ANTHROPIC_BASE_URL    optional; sends requests through a gateway, such as
//                         Cloudflare AI Gateway, instead of straight to the API.

import Anthropic from "@anthropic-ai/sdk";
import { kindNames } from "../../src/lib/kinds.mjs";
import { planRequest, planSchema, systemPrompt } from "../../src/lib/plan-prompt.mjs";
import { jsonFields, sse } from "../../src/lib/plan-stream.mjs";

const MODEL = "claude-opus-5-5";
const SHORTEST = 20;
const LONGEST = 600;
// Sketches one address may ask for in an hour, counted per data center.
const HOURLY_LIMIT = 12;
const MAX_STEPS = 8;
const MAX_TEXT = 400;

const reply = (status, code) =>
  new Response(JSON.stringify({ code }), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export async function onRequestPost({ request, env, waitUntil }) {
  if (!env.ANTHROPIC_API_KEY) return reply(503, "offline");
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin) return reply(403, "forbidden");

  let body;
  try {
    body = await request.json();
  } catch {
    return reply(400, "failed");
  }
  const chore = typeof body?.chore === "string" ? body.chore.trim() : "";
  const locale = body?.locale === "ja" ? "ja" : "en";
  if (chore.length < SHORTEST) return reply(400, "short");
  if (chore.length > LONGEST) return reply(400, "long");

  const address = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (env.TURNSTILE_SECRET_KEY && !(await passedCheck(env.TURNSTILE_SECRET_KEY, body.token, address))) {
    return reply(403, "check");
  }
  if (await overLimit(origin, address)) return reply(429, "busy");

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  // A visitor who leaves mid-sketch closes the stream; later writes are dropped.
  const send = (event, data) => writer.write(encoder.encode(sse(event, data))).catch(() => {});
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, baseURL: env.ANTHROPIC_BASE_URL || undefined });
  waitUntil(stream(client, chore, locale, send).finally(() => writer.close().catch(() => {})));

  return new Response(readable, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

async function stream(client, chore, locale, send) {
  const scanner = () =>
    jsonFields({
      arrayKey: "steps",
      onField: (key, value) => send("field", { key, value: tidy(value) }),
      onItem: (step) => {
        steps += 1;
        if (steps <= MAX_STEPS) send("step", tidyStep(step));
      },
    });
  let push = scanner();
  let steps = 0;
  try {
    const response = client.beta.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low", format: { type: "json_schema", schema: planSchema } },
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: planRequest(chore, locale) }],
    });
    for await (const event of response) {
      if (event.type === "content_block_start" && event.content_block.type === "fallback") {
        // Another model takes over and starts the sketch again.
        push = scanner();
        steps = 0;
        await send("reset", {});
      } else if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        push(event.delta.text);
      }
    }
    const message = await response.finalMessage();
    if (message.stop_reason === "refusal") return send("error", { code: "refused" });
    if (message.stop_reason === "max_tokens") return send("error", { code: "failed" });
    await send("done", {});
  } catch (error) {
    console.error("plan failed", error instanceof Anthropic.APIError ? `${error.status ?? "no response"} ${error.message}` : error);
    const busy = error instanceof Anthropic.RateLimitError || error instanceof Anthropic.InternalServerError;
    await send("error", { code: busy ? "busy" : "failed" });
  }
}

function tidyStep(step) {
  return {
    kind: kindNames.includes(step.kind) ? step.kind : "script",
    name: tidy(step.name),
    detail: tidy(step.detail),
    you: step.you ? tidy(step.you) : null,
  };
}

// Model text is shown as text, never markup; this only bounds its length.
function tidy(value) {
  if (typeof value === "string") return value.slice(0, MAX_TEXT);
  if (Array.isArray(value)) return value.slice(0, 5).map(tidy);
  return value;
}

async function passedCheck(secret, token, address) {
  if (typeof token !== "string" || !token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  form.append("remoteip", address);
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  return result.ok && (await result.json()).success === true;
}

// A best-effort count kept in the data center's cache: enough to slow one
// address down, not a guarantee across the network.
async function overLimit(origin, address) {
  const hour = Math.floor(Date.now() / 3_600_000);
  const key = new Request(`${origin}/__plan-limit/${encodeURIComponent(address)}/${hour}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  const count = hit ? Number(await hit.text()) : 0;
  if (count >= HOURLY_LIMIT) return true;
  await cache.put(key, new Response(String(count + 1), { headers: { "cache-control": "max-age=3600" } }));
  return false;
}
