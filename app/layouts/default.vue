<template>
    <div>
        <header class="glass-container p-2 sticky top-2 z-30 m-1 md:m-2 lg:m-4">
            <div class="flex items-center justify-between">
                <NuxtLink to="/" class="pl-4 flex items-center">
                    <i18n-t keypath="header.title" tag="span" class="text-lg">
                        <template #fullname>{{ profile?.firstName }} <b>{{ profile?.lastName }}</b></template>
                    </i18n-t>
                </NuxtLink>

                <nav class="max-w-xl flex items-center justify-end gap-2 md:gap-4">
                    <select :value="locale"
                        @change="switchLocale(($event.target as HTMLSelectElement).value as Language)">
                        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>

                    <Button as="link" to="/projects" variant="transparent">
                        {{ t('header.projects') }}
                    </Button>
                    <Button as="link" :to="githubUrl(profile?.socials ?? [])" variant="ghost"
                        icon="mdi:github">
                        {{ t('header.github') }}
                    </Button>
                </nav>
            </div>
        </header>

        <div class="glass-page__overlay" aria-hidden="true" />
        <div class="glass-page__inner">
            <main>
                <slot />
            </main>

            <footer class="text-center py-6 mt-8 text-sm text-white/40">
                <span>{{ profile?.firstName }} {{ profile?.lastName }}</span>
                <span class="mx-2" aria-hidden="true">·</span>
                <a :href="`mailto:${profile?.email}`" class="hover:text-white/80 transition-colors">
                    {{ profile?.email }}
                </a>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import type { Language } from '#shared/types/i18n';
import { useProfile } from '~/composables/data/useProfile';

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const [
    { profile }
] = await Promise.all([
    useProfile(),
])


function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}
</script>