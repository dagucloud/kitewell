// The site is in English at the root and in Japanese under /ja/. Every
// documentation page and the pages below have a Japanese version; any other
// page is English only, whichever language links to it.
const translatedPages = ["/", "/pricing/", "/download/", "/releases/", "/support/"];

export function localeOf(pathname) {
  return pathname === "/ja" || pathname.startsWith("/ja/") ? "ja" : "en";
}

function hasJapanese(path) {
  const page = path.split("#")[0];
  return page === "/docs/" || page.startsWith("/docs/") || translatedPages.includes(page);
}

// localize returns the link to an English path in the given language.
export function localize(path, locale) {
  return locale === "ja" && hasJapanese(path) ? `/ja${path}` : path;
}

// counterparts returns the page in each language, or nothing for a page
// that exists in English only.
export function counterparts(pathname) {
  const english = localeOf(pathname) === "ja" ? pathname.slice("/ja".length) || "/" : pathname;
  return hasJapanese(english) ? { en: english, ja: `/ja${english}` } : null;
}
