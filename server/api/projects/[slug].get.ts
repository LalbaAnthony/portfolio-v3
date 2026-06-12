import { getProjectBySlug } from '../../services/project'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing project slug' })
  }

  const project = getProjectBySlug(slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: `Project "${slug}" not found` })
  }

  return project
})
