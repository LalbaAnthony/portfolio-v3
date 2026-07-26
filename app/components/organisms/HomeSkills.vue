<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-8">
                <h2 class="title-section mb-2">{{ t('pages.home.skills.title') }}</h2>
                <p class="text-white/60">{{ t('pages.home.skills.description') }}</p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <div
                    v-for="skill in props.skills"
                    :key="skill.name"
                    class="skill-card glass-container p-4 flex flex-col items-center gap-3"
                    :class="{ 'skill-card--link': skill.siteUrl }"
                    @click="skill.siteUrl ? openInNewTab(skill.siteUrl) : undefined"
                >
                    <div class="w-8 h-8 flex items-center justify-center shrink-0">
                        <img
                            v-if="skill.iconUrl && !iconErrors[skill.name]"
                            :src="skill.iconUrl"
                            :alt="skill.name"
                            class="w-8 h-8 object-contain"
                            @error="iconErrors[skill.name] = true"
                        />
                        <Icon v-else name="mdi:code-tags" size="32px" class="text-white/40" />
                    </div>
                    <span class="text-xs font-medium text-center text-white/80 leading-tight">{{ skill.name }}</span>
                    <ProgressBar :value="skill.rating" :max="10" class="w-full" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Skill } from '~~/shared/types/skill'
import ProgressBar from '~/components/atoms/ProgressBar.vue'

const props = defineProps<{
    skills: Skill[] | null
}>()

const { t } = useI18n()
const iconErrors = reactive<Record<string, boolean>>({})
</script>

<style scoped>
.skill-card {
    transition: transform .25s cubic-bezier(.23, 1, .32, 1), border-color .25s ease;
}

.skill-card--link {
    cursor: pointer;
}

.skill-card--link:hover {
    transform: translateY(-4px);
    border-color: var(--glass-white-50);
}
</style>
