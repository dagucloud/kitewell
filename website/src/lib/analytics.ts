import type { PostHog } from "posthog-js";

type AnalyticsClient = Pick<
  PostHog,
  | "init"
  | "register"
  | "capture"
  | "opt_in_capturing"
  | "opt_out_capturing"
  | "stopSessionRecording"
>;

const PROJECT_TOKEN = "phc_MqwcYt09eiG9BYkwCMLbYwL4yqgtDoyZqYnLRb5IZuT";
const PRODUCTION_HOSTS = ["runstead.dev", "www.runstead.dev"];

export function createAnalytics(
  hostname: string,
  loadClient: () => Promise<AnalyticsClient> = async () =>
    (await import("posthog-js")).default,
) {
  if (!PRODUCTION_HOSTS.includes(hostname)) return null;

  let client: AnalyticsClient | undefined;
  let loading: Promise<AnalyticsClient> | undefined;
  let accepted = false;
  let capturing = false;
  let pageviewSent = false;

  return async (consent: boolean) => {
    accepted = consent;
    if (!accepted) {
      client?.stopSessionRecording();
      client?.opt_out_capturing();
      capturing = false;
      return;
    }

    try {
      const sdk = await (loading ??= loadClient());
      if (!accepted || capturing) return;

      if (!client) {
        sdk.init(PROJECT_TOKEN, {
          api_host: "https://us.i.posthog.com",
          defaults: "2026-05-30",
          person_profiles: "identified_only",
          capture_pageview: false,
          capture_pageleave: true,
          autocapture: true,
          disable_session_recording: true,
          disable_surveys: true,
          opt_out_capturing_by_default: true,
          opt_out_persistence_by_default: true,
        });
        client = sdk;
      }

      client.opt_in_capturing({ captureEventName: false });
      client.register({ product: "runstead", surface: "website" });
      if (!pageviewSent) {
        client.capture("$pageview");
        pageviewSent = true;
      }
      capturing = true;
    } catch (error) {
      loading = undefined;
      throw error;
    }
  };
}
