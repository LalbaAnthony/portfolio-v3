<template>
    <NuxtLink class="skill-card glass-container p-4 flex flex-col items-center gap-3"
        :class="{ 'skill-card--link': props.skill.siteUrl }"
        :to="props.skill.siteUrl || undefined"
        :external="!!props.skill.siteUrl"
        :target="props.skill.siteUrl ? '_blank' : undefined"
        :rel="props.skill.siteUrl ? 'noopener noreferrer' : undefined">
        <div class="w-8 h-8 flex items-center justify-center shrink-0">
            <img v-if="props.skill.iconUrl && !iconError" :src="props.skill.iconUrl" :alt="props.skill.name"
                class="w-8 h-8 object-contain" @error="iconError = true" />
            <Icon v-else name="mdi:code-tags" size="32px" class="text-white/40" />
        </div>
        <span class="text-md font-medium text-center text-white/80 leading-tight">{{ props.skill.name }}</span>
        <ProgressBar :value="props.skill.rating" :max="10"
            :aria-label="t('pages.home.skills.card.rating', { value: props.skill.rating, max: 10 })" class="w-full" />
        <p v-if="props.skill.reason" class="text-xs text-center text-white/50 leading-tight">{{ tString(props.skill.reason) }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Skill } from '~~/shared/types/skill'
import ProgressBar from '~/components/atoms/ProgressBar.vue'

const props = defineProps<{
    skill: Skill
}>()

const { t } = useI18n()
const iconError = ref(false)
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
