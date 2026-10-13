// Visit statistics for kitewell.app. PostHog loads only after the page has
// finished loading, so it never competes with what a visitor came to read,
// and it records page views and the events named here, never clicks at
// large. Elsewhere, such as a preview build, nothing loads or is sent.
import type { PostHog } from "posthog-js";

type Properties = Record<string, string | number | boolean>;

const hosts = ["kitewell.app", "www.kitewell.app"];
let client: Promise<PostHog | null> | undefined;

const loaded = () =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete") resolve();
    else window.addEventListener("load", () => resolve(), { once: true });
  });

// start loads PostHog once per page and resolves to null where statistics
// are not kept.
export function start(): Promise<PostHog | null> {
  client ??= hosts.includes(window.location.hostname)
    ? loaded()
        .then(() => import("posthog-js"))
        .then(({ default: posthog }) => {
          posthog.init("phc_MqwcYt09eiG9BYkwCMLbYwL4yqgtDoyZqYnLRb5IZuT", {
            api_host: "https://us.i.posthog.com",
            defaults: "2026-05-30",
            person_profiles: "identified_only",
            capture_pageview: true,
            capture_pageleave: true,
            autocapture: false,
            capture_dead_clicks: false,
            capture_heatmaps: false,
            rageclick: false,
            disable_session_recording: true,
            disable_surveys: true,
            loaded(started) {
              started.register({ product: "kitewell", surface: "website" });
            },
          });
          return posthog;
        })
        .catch(() => null)
    : Promise.resolve(null);
  return client;
}

// track records one named event once statistics have started.
export function track(event: string, properties: Properties = {}) {
  void start().then((posthog) => posthog?.capture(event, properties));
}
