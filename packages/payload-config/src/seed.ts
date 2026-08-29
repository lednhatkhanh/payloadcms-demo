import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import type { News } from './generated/payload-types'
import config from './payload.config'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

function lexicalBody(paragraphs: readonly string[]): News['body'] {
  return {
    root: {
      children: paragraphs.map((text) => ({
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

type SeedMedia = {
  readonly alt: string
  readonly directory: 'homepage' | 'locations' | 'news'
  readonly filename: string
}

const homepageHero: SeedMedia = {
  alt: 'Container vessel crossing a calm harbor at sunrise',
  directory: 'homepage',
  filename: 'homepage-hero.png',
}

const stories = [
  {
    legacySlug: 'a-calmer-way-to-follow-what-matters',
    title: 'A clearer way to begin a shipment enquiry',
    slug: 'a-clearer-way-to-begin-a-shipment-enquiry',
    excerpt:
      'Editorial context can explain a form journey in plain language while preserving the boundary between an enquiry and real-time tracking.',
    category: 'company' as const,
    image: {
      alt: 'Container vessel docked below harbor cranes',
      directory: 'news' as const,
      filename: 'news-shipment-enquiry.png',
    },
    featured: true,
    body: lexicalBody([
      'A shipment enquiry is a request for help, not a promise of live operational information. Clear context helps visitors know what to share and what happens next.',
      'The Dispatch can explain a form journey in plain language while keeping operational boundaries honest.',
    ]),
  },
  {
    legacySlug: 'designing-our-publishing-system-in-the-open',
    title: 'What a published editorial review can show',
    slug: 'what-a-published-editorial-review-can-show',
    excerpt:
      'Drafts, publication context, media, categories, and rich text come together in a focused newsroom surface.',
    category: 'product' as const,
    image: {
      alt: 'Route planning documents beside a harbor window',
      directory: 'news' as const,
      filename: 'news-editorial-review.png',
    },
    featured: true,
    body: lexicalBody([
      'A newsroom demonstration is useful when it makes content ownership and the publishing lifecycle visible without making unsupported claims.',
      'The public site and editorial workspace remain separate applications with one shared content model.',
    ]),
  },
  {
    legacySlug: 'the-people-behind-the-first-edition',
    title: 'Choosing a service path for a demonstration brief',
    slug: 'choosing-a-service-path-for-a-demonstration-brief',
    excerpt:
      'A readable entry point for a compact shipping site rather than unsupported operational advice.',
    category: 'ideas' as const,
    image: {
      alt: 'Container cranes at blue hour across a calm harbor',
      directory: 'news' as const,
      filename: 'news-service-path.png',
    },
    featured: false,
    body: lexicalBody([
      'A compact shipping demo can orient visitors through a small number of clear paths before asking them to make a decision.',
      'That structure offers enough context for a useful enquiry without suggesting coverage, performance, or operational advice.',
    ]),
  },
] as const

type SeedLocation = {
  readonly city: string
  readonly country: string
  readonly description: string
  readonly image: SeedMedia
  readonly serviceTags: ('logistics-solutions' | 'ocean-freight')[]
  readonly slug: string
  readonly title: string
}

const locations: SeedLocation[] = [
  {
    city: 'Illustrative port city',
    country: 'Illustrative country',
    description: 'A record with a lead-media region and a focused ocean-freight tag.',
    image: {
      alt: 'Container port city at blue hour, viewed across a calm harbor channel',
      directory: 'locations',
      filename: 'port-city.png',
    },
    serviceTags: ['ocean-freight'],
    slug: 'port-city-record',
    title: 'Port city record',
  },
  {
    city: 'Illustrative inland hub',
    country: 'Illustrative country',
    description: 'A focused intermodal record with a readable logistics-solutions route.',
    image: {
      alt: 'Intermodal freight terminal with a container train and gantry cranes',
      directory: 'locations',
      filename: 'inland-hub.png',
    },
    serviceTags: ['logistics-solutions'],
    slug: 'inland-hub-record',
    title: 'Inland hub record',
  },
  {
    city: 'Illustrative regional point',
    country: 'Illustrative country',
    description: 'A single record can use controlled tags to connect more than one service route.',
    image: {
      alt: 'Regional freight junction with container trailers near a city skyline',
      directory: 'locations',
      filename: 'regional-point.png',
    },
    serviceTags: ['ocean-freight', 'logistics-solutions'],
    slug: 'regional-point-record',
    title: 'Regional point record',
  },
]

const payload = await getPayload({ config })

async function getSeedMediaId(image: SeedMedia): Promise<number> {
  const filePath = path.join(currentDirectory, 'seed-media', image.directory, image.filename)
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    overrideAccess: true,
    where: { filename: { equals: image.filename } },
  })
  if (existing.docs[0]) {
    const updated = await payload.update({
      collection: 'media',
      data: { alt: image.alt },
      filePath,
      id: existing.docs[0].id,
      overwriteExistingFiles: true,
      overrideAccess: true,
    })
    return updated.id
  }

  const created = await payload.create({
    collection: 'media',
    data: { alt: image.alt },
    filePath,
    overrideAccess: true,
  })
  return created.id
}

const newsIds = await Promise.all(
  stories.map(async (story) => {
    const { image, legacySlug, ...data } = story
    const heroMedia = await getSeedMediaId(image)
    const existing = await payload.find({
      collection: 'news',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        or: [{ slug: { equals: data.slug } }, { slug: { equals: legacySlug } }],
      },
    })

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'news',
        data: {
          ...data,
          heroMedia,
          publishedAt: new Date().toISOString(),
          _status: 'published',
        },
        draft: false,
        id: existing.docs[0].id,
        overrideAccess: true,
      })
      return updated.id
    }

    const created = await payload.create({
      collection: 'news',
      data: {
        ...data,
        heroMedia,
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      draft: false,
      overrideAccess: true,
    })
    return created.id
  }),
)

await Promise.all(
  locations.map(async (location) => {
    const { image, ...data } = location
    const heroMedia = await getSeedMediaId(image)
    const existing = await payload.find({
      collection: 'locations',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: location.slug } },
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'locations',
        data: { ...data, heroMedia, _status: 'published' },
        draft: false,
        id: existing.docs[0].id,
        overrideAccess: true,
      })
      return
    }

    await payload.create({
      collection: 'locations',
      data: { ...data, heroMedia, _status: 'published' },
      draft: false,
      overrideAccess: true,
    })
  }),
)

await payload.updateGlobal({
  slug: 'homepage',
  data: {
    eyebrow: 'A public-site demonstration',
    heroTitle: 'Shipping, made clearer.',
    heroBody:
      'A focused demonstration of service paths, illustrative locations, editorial updates, and the right enquiry.',
    heroMedia: await getSeedMediaId(homepageHero),
    primaryCta: { label: 'Start an enquiry', href: '/#enquiry' },
    secondaryCta: { label: 'Visit the newsroom', href: '/news' },
    aboutTitle: 'A small set of useful paths',
    aboutBody:
      'The homepage leads with essential options instead of turning the demo into a general page builder.',
    featuredNews: newsIds,
    contactTitle: 'Point each question to the right form.',
    contactBody:
      'The demo distinguishes a general message, a quote request, and a shipment enquiry without presenting real-time tracking.',
    newsletterTitle: 'Editorial updates, when they are published.',
    newsletterBody: 'A compact footer entry for the demo’s newsletter flow.',
    _status: 'published',
  },
  draft: false,
  overrideAccess: true,
})

await payload.destroy()
