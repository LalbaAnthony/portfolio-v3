import { projectService } from '~~/server/services/project'

export default defineEventHandler(() => {
  const technologies = projectService.getTechnologies()
  return { data: technologies }
})
