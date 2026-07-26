import useApi from '~/composables/useApi'
import type { Pagination } from '~~/shared/types/service'
import type { MilestoneAny, MilestoneExperience, MilestoneDiploma } from '~~/shared/types/milestone'

export const useMilestones = async () => {
    const { data, status, error } = await useAsyncData(
        `milestones`,
        async () => {
            try {
                const res = await useApi().get<{ data: MilestoneAny[], pagination: Pagination }>(
                    `/milestones`,
                    {
                        params: {
                            order: 'startDate:DESC'
                        }
                    }
                )
                return res.data ?? null
            } catch {
                return null
            }
        },
        {
            getCachedData: (key, nuxtApp, ctx) => ctx.cause === 'initial' ? (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) : undefined,
        }
    )

    return {
        milestones: computed(() => data.value?.data ?? []),
        experiences: computed(() => (data.value?.data ?? []).filter((m): m is MilestoneExperience => m.type === 'experience')),
        diplomas: computed(() => (data.value?.data ?? []).filter((m): m is MilestoneDiploma => m.type === 'diploma')),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}
