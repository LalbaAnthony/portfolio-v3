import { getProject } from '../../services/project'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 400 })

  const project = getProject(slug)
  if (!project) throw createError({ statusCode: 404 })

  return project
})
