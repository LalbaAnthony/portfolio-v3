import { parseArrayParam, parseOrder } from '#shared/utils/request'
import { getProjects } from '../../services/project'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const search = typeof query.search === 'string' ? query.search : undefined
  const featured = query.featured === 'true' ? true : query.featured === 'false' ? false : null
  const technologies = parseArrayParam(query.technologies as string | string[] | undefined)

  const order = parseOrder(query.order as string | string[] | undefined)

  return getProjects({ search, featured, technologies }, order)
})
