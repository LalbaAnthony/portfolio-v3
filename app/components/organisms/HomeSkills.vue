<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8">
                <h2 class="title-section mb-2">{{ t('pages.home.skills.title') }}</h2>
                <p class="text-white/60">{{ t('pages.home.skills.description') }}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <SkillCard
                    v-for="skill in props.skills"
                    :key="skill.name"
                    :skill="skill"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Skill } from '~~/shared/types/skill'
import SkillCard from '~/components/organisms/SkillCard.vue'

const props = defineProps<{
    skills: Skill[] | null
}>()

const { t } = useI18n()
</script>
