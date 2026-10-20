// Language detection. A visitor whose browser prefers Japanese is sent from an
// English page to its Japanese counterpart. A language chosen with the
// language link is remembered in a cookie and wins over the browser, both
// ways. Pages name their counterparts with hreflang links, and a page without
// one is left alone. Loaded in the head, after those links, so the visitor is
// moved before anything is drawn.
(function () {
  var page = document.documentElement.lang === "ja" ? "ja" : "en";
  var chosen = (document.cookie.match(/(?:^|;\s*)lang=(en|ja)(?:;|$)/) || [])[1];
  var preferred = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  var want = chosen || (page === "en" && /^ja\b/i.test(preferred) ? "ja" : "");
  if (want && want !== page) {
    var link = document.querySelector('link[rel="alternate"][hreflang="' + want + '"]');
    if (link) {
      location.replace(new URL(link.href).pathname + location.search + location.hash);
      return;
    }
  }
  var remember = function (lang) {
    document.cookie = "lang=" + lang + "; path=/; max-age=31536000; samesite=lax";
  };
  document.addEventListener("click", function (event) {
    var a = event.target.closest && event.target.closest("a[hreflang]");
    if (a && /^(en|ja)$/.test(a.getAttribute("hreflang"))) remember(a.getAttribute("hreflang"));
  });
  // The docs' own language picker is a select of page addresses.
  document.addEventListener("change", function (event) {
    var select = event.target;
    if (select.closest && select.closest("starlight-lang-select")) remember(/^\/ja(\/|$)/.test(new URL(select.value, location.href).pathname) ? "ja" : "en");
  });
})();
