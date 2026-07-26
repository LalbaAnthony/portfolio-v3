import { parseQueryString, parseOrder, parseQueryNumber } from '~~/shared/utils/request'
import { certificationService } from '~~/server/services/certification'
import { paginate } from '~~/shared/utils/service'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const search = parseQueryString(query.search)
  const limit = parseQueryNumber(query.limit)
  const page = parseQueryNumber(query.page)

  const order = parseOrder(query.order as string | string[] | undefined, [['date', 'DESC']])

  const count = certificationService.count({ search })
  const pagination = paginate(page, limit, count)
  const certifications = certificationService.getAll({ search }, order, pagination)
  return { pagination, data: certifications }
})
