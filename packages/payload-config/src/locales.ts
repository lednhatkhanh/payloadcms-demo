export const contentLocales = ['en', 'jp', 'es'] as const

export type ContentLocale = (typeof contentLocales)[number]

export const defaultContentLocale: ContentLocale = 'en'

export const contentLocaleLabels: Record<ContentLocale, string> = {
  en: 'English',
  es: 'Español',
  jp: '日本語',
}

export function isContentLocale(value: string | undefined): value is ContentLocale {
  return value === 'en' || value === 'jp' || value === 'es'
}
