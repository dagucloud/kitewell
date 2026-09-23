# Kitewell

Build and run workflows on your own machine. Kitewell is a desktop app for
connecting scripts, APIs, containers, and AI agents in a visual editor. Schedule
runs and inspect the output of each step.

Import an OpenAPI spec, choose an operation, and fill in its request fields.
Pass response values to later workflow steps and reuse the connection across
workflows in the project.

Export a project to use it on another device, or enable API access on a
shared host. Each device needs its own tools and credentials.

**Public beta coming soon.** This repository contains the website,
documentation, support issues, and public releases.

- Website: https://kitewell.app
- Documentation: https://kitewell.app/docs/
- Downloads: https://kitewell.app/download/
- Releases: https://github.com/dagucloud/kitewell/releases
- Support: https://github.com/dagucloud/kitewell/issues

The first installers will support macOS 13+ on Apple Silicon and Intel.
Linux and Windows support is planned. No installers have been published yet.

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

## Deployment

The existing Cloudflare Pages project `runstead` serves `kitewell.app` and
`www.kitewell.app`. Its name is an internal project identity; the repository
rename does not require a new Worker or Wrangler configuration. Manage the Git
source and build settings in the Pages dashboard:

| Setting | Value |
| --- | --- |
| Target GitHub repository | `dagucloud/kitewell` |
| Production branch | `main` |
| Root directory | `website` |
| Build command | `npm run check && npm test && npm run build` |
| Build output directory | `dist` |
| Node version | 24, specified in `website/.node-version` |
