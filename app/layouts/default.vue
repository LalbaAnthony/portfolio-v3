<template>
    <div>
        <header class="glass-container p-2 sticky top-2 z-30 m-1 md:m-2 lg:m-4">
            <div class="flex items-center justify-between">
                <NuxtLink to="/" class="pl-4 flex items-center text-lg">#</NuxtLink>

                <nav class="hidden md:flex max-w-xl items-center justify-end gap-2 md:gap-4">
                    <select :value="locale"
                        @change="switchLocale(($event.target as HTMLSelectElement).value as Language)">
                        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>

                    <Button as="link" to="/projects" variant="transparent">
                        {{ t('header.projects') }}
                    </Button>
                    <Button as="link" :to="githubUrl(profile?.socials ?? [])" variant="ghost" icon="mdi:github">
                        {{ t('header.github') }}
                    </Button>
                </nav>

                <div class="md:hidden">
                    <Button class="mr-2" :icon="menuOpen ? 'mdi:close' : 'mdi:menu'"
                        :aria-label="menuOpen ? t('header.closeMenu') : t('header.openMenu')" :aria-expanded="menuOpen"
                        icon-only variant="transparent" size="sm" @click="menuOpen = !menuOpen" />
                </div>
            </div>

            <Transition name="menu">
                <nav v-if="menuOpen" class="md:hidden flex flex-col gap-2 pt-2 pb-1 px-2">
                    <select :value="locale"
                        @change="switchLocale(($event.target as HTMLSelectElement).value as Language)">
                        <option v-for="loc in locales" :key="loc.code" :value="loc.code">
                            {{ loc.name }}
                        </option>
                    </select>

                    <Button as="link" to="/projects" variant="transparent">
                        {{ t('header.projects') }}
                    </Button>
                    <Button as="link" :to="githubUrl(profile?.socials ?? [])" variant="ghost" icon="mdi:github">
                        {{ t('header.github') }}
                    </Button>
                </nav>
            </Transition>
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
const route = useRoute()

const menuOpen = ref(false)

const [
    { profile }
] = await Promise.all([
    useProfile(),
])

watch(() => route.fullPath, () => {
    menuOpen.value = false
})

function switchLocale(code: Language) {
    navigateTo(switchLocalePath(code))
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
    transform-origin: top;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>