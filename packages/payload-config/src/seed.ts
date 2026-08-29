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
    title: 'A calmer way to follow what matters',
    slug: 'a-calmer-way-to-follow-what-matters',
    excerpt: 'The Dispatch launches with a slower, clearer approach to company and product news.',
    category: 'company' as const,
    featured: true,
    body: lexicalBody([
      'News should reward attention, not demand it. The Dispatch brings our most important updates into one considered place.',
      'Expect concise reporting, useful context, and a clear record of what changed and why it matters.',
    ]),
  },
  {
    title: 'Designing our publishing system in the open',
    slug: 'designing-our-publishing-system-in-the-open',
    excerpt:
      'How a shared design system keeps the newsroom accessible, coherent, and quick to evolve.',
    category: 'product' as const,
    featured: true,
    body: lexicalBody([
      'Our public site and editorial workspace are separate applications with one shared content model.',
      'That boundary keeps each experience focused while preserving the speed of direct server-side content access.',
    ]),
  },
  {
    title: 'The people behind the first edition',
    slug: 'the-people-behind-the-first-edition',
    excerpt: 'Meet the small team shaping the voice, tooling, and visual rhythm of The Dispatch.',
    category: 'people' as const,
    featured: false,
    body: lexicalBody([
      'A newsroom is a collaboration between editors, designers, engineers, and the readers who keep asking better questions.',
      'This first edition is an invitation to follow along as the publication grows.',
    ]),
  },
] as const

const payload = await getPayload({ config })
const newsIds = await Promise.all(
  stories.map(async (story) => {
    const existing = await payload.find({
      collection: 'news',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: story.slug } },
    })

    if (existing.docs[0]) {
      return existing.docs[0].id
    }

    const created = await payload.create({
      collection: 'news',
      data: {
        ...story,
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
    eyebrow: 'Independent thinking, clearly told',
    heroTitle: 'News with room to breathe.',
    heroBody:
      'The Dispatch is a considered record of the products, people, and ideas shaping what comes next.',
    primaryCta: { label: 'Read the latest', href: '/news' },
    secondaryCta: { label: 'Talk with us', href: '/#contact' },
    aboutTitle: 'Built for useful context',
    aboutBody:
      'We publish fewer, better updates: direct reporting, durable explanations, and a point of view you can understand.',
    featuredNews: newsIds.slice(0, 2),
    contactTitle: 'Have a question worth exploring?',
    contactBody: 'Send a note to the editorial team. We read every thoughtful message.',
    newsletterTitle: 'The important parts, occasionally.',
    newsletterBody: 'A short letter when there is something genuinely useful to share.',
    _status: 'published',
  },
  draft: false,
  overrideAccess: true,
})

await payload.destroy()
