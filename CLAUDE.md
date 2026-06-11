# portfolio-v3

Personal portfolio of Anthony Lalba. Single-page-first Nuxt site with a custom "glass" (glassmorphism) UI.

## Stack

- **Nuxt 4** (`app/` directory structure, Vue 3.5, `vue-router` 5) — TypeScript everywhere (`<script setup lang="ts">`)
- **Tailwind CSS 4** via `@tailwindcss/vite` plugin (configured in `nuxt.config.ts` → `vite.plugins`; **no `tailwind.config` file**, theme is CSS-first)
- **@nuxtjs/i18n 10** — locales `en` (default) and `fr`
- **@nuxt/icon** — icons referenced as `ic:baseline-*`, client-bundled at build (see `icon.clientBundle` in `nuxt.config.ts`)
- **@nuxtjs/robots** + **@nuxtjs/sitemap** for SEO
- **@nuxt/eslint** — config in `eslint.config.mjs` (extends generated `.nuxt/eslint.config.mjs`)
- No backend, no database, no test framework, no CI configured.

## Commands

```bash
npm run dev        # dev server (default http://localhost:3000)
npm run build      # production build
npm run generate   # static generation
npm run preview    # preview production build
npx nuxt prepare   # regenerate .nuxt/ types (also runs on postinstall)
npx eslint .       # lint
```

There is no `test` script and no test suite.

## Directory layout

```
app/
  app.vue                  # root: NuxtLayout > NuxtPage
  assets/css/main.css      # global styles + glass theme (see below)
  components/
    atoms/
    molecules/
    organisms/
  layouts/default.vue      # header (locale switcher, nav) + glass overlay + <main><slot/>
  pages/index.vue          # home
  types/i18n.ts            # `Language = 'en' | 'fr'`
i18n/locales/{en,fr}.json  # translation files (nested keys, e.g. home.hero.description)
public/                    # favicon, _robots.txt
```

## Conventions

- **Atomic design** for components: `atoms/` → `molecules/` → `organisms/`. Place new components in the right tier.
- **Explicit imports** of components in `<script setup>` (e.g. `import Button from '~/components/atoms/Button.vue'`) even though Nuxt auto-imports would resolve them. Composables (`useI18n`, `navigateTo`, `computed`…) rely on auto-imports.
- **i18n**: strategy `prefix_except_default` (`/` = en, `/fr/...` = fr), browser-language detection with cookie `i18n_locale`. Always add new strings to **both** `en.json` and `fr.json`. Use `useI18n()` + `t('key')`; switch locale via `useSwitchLocalePath()` (see `layouts/default.vue`).
- Dark glass aesthetic: body background `#07070f`, white text, translucent white surfaces with `backdrop-filter: blur(...)`. Accent colors come from the fixed radial-gradient overlay (`.glass-page__overlay`).

## Gotchas

- `.nuxt/` is generated; if types or the eslint base config are missing, run `npx nuxt prepare`.
- `public/_robots.txt` is prefixed with `_` — actual `robots.txt` is produced by `@nuxtjs/robots`.
