<template>
    <div ref="rootRef" class="progress-bar" role="progressbar" :aria-valuenow="value" :aria-valuemin="0"
        :aria-valuemax="max">
        <div ref="fillRef" class="progress-bar__fill" :style="{ width: `${percentage}%` }" />
    </div>
</template>

<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'
import { REVEAL_CLEAR_PROPS } from '~/composables/useGsap'

const props = withDefaults(defineProps<{
    value: number
    max?: number
    /** Fill from 0 when scrolled into view instead of rendering at full width. */
    animate?: boolean
}>(), {
    max: 100,
    animate: true,
})

const percentage = computed(() => Math.round(Math.min(100, Math.max(0, (props.value / props.max) * 100))))

const rootRef = ref<HTMLElement | null>(null)
const fillRef = ref<HTMLElement | null>(null)

const { onGsap } = useReveal()

onGsap((gsap) => {
    if (!props.animate) return

    // Drives scaleX rather than width: cheaper, and leaves the CSS width transition
    // free to handle later value changes. Note the fill's width is a Vue :style
    // binding — clearProps must never include it or the bar snaps to 100%.
    gsap.fromTo(fillRef.value,
        { scaleX: 0 },
        {
            scaleX: 1,
            duration: 1,
            ease: 'power2.out',
            clearProps: REVEAL_CLEAR_PROPS,
            scrollTrigger: { trigger: rootRef.value, start: 'top 92%', once: true },
        },
    )
})
</script>

<style scoped>
.progress-bar {
    width: 100%;
    height: 3px;
    background: var(--glass-white-10);
    border-radius: 9999px;
    overflow: hidden;
}

.progress-bar__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--glass-white-40) 0%, var(--glass-white-90) 100%);
    border-radius: 9999px;
    transform-origin: 0 50%;
    transition: width 0.6s cubic-bezier(.23, 1, .32, 1);
}
</style>
