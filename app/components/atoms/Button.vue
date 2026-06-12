<template>
    <button :class="[
        'glass-btn',
        `glass-btn--${variant}`,
        `glass-btn--${size}`,
        {
            'glass-btn--pill': pill,
            'glass-btn--icon-only': iconOnly,
            'glass-btn--loading': loading,
        }
    ]" :disabled="disabled" :aria-disabled="disabled || undefined" :aria-label="ariaLabel" @click="handleClick">
        <span v-if="loading"
            class="inline-block align-middle shrink-0 size-[15px] rounded-full border-2 border-white/30 border-t-white animate-spin [animation-duration:1s]"
            aria-hidden="true" />
        <span class="glass-btn__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const props = withDefaults(defineProps<{
    variant?: Variant
    size?: Size
    pill?: boolean
    disabled?: boolean
    loading?: boolean
    iconOnly?: boolean
    ariaLabel?: string
}>(), {
    variant: 'primary',
    size: 'md',
    ariaLabel: undefined,
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

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

.glass-btn {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--color-light);
    font-weight: 600;
    letter-spacing: .05em;
    border: none;
    transition: all .35s cubic-bezier(.23, 1, .32, 1);
}

.glass-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, var(--glass-white-40) 0%, var(--glass-white-08) 26%, transparent 52%);
    border-radius: inherit;
    pointer-events: none;
}

.glass-btn__content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 7px;
}

/* Primary */

.glass-btn--primary {
    background: linear-gradient(148deg, var(--glass-white-30) 0%, var(--glass-white-08) 55%, var(--glass-white-02) 100%);
    backdrop-filter: var(--glass-filter-md);
    -webkit-backdrop-filter: var(--glass-filter-md);
    border: 1px solid var(--glass-white-40);
    border-bottom-color: var(--glass-white-10);
}

.glass-btn--primary:hover {
    background: linear-gradient(148deg, var(--glass-white-40) 0%, var(--glass-white-10) 55%, var(--glass-white-04) 100%);
    transform: translateY(-3px) scale(1.03);
    border-color: var(--glass-white-60);
}

.glass-btn--primary:active {
    transform: scale(.97);
    background: linear-gradient(148deg, var(--glass-white-10) 0%, var(--glass-white-02) 100%);
}

/* Secondary */

.glass-btn--secondary {
    font-weight: 500;
    letter-spacing: .04em;
    color: var(--glass-white-90);
    background: var(--glass-white-10);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-white-30);
}

.glass-btn--secondary::before {
    background: linear-gradient(180deg, var(--glass-white-30) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 44%;
}

.glass-btn--secondary:hover {
    background: var(--glass-white-20);
    transform: translateY(-2px);
}

.glass-btn--secondary:active {
    transform: scale(.96)
}

/* Ghost */

.glass-btn--ghost {
    font-weight: 500;
    color: var(--glass-white-80);
    background: transparent;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-white-40);
}

.glass-btn--ghost::before {
    display: none
}

.glass-btn--ghost:hover {
    background: var(--glass-white-08);
    color: #fff;
    transform: translateY(-2px);
    border-color: var(--glass-white-50);
}

.glass-btn--ghost:active {
    transform: scale(.96)
}

/* Sizes */

.glass-btn--xs {
    padding: .3rem .8rem;
    font-size: .72rem;
    border-radius: .45rem
}

.glass-btn--sm {
    padding: .5rem 1.15rem;
    font-size: .8rem;
    border-radius: .6rem
}

.glass-btn--md {
    padding: .68rem 1.5rem;
    font-size: .875rem;
    border-radius: .72rem
}

.glass-btn--lg {
    padding: .875rem 2.1rem;
    font-size: 1rem;
    border-radius: .875rem
}

.glass-btn--xl {
    padding: 1.05rem 2.8rem;
    font-size: 1.1rem;
    border-radius: 1rem
}

.glass-btn--2xl {
    padding: 1.25rem 3.6rem;
    font-size: 1.25rem;
    border-radius: 1.1rem
}

/* Pill */

.glass-btn--pill {
    border-radius: 9999px !important
}

/* Disabled */

.glass-btn:disabled,
.glass-btn[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: .35;
    pointer-events: none;
}

/* Icon-only */

.glass-btn--icon-only {
    padding: 0;
    letter-spacing: 0;
    font-weight: normal;
    background: var(--glass-white-10);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-white-30);
}

.glass-btn--icon-only::before {
    background: linear-gradient(180deg, var(--glass-white-30) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 45%;
}

.glass-btn--icon-only:hover {
    background: var(--glass-white-20);
    transform: translateY(-2px) scale(1.09);
    border-color: var(--glass-white-30);
}

.glass-btn--icon-only:active {
    transform: scale(.92)
}

.glass-btn--icon-only.glass-btn--sm {
    width: 40px;
    height: 40px;
    border-radius: .7rem
}

.glass-btn--icon-only.glass-btn--md {
    width: 52px;
    height: 52px;
    border-radius: .875rem
}

.glass-btn--icon-only.glass-btn--lg {
    width: 60px;
    height: 60px;
    border-radius: 1rem
}

.glass-btn--icon-only.glass-btn--pill {
    border-radius: 50% !important
}
</style>
