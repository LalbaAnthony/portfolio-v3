export const DATE_TIMEZONE = "Europe/Paris";

export const DATE_FORMATS = ['month-year'] as const
export type DateFormat = typeof DATE_FORMATS[number]