import useApi from '~/composables/useApi'
import type { Ref } from 'vue'
import type { Pagination } from '~~/shared/types/service'
import type { Project } from '~~/shared/types/project'

export const useProjects = async (params?: { page?: Ref<number>, technologies?: Ref<string[]> }) => {
    const page = params?.page ?? ref(1)
    const technologies = params?.technologies ?? ref<string[]>([])

    const { data, status, error } = await useAsyncData(
        `projects-${page.value}-${technologies.value.join(',')}`,
        async () => {
            try {
                const res = await useApi().get<{ data: Project[], pagination: Pagination }>(
                    `/projects`,
                    {
                        params: {
                            page: page.value,
                            technologies: technologies.value,
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
            watch: [page, technologies],
        }
    )

    return {
        projects: computed(() => data.value?.data ?? []),
        pagination: computed(() => data.value?.pagination ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}

export const useProjectsFeatured = async () => {
    const { data, status, error } = await useAsyncData(
        `projects-featured`,
        async () => {
            try {
                const res = await useApi().get<{ data: Project[], pagination: Pagination }>(
                    `/projects`,
                    {
                        params: {
                            featured: true,
                            limit: 3,
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
        projects: computed(() => data.value?.data ?? []),
        pagination: computed(() => data.value?.pagination ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}

export const useProjectTechnologies = async () => {
    const { data, status, error } = await useAsyncData(
        `projects-technologies`,
        async () => {
            try {
                const res = await useApi().get<{ data: string[], pagination: Pagination }>(`/projects/technologies`)
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
        technologies: computed(() => data.value?.data ?? []),
        pagination: computed(() => data.value?.pagination ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}


export const useProject = async (slug: string) => {
    const { data, status, error } = await useAsyncData(
        `project-${slug}`,
        async () => {
            try {
                const res = await useApi().get<{ data: Project }>(`/projects/${slug}`)
                return res.data ?? null
            } catch {
                return null
            }
        },
        {
            getCachedData: (key, nuxtApp, ctx) => ctx.cause === 'initial' ? (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]) : undefined,
            watch: []
        }
    )

    return {
        project: computed(() => data.value?.data ?? null),
        loading: computed(() => status.value === 'pending'),
        error,
    }
}