import config from './payload.config'
import { getPayload } from 'payload'
import type { News } from './generated/payload-types'

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

const stories = [
  {
    legacySlug: 'a-calmer-way-to-follow-what-matters',
    title: 'A clearer way to begin a shipment enquiry',
    slug: 'a-clearer-way-to-begin-a-shipment-enquiry',
    excerpt:
      'Editorial context can explain a form journey in plain language while preserving the boundary between an enquiry and real-time tracking.',
    category: 'company' as const,
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
    featured: false,
    body: lexicalBody([
      'A compact shipping demo can orient visitors through a small number of clear paths before asking them to make a decision.',
      'That structure offers enough context for a useful enquiry without suggesting coverage, performance, or operational advice.',
    ]),
  },
] as const

const payload = await getPayload({ config })
const newsIds = await Promise.all(
  stories.map(async (story) => {
    const { legacySlug, ...data } = story
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
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
      draft: false,
      overrideAccess: true,
    })
    return created.id
  }),
)

await payload.updateGlobal({
  slug: 'homepage',
  data: {
    eyebrow: 'A public-site demonstration',
    heroTitle: 'Shipping, made clearer.',
    heroBody:
      'A focused demonstration of service paths, illustrative locations, editorial updates, and the right enquiry.',
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
