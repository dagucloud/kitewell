import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { localize } from "./lib/i18n.mjs";

// Starlight localizes the sidebar's documentation links, not its links to the
// rest of the site, so a translated page points those at its own language.
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const locale = route.locale;
  if (!locale) return;
  for (const entry of route.sidebar) {
    if (entry.type !== "group") continue;
    for (const item of entry.entries) {
      if (item.type === "link" && !item.href.startsWith(`/${locale}/`)) {
        item.href = localize(item.href, locale);
      }
    }
  }
});
