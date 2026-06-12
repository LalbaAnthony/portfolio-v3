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
        <Spinner v-if="loading" />
        <span class="glass-btn__content">
            <slot />
        </span>
    </button>
</template>

<script setup lang="ts">
import Spinner from './Spinner.vue';

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
/* -- Base --------------------------------------------------- */
.glass-btn {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: #fff;
    font-weight: 600;
    letter-spacing: .05em;
    text-shadow: 0 1px 4px rgba(0, 0, 0, .2);
    border: none;
    transition: all .35s cubic-bezier(.23, 1, .32, 1);
}

.glass-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, .44) 0%, rgba(255, 255, 255, .07) 26%, transparent 52%);
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

/* -- Primary ------------------------------------------------ */
.glass-btn--primary {
    background: linear-gradient(148deg, rgba(255, 255, 255, .27) 0%, rgba(255, 255, 255, .07) 55%, rgba(255, 255, 255, .02) 100%);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, .42);
    border-bottom-color: rgba(255, 255, 255, .13);
}

.glass-btn--primary:hover {
    background: linear-gradient(148deg, rgba(255, 255, 255, .37) 0%, rgba(255, 255, 255, .13) 55%, rgba(255, 255, 255, .04) 100%);
    transform: translateY(-3px) scale(1.03);
    border-color: rgba(255, 255, 255, .58);
}

.glass-btn--primary:active {
    transform: scale(.97);
    background: linear-gradient(148deg, rgba(255, 255, 255, .13) 0%, rgba(255, 255, 255, .02) 100%);
}

/* -- Secondary ---------------------------------------------- */
.glass-btn--secondary {
    font-weight: 500;
    letter-spacing: .04em;
    color: rgba(255, 255, 255, .9);
    background: rgba(255, 255, 255, .10);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, .30);
}

.glass-btn--secondary::before {
    background: linear-gradient(180deg, rgba(255, 255, 255, .32) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 44%;
}

.glass-btn--secondary:hover {
    background: rgba(255, 255, 255, .18);
    transform: translateY(-2px);
}

.glass-btn--secondary:active {
    transform: scale(.96)
}

/* -- Ghost -------------------------------------------------- */
.glass-btn--ghost {
    font-weight: 500;
    color: rgba(255, 255, 255, .78);
    background: transparent;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, .35);
}

.glass-btn--ghost::before {
    display: none
}

.glass-btn--ghost:hover {
    background: rgba(255, 255, 255, .08);
    color: #fff;
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, .52);
}

.glass-btn--ghost:active {
    transform: scale(.96)
}

/* -- Sizes -------------------------------------------------- */
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

/* -- Pill --------------------------------------------------- */
.glass-btn--pill {
    border-radius: 9999px !important
}

/* -- Disabled ----------------------------------------------- */
.glass-btn:disabled,
.glass-btn[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: .35;
    pointer-events: none;
}

/* -- Icon-only ---------------------------------------------- */
.glass-btn--icon-only {
    padding: 0;
    letter-spacing: 0;
    font-weight: normal;
    background: rgba(255, 255, 255, .09);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, .28);
}

.glass-btn--icon-only::before {
    background: linear-gradient(180deg, rgba(255, 255, 255, .33) 0%, transparent 100%);
    inset: 0 0 auto 0;
    height: 45%;
}

.glass-btn--icon-only:hover {
    background: rgba(255, 255, 255, .19);
    transform: translateY(-2px) scale(1.09);
    border-color: rgba(255, 255, 255, .28);
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

/* Colored icon-only overrides retain variant bg/border */
.glass-btn--icon-only.glass-btn--danger {
    background: rgba(255, 80, 80, .25);
    border-color: rgba(255, 120, 120, .4)
}

.glass-btn--icon-only.glass-btn--success {
    background: rgba(50, 200, 100, .25);
    border-color: rgba(80, 220, 120, .4)
}

.glass-btn--icon-only.glass-btn--info {
    background: rgba(60, 140, 255, .25);
    border-color: rgba(100, 170, 255, .4)
}

.glass-btn--icon-only.glass-btn--warning {
    background: rgba(255, 160, 40, .25);
    border-color: rgba(255, 190, 80, .4)
}
</style>
