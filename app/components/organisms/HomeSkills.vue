<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8">
                <h2 class="title-section mb-2">{{ t('pages.home.skills.title') }}</h2>
                <p class="text-white/60">{{ t('pages.home.skills.description') }}</p>
            </div>

            <Grid :layouts="{ default: 1, sm: 2, md: 3, lg: 4, '2xl': 5 }">
                <SkillCard v-for="skill in props.skills" :key="skill.name" :skill="skill" />
            </Grid>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Skill } from '~~/shared/types/skill'
import SkillCard from '~/components/organisms/SkillCard.vue'
import Grid from '~/components/molecules/Grid.vue'

const props = defineProps<{
    skills: Skill[] | null
}>()

const { t } = useI18n()
</script>
