import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { localize } from "./lib/i18n.mjs";
import japaneseFonts from "./styles/fonts-ja.css?url";

// Starlight localizes the sidebar's documentation links, not its links to the
// rest of the site, so a translated page points those at its own language.
export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const locale = route.locale;
  if (!locale) return;
  // As on the rest of the site, only Japanese pages link Noto Sans JP.
  if (locale === "ja") route.head.push({ tag: "link", attrs: { rel: "stylesheet", href: japaneseFonts } });
  for (const entry of route.sidebar) {
    if (entry.type !== "group") continue;
    for (const item of entry.entries) {
      if (item.type === "link" && !item.href.startsWith(`/${locale}/`)) {
        item.href = localize(item.href, locale);
      }
    }
  }
});
