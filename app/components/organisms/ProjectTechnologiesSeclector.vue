<template>
    <div class="flex flex-wrap gap-2">
        <Button v-for="tech in technologies" :key="tech" :variant="selected.includes(tech) ? 'white' : 'ghost'"
            size="sm" pill @click="toggle(tech)">
            {{ tech }}
        </Button>
        <Button v-if="selected.length" variant="secondary" size="sm" pill @click="selected = []">
            {{ t('common.reset') }}
        </Button>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue'

const { t } = useI18n()

const selected = defineModel<string[]>({ default: () => [] })

const { data: technologies } = await useFetch<string[]>('/api/projects/technologies', {
    params: {
        limit: 10,
    }
})

function toggle(tech: string) {
    if (selected.value.includes(tech)) {
        selected.value = selected.value.filter(t => t !== tech)
    } else {
        selected.value = [...selected.value, tech]
    }
}
</script>
