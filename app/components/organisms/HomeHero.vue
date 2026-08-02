<template>
    <section ref="sectionRef" class="mb-12 text-center pt-8">
        <div class="flex flex-col items-center justify-center gap-2 mb-4">
            <div ref="photoRef" class="profile-photo mb-4">
                <img />
                <NuxtImg src="/photos/profile_no-bg.png" :alt="`${props.profile?.firstName} ${props.profile?.lastName}`"
                    class="profile-photo__img" placeholder loading="eager" />
            </div>
            <h1 ref="nameRef" class="text-5xl">
                {{ props.profile?.firstName }} <span class="font-extrabold">{{ props.profile?.lastName }}</span>
            </h1>
            <h2 ref="jobRef" class="text-3xl font-bold">
                {{ tString(props.profile?.jobTitle) }}
            </h2>
        </div>

        <p ref="descRef" class="text-white/60 align-center my-4">{{ t('pages.home.hero.description') }}</p>

        <div ref="actionsRef" class="flex flex-wrap gap-4 justify-center mt-8">
            <Button size="lg" icon="ic:baseline-download">{{ t('pages.home.hero.resume') }}</Button>
            <Button as="link" to="/#experiences" size="lg" variant="ghost">{{ t('pages.home.hero.more') }}</Button>
        </div>
    </section>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'
import { useReveal } from '~/composables/useReveal'
import { MOTION, REVEAL_CLEAR_PROPS } from '~/composables/useGsap'
import { splitChars } from '~/utils/gsap'

const props = defineProps<{
    profile: Profile | null;
}>()

const { t } = useI18n()

const sectionRef = ref<HTMLElement | null>(null)
const photoRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const jobRef = ref<HTMLElement | null>(null)
const descRef = ref<HTMLElement | null>(null)
const actionsRef = ref<HTMLElement | null>(null)

const { onGsap } = useReveal()

onGsap((gsap) => {
    const chars = nameRef.value ? splitChars(nameRef.value) : []

    gsap.timeline()
        .from(photoRef.value, {
            scale: 0.6,
            opacity: 0,
            rotate: -12,
            duration: MOTION.duration.slow,
            ease: MOTION.ease.pop,
        }, 0)
        // Name lands character by character.
        .from(chars, {
            yPercent: 120,
            opacity: 0,
            rotateZ: 8,
            duration: MOTION.duration.base,
            stagger: 0.035,
            ease: MOTION.ease.soft,
            clearProps: REVEAL_CLEAR_PROPS,
        }, 0.25)
        .from(jobRef.value, {
            y: 26,
            opacity: 0,
            filter: 'blur(10px)',
            clearProps: 'filter',
        }, 0.55)
        .from(descRef.value, { y: 20, opacity: 0, duration: MOTION.duration.fast }, 0.7)
        .from(Array.from(actionsRef.value?.children ?? []), {
            y: 24,
            opacity: 0,
            scale: 0.9,
            duration: MOTION.duration.fast,
            stagger: 0.1,
            ease: MOTION.ease.pop,
            clearProps: REVEAL_CLEAR_PROPS,
        }, 0.8)

    // Endless idle float, started once the entrance has landed.
    gsap.to(photoRef.value, {
        y: -10,
        duration: 2.6,
        delay: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
    })

    // Hero drifts up and dissolves as the visitor scrolls past it. Applied to the
    // section — not its children — so it never fights the photo's idle float on `y`.
    gsap.to(sectionRef.value, {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.value, start: 'bottom 65%', end: 'bottom top', scrub: 0.6 },
    })
})
</script>

<style scoped>
.profile-photo {
    position: relative;
    width: 9rem;
    height: 9rem;
    border-radius: 9999px;
    background: linear-gradient(135deg, var(--glass-white-20) 0%, var(--glass-white-06) 100%);
    backdrop-filter: var(--glass-filter-md);
    -webkit-backdrop-filter: var(--glass-filter-md);
    border: 1px solid var(--glass-white-30);
    overflow: hidden;
}

.profile-photo__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
}
</style>
