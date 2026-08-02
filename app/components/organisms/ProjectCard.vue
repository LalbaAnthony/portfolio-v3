<template>
    <div class="glass-container p-6">
        <div class="flex items-center mb-3 gap-2">
            <div class="flex-1">
                <h3 class="font-semibold text-lg">{{ tString(props.project.title) }}</h3>
            </div>
            <p class="text-xs text-white/50">{{ props.project.year }}</p>
        </div>
        
        <div v-if="props.project.technologies?.length" class="flex gap-1.5 mb-3">
            <Pill v-for="tech in props.project.technologies.slice(0, 2)" :key="tech">
                {{ tech }}
            </Pill>
        </div>

        <p class="text-sm text-white/70 mb-4 line-clamp-1">
            {{ tString(props.project.abstract) }}
        </p>

        <div class="flex flex-wrap gap-3 items-center">
            <Button v-if="props.project.productionUrl" as="link" :to="props.project.productionUrl" variant="white"
                size="sm" icon="ic:round-remove-red-eye" class="flex-1">
                {{ t('project.card.production') }}
            </Button>
            <Button v-else-if="props.project.repositoryUrl" as="link" :to="props.project.repositoryUrl" variant="white"
                size="sm" icon="mdi:github" class="flex-1">
                {{ t('project.card.repository') }}
            </Button>
            <Button as="link" :to="`/projects/${props.project.slug}`" variant="ghost" size="sm">
                {{ t('project.card.details') }}
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import type { Project } from '#shared/types/project';
import Pill from '../atoms/Pill.vue';

const props = defineProps<{
    project: Project
}>()

const { t } = useI18n()
</script>
