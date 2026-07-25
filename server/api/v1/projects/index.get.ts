import { parseQueryArray, parseQueryString, parseQueryBoolean, parseOrder, parseQueryNumber } from '~~/shared/utils/request'
import { projectService } from '~~/server/services/project'
import { paginate } from '~~/shared/utils/service'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const search = parseQueryString(query.search)
  const featured = parseQueryBoolean(query.featured, false)
  const technologies = parseQueryArray(query.technologies as string | string[] | undefined)
  const limit = parseQueryNumber(query.limit)
  const page = parseQueryNumber(query.page)

  const order = parseOrder(query.order as string | string[] | undefined)

  const count = projectService.count({ search, featured, technologies })
  const pagination = paginate(page, limit, count,)
  const projects = projectService.getAll({ search, featured, technologies }, order, pagination)
  return { pagination, data: projects }
})
