<template>
    <span :class="['pill', `pill--${props.variant}`, `pill--${props.size}`]">
        <slot />
    </span>
</template>

<script setup lang="ts">
import type { ComponentVariant, ComponentSize } from '#shared/types/component'

const props = withDefaults(defineProps<{
    variant?: ComponentVariant
    size?: ComponentSize
}>(), {
    variant: 'ghost',
    size: 'sm',
})
</script>

<style scoped>
.pill {
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    font-weight: 500;
    letter-spacing: .04em;
    white-space: nowrap;
}

/* Variants */

.pill--glass {
    background: linear-gradient(148deg, var(--glass-white-30) 0%, var(--glass-white-08) 55%, var(--glass-white-02) 100%);
    backdrop-filter: var(--glass-filter-sm);
    -webkit-backdrop-filter: var(--glass-filter-sm);
    border: 1px solid var(--glass-white-40);
    color: var(--color-light);
}

.pill--ghost {
    background: transparent;
    border: 1px solid var(--glass-white-40);
    color: var(--glass-white-80);
}

.pill--white {
    background: var(--glass-white-90);
    border: 1px solid var(--glass-white-90);
    color: #1a1a2e;
}

.pill--transparent {
    background: transparent;
    border: none;
    color: var(--glass-white-80);
}

/* Sizes */

.pill--xs {
    padding: .1rem .5rem;
    font-size: .65rem;
}

.pill--sm {
    padding: .15rem .65rem;
    font-size: .72rem;
}

.pill--md {
    padding: .25rem .85rem;
    font-size: .8rem;
}

.pill--lg {
    padding: .35rem 1.1rem;
    font-size: .875rem;
}

.pill--xl {
    padding: .45rem 1.35rem;
    font-size: 1rem;
}

.pill--2xl {
    padding: .55rem 1.6rem;
    font-size: 1.1rem;
}
</style>
