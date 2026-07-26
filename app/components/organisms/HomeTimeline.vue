<template>
    <section class="py-16">
        <div class="mx-auto max-w-6xl px-4 md:px-8">
            <div class="mb-10">
                <h2 class="title-section mb-2">{{ t('pages.home.timeline.title') }}</h2>
                <p class="text-white/60">{{ t('pages.home.timeline.description') }}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <Timeline icon="mdi:briefcase-outline" :label="t('pages.home.timeline.experience')"
                    :items="experienceItems" />
                <Timeline icon="mdi:school-outline" :label="t('pages.home.timeline.diploma')" :items="diplomaItems" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { MilestoneExperience, MilestoneDiploma, MilestoneAny } from '~~/shared/types/milestone'
import { formatDate } from '~~/shared/utils/date'
import type { TimelineItem } from '~/components/molecules/Timeline.vue'
import Timeline from '~/components/molecules/Timeline.vue'

const props = defineProps<{
    experiences: MilestoneExperience[] | null
    diplomas: MilestoneDiploma[] | null
}>()

const { t } = useI18n()

function formatDateRange(item: MilestoneAny): string {
    console.log('formatDateRange', item)
    const start = formatDate(item.startDate, 'month-year')
    const end = item.endDate ? formatDate(item.endDate, 'month-year') : t('pages.home.timeline.present')
    return `${start} - ${end}`
}

const experienceItems = computed<TimelineItem[]>(() =>
    (props.experiences ?? []).map(item => ({
        dateRange: formatDateRange(item),
        title: tString(item.position) ?? '',
        subtitle: item.company,
        description: tString(item.description),
    }))
)

const diplomaItems = computed<TimelineItem[]>(() =>
    (props.diplomas ?? []).map(item => ({
        dateRange: formatDateRange(item),
        title: tString(item.label) ?? '',
        subtitle: item.place,
        description: tString(item.description),
    }))
)
</script>
