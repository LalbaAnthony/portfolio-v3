import useApi from '~/composables/useApi'

export const useProfile = async () => {
    const { data, status, error } = await useAsyncData(
        `profile`,
        async () => {
            try {
                const res = await useApi().get<{ data: Profile }>(
                    `/profile`
                )
                return res.data ?? null
            } catch {
                return null
            }
        },
        {
            getCachedData: (key, nuxtApp) => {
                if (nuxtApp.isHydrating) return nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
            }
        }
    )

    return {
        profile: computed(() => data.value?.data ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}