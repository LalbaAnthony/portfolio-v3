import { parseOrder, parseQueryNumber } from '~~/shared/utils/request'
import { milestoneService } from '~~/server/services/milestone'
import { paginate } from '~~/shared/utils/service'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const limit = parseQueryNumber(query.limit)
  const page = parseQueryNumber(query.page)

  const order = parseOrder(query.order as string | string[] | undefined, [['startDate', 'DESC']])

  const count = milestoneService.count({})
  const pagination = paginate(page, limit, count)
  const milestones = milestoneService.getAll({}, order, pagination)
  return { pagination, data: milestones }
})
