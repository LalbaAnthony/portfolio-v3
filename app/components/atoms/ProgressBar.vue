<template>
    <div class="progress-bar" role="progressbar" :aria-valuenow="value" :aria-valuemin="0" :aria-valuemax="max">
        <div class="progress-bar__fill" :style="{ width: `${percentage}%` }" />
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    value: number
    max?: number
}>(), {
    max: 100,
})

const percentage = computed(() => Math.round(Math.min(100, Math.max(0, (props.value / props.max) * 100))))
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
    transition: width 0.6s cubic-bezier(.23, 1, .32, 1);
}
</style>
