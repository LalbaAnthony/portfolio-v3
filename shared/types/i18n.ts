export const LANGUAGE_KEYS = ['en', 'fr'] as const
export type Language = typeof LANGUAGE_KEYS[number]
export const LANGUAGE_OBJECTS: { value: Language, label: string, bcp47: string }[] = [
    { value: 'en', label: 'English', bcp47: 'en-GB' },
    { value: 'fr', label: 'Français', bcp47: 'fr-FR' },
]


export type I18nStrings = Record<Language, string | null>
