import { getFeaturedProjects, getProjects } from '../../services/project'

export default defineEventHandler((event) => {
  const { featured } = getQuery(event)

  return featured === 'true' ? getFeaturedProjects() : getProjects()
})
