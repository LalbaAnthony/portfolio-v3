<template>
    <div>
        <header ref="headerRef" class="glass-container p-2 sticky top-2 z-30 m-1 md:m-2 lg:m-4 xl:m-6">
            <div class="flex items-center justify-between">
                <NuxtLink to="/" class="pl-4 flex items-center text-lg">#</NuxtLink>

                <nav class="hidden md:flex max-w-xl items-center justify-end gap-2 md:gap-4">
                    <Button as="link" to="/#skills" variant="transparent">
                        {{ t('header.skills') }}
                    </Button>
                    <Button as="link" to="/projects" variant="transparent">
                        {{ t('header.projects') }}
                    </Button>
                    <Button as="link" :to="githubUrl(profile?.socials ?? [])" variant="white" icon="mdi:github">
                        {{ t('header.github') }}
                    </Button>
                    <Dropdown :options="localesOptions()" :model-value="locale" variant="ghost"
                        @update:model-value="switchLocale($event as Language)" />
                </nav>

                <div class="md:hidden">
                    <Button class="mr-2" :icon="menuOpen ? 'mdi:close' : 'mdi:menu'"
                        :aria-label="menuOpen ? t('header.closeMenu') : t('header.openMenu')" :aria-expanded="menuOpen"
                        icon-only variant="transparent" size="sm" @click="menuOpen = !menuOpen" />
                </div>
            </div>

            <Transition name="menu">
                <nav v-if="menuOpen" class="md:hidden flex flex-col gap-2 pt-2 pb-1 px-2">
                    <Button as="link" to="/#skills" variant="transparent">
                        {{ t('header.skills') }}
                    </Button>
                    <Button as="link" to="/projects" variant="transparent">
                        {{ t('header.projects') }}
                    </Button>
                    <Button as="link" :to="githubUrl(profile?.socials ?? [])" variant="white" icon="mdi:github">
                        {{ t('header.github') }}
                    </Button>
                    <Dropdown :options="localesOptions()" :model-value="locale" variant="ghost"
                        @update:model-value="switchLocale($event as Language)" />
                </nav>
            </Transition>
        </header>

        <div class="glass-page__overlay" aria-hidden="true" />
        <div class="glass-page__inner">
            <main>
                <slot />
            </main>

            <footer v-reveal="'blur'" class="text-center py-6 mt-8 text-sm text-white/40">
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
import Button from '~/components/atoms/Button.vue'
import Dropdown from '~/components/molecules/Dropdown.vue'
import type { Language } from '#shared/types/i18n'
import { useProfile } from '~/composables/data/useProfile'
import { localesOptions, switchLocale } from '~/utils/i18n'
import { useReveal } from '~/composables/useReveal'
import { MOTION } from '~/composables/useGsap'

const { t, locale } = useI18n()
const route = useRoute()

const menuOpen = ref(false)

const headerRef = ref<HTMLElement | null>(null)

const { onGsap } = useReveal()

onGsap((gsap) => {
    // Header drops in above the fold.
    gsap.from(headerRef.value, {
        y: -80,
        opacity: 0,
        duration: MOTION.duration.slow,
        ease: MOTION.ease.soft,
    })
})

const [
    { profile }
] = await Promise.all([
    useProfile(),
])

watch(() => route.fullPath, () => {
    menuOpen.value = false
})

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