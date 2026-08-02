<template>
    <div>
        <h3 v-reveal="'left'"
            class="flex items-center gap-2 font-semibold text-sm uppercase tracking-widest text-white/40 mb-6">
            <Icon :name="props.icon" size="18px" />
            {{ props.label }}
        </h3>
        <div ref="timelineRef" class="timeline">
            <div ref="lineRef" class="timeline__line" aria-hidden="true" />
            <div v-for="(item, index) in props.items" :key="index" class="timeline__item">
                <div class="timeline__dot" :class="{ 'timeline__dot--active': !item.endDate }" />
                <p class="text-xs text-white/40 mb-1 tabular-nums">{{ item.dateRange }}</p>
                <h4 class="font-semibold text-sm leading-snug mb-0.5">{{ item.title }}</h4>
                <p class="text-xs text-white/50 mb-2">{{ item.subtitle }}</p>
                <p v-if="item.description" class="text-xs text-white/40 leading-relaxed">{{ item.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useReveal } from '~/composables/useReveal'
import { MOTION, REVEAL_CLEAR_PROPS } from '~/composables/useGsap'

export interface TimelineItem {
    dateRange: string
    title: string
    subtitle: string
    description?: string | null
    endDate?: string | null
}

const props = defineProps<{
    icon: string
    label: string
    items: TimelineItem[]
}>()

const timelineRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)

const { onGsap } = useReveal(timelineRef)

onGsap((gsap) => {
    const root = timelineRef.value
    if (!root) return

    // The rail draws itself downward, tied to scroll position.
    gsap.fromTo(lineRef.value,
        { scaleY: 0 },
        {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 75%', end: 'bottom 75%', scrub: 0.4 },
        },
    )

    // Entries slide in from the rail, dots pop once their entry has arrived.
    gsap.from(root.querySelectorAll('.timeline__item'), {
        x: -24,
        opacity: 0,
        duration: MOTION.duration.base,
        stagger: 0.12,
        clearProps: REVEAL_CLEAR_PROPS,
        scrollTrigger: { trigger: root, start: 'top 78%', once: true },
    })

    gsap.from(root.querySelectorAll('.timeline__dot'), {
        scale: 0,
        duration: MOTION.duration.fast,
        stagger: 0.12,
        delay: 0.15,
        ease: MOTION.ease.pop,
        // Clears the whole transform, not just scale: the dots rely on a CSS
        // translateX(-50%) that GSAP absorbs inline and must fully hand back.
        clearProps: REVEAL_CLEAR_PROPS,
        scrollTrigger: { trigger: root, start: 'top 78%', once: true },
    })
})
</script>

<style scoped>
.timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
}

/*
 * The rail lives in its own element (rather than a per-item border-left) so GSAP can
 * scale it as one continuous line while scrolling.
 */
.timeline__line {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--glass-white-10);
    transform-origin: 50% 0;
}

.timeline__item {
    position: relative;
    padding-left: 1.5rem;
    padding-bottom: 1.75rem;
}

.timeline__item:last-child {
    padding-bottom: 0;
}

.timeline__dot {
    position: absolute;
    left: -0.5px;
    top: 0.35rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    background: var(--color-dark);
    box-shadow: inset 0 0 0 100px var(--glass-white-40);
    border: 1px solid var(--glass-white-20);
    transform: translateX(-50%);
}

.timeline__dot--active {
    box-shadow: inset 0 0 0 100px var(--glass-teal-40);
    border-color: var(--glass-teal-40);
}
</style>
