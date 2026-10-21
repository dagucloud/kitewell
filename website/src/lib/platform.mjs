// Which computer a visitor is on, so the site can offer the one installer
// that fits it. Kitewell runs on Mac and Windows; another desktop is told so,
// and a phone or tablet is offered a way to send the link to a computer.

// detectPlatform reads what the browser says about itself: the user agent,
// and navigator.userAgentData's platform and architecture where the browser
// has them. A Mac whose chip is not known is taken to be Apple silicon. The
// site's head runs this function from its source text, so it uses nothing
// from outside itself.
export function detectPlatform({ userAgent = "", uaPlatform = "", maxTouchPoints = 0, architecture = "" } = {}) {
  if (/iPhone|iPad|iPod|Android|Mobile/.test(userAgent) || uaPlatform === "Android" || uaPlatform === "iOS") {
    return { os: "mobile", arch: null };
  }
  if (uaPlatform === "macOS" || /Macintosh/.test(userAgent)) {
    // An iPad asks for desktop sites as a Mac; a Mac has no touch screen.
    if (maxTouchPoints > 0) return { os: "mobile", arch: null };
    return { os: "mac", arch: architecture === "x86" ? "amd64" : "arm64" };
  }
  if (uaPlatform === "Windows" || /Windows NT/.test(userAgent)) {
    return { os: "windows", arch: architecture === "arm" ? "arm64" : "amd64" };
  }
  return { os: "desktop-other", arch: null };
}

// Each system's feed in readReleases(), and the download each chip takes.
const feeds = {
  mac: { release: "macos", downloads: { arm64: "darwin-arm64", amd64: "darwin-amd64" } },
  windows: { release: "windows", downloads: { amd64: "windows-amd64" } },
};

// pickDownload returns the published installer for a platform, or null when
// none fits it: an unpublished system, or a chip no installer is built for.
export function pickDownload(releases, { os, arch }) {
  const feed = feeds[os];
  const release = feed && releases[feed.release];
  const key = feed?.downloads[arch];
  const download = release && key ? release.downloads[key] : undefined;
  return download ? { key, version: release.version, url: download.url, sha256: download.sha256 } : null;
}
