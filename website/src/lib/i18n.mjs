// The site is in English at the root and in each other language under a
// folder of its own, such as /ja/. Every documentation page and the pages
// below have a version in each language; any other page is English only,
// whichever language links to it.

/** @typedef {(typeof locales)[number]} Locale */
export const locales = /** @type {const} */ (["en", "ja", "zh", "ko", "fr", "de"]);
// How each language names itself, tags its pages, and writes dates and
// numbers, as the app does.
export const languages = {
  en: { label: "English", lang: "en", og: "en_US", format: "en-US" },
  ja: { label: "日本語", lang: "ja", og: "ja_JP", format: "ja-JP" },
  zh: { label: "简体中文", lang: "zh-CN", og: "zh_CN", format: "zh-CN" },
  ko: { label: "한국어", lang: "ko", og: "ko_KR", format: "ko-KR" },
  fr: { label: "Français", lang: "fr", og: "fr_FR", format: "fr-FR" },
  de: { label: "Deutsch", lang: "de", og: "de_DE", format: "de-DE" },
};
// The recordings are made in English and Japanese; any other language shows
// the English ones.
export const recorded = /** @type {const} */ (["en", "ja"]);

const translatedPages = ["/", "/coding-agents/", "/pricing/", "/compare/", "/download/", "/releases/", "/support/", "/privacy/", "/terms/"];
// Every page under these paths is translated too.
const translatedSections = ["/docs/", "/examples/"];
// The terms and the privacy policy are published in Japanese and English
// only; every other language links to the English ones.
const legalPages = ["/privacy/", "/terms/"];
const legalLocales = ["en", "ja"];

/** @returns {Locale} */
export function localeOf(pathname) {
  return locales.find((locale) => locale !== "en" && (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))) ?? "en";
}

function translated(path, locale) {
  const page = path.split("#")[0];
  if (legalPages.includes(page)) return legalLocales.includes(locale);
  return translatedSections.some((section) => page.startsWith(section)) || translatedPages.includes(page);
}

// localize returns the link to an English path in the given language.
export function localize(path, locale) {
  return locale !== "en" && translated(path, locale) ? `/${locale}${path}` : path;
}

// counterparts returns the page in each language, or nothing for a page
// that exists in English only.
export function counterparts(pathname) {
  const locale = localeOf(pathname);
  const english = locale === "en" ? pathname : pathname.slice(locale.length + 1) || "/";
  const versions = locales.filter((l) => translated(english, l));
  return versions.length > 1 ? Object.fromEntries(versions.map((l) => [l, localize(english, l)])) : null;
}

// translations is the static paths of a page's versions under /LANG/.
export function translations() {
  return pathsFor(locales.filter((locale) => locale !== "en"));
}

// legalTranslations is the same for the terms and the privacy policy.
export function legalTranslations() {
  return pathsFor(locales.filter((locale) => locale !== "en" && legalLocales.includes(locale)));
}

/** @param {Locale[]} versions */
function pathsFor(versions) {
  return versions.map((locale) => ({ params: { lang: locale }, props: { locale } }));
}

// recording is the language of the videos and stills a page in locale shows.
/** @param {Locale} locale @returns {(typeof recorded)[number]} */
export function recording(locale) {
  return recorded.find((l) => l === locale) ?? "en";
}
