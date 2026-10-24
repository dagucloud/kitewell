// Language detection. A visitor on an English page is sent to its version in
// the first language their browser prefers that the site is written in. A
// language chosen with the language menu is remembered in a cookie and wins
// over the browser, every way. Pages name their versions with hreflang
// links, and a page without one is left alone. Loaded in the head, after
// those links, so the visitor is moved before anything is drawn.
(function () {
  // Each language's code, as the site's folders and the cookie name it, and
  // its tag, as hreflang names it (src/lib/i18n.mjs).
  var tags = { en: "en", ja: "ja", zh: "zh-CN", ko: "ko", fr: "fr", de: "de" };
  var codeOfPath = function (pathname) {
    var first = pathname.split("/")[1];
    return Object.prototype.hasOwnProperty.call(tags, first) && first !== "en" ? first : "en";
  };
  var codeOfTag = function (tag) {
    for (var code in tags) if (tags[code].toLowerCase() === String(tag).toLowerCase()) return code;
    return "";
  };
  var versionIn = function (code) {
    return document.querySelector('link[rel="alternate"][hreflang="' + tags[code] + '"]');
  };
  var page = codeOfPath(location.pathname);
  var chosen = (document.cookie.match(/(?:^|;\s*)lang=([a-z]{2})(?:;|$)/) || [])[1];
  var want = tags[chosen] ? chosen : "";
  if (!want && page === "en") {
    var preferred = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < preferred.length; i++) {
      var primary = String(preferred[i]).toLowerCase().split("-")[0];
      if (tags[primary]) {
        want = primary;
        break;
      }
    }
  }
  if (want && want !== page) {
    var link = versionIn(want);
    if (link) {
      location.replace(new URL(link.href).pathname + location.search + location.hash);
      return;
    }
  }
  var remember = function (code) {
    document.cookie = "lang=" + code + "; path=/; max-age=31536000; samesite=lax";
  };
  document.addEventListener("click", function (event) {
    var a = event.target.closest && event.target.closest("a[hreflang]");
    var code = a && codeOfTag(a.getAttribute("hreflang"));
    if (code) remember(code);
  });
  // The docs' own language picker is a select of page addresses.
  document.addEventListener("change", function (event) {
    var select = event.target;
    if (select.closest && select.closest("starlight-lang-select")) remember(codeOfPath(new URL(select.value, location.href).pathname));
  });
})();
