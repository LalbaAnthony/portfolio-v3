<template>
    <div class="safe-area">
        <HomeHeroSkeleton v-if="profileLoading" />
        <HomeHero v-else-if="profile" :profile="profile" id="hero" />

        <HomeProjectsSkeleton v-if="projectsLoading" />
        <HomeProjects v-else-if="projects.length" :projects="projects" id="projects" />

        <HomeSkillsSkeleton v-if="skillsLoading" />
        <HomeSkills v-else-if="skills.length" :skills="skills" id="skills" />

        <HomeTimelineSkeleton v-if="milestonesLoading" />
        <HomeTimeline v-else-if="experiences.length || diplomas.length" :experiences="experiences" :diplomas="diplomas"
            id="experiences" />
    </div>
</template>

<script setup lang="ts">
import HomeHero from '~/components/organisms/HomeHero.vue'
import HomeHeroSkeleton from '~/components/organisms/HomeHeroSkeleton.vue'
import HomeProjects from '~/components/organisms/HomeProjects.vue'
import HomeProjectsSkeleton from '~/components/organisms/HomeProjectsSkeleton.vue'
import HomeSkills from '~/components/organisms/HomeSkills.vue'
import HomeSkillsSkeleton from '~/components/organisms/HomeSkillsSkeleton.vue'
import HomeTimeline from '~/components/organisms/HomeTimeline.vue'
import HomeTimelineSkeleton from '~/components/organisms/HomeTimelineSkeleton.vue'
import { useProjectsFeatured } from '~/composables/data/useProjects'
import { useProfile } from '~/composables/data/useProfile'
import { useSkills } from '~/composables/data/useSkills'
import { useMilestones } from '~/composables/data/useMilestones'

const { t } = useI18n()

const [
    { profile, loading: profileLoading },
    { projects, loading: projectsLoading },
    { skills, loading: skillsLoading },
    { experiences, diplomas, loading: milestonesLoading },
] = await Promise.all([
    useProfile(),
    useProjectsFeatured(),
    useSkills(),
    useMilestones(),
])

useAppHead({
    title: t('pages.home.head.title'),
    description: t('pages.home.head.description'),
    url: '/',
})
</script>
