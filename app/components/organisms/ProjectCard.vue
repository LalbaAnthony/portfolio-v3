<template>
    <div class="glass-container p-6 cursor-pointer" @click="navigateTo(`/projects/${props.project.slug}`)">
        <div class="flex items-center mb-3.5">
            <div>
                <h3 class="font-semibold text-lg">{{ props.project.title }}</h3>
                <p class="text-xs text-white/50">{{ props.project.year }}</p>
            </div>
        </div>

        <!-- TODO: Display as pills -->
        <!-- {{ props.project.technologies.join(', ') }} -->

        <p class="text-sm text-white/70 mb-4 line-clamp-1">
            {{ props.project.description[locale] }}
        </p>
        <div class="flex flex-wrap gap-3 items-center">
            <Button v-if="props.project.repository" variant="white" size="sm" icon="ic:round-remove-red-eye" class="flex-1"
                @click.stop="openInNewTab(props.project.repository)">
                {{ t('project.card.see') }}
            </Button>
            <Button as="link" :href="`/projects/${props.project.slug}`" variant="ghost" size="sm">
                {{ t('project.card.details') }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import type { Project } from '#shared/types/project';

const props = defineProps<{
    project: Project
}>()

const { t, locale } = useI18n()
</script>
