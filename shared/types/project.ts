import type { StringByLang } from './i18n'

export interface Project {
  slug: string
  title: string
  description: StringByLang
  technologies: string[]
  year: number
  featured: boolean
  url?: string
  repository?: string
}
