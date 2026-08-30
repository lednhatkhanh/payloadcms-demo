import 'server-only'

import {
  defaultContentLocale,
  isContentLocale,
  type ContentLocale,
} from '@repo/payload-config/locales'
import { headers } from 'next/headers'

export async function getSiteLocale(): Promise<ContentLocale> {
  const requestHeaders = await headers()
  const locale = requestHeaders.get('x-site-locale') ?? undefined
  return isContentLocale(locale) ? locale : defaultContentLocale
}

export function localeTag(locale: ContentLocale): string {
  return locale === 'ja' ? 'ja-JP' : locale === 'es' ? 'es-ES' : 'en-US'
}
