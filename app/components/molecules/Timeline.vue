<template>
    <div>
        <h3 class="flex items-center gap-2 font-semibold text-sm uppercase tracking-widest text-white/40 mb-6">
            <Icon :name="icon" size="18px" />
            {{ label }}
        </h3>
        <div class="timeline">
            <div v-for="(item, index) in items" :key="index" class="timeline__item">
                <div class="timeline__dot" />
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
}

defineProps<{
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
    border-left-color: transparent;
    padding-bottom: 0;
}

.timeline__dot {
    position: absolute;
    left: 0;
    top: 0.35rem;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: var(--glass-white-40);
    border: 1px solid var(--glass-white-20);
    transform: translateX(-50%);
}
</style>
