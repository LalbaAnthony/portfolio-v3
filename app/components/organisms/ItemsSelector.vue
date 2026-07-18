<template>
    <div class="flex flex-wrap gap-2">
        <Button v-for="item in props.items" :key="item" :variant="selected.includes(item) ? 'white' : 'ghost'"
            size="sm" pill @click="toggle(item)">
            {{ item }}
        </Button>
        <Button v-if="selected.length" variant="secondary" size="sm" pill @click="selected = []">
            {{ t('common.reset') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'

const props = defineProps<{
    items?: string[] | null,
}>()

const { t } = useI18n()

const selected = defineModel<string[]>({ default: () => [] })

function toggle(item: string) {
    if (selected.value.includes(item)) {
        selected.value = selected.value.filter(t => t !== item)
    } else {
        selected.value = [...selected.value, item]
    }
}
</script>
