import { getProjectTechnologies } from '~~/server/services/project'

export default defineEventHandler(() => {
  const technologies = getProjectTechnologies()
  return { data: technologies }
})
