# Runstead

A visual home for your workflows. Connect Docker containers, commands across
server groups, AI agents, and human approvals. Run, schedule, and inspect
every step from your own machine, then share the project with your other
devices, teammates, or organization.

**Public beta coming soon.** This repository contains the website, customer
documentation, support issues, and public release materials. Runstead's
application source is private; this is not an application build checkout.

- Website: https://runstead.dev
- Documentation: https://runstead.dev/docs/
- Downloads: https://runstead.dev/download/
- Support: https://github.com/dagucloud/runstead/issues

macOS 13+ on Apple Silicon and Intel is the initial target. Linux and Windows
support is planned. One project is free; planned Pro pricing is $15/month for
up to ten projects. No installers have been published yet.

## Website development

Requires Node 24 and npm. From this checkout:

```sh
cd website
npm ci
npm run dev
```

Before pushing:

```sh
npm run check
npm test
npm run build
```

The website uses Astro for marketing pages and Starlight for documentation.
Docs are Markdown under `website/src/content/docs/docs/`; the nested `docs`
segment preserves the public `/docs/` route. Published Markdown notes live in
`releases/`. The build checks internal links, including documentation anchors.

## Cloudflare Pages

Connect only this public repository to Cloudflare Pages:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Root directory | `website` |
| Node version | `24` (also pinned in `.node-version`) |
| Build command | `npm run check && npm test && npm run build` |
| Output directory | `dist` |

Add `runstead.dev` and `www.runstead.dev` as custom domains through Pages.
The existing Cloudflare zone hosts DNS. The website redirects `www` to the
canonical apex. `_headers` marks Pages previews as noindex and disables caching
of the update feed. Site changes deploy from `main`; pull requests receive
Cloudflare preview deployments. No Cloudflare token is stored in this repo.

Verify HTTPS, the www redirect, documentation search, mobile layout, and a
missing URL after deployment. Before the first release, the update URL returns
404 and the download page shows that the beta is coming soon.

## Releases

Application signing and publication run from the private source checkout on
the release Mac. This repo contains no signing keys or release credentials.

The permanent app feed is:
https://runstead.dev/updates/macos/latest.json

The publisher uploads verified installers, SHA256 files, notes, and the
required third-party source materials to a GitHub prerelease. Only after
anonymous downloads are verified does it commit a numeric release note and
`website/public/updates/macos/latest.json` here. The website reads that same
manifest to render download links. Public tags such as `v0.16.0` reference this
repository's history, never private application commits.

Never replace a published installer. A corrected build needs a new version.
A failed upload leaves the current feed unchanged. If deployment fails after
publication, correct or retry the deployment; keep the preceding feed live
until the new assets are verified. Revert the manifest to a previous verified
release to withdraw an update; this does not downgrade installed apps.

Before the first binary release, finalize privacy and proprietary terms, and
confirm corresponding-source distribution for Dagu and other components.
Unapproved legal drafts stay in the private repository. Third-party notices
retain their original licenses; publishing this repo grants no license to the
Runstead application source.
