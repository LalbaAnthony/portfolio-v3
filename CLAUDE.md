# CLAUDE.md

## Overview

Personal portfolio website (v3). Nuxt 4 full-stack app: Vue frontend + Nitro API serving content from static TypeScript data files — no database.

## Tech stack

- Node 24, npm (lockfileVersion 3)
- Nuxt ^4.4.8, Vue 3, TypeScript, Tailwind CSS 4 (via `@tailwindcss/vite`)
- Nuxt modules: `@nuxt/icon`, `@nuxt/eslint`, `@nuxtjs/i18n`, `@nuxtjs/robots`, `@nuxtjs/sitemap`, `@nuxt/image`
- GSAP ^3.15 (+ ScrollTrigger) for animation — lazily imported, never bundled in the initial chunk
- Docker Compose (profiles `dev` / `prod`), semantic-release for versioning

## Structure

- `app/` — Nuxt app: `pages/`, `layouts/`, `components/` (atomic design: `atoms/`, `molecules/`, `organisms/`), `composables/`, `utils/`, `plugins/`, `assets/css/main.css`
- `server/` — Nitro backend:
  - `api/` — file-based routes, versioned under `api/v1/` (plus unversioned `api/health.get.ts`)
    - `v1/certifications/` — `index.get.ts`, `[type].get.ts`
    - `v1/milestones/` — `index.get.ts`
    - `v1/profile/` — `index.get.ts`, `socials/index.get.ts`
    - `v1/projects/` — `index.get.ts`, `[slug].get.ts`, `technologies/index.get.ts`
    - `v1/skills/` — `index.get.ts`
  - `services/` — data access layer (filter/sort/search): `certifications.ts`, `milestones.ts`, `profile.ts`, `projects.ts`, `shortcuts.ts`, `skills.ts`
  - `data/` — TypeScript data files (the content "database"): `certifications.ts`, `milestones.ts`, `profile.ts`, `projects.ts`, `shortcuts.ts`, `skills.ts`
  - `middleware/shortcuts.ts` — 301-redirects any path matching a key in shortcuts data
- `shared/` — `types/` and `utils/` auto-imported on both client and server (Nuxt 4 shared dir)
- `i18n/locales/` — `en.json`, `fr.json`
- `public/` — static assets (fonts, favicon)
- `docs/dev/` — developer documentation (`git.md`, `motion.md`)
- `.github/workflows/` — `release.flow.yml` (semantic-release on push to `main`), `tests.flow.yml` + `tests.inc.yml` (CI on PRs)

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

# Take down all profiles at once
npm run docker:down

# Bare-metal
npm install          # postinstall runs `nuxt prepare`
npm run dev
npm run build
npm run preview
npm run generate

# Lint
npm run lint
```

No `test` or `typecheck` script is configured in `package.json`.

## Architecture

- Content flow: `server/data/*.ts` → `server/services/*` (search/filter/sort via `shared/utils/service.ts`) → `server/api/v1/*` handlers returning `{ data: ... }`.
- Client fetches through the `useApi()` composable ([app/composables/useApi.ts](app/composables/useApi.ts)): builds `/api/v{version}` URLs (default v1), retries with delay, returns `ApiResponse<T>` (`{ status, ok, data?, error? }`). Data composables live in `app/composables/data/` (`useProfile.ts`, `useProjects.ts`).
- Query parsing helpers in `shared/utils/request.ts`; shared types in `shared/types/`.
- i18n: locales `en` (default) and `fr`, `strategy: 'prefix'` — every route is locale-prefixed; browser-language detection with cookie `i18n_locale`, redirect on root.
- Icons are client-bundled at build time (see `icon.clientBundle` in `nuxt.config.ts`) to avoid the icon API conflicting with `/api` routes.
- **Motion** — GSAP animation, three layers (full reference: [docs/dev/motion.md](docs/dev/motion.md)):
  - [app/composables/useGsap.ts](app/composables/useGsap.ts) — lazy singleton GSAP + ScrollTrigger loader, plus the shared `MOTION` tokens, `REVEAL_PRESETS` and `REVEAL_CLEAR_PROPS`. Resolves to `null` on the server, under `prefers-reduced-motion: reduce`, and if the chunk fails to load; callers treat `null` as "render static".
  - [app/plugins/motion.ts](app/plugins/motion.ts) — registers the global `v-reveal` (scroll/mount entrance, optional staggered `children`) and `v-tilt` (pointer 3D hover) directives. Handles ~90% of animation with no per-component code. Universal, not `.client`: Vue must resolve the directives during SSR, where `getSSRProps` stamps the hidden initial state.
  - [app/composables/useReveal.ts](app/composables/useReveal.ts) — `onGsap()` escape hatch for bespoke sequences (timelines, scrubbed parallax, counters). Tasks run inside a `gsap.context()` reverted on unmount, so tweens and ScrollTriggers clean themselves up; a task may return a teardown function.

## Conventions

- ESLint via `@nuxt/eslint` (`eslint.config.mjs` extends the generated `.nuxt/eslint.config.mjs`); several Vue formatting rules disabled — see the file.
- Commit messages must follow Conventional Commits: semantic-release derives versions and `CHANGELOG.md` from them (`.releaserc.json`, releases only from `main`).
- Root-relative imports use the `~~` alias (e.g. `~~/server/services/project`, `~~/shared/types/project`).
- Nuxt auto-imports apply: composables, utils, and `shared/` members are used without explicit imports in many files.

## Testing

No unit test framework is set up. CI (`tests.inc.yml`) runs on every PR:
- `npm audit --audit-level=critical` — dependency security audit
- `npm run lint` — ESLint
- `npm run build` — TypeScript build check (no-emit equivalent via full build)

## Environment

From `.env.example` (consumed by `docker-compose.yml`):

- `PORT` — host port mapping for Docker (default 3000)
- `NUXT_PUBLIC_URL` — public site URL; compose also passes it as `NUXT_SITE_URL`
- `NUXT_PUBLIC_NOINDEX` — set `true` to disable indexing (defaults to `true` in the dev container)

No external services; content is local TypeScript data files.

## Gotchas

- **Site URL / indexability are baked at build time.** `@nuxtjs/robots` + `@nuxtjs/sitemap` resolve `NUXT_SITE_URL` / `NUXT_SITE_INDEXABLE` during `nuxt build`, not at runtime. Changing `NUXT_PUBLIC_URL` or `NUXT_PUBLIC_NOINDEX` for prod requires an image rebuild: `docker compose --profile prod up -d --build`.
- **All build tooling lives in `dependencies`, not `devDependencies`.** `Dockerfile.prod` runs `npm ci --omit=dev` before building; `devDependencies` only hold semantic-release. Do not move nuxt/eslint/tailwind to devDependencies.
- Both Dockerfiles use `npm ci --ignore-scripts` to skip the `nuxt prepare` postinstall (needs full source); `nuxt dev`/`nuxt build` run prepare themselves.
- `public/_robots.txt` is deliberately underscore-prefixed: a static `public/robots.txt` would shadow the `@nuxtjs/robots` generated one. Do not rename it back.
- Compose watch rebuilds the dev image on `package.json`/`package-lock.json` changes; `nuxt.config.ts` and `tsconfig.json` trigger sync+restart only.
- CI (`release.flow.yml`) runs plain `npm ci` on Node 24 — keep `package-lock.json` in sync with `package.json` or releases fail.
- Prod container healthcheck hits `/api/health`; keep that endpoint working.
- **Never use GSAP's `clearProps: 'all'`.** It wipes the element's entire inline `style` attribute, including bindings Vue owns — this silently broke the skill bars, whose fill width is a `:style="{ width }"` binding (they all snapped to 100% once the tween finished). Use `REVEAL_CLEAR_PROPS` from `useGsap.ts`, or an explicit property list.
- **`v-reveal` targets are hidden until GSAP takes over.** The directive stamps `data-reveal` during SSR, hidden by a CSS rule in `main.css`, and removes it once GSAP has written the inline start state. Three fallbacks keep content from ever being stuck invisible: the CSS rule is wrapped in `prefers-reduced-motion: no-preference`, a failed GSAP import strips every `data-reveal`, and a `<noscript>` style in `nuxt.config.ts` restores opacity without JS. Do not add `!important` to that rule — GSAP's inline styles must be able to win.
- An element driven by `v-tilt` must not also declare a CSS `:hover { transform }` — GSAP owns the transform while tilting and will overwrite it. Border/colour hover styles are fine.
