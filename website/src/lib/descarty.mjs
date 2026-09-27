// Descarty, Inc. publishes Kitewell. Its site is Japanese at the root and
// English under /en/.
export function descartyUrl(locale, path = "/") {
  return locale === "ja" ? `https://descarty.com${path}` : `https://descarty.com/en${path}`;
}
