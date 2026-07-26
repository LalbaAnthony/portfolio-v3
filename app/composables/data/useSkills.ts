import useApi from '~/composables/useApi'
import type { Pagination } from '~~/shared/types/service'
import type { Skill } from '~~/shared/types/skill'

export const useSkills = async () => {
    const { data, status, error } = await useAsyncData(
        `skills`,
        async () => {
            try {
                const res = await useApi().get<{ data: Skill[], pagination: Pagination }>(
                    `/skills`,
                    {
                        params: {
                            order: 'rating:DESC',
                            limit: PAGINATION_LIMIT_MAX,
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
        skills: computed(() => data.value?.data ?? []),
        pagination: computed(() => data.value?.pagination ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}
