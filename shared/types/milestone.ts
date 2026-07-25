export const MILESTONE_TYPES = ['experience', 'diploma'] as const
export type MilestoneType = typeof MILESTONE_TYPES[number]

export interface Milestone<T extends MilestoneType> {
    type: T
    description?: I18nStrings | null
    startDate: string
    endDate?: string | null
}

export interface MilestoneExperience extends Milestone<'experience'> {
    position: I18nStrings
    company: string
}

export interface MilestoneDiploma extends Milestone<'diploma'> {
    label: I18nStrings
    place: string
    url?: string | null
}

export type MilestoneAny = MilestoneDiploma | MilestoneExperience;

export interface MilestoneFilters {
    type?: MilestoneType | null
}

