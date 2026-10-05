import assert from "node:assert/strict";
import test from "node:test";
import { breakByPhrase, wrapsByPhrase } from "../src/lib/japanese.mjs";

const page = (body) => `<!DOCTYPE html><html lang="ja"><head><title>例</title></head><body>${body}</body></html>`;
// The places a line may break: each <wbr>, and each ordinary space.
const breaks = (html) =>
  html
    .match(/<p[^>]*>(.*?)<\/p>/s)[1]
    .replace(/<wbr>/g, "|")
    .replace(/ /g, "|")
    .replace(/&#160;/g, "\u00a0");

test("Japanese wraps between phrases, never inside a word", () => {
  const html = breakByPhrase(page("<p>1 つのワークフローに混ぜて使え、手動、スケジュール、または GitHub から開始できます。</p>"));
  const line = breaks(html);
  assert.match(line, /\|/);
  assert.ok(!line.includes("手|動"), line);
  assert.match(html, /<p class="phrases">/);
});

test("a Latin word or a number stays with what follows it", () => {
  const line = breaks(breakByPhrase(page("<p>Kitewell には、Dagu Cloud を通じて最大 20 台のデバイス（1 人あたり 3 台まで）と各 100 ワークフローがあります。</p>")));
  for (const kept of ["Kitewell\u00a0に", "Dagu\u00a0Cloud\u00a0を", "最大\u00a020\u00a0台", "1\u00a0人", "各\u00a0100\u00a0ワ"]) {
    assert.ok(line.includes(kept), `${kept} in ${line}`);
  }
});

test("a particle after a closing bracket does not start a line", () => {
  const line = breaks(breakByPhrase(page("<p>1 つの API キーまたは接続済みのアプリ（ChatGPT や Claude）での MCP と API アクセス</p>")));
  assert.ok(line.includes("）での"), line);
});

test("code, scripts, and the head are left as written", () => {
  const html = breakByPhrase(page('<p>次を実行します。<code>git push -u origin main</code></p><script>const 手動 = "a b";</script>'));
  assert.match(html, /<code>git push -u origin main<\/code>/);
  assert.match(html, /<script>const 手動 = "a b";<\/script>/);
  assert.match(html, /<title>例<\/title>/);
});

test("only Japanese site pages wrap by phrase", () => {
  assert.ok(wrapsByPhrase("/ja/"));
  assert.ok(wrapsByPhrase("/ja/pricing/"));
  assert.ok(!wrapsByPhrase("/ja/docs/email/"));
  assert.ok(!wrapsByPhrase("/examples/"));
  assert.ok(!wrapsByPhrase("/japan/"));
});
