import type { I18nStrings, Language } from '#shared/types/i18n'

export function tString(strings: I18nStrings | null | undefined): string | null {
    const { locale } = useI18n()
    
    if (!strings) return null
    return strings[locale.value as Language] ?? null
}