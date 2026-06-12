<template>
    <NuxtLink :to="`/projects/${props.project.slug}`" class="glass-container p-6">
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
            <Button as="link" :href="`/projects/${props.project.slug}`" variant="white" size="sm" class="flex-1">{{
                t('pages.projects.details') }}</Button>
            <Button as="link" :href="props.project.repository" variant="ghost" size="sm">{{
                t('pages.projects.repository')
                }}</Button>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import Button from '~/components/atoms/Button.vue';
import type { Project } from '#shared/types/project';

const props = defineProps<{
    project: Project
}>()

const { t, locale } = useI18n()

</script>
