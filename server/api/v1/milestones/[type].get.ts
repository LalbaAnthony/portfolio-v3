import { parseOrder, parseQueryNumber } from '~~/shared/utils/request'
import { milestoneService } from '~~/server/services/milestone'
import { paginate } from '~~/shared/utils/service'
import { MILESTONE_TYPES, type MilestoneType } from '~~/shared/types/milestone'

export default defineEventHandler((event) => {
  const type = getRouterParam(event, 'type') as MilestoneType
  if (!type) throw createError({ statusCode: 400 })
  if (!MILESTONE_TYPES.includes(type)) throw createError({ statusCode: 400 })

  const query = getQuery(event)

  const limit = parseQueryNumber(query.limit)
  const page = parseQueryNumber(query.page)

  const order = parseOrder(query.order as string | string[] | undefined)

  const count = milestoneService.count({ type })
  const pagination = paginate(page, limit, count)
  const milestones = milestoneService.getAll({ type }, order, pagination)
  return { pagination, data: milestones }
})
