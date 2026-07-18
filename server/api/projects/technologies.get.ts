import { getTechnologies } from '~~/server/services/project'
import { parseQueryNumber } from '~~/shared/utils/request'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const limit = parseQueryNumber(query.limit)

  const technologies = getTechnologies(limit)
  return technologies
})
