<template>
    <div class="w-full">
        <div v-if="props.canLoadMore && !props.error" ref="sentinel" class="h-px w-full" aria-hidden="true" />

        <slot v-if="props.loading" name="loading" />

        <div v-else-if="props.error" class="flex flex-col items-center gap-3 py-6">
            <slot name="error">
                <p class="text-sm text-white/60">{{ t('common.error') }}</p>
                <Button variant="ghost" size="sm" icon="mdi:refresh" @click="emit('load')">
                    {{ t('common.retry') }}
                </Button>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInfiniteScroll, INFINITE_SCROLL_ROOT_MARGIN } from '~/composables/useInfiniteScroll'
import Button from '~/components/atoms/Button.vue'

const props = withDefaults(defineProps<{
    canLoadMore?: boolean
    loading?: boolean
    error?: boolean
    rootMargin?: string
}>(), {
    canLoadMore: false,
    loading: false,
    error: false,
    rootMargin: INFINITE_SCROLL_ROOT_MARGIN,
})

const emit = defineEmits<{ load: [] }>()

const { t } = useI18n()

const sentinel = ref<HTMLElement | null>(null)

useInfiniteScroll(sentinel, () => emit('load'), {
    rootMargin: props.rootMargin,
    enabled: () => props.canLoadMore && !props.loading && !props.error,
})
</script>
