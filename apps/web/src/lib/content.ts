import 'server-only'

import config from '@repo/payload-config'
import { mediaDirectory } from '@repo/payload-config/paths'
import type { News, Page } from '@repo/payload-config/types'
import { serverEnvironment } from '@repo/contracts/env'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

export interface HomepageContent {
  readonly aboutBody: string
  readonly aboutTitle: string
  readonly contactBody: string
  readonly contactTitle: string
  readonly eyebrow: string
  readonly heroBody: string
  readonly hero?: MediaReference
  readonly heroTitle: string
  readonly newsletterBody: string
  readonly newsletterTitle: string
  readonly primaryCta: { readonly href: string; readonly label: string }
  readonly secondaryCta: { readonly href: string; readonly label: string }
}

export interface NewsSummary {
  readonly category: string
  readonly excerpt: string
  readonly hero: MediaReference
  readonly publishedAt: string
  readonly slug: string
  readonly title: string
}

export interface NewsArticle extends NewsSummary {
  readonly body: News['body']
}

export interface ManagedPage {
  readonly id: number
  readonly layout: Page['layout']
  readonly lead: string
  readonly slug: string
  readonly title: string
}

type ManagedPageLookup = Pick<Page, 'id' | 'layout' | 'lead' | 'slug' | 'title'>
export type ManagedPageSummary = Pick<ManagedPage, 'lead' | 'slug' | 'title'>

export interface MediaReference {
  readonly alt: string
  readonly url: string
}

export type LocationService = 'logistics-solutions' | 'ocean-freight'

export interface LocationSummary {
  readonly description: string
  readonly hero?: { readonly alt: string; readonly url: string }
  readonly serviceTags: readonly LocationService[]
  readonly slug: string
  readonly title: string
}

export interface LocationRecord extends LocationSummary {
  readonly city: string
  readonly country: string
}

const defaultHomepage: HomepageContent = {
  aboutBody:
    'We publish fewer, better updates: direct reporting, durable explanations, and a point of view you can understand.',
  aboutTitle: 'Built for useful context',
  contactBody: 'Send a note to the editorial team. We read every thoughtful message.',
  contactTitle: 'Have a question worth exploring?',
  eyebrow: 'Independent thinking, clearly told',
  heroBody:
    'The Dispatch is a considered record of the products, people, and ideas shaping what comes next.',
  heroTitle: 'News with room to breathe.',
  newsletterBody: 'A short letter when there is something genuinely useful to share.',
  newsletterTitle: 'The important parts, occasionally.',
  primaryCta: { href: '/news', label: 'Read the latest' },
  secondaryCta: { href: '/#contact', label: 'Talk with us' },
}

function stringValue(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function mediaValue(value: unknown): MediaReference | undefined {
  if (typeof value !== 'object' || value === null || !('url' in value)) return undefined
  const url = stringValue(value.url)
  if (!url) return undefined
  const filename = 'filename' in value ? stringValue(value.filename) : ''
  return {
    alt: 'alt' in value ? stringValue(value.alt) : '',
    url: filename
      ? `/api/media/${encodeURIComponent(filename)}`
      : new URL(url, serverEnvironment.NEXT_PUBLIC_CMS_URL).toString(),
  }
}

function locationServiceValues(value: unknown): readonly LocationService[] {
  if (!Array.isArray(value)) return []
  return value.flatMap((item) =>
    item === 'ocean-freight' || item === 'logistics-solutions' ? [item] : [],
  )
}

function mapSummary(doc: Record<string, unknown>): NewsSummary | undefined {
  const slug = stringValue(doc.slug)
  const title = stringValue(doc.title)
  const hero = mediaValue(doc.heroMedia)
  if (!slug || !title || !hero) return undefined
  return {
    category: stringValue(doc.category, 'News'),
    excerpt: stringValue(doc.excerpt),
    hero,
    publishedAt: stringValue(doc.publishedAt),
    slug,
    title,
  }
}

function mapLocationSummary(doc: Record<string, unknown>): LocationSummary | undefined {
  const slug = stringValue(doc.slug)
  const title = stringValue(doc.title)
  const serviceTags = locationServiceValues(doc.serviceTags)
  if (!slug || !title || serviceTags.length === 0) return undefined
  const hero = mediaValue(doc.heroMedia)
  return {
    description: stringValue(doc.description),
    ...(hero ? { hero } : {}),
    serviceTags,
    slug,
    title,
  }
}

function mapManagedPage(
  page: Pick<Page, 'id' | 'layout' | 'lead' | 'slug' | 'title'>,
): ManagedPage {
  return {
    id: page.id,
    layout: page.layout,
    lead: page.lead,
    slug: page.slug,
    title: page.title,
  }
}

function mapManagedPageSummary(page: Pick<Page, 'lead' | 'slug' | 'title'>): ManagedPageSummary {
  return {
    lead: page.lead,
    slug: page.slug,
    title: page.title,
  }
}

function pageParentId(page: Pick<Page, 'parent'>): number | undefined {
  const parent = page.parent
  if (typeof parent === 'number') return parent
  return parent?.id
}

export async function getHomepage(): Promise<HomepageContent> {
  const payload = await getPayload({ config })
  const homepage = await payload.findGlobal({
    slug: 'homepage',
    depth: 1,
    draft: false,
    overrideAccess: false,
    select: {
      aboutBody: true,
      aboutTitle: true,
      contactBody: true,
      contactTitle: true,
      eyebrow: true,
      heroBody: true,
      heroMedia: true,
      heroTitle: true,
      newsletterBody: true,
      newsletterTitle: true,
      primaryCta: true,
      secondaryCta: true,
    },
  })

  const hero = mediaValue(homepage.heroMedia)
  return {
    aboutBody: stringValue(homepage.aboutBody, defaultHomepage.aboutBody),
    aboutTitle: stringValue(homepage.aboutTitle, defaultHomepage.aboutTitle),
    contactBody: stringValue(homepage.contactBody, defaultHomepage.contactBody),
    contactTitle: stringValue(homepage.contactTitle, defaultHomepage.contactTitle),
    eyebrow: stringValue(homepage.eyebrow, defaultHomepage.eyebrow),
    heroBody: stringValue(homepage.heroBody, defaultHomepage.heroBody),
    ...(hero ? { hero } : {}),
    heroTitle: stringValue(homepage.heroTitle, defaultHomepage.heroTitle),
    newsletterBody: stringValue(homepage.newsletterBody, defaultHomepage.newsletterBody),
    newsletterTitle: stringValue(homepage.newsletterTitle, defaultHomepage.newsletterTitle),
    primaryCta: {
      href: stringValue(homepage.primaryCta?.href, defaultHomepage.primaryCta.href),
      label: stringValue(homepage.primaryCta?.label, defaultHomepage.primaryCta.label),
    },
    secondaryCta: {
      href: stringValue(homepage.secondaryCta?.href, defaultHomepage.secondaryCta.href),
      label: stringValue(homepage.secondaryCta?.label, defaultHomepage.secondaryCta.label),
    },
  }
}

export async function getPublishedNews(limit = 12): Promise<readonly NewsSummary[]> {
  'use cache'
  cacheLife('minutes')
  cacheTag('news')
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'news',
    depth: 1,
    draft: false,
    limit,
    overrideAccess: false,
    select: {
      category: true,
      excerpt: true,
      heroMedia: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
    sort: '-publishedAt',
  })

  return result.docs.flatMap((doc) => {
    const summary = mapSummary(doc as unknown as Record<string, unknown>)
    return summary ? [summary] : []
  })
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  'use cache'
  cacheLife('minutes')
  cacheTag('news', `news:${slug}`)
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'news',
    depth: 1,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: {
      body: true,
      category: true,
      excerpt: true,
      heroMedia: true,
      publishedAt: true,
      slug: true,
      title: true,
    },
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  if (!doc) return undefined
  const record = doc as unknown as Record<string, unknown>
  const summary = mapSummary(record)
  if (!summary) return undefined
  const body = record.body
  if (typeof body !== 'object' || body === null || !('root' in body)) return undefined
  return { ...summary, body: body as News['body'] }
}

export async function getPublishedLocations(): Promise<readonly LocationSummary[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'locations',
    depth: 1,
    draft: false,
    limit: 24,
    overrideAccess: false,
    select: {
      description: true,
      heroMedia: true,
      serviceTags: true,
      slug: true,
      title: true,
    },
    sort: 'title',
  })

  return result.docs.flatMap((doc) => {
    const location = mapLocationSummary(doc as unknown as Record<string, unknown>)
    return location ? [location] : []
  })
}

export async function getLocationBySlug(slug: string): Promise<LocationRecord | undefined> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'locations',
    depth: 1,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: {
      city: true,
      country: true,
      description: true,
      heroMedia: true,
      serviceTags: true,
      slug: true,
      title: true,
    },
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  if (!doc) return undefined
  const record = doc as unknown as Record<string, unknown>
  const location = mapLocationSummary(record)
  if (!location) return undefined
  const city = stringValue(record.city)
  const country = stringValue(record.country)
  if (!city || !country) return undefined
  return { ...location, city, country }
}

async function findPageBySegment(
  slug: string,
  parent: number | undefined,
  draft: boolean,
): Promise<ManagedPageLookup | undefined> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    select: { layout: true, lead: true, slug: true, title: true },
    where:
      parent === undefined
        ? { and: [{ slug: { equals: slug } }, { parent: { exists: false } }] }
        : { and: [{ slug: { equals: slug } }, { parent: { equals: parent } }] },
  })
  return result.docs[0]
}

async function lookupPageByPath(
  segments: readonly string[],
  draft: boolean,
): Promise<ManagedPage | undefined> {
  async function lookupSegment(
    index: number,
    parent: number | undefined,
  ): Promise<ManagedPageLookup | undefined> {
    const segment = segments[index]
    if (!segment) return undefined
    const page = await findPageBySegment(segment, parent, draft)
    if (!page) return undefined
    if (index === segments.length - 1) return page
    return lookupSegment(index + 1, page.id)
  }

  const page = await lookupSegment(0, undefined)
  return page ? mapManagedPage(page) : undefined
}

export async function getPageByPath(
  segments: readonly string[],
  draft = false,
): Promise<ManagedPage | undefined> {
  if (segments.length === 0) return undefined
  return lookupPageByPath(segments, draft)
}

async function getPageChildrenByParentSlug(
  parentSlug: string,
): Promise<readonly ManagedPageSummary[]> {
  const payload = await getPayload({ config })
  const parentResult = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: { slug: true },
    where: { and: [{ slug: { equals: parentSlug } }, { parent: { exists: false } }] },
  })
  const parent = parentResult.docs[0]
  if (!parent) return []

  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    limit: 12,
    overrideAccess: false,
    select: { lead: true, slug: true, title: true },
    sort: 'title',
    where: { parent: { equals: parent.id } },
  })

  return result.docs.map(mapManagedPageSummary)
}

export async function getPublishedPageChildren(
  parentSlug: string,
): Promise<readonly ManagedPageSummary[]> {
  return getPageChildrenByParentSlug(parentSlug)
}

export async function getPagePathById(id: number): Promise<string | undefined> {
  const payload = await getPayload({ config })
  async function findSegments(
    currentId: number,
    depth: number,
  ): Promise<readonly string[] | undefined> {
    if (depth >= 8) return undefined
    const page = await payload.findByID({
      collection: 'pages',
      depth: 0,
      draft: true,
      id: currentId,
      overrideAccess: true,
      select: { parent: true, slug: true },
    })
    const parent = pageParentId(page)
    if (parent === undefined) return [page.slug]
    const parentSegments = await findSegments(parent, depth + 1)
    return parentSegments ? [...parentSegments, page.slug] : undefined
  }

  const segments = await findSegments(id, 0)
  return segments ? `/${segments.join('/')}` : undefined
}

export async function getPublicMediaFile(
  filename: string,
): Promise<{ readonly body: ArrayBuffer; readonly contentType: string } | undefined> {
  if (path.basename(filename) !== filename) return undefined
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'media',
    depth: 0,
    draft: false,
    limit: 1,
    overrideAccess: false,
    select: { filename: true, mimeType: true },
    where: { filename: { equals: filename } },
  })
  const media = result.docs[0]
  const storedFilename = stringValue(media?.filename)
  const contentType = stringValue(media?.mimeType)
  if (!storedFilename || !contentType) return undefined

  const storedFile = await readFile(path.join(mediaDirectory, storedFilename))
  const body = new Uint8Array(storedFile.byteLength)
  body.set(storedFile)
  return { body: body.buffer, contentType }
}
