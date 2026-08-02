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

        <div ref="auroraRef" class="glass-page__overlay" aria-hidden="true" />
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
const auroraRef = ref<HTMLElement | null>(null)

/*
 * Aurora parallax budget.
 *
 * The overlay is a fixed, exactly-viewport-sized element, so scaling it up is the only
 * thing that creates room to move: it gains (AURORA_SCALE - 1) / 2 of headroom on each
 * edge. Drift it further than that and its top edge descends into view, exposing the
 * flat page background as a dark band across the top of the screen.
 *
 * Invariant, in fractions of viewport height:
 *   AURORA_SCROLL_DRIFT / 100 + AURORA_POINTER_DRIFT / viewportHeight
 *     <= (AURORA_SCALE - 1) / 2
 *
 * Current values leave ample margin even on a short viewport (700px):
 *   headroom 10% = 70px  vs  drift 4% = 28px + 18px pointer = 46px.
 */
const AURORA_SCALE = 1.2
const AURORA_SCROLL_DRIFT = 4
const AURORA_POINTER_DRIFT = 18

const { onGsap } = useReveal()

onGsap((gsap) => {
    // Header drops in above the fold.
    gsap.from(headerRef.value, {
        y: -80,
        opacity: 0,
        duration: MOTION.duration.slow,
        ease: MOTION.ease.soft,
    })

    // The ambient gradients drift slowly as the page scrolls…
    gsap.to(auroraRef.value, {
        yPercent: AURORA_SCROLL_DRIFT,
        scale: AURORA_SCALE,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 1 },
    })

    // …and lean gently toward the pointer. Deliberately in px (`x`/`y`) so it composes
    // with the scroll tween above instead of overwriting its `yPercent`.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const driftX = gsap.quickTo(auroraRef.value, 'x', { duration: 1.6, ease: MOTION.ease.out })
    const driftY = gsap.quickTo(auroraRef.value, 'y', { duration: 1.6, ease: MOTION.ease.out })

    const onPointerMove = (event: PointerEvent) => {
        driftX((event.clientX / window.innerWidth - 0.5) * AURORA_POINTER_DRIFT * 2)
        driftY((event.clientY / window.innerHeight - 0.5) * AURORA_POINTER_DRIFT * 2)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    // Registered inside gsap.context() → reverted with the component.
    return () => window.removeEventListener('pointermove', onPointerMove)
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