import type { I18nStrings } from './i18n'

export type SkillRating = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface Skill {
    name: string
    rating: SkillRating
    reason?: I18nStrings | null
    iconUrl?: string | null
    siteUrl?: string | null
}

export interface SkillFilters {
    search?: string | null
}