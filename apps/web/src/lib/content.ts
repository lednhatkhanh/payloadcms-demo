import 'server-only'

import config from '@repo/payload-config'
import type { News } from '@repo/payload-config/types'
import { serverEnvironment } from '@repo/contracts/env'
import { cacheLife, cacheTag } from 'next/cache'
import { getPayload } from 'payload'

export interface HomepageContent {
  readonly aboutBody: string
  readonly aboutTitle: string
  readonly contactBody: string
  readonly contactTitle: string
  readonly eyebrow: string
  readonly heroBody: string
  readonly heroTitle: string
  readonly newsletterBody: string
  readonly newsletterTitle: string
  readonly primaryCta: { readonly href: string; readonly label: string }
  readonly secondaryCta: { readonly href: string; readonly label: string }
}

export interface NewsSummary {
  readonly category: string
  readonly excerpt: string
  readonly hero?: { readonly alt: string; readonly url: string }
  readonly publishedAt: string
  readonly slug: string
  readonly title: string
}

export interface NewsArticle extends NewsSummary {
  readonly body: News['body']
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

function mediaValue(value: unknown): NewsSummary['hero'] {
  if (typeof value !== 'object' || value === null || !('url' in value)) return undefined
  const url = stringValue(value.url)
  if (!url) return undefined
  return {
    alt: 'alt' in value ? stringValue(value.alt) : '',
    url: new URL(url, serverEnvironment.NEXT_PUBLIC_CMS_URL).toString(),
  }
}

function mapSummary(doc: Record<string, unknown>): NewsSummary | undefined {
  const slug = stringValue(doc.slug)
  const title = stringValue(doc.title)
  if (!slug || !title) return undefined
  const hero = mediaValue(doc.heroMedia)
  return {
    category: stringValue(doc.category, 'News'),
    excerpt: stringValue(doc.excerpt),
    ...(hero ? { hero } : {}),
    publishedAt: stringValue(doc.publishedAt),
    slug,
    title,
  }
}

export async function getHomepage(): Promise<HomepageContent> {
  'use cache'
  cacheLife('minutes')
  cacheTag('homepage')
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
      heroTitle: true,
      newsletterBody: true,
      newsletterTitle: true,
      primaryCta: true,
      secondaryCta: true,
    },
  })

  return {
    aboutBody: stringValue(homepage.aboutBody, defaultHomepage.aboutBody),
    aboutTitle: stringValue(homepage.aboutTitle, defaultHomepage.aboutTitle),
    contactBody: stringValue(homepage.contactBody, defaultHomepage.contactBody),
    contactTitle: stringValue(homepage.contactTitle, defaultHomepage.contactTitle),
    eyebrow: stringValue(homepage.eyebrow, defaultHomepage.eyebrow),
    heroBody: stringValue(homepage.heroBody, defaultHomepage.heroBody),
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
