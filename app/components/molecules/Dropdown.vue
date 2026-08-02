<template>
    <div ref="containerRef" class="dropdown">
        <Button :variant="variant" :size="size" :pill="pill" :disabled="disabled" :icon="icon"
            trailing-icon="mdi:chevron-down" :class="['dropdown__trigger', { 'dropdown__trigger--open': open }]"
            :aria-haspopup="'listbox'" :aria-expanded="open" @click="toggle">
            {{ selectedLabel }}
        </Button>

        <Transition name="dropdown-panel">
            <div v-if="open" role="listbox" class="dropdown__panel">
                <button v-for="option in options" :key="option.value" role="option" class="dropdown__option"
                    :class="{ 'dropdown__option--active': modelValue === option.value }"
                    :aria-selected="modelValue === option.value" type="button" @click="select(option.value)">
                    {{ option.label }}
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { ComponentVariant, ComponentSize } from '#shared/types/component'
import Button from '~/components/atoms/Button.vue'

interface DropdownOption {
    label: string
    value: string | number
}

const props = withDefaults(defineProps<{
    options: DropdownOption[]
    modelValue?: string | number | null
    variant?: ComponentVariant
    size?: ComponentSize
    pill?: boolean
    disabled?: boolean
    icon?: string
    placeholder?: string
}>(), {
    variant: 'glass',
    size: 'md',
    modelValue: null,
    placeholder: '—',
})

const emit = defineEmits<{
    'update:modelValue': [value: string | number]
}>()

const open = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
    const found = props.options.find(o => o.value === props.modelValue)
    return found ? found.label : props.placeholder
})

function toggle() {
    if (!props.disabled) open.value = !open.value
}

function select(value: string | number) {
    emit('update:modelValue', value)
    open.value = false
}

function onClickOutside(e: MouseEvent) {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
        open.value = false
    }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown__trigger--open :deep(.btn__trailing-icon) {
    transform: rotate(180deg);
}

.dropdown__panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    min-width: 100%;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 6px;
    background: linear-gradient(148deg, var(--glass-white-30) 0%, var(--glass-white-08) 55%, var(--glass-white-02) 100%);
    backdrop-filter: var(--glass-filter-md);
    -webkit-backdrop-filter: var(--glass-filter-md);
    border: 1px solid var(--glass-white-40);
    border-bottom-color: var(--glass-white-10);
    border-radius: .72rem;
}

.dropdown__option {
    display: block;
    width: 100%;
    padding: .45rem .85rem;
    text-align: left;
    font-size: .875rem;
    font-weight: 500;
    letter-spacing: .03em;
    color: var(--glass-white-80);
    background: transparent;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
}

.dropdown__option:hover {
    background: var(--glass-white-10);
    color: #fff;
}

.dropdown__option--active {
    background: var(--glass-white-20);
    color: #fff;
    font-weight: 600;
}

/* Transition */

.dropdown-panel-enter-active,
.dropdown-panel-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
    transform-origin: top;
}

.dropdown-panel-enter-from,
.dropdown-panel-leave-to {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
}
</style>
