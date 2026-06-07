# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A statically-exported Next.js 15 (App Router) site for browsing, sharing, and generating Slack themes. It renders a Slack-clone UI as a live preview. Deployed to GitHub Pages at https://slack.michaeldemar.co. There is no server runtime — no API routes, no SSR at request time, no dynamic functions. Everything is prerendered to `out/`.

## Commands

- `npm run dev` — dev server (Turbopack) at http://localhost:3000
- `npm run lint` — ESLint (`next lint`)
- `npm run build` — full production pipeline (see below)
- `npm run generate:og` — regenerate per-theme OG images only
- `npm run serve` — serve the built `out/` dir locally

There is **no test suite** (no test runner is configured). Verify changes by building and inspecting the exported HTML in `out/`, or by running `npm run dev`. There is no typecheck script; run `npx tsc --noEmit` directly.

Node version is pinned via `.nvmrc` (`lts/jod`, i.e. Node 22); CI runs Node 20.

### The build pipeline and its env requirement

`npm run build` chains npm lifecycle scripts in this order:

1. `prebuild` → `scripts/notion.js`: fetches all themes from a Notion database and **overwrites `src/data/themes.json`**. Requires `NOTION_KEY` and `NOTION_DATABASE_ID` env vars (via `.env` / dotenv). Without them this step exits 1 and the whole build fails.
2. `build` → `npm run generate:og && next build`: generates per-theme OG images into `public/og/themes/`, then statically exports to `out/`.
3. `postbuild` → `next-sitemap`: writes `out/sitemap.xml` (configured via `next-sitemap.config.cjs`; `outDir` must stay `./out` so the sitemap lands in the deployed artifact, not `public/`).

**To build locally without Notion credentials**, skip the lifecycle hooks and build against the committed `themes.json` snapshot:

```bash
npm run generate:og && npx next build && npx next-sitemap --config next-sitemap.config.cjs
```

(Running `npx next build` alone skips OG generation and the sitemap.)

## Architecture

### Data flow: Notion → JSON → processed themes

The source of truth is a Notion database. `scripts/notion.js` pulls it into `src/data/themes.json` as `RawTheme[]` (name + four hex colors + flags + submitter + tags). At import time, `src/data/themes.ts` maps each raw theme through `processTheme` (`src/lib/theme-utils.ts`) into the richer `Theme` type used everywhere. `processTheme` uses **chroma-js** to infer colors that aren't stored: readable text colors (contrast-based), sidebar hover/active states, and gradient endpoints. Slugs are derived from the name via `createSlug`. Types live in `src/types/theme.ts` (`RawTheme` → `Theme` → `ProcessedTheme`).

When changing theme color logic, edit `theme-utils.ts` — both the grid preview and the per-theme pages depend on its inferred colors and on `generateThemeString`/`describeTheme`.

### State: Zustand store with URL deep-linking

`src/store/theme-store.ts` is the single client store: `themes`, `currentTheme`, `filteredThemes`, `searchQuery`, `activeTag`. It syncs selection to the URL: `?theme=<slug>` and `?tag=<tag>` via `history.replaceState`, and `initializeFromUrl()` (called once from `Layout` on mount) hydrates state from either those query params **or** a `/themes/<slug>` pathname. This is how a theme detail page colors the surrounding chrome to match its theme.

### UI: a themed Slack clone

`src/components/layout/Layout.tsx` (client) renders the persistent Slack chrome — `TopNav`, `TeamSidebar`, `ChannelSidebar`, footer — all colored from `currentTheme`. Page content renders into its scrollable `<main>`. The home page (`src/app/page.tsx`) is a **server component** that renders SEO content + JSON-LD plus the interactive `HomeClient` island; `HomeClient` shows the channel header, the theme grid, and the share/apply bar (with mobile variants).

The grid (`ThemeGrid`) is **virtualized with react-window** and only renders rows after a client-side width measurement (`containerWidth > 0`). Consequence: the grid contributes **nothing to the static HTML**. The shared visual preview markup lives in `ThemeMockup` (used by both the grid card `ThemePreview` and the detail pages).

### SEO is load-bearing and has non-obvious constraints

Because the visible theme list is client-only (virtualized), crawlable content is produced separately:

- **Homepage crawlability**: `ThemeSeoContent` (server, `sr-only`) renders every theme as a heading + description + link to its detail page, so the static HTML contains the full catalog. `StructuredData` emits `WebSite` + `CollectionPage`/`ItemList` JSON-LD. Both live on the home route only (not in `RootLayout`), so detail pages don't get a competing `<h1>` or wrong schema.
- **Per-theme pages**: `src/app/themes/[slug]/page.tsx` uses `generateStaticParams` over all themes to export one static page each, with per-page metadata, `BreadcrumbList` + `CreativeWork` JSON-LD, and related-theme internal links.
- **Per-theme OG images**: generated by `scripts/generate-og.mjs` (uses `next/og`'s `ImageResponse` in a standalone Node script — note the `next/og.js` import with explicit extension) into real `.png` files under `public/og/themes/`. **Do not switch to Next's built-in `opengraph-image` metadata route**: it emits extensionless files that GitHub Pages serves as `application/octet-stream`, which social crawlers reject. The generated images are gitignored and rebuilt in CI.
- `src/app/layout.tsx` sets `metadataBase` (so relative OG/image URLs resolve absolute) and global metadata; site URL is `SITE_URL` in `src/lib/constants.ts`.

### Static export gotchas

- `next.config.ts` sets `output: "export"` and `images.unoptimized`. No server-only features.
- GitHub Pages serves `out/themes/<slug>.html` at the clean `/themes/<slug>` URL, which is the canonical form used in metadata.
- Google Analytics ID is hardcoded in `src/components/layout/GoogleAnalytics.tsx`.

## Repo / tooling notes

- Deploy is GitHub Actions (`.github/workflows/deploy.yml`): builds on push to `main` and publishes `out/` to GitHub Pages (custom domain via `public/CNAME`). Pages source is `build_type: workflow`.
- This repo is a fork; the `upstream` remote is `paracycle/slackthemes`. The `gh` CLI may default to that upstream — pass `--repo michaelfromorg/more-slackthemes` (or `gh repo set-default`) when querying runs/PRs.
