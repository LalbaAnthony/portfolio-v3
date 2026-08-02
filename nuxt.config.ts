import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      project: {
        name: 'Portfolio',
        description: 'A collection of my work, experience, and projects.',
      },
      url: '', // Override this in production with env NUXT_PUBLIC_URL
      noindex: false, // Override this in production with env NUXT_PUBLIC_NOINDEX
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/icon', '@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxt/image'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // Without JS the v-reveal directive never runs, so undo its hidden initial state.
      noscript: [
        { innerHTML: '<style>[data-reveal]{opacity:1 !important}</style>', tagPosition: 'head' },
      ],
      link: [
        { rel: 'preload', href: '/fonts/sf-pro-display_regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/sf-pro-display_semibold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/sf-pro-icons_regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/sf-pro-icons_semibold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/sf-pro-text_regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/sf-pro-text_semibold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      ]
    }
  },
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp'],
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', icon: 'circle-flags:gb' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json', icon: 'circle-flags:fr' },
    ],
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  icon: {
    clientBundle: { // Bundle icon on build for better performance AND avoid nuxt icon API messing up with backend proxy (/api)
      scan: {
        globInclude: ['**/*.{vue,ts}'],
      },
    }
  },
})