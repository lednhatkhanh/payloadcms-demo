import { publicEnvironment } from '@repo/contracts/env'
import { contentLocales, type ContentLocale } from '@repo/payload-config/locales'
import type { MetadataRoute } from 'next'

import { getSeoSettings, getSitemapContent } from '@/lib/content'

function absoluteUrl(path: string): string {
  return new URL(path, publicEnvironment.webUrl).toString()
}

function localePath(locale: ContentLocale, path: string): string {
  return `/${locale}${path === '/' ? '' : path}`
}

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    contentLocales.map((locale) => [locale, absoluteUrl(localePath(locale, path))]),
  )
}

function lastModified(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function entry(
  path: string,
  updatedAt: string | undefined,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
): MetadataRoute.Sitemap[number] {
  const updated = lastModified(updatedAt)
  return {
    alternates: { languages: languageAlternates(path) },
    changeFrequency,
    ...(updated ? { lastModified: updated } : {}),
    priority,
    url: absoluteUrl(localePath('en', path)),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings('en')
  if (!settings.allowIndexing) return []

  const content = await getSitemapContent()
  return [
    entry('/', undefined, 'weekly', 1),
    entry('/news', undefined, 'weekly', 0.8),
    entry('/locations', undefined, 'monthly', 0.7),
    ...content.pages.map((page) => entry(page.path, page.updatedAt, 'monthly', 0.7)),
    ...content.news.map((story) =>
      entry(
        `/news/${story.slug}${story.countryCode ? `?country=${encodeURIComponent(story.countryCode)}` : ''}`,
        story.updatedAt,
        'weekly',
        0.6,
      ),
    ),
    ...content.locations.map((location) =>
      entry(`/locations/${location.slug}`, location.updatedAt, 'monthly', 0.6),
    ),
  ]
}
