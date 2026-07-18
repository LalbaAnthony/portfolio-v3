import { parseQueryArray, parseQueryString, parseQueryBoolean, parseOrder, parseQueryNumber } from '#shared/utils/request'
import { getProjects } from '../../services/project'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const search = parseQueryString(query.search)
  const featured = parseQueryBoolean(query.featured, false)
  const technologies = parseQueryArray(query.technologies as string | string[] | undefined)
  const limit = parseQueryNumber(query.limit)

  const order = parseOrder(query.order as string | string[] | undefined)

  const projects = getProjects({ search, featured, technologies }, order, limit)
  return projects
})
