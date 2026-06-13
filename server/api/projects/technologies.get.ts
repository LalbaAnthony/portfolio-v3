import { getTechnologies } from '../../services/project'

export default defineEventHandler((event) => {
    const query = getQuery(event)
  
    const limit = typeof query.limit === 'string' ? parseInt(query.limit, 10) : undefined
  
  return getTechnologies(limit)
})
