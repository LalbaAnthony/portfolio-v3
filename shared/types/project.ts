import type { I18nStrings } from './i18n'

export interface Project {
  slug: string
  title: I18nStrings
  abstract: I18nStrings
  description: I18nStrings
  technologies: string[]
  year: number
  featured: boolean
  productionUrl?: string | null
  repositoryUrl?: string | null
}

export interface ProjectFilters {
  search?: string | null
  featured?: boolean | null
  technologies?: string[] | null
}