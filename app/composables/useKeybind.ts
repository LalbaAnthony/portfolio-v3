type Modifier = 'ctrl' | 'alt' | 'shift'

interface KeybindOptions {
    modifiers?: Modifier[]
    condition?: boolean | (() => boolean) | Ref<boolean>
}

function resolveCondition(condition: KeybindOptions['condition']): boolean {
    if (condition === undefined) return true
    if (typeof condition === 'boolean') return condition
    if (typeof condition === 'function') return condition()
    return condition.value
}

function matchesModifiers(e: KeyboardEvent, modifiers: Modifier[] = []): boolean {
    const required = new Set(modifiers)
    if (required.has('ctrl') !== e.ctrlKey) return false
    if (required.has('alt') !== e.altKey) return false
    if (required.has('shift') !== e.shiftKey) return false
    return true
}

export function useKeybind(key: string, handler: () => void, options: KeybindOptions = {}) {
    function onKey(e: KeyboardEvent) {
        if (e.key !== key) return
        if (!matchesModifiers(e, options.modifiers)) return
        if (!resolveCondition(options.condition)) return
        e.preventDefault()
        handler()
    }

    onMounted(() => window.addEventListener('keydown', onKey))
    onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
}
