import assert from "node:assert/strict";
import { mock, test } from "node:test";
import { createAnalytics } from "../src/lib/analytics.ts";

function sdkStub() {
  return Object.fromEntries(
    [
      "init",
      "register",
      "capture",
      "opt_in_capturing",
      "opt_out_capturing",
      "stopSessionRecording",
    ].map((method) => [method, mock.fn()]),
  );
}

test("analytics is available only on production hosts", () => {
  const load = mock.fn(async () => sdkStub());
  for (const hostname of ["runstead.dev", "www.runstead.dev"]) {
    assert.equal(typeof createAnalytics(hostname, load), "function");
  }
  for (const hostname of [
    "localhost",
    "127.0.0.1",
    "runstead-5tx.pages.dev",
    "preview.runstead-5tx.pages.dev",
    "runstead.dev.example.com",
  ]) {
    assert.equal(createAnalytics(hostname, load), null);
  }
  assert.equal(load.mock.callCount(), 0);
});

test("the SDK does not load before consent or after a decline", async () => {
  const sdk = sdkStub();
  const load = mock.fn(async () => sdk);
  const setConsent = createAnalytics("runstead.dev", load);

  assert.equal(load.mock.callCount(), 0);
  await setConsent(false);
  assert.equal(load.mock.callCount(), 0);
  assert.equal(sdk.init.mock.callCount(), 0);
  assert.equal(sdk.capture.mock.callCount(), 0);
});

test("concurrent and repeated acceptance initialize and capture one pageview", async () => {
  const sdk = sdkStub();
  const pending = Promise.withResolvers();
  const load = mock.fn(() => pending.promise);
  const setConsent = createAnalytics("runstead.dev", load);
  const first = setConsent(true);
  const second = setConsent(true);

  assert.equal(load.mock.callCount(), 1);
  pending.resolve(sdk);
  await Promise.all([first, second]);
  await setConsent(true);

  assert.equal(sdk.init.mock.callCount(), 1);
  assert.equal(sdk.opt_in_capturing.mock.callCount(), 1);
  assert.deepEqual(sdk.opt_in_capturing.mock.calls[0].arguments, [
    { captureEventName: false },
  ]);
  assert.deepEqual(sdk.register.mock.calls[0].arguments, [
    { product: "runstead", surface: "website" },
  ]);
  assert.equal(sdk.capture.mock.callCount(), 1);
  assert.deepEqual(sdk.capture.mock.calls[0].arguments, ["$pageview"]);
  const options = sdk.init.mock.calls[0].arguments[1];
  assert.equal(options.capture_pageview, false);
  assert.equal(options.opt_out_capturing_by_default, true);
  assert.equal(options.opt_out_persistence_by_default, true);
  assert.equal(options.disable_session_recording, true);
});

test("withdrawal stops capture; accepting again does not duplicate the pageview", async () => {
  const sdk = sdkStub();
  const setConsent = createAnalytics("runstead.dev", async () => sdk);
  await setConsent(true);
  await setConsent(false);

  assert.equal(sdk.stopSessionRecording.mock.callCount(), 1);
  assert.equal(sdk.opt_out_capturing.mock.callCount(), 1);
  await setConsent(true);
  assert.equal(sdk.init.mock.callCount(), 1);
  assert.equal(sdk.opt_in_capturing.mock.callCount(), 2);
  assert.equal(sdk.capture.mock.callCount(), 1);
});

test("declining while the SDK loads prevents initialization and capture", async () => {
  const sdk = sdkStub();
  const pending = Promise.withResolvers();
  const setConsent = createAnalytics("runstead.dev", () => pending.promise);
  const accepting = setConsent(true);
  await setConsent(false);
  pending.resolve(sdk);
  await accepting;

  assert.equal(sdk.init.mock.callCount(), 0);
  assert.equal(sdk.opt_in_capturing.mock.callCount(), 0);
  assert.equal(sdk.capture.mock.callCount(), 0);

  await setConsent(true);
  assert.equal(sdk.init.mock.callCount(), 1);
  assert.equal(sdk.capture.mock.callCount(), 1);
});

test("a failed SDK import can be retried after consent", async () => {
  const sdk = sdkStub();
  const failure = new Error("SDK unavailable");
  let attempts = 0;
  const setConsent = createAnalytics("runstead.dev", async () => {
    if (++attempts === 1) throw failure;
    return sdk;
  });

  await assert.rejects(setConsent(true), failure);
  assert.equal(sdk.init.mock.callCount(), 0);
  assert.equal(sdk.capture.mock.callCount(), 0);
  await setConsent(true);
  assert.equal(attempts, 2);
  assert.equal(sdk.init.mock.callCount(), 1);
  assert.equal(sdk.capture.mock.callCount(), 1);
});
