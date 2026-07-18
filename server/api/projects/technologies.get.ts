import { parseQueryNumber } from '~~/shared/utils/request'
import { getTechnologies } from '../../services/project'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const limit = parseQueryNumber(query.limit)

  const technologies = getTechnologies(limit)
  return technologies
})
