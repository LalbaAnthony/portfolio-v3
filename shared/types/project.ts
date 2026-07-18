import type { I18nStrings } from './i18n'

export interface Project {
  slug: string
  title: string
  abstract: I18nStrings
  description: I18nStrings
  technologies: string[]
  year: number
  featured: boolean
  url?: string
  repository?: string
}
