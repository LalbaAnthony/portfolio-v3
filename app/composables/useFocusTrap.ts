import type { Ref } from 'vue'

const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',')

export function useFocusTrap(containerRef: Ref<HTMLElement | null>) {
    let previousFocus: HTMLElement | null = null

    const getFocusableEls = (): HTMLElement[] =>
        containerRef.value
            ? Array.from(containerRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
            : []

    const trapFocus = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        const els = getFocusableEls()
        if (!els.length) return
        const first = els[0]!
        const last = els[els.length - 1]!
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus() }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus() }
        }
    }

    const activate = async () => {
        previousFocus = document.activeElement as HTMLElement
        await nextTick()
        const els = getFocusableEls()
            ; (els[0] ?? containerRef.value)?.focus()
        document.addEventListener('keydown', trapFocus)
    }

    const deactivate = () => {
        document.removeEventListener('keydown', trapFocus)
        previousFocus?.focus()
        previousFocus = null
    }

    onBeforeUnmount(deactivate)

    return { activate, deactivate }
}
