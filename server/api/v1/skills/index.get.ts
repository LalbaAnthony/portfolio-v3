import { parseQueryString, parseOrder, parseQueryNumber } from '~~/shared/utils/request'
import { skillService } from '~~/server/services/skill'
import { paginate } from '~~/shared/utils/service'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const search = parseQueryString(query.search)
  const limit = parseQueryNumber(query.limit)
  const page = parseQueryNumber(query.page)

  const order = parseOrder(query.order as string | string[] | undefined)

  const count = skillService.count({ search })
  const pagination = paginate(page, limit, count)
  const skills = skillService.getAll({ search }, order, pagination)
  return { pagination, data: skills }
})
