# Runstead

A visual home for your workflows. Connect Docker containers, commands across
server groups, AI agents, and human approvals. Run, schedule, and inspect
every step from your own machine, then share the project with your other
devices, teammates, or organization.

**Public beta coming soon.** This repository contains the website,
documentation, support issues, and public releases.

- Website: https://runstead.dev
- Documentation: https://runstead.dev/docs/
- Downloads: https://runstead.dev/download/
- Releases: https://github.com/dagucloud/runstead/releases
- Support: https://github.com/dagucloud/runstead/issues

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
