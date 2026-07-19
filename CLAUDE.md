# CLAUDE.md

## Overview

Personal portfolio website (v3). Nuxt 4 full-stack app: Vue frontend + Nitro API serving content from static JSON files — no database.

## Tech stack

- Node 24, npm (lockfileVersion 3)
- Nuxt ^4.4.8, Vue 3, TypeScript, Tailwind CSS 4 (via `@tailwindcss/vite`)
- Nuxt modules: `@nuxt/icon`, `@nuxt/eslint`, `@nuxtjs/i18n`, `@nuxtjs/robots`, `@nuxtjs/sitemap`
- Docker Compose (profiles `dev` / `prod`), semantic-release for versioning

## Structure

- `app/` — Nuxt app: `pages/`, `layouts/`, `components/` (atomic design: `atoms/`, `molecules/`, `organisms/`), `composables/`, `utils/`, `assets/css/main.css`
- `server/` — Nitro backend:
  - `api/` — file-based routes, versioned under `api/v1/` (plus unversioned `api/health.get.ts`)
  - `services/` — data access layer (filter/sort/search over JSON)
  - `data/` — `profile.json`, `projects.json`, `shortcuts.json` — the content "database"
  - `middleware/shortcuts.ts` — 301-redirects any path matching a key in `shortcuts.json`
- `shared/` — `types/` and `utils/` auto-imported on both client and server (Nuxt 4 shared dir)
- `i18n/locales/` — `en.json`, `fr.json`
- `public/` — static assets (fonts, favicon)
- `.github/workflows/release.flow.yml` — semantic-release on push to `main`

## Commands

```sh
# Setup
cp .env.example .env

# Primary dev flow (Docker, compose watch syncs source into the container)
npm run docker:dev
npm run docker:dev:down

# Production container (multi-stage build)
npm run docker:prod
npm run docker:prod:down
npm run docker:logs

# Bare-metal
npm install          # postinstall runs `nuxt prepare`
npm run dev
npm run build
npm run preview
npm run generate

# Lint
npm run lint
```

No test or typecheck script is configured.

## Architecture

- Content flow: `server/data/*.json` → `server/services/*` (search/filter/sort via `shared/utils/service.ts`) → `server/api/v1/*` handlers returning `{ data: ... }`.
- Client fetches through the `useApi()` composable ([app/composables/useApi.ts](app/composables/useApi.ts)): builds `/api/v{version}` URLs (default v1), retries with delay, returns `ApiResponse<T>` (`{ status, ok, data, error? }`). Data composables live in `app/composables/data/`.
- Query parsing helpers in `shared/utils/request.ts`; shared types in `shared/types/`.
- i18n: locales `en` (default) and `fr`, `strategy: 'prefix'` — every route is locale-prefixed; browser-language detection with cookie `i18n_locale`, redirect on root.
- Icons are client-bundled at build time (see `icon.clientBundle` in `nuxt.config.ts`) to avoid the icon API conflicting with `/api` routes.

## Conventions

- ESLint via `@nuxt/eslint` (`eslint.config.mjs` extends the generated `.nuxt/eslint.config.mjs`); several Vue formatting rules disabled — see the file.
- Commit messages must follow Conventional Commits: semantic-release derives versions and `CHANGELOG.md` from them (`.releaserc.json`, releases only from `main`).
- Root-relative imports use the `~~` alias (e.g. `~~/server/services/project`, `~~/shared/types/project`).
- Nuxt auto-imports apply: composables, utils, and `shared/` members are used without explicit imports in many files.

## Testing

No test framework is set up. `npm run lint` is the only check.

## Environment

From `.env.example` (consumed by `docker-compose.yml`):

- `PORT` — host port mapping for Docker (default 3000)
- `NUXT_PUBLIC_URL` — public site URL; compose also passes it as `NUXT_SITE_URL`
- `NUXT_PUBLIC_NOINDEX` — set `true` to disable indexing (defaults to `true` in the dev container)

No external services; content is local JSON.

## Gotchas

- **Site URL / indexability are baked at build time.** `@nuxtjs/robots` + `@nuxtjs/sitemap` resolve `NUXT_SITE_URL` / `NUXT_SITE_INDEXABLE` during `nuxt build`, not at runtime. Changing `NUXT_PUBLIC_URL` or `NUXT_PUBLIC_NOINDEX` for prod requires an image rebuild: `docker compose --profile prod up -d --build`.
- **All build tooling lives in `dependencies`, not `devDependencies`.** `Dockerfile.prod` runs `npm ci --omit=dev` before building; `devDependencies` only hold semantic-release. Do not move nuxt/eslint/tailwind to devDependencies.
- Both Dockerfiles use `npm ci --ignore-scripts` to skip the `nuxt prepare` postinstall (needs full source); `nuxt dev`/`nuxt build` run prepare themselves.
- `public/_robots.txt` is deliberately underscore-prefixed: a static `public/robots.txt` would shadow the `@nuxtjs/robots` generated one. Do not rename it back.
- Compose watch rebuilds the dev image on `package.json`/`package-lock.json` changes; `nuxt.config.ts` and `tsconfig.json` trigger sync+restart only.
- CI (`release.flow.yml`) runs plain `npm ci` on Node 24 — keep `package-lock.json` in sync with `package.json` or releases fail.
- Prod container healthcheck hits `/api/health`; keep that endpoint working.
