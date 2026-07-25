<template>
    <div class="animate-pulse bg-white/10" :class="roundedClass" :style="{ width, height }" />
</template>

<script setup lang="ts">
import type { ComponentRoundness } from '~~/shared/types/component';

const props = withDefaults(defineProps<{
    width?: string
    height?: string
    rounded?: ComponentRoundness
}>(), {
    height: '1rem',
    rounded: 'md',
})

const roundnessMap: Record<ComponentRoundness, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
}

const roundedClass = computed(() => roundnessMap[props.rounded])
</script>
