<template>
    <component :is="componentType" v-bind="componentAttrs" :class="[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        {
            'btn--pill': pill,
            'btn--icon-only': iconOnly,
            'btn--loading': loading,
        }
    ]" :disabled="disabled" :aria-disabled="disabled || undefined" :aria-label="ariaLabel" @click="handleClick">
        <span class="btn__content">
            <Icon v-if="loading" name="eos-icons:loading" class="animate-spin" :size="iconSize" />
            <Icon v-else-if="icon" :name="icon" :size="iconSize" />
            <slot />
            <span v-if="trailingIcon && !loading" class="btn__trailing-icon">
                <Icon :name="trailingIcon" :size="iconSize" />
            </span>
        </span>
    </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ComponentVariant , ComponentSize  } from '#shared/types/component'
import { NuxtLink } from '#components'

type As = 'button' | 'link'
type Type = 'button' | 'submit' | 'reset'

const attrs = useAttrs()

const props = withDefaults(defineProps<{
    variant?: ComponentVariant
    size?: ComponentSize
    pill?: boolean
    disabled?: boolean
    loading?: boolean
    iconOnly?: boolean
    ariaLabel?: string
    icon?: string
    trailingIcon?: string
    type?: Type
    as?: As
    to?: string
    target?: string
}>(), {
    variant: 'glass',
    size: 'md',
    ariaLabel: undefined,
    type: 'button',
    as: 'button',
    disabled: false,
    loading: false
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const iconSizeMap: Record<ComponentSize, string> = {
    'xs': '14px',
    'sm': '18px',
    'md': '22px',
    'lg': '24px',
    'xl': '26px',
    '2xl': '28px',
}

const iconSize = computed(() => iconSizeMap[props.size])

const componentType = computed(() => {
    return props.as === 'link' ? NuxtLink : 'button'
})

const componentAttrs = computed(() => {
    if (props.as === 'link') {
        const isExternal = isURLExternal(props.to || '')

        return {
            ...attrs,
            to: props.to,
            external: isExternal,
            target: props.target ?? (isExternal ? '_blank' : undefined)
        }
    }

    return {
        ...attrs,
        type: props.type,
    }
})


function handleClick(e: MouseEvent) {
    if (props.disabled || props.loading) return
    const btn = e.currentTarget as HTMLElement
    const el = document.createElement('span')
    const r = btn.getBoundingClientRect()
    const s = Math.max(r.width, r.height)
    el.className = 'glass-ripple'
    el.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`
    btn.appendChild(el)
    el.addEventListener('animationend', () => el.remove())
    emit('click', e)
}
</script>

<style scoped>
/* Base */

.btn {
    --btn-gap: 7px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--color-light);
    font-weight: 600;
    letter-spacing: .05em;
    border: none;
    transition: all .35s cubic-bezier(.23, 1, .32, 1);
}

.btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--glass-white-40) 0%, var(--glass-white-08) 26%, transparent 52%);
    border-radius: inherit;
    pointer-events: none;
}

.btn__content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: var(--btn-gap);
}

/* Glass */

.btn--glass {
    background: linear-gradient(148deg, var(--glass-white-30) 0%, var(--glass-white-08) 55%, var(--glass-white-02) 100%);
    backdrop-filter: var(--glass-filter-md);
    -webkit-backdrop-filter: var(--glass-filter-md);
    border: 1px solid var(--glass-white-40);
    border-bottom-color: var(--glass-white-10);
}

.btn--glass:hover {
    background: linear-gradient(148deg, var(--glass-white-40) 0%, var(--glass-white-10) 55%, var(--glass-white-04) 100%);
    transform: translateY(-3px) scale(1.03);
    border-color: var(--glass-white-60);
}

.btn--glass:active {
    transform: scale(.97);
    background: linear-gradient(148deg, var(--glass-white-10) 0%, var(--glass-white-02) 100%);
}

/* Ghost */

.btn--ghost {
    color: var(--glass-white-80);
    background: transparent;
    backdrop-filter: var(--glass-filter-xs);
    -webkit-backdrop-filter: var(--glass-filter-xs);
    border: 1px solid var(--glass-white-40);
}

.btn--ghost::before {
    display: none
}

.btn--ghost:hover {
    background: var(--glass-white-08);
    color: #fff;
    transform: translateY(-2px);
    border-color: var(--glass-white-50);
}

.btn--ghost:active {
    transform: scale(.96)
}

/* White */

.btn--white {
    color: #1a1a2e;
    background: var(--glass-white-90);
    backdrop-filter: var(--glass-filter-xs);
    -webkit-backdrop-filter: var(--glass-filter-xs);
    border: 1px solid var(--glass-white-90);
}

.btn--white::before {
    background: linear-gradient(180deg, var(--glass-white-60) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 50%;
}

.btn--white:hover {
    background: var(--glass-white-100);
    transform: translateY(-3px) scale(1.03);
}

.btn--white:active {
    transform: scale(.97);
    background: var(--glass-white-80);
}

/* Transparent */

.btn--transparent {
    color: var(--glass-white-80);
    background: transparent;
    border: none;
}

.btn--transparent::before {
    display: none
}

.btn--transparent:hover {
    color: #fff;
    transform: translateY(-2px);
}

.btn--transparent:active {
    transform: scale(.96)
}

/* Sizes */

.btn--xs {
    --btn-gap: 4px;
    padding: .3rem .8rem;
    font-size: .72rem;
    border-radius: .45rem
}

.btn--sm {
    --btn-gap: 6px;
    padding: .5rem 1.15rem;
    font-size: .8rem;
    border-radius: .6rem
}

.btn--md {
    --btn-gap: 7px;
    padding: .68rem 1.5rem;
    font-size: .875rem;
    border-radius: .72rem
}

.btn--lg {
    --btn-gap: 9px;
    padding: .875rem 2.1rem;
    font-size: 1rem;
    border-radius: .875rem
}

.btn--xl {
    --btn-gap: 11px;
    padding: 1.05rem 2.8rem;
    font-size: 1.1rem;
    border-radius: 1rem
}

.btn--2xl {
    --btn-gap: 13px;
    padding: 1.25rem 3.6rem;
    font-size: 1.25rem;
    border-radius: 1.1rem
}

/* Pill */

.btn--pill {
    border-radius: 9999px !important
}

/* Disabled */

.btn:disabled,
.btn[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: .35;
    pointer-events: none;
}

/* Icon-only */

.btn--icon-only {
    padding: 0;
    letter-spacing: 0;
    font-weight: normal;
}

.btn--icon-only::before {
    background: linear-gradient(180deg, var(--glass-white-30) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 45%;
}

.btn--icon-only:hover {
    background: var(--glass-white-20);
    transform: translateY(-2px) scale(1.09);
    border-color: var(--glass-white-30);
}

.btn--icon-only:active {
    transform: scale(.92)
}

.btn--icon-only.btn--sm {
    width: 40px;
    height: 40px;
    border-radius: .7rem
}

.btn--icon-only.btn--md {
    width: 52px;
    height: 52px;
    border-radius: .875rem
}

.btn--icon-only.btn--lg {
    width: 60px;
    height: 60px;
    border-radius: 1rem
}

.btn--icon-only.btn--xl {
    width: 68px;
    height: 68px;
    border-radius: 1.1rem
}

.btn--icon-only.btn--pill {
    border-radius: 50% !important
}

/* Trailing icon */

.btn__trailing-icon {
    display: inline-flex;
    align-items: center;
    transition: transform 0.2s ease;
}
</style>
