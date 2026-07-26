<template>
    <div>
        <h3 class="flex items-center gap-2 font-semibold text-sm uppercase tracking-widest text-white/40 mb-6">
            <Icon :name="props.icon" size="18px" />
            {{ props.label }}
        </h3>
        <div class="timeline">
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
</script>

<style scoped>
.timeline {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0;
}

.timeline__item {
    position: relative;
    padding-left: 1.5rem;
    padding-bottom: 1.75rem;
    border-left: 1px solid var(--glass-white-10);
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
