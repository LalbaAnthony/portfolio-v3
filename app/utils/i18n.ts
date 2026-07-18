import type { I18nStrings, Language } from '#shared/types/i18n'

export function tString(strings: I18nStrings): string | null {
    const { locale } = useI18n()
    return strings[locale.value as Language] ?? null
}