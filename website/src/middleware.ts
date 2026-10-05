import { defineMiddleware } from "astro:middleware";
import { breakByPhrase, wrapsByPhrase } from "./lib/japanese.mjs";

// Japanese pages wrap between phrases, in development and in the built site.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (!wrapsByPhrase(context.url.pathname) || !response.headers.get("content-type")?.startsWith("text/html")) {
    return response;
  }
  return new Response(breakByPhrase(await response.text()), response);
});
