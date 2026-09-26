import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { localize } from "./lib/i18n.mjs";

// Starlight localizes the sidebar's documentation links, not its links to the
// rest of the site, so a Japanese page points those at their Japanese versions.
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  if (route.locale !== "ja") return;
  for (const entry of route.sidebar) {
    if (entry.type !== "group") continue;
    for (const item of entry.entries) {
      if (item.type === "link" && !item.href.startsWith("/ja/")) {
        item.href = localize(item.href, "ja");
      }
    }
  }
});
