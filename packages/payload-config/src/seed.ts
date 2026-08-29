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
    legacySlug: 'how-a-new-edition-arrives',
    title: 'A quieter arrival for the next Dispatch edition',
    slug: 'a-quieter-arrival-for-the-next-dispatch-edition',
    excerpt:
      'A short illustration of how a company update can arrive with context before it asks a visitor to take the next step.',
    category: 'company' as const,
    image: {
      alt: 'Container vessel entering a calm working harbor beneath an overcast dawn sky',
      directory: 'news' as const,
      filename: 'news-harbor-arrival.png',
    },
    featured: false,
    body: lexicalBody([
      'A useful company update gives people enough context to understand why it matters before it sends them on to another route.',
      'For this demonstration, the editorial layer stays illustrative: it can explain the shape of an update without claiming a live operational event.',
    ]),
  },
  {
    legacySlug: 'making-publishing-ownership-visible',
    title: 'What changes when publishing has a clear owner',
    slug: 'what-changes-when-publishing-has-a-clear-owner',
    excerpt:
      'An editorial workflow can make the status, context, and responsibilities behind a published story easier to understand.',
    category: 'product' as const,
    image: {
      alt: 'Editorial notes and an unbranded tablet arranged on a desk beside a harbor window',
      directory: 'news' as const,
      filename: 'news-editorial-workflow.png',
    },
    featured: false,
    body: lexicalBody([
      'Publishing is easier to trust when the public page makes a clear distinction between a polished story and the workflow that brought it there.',
      'This demonstration uses the CMS to keep ownership, draft state, media, and public presentation connected without exposing editorial internals.',
    ]),
  },
  {
    legacySlug: 'people-behind-a-useful-first-question',
    title: 'The people behind a more useful first question',
    slug: 'the-people-behind-a-more-useful-first-question',
    excerpt:
      'Clear public routes begin with collaborative choices about what a visitor needs to understand before they send a message.',
    category: 'people' as const,
    image: {
      alt: 'Colleagues reviewing unbranded route maps and an enquiry brief in a harbor-side meeting room',
      directory: 'news' as const,
      filename: 'news-collaboration.png',
    },
    featured: false,
    body: lexicalBody([
      'A good enquiry route is the result of people agreeing on what a visitor needs to know, what can be asked, and what should not be implied.',
      'That shared work turns a short public form into a clearer invitation to begin a conversation.',
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
  {
    legacySlug: 'a-route-map-for-the-next-action',
    title: 'A route map for choosing the next useful action',
    slug: 'a-route-map-for-choosing-the-next-useful-action',
    excerpt:
      'A compact information structure can help a visitor move from a broad shipping question to a more useful public route.',
    category: 'ideas' as const,
    image: {
      alt: 'Abstract paper route diagram and unbranded shipping booklet beside a harbor window',
      directory: 'news' as const,
      filename: 'news-route-map.png',
    },
    featured: false,
    body: lexicalBody([
      'A route map does not need to answer every shipping question. It only needs to make the next useful question easier to find.',
      'That constraint keeps the public experience specific and useful without presenting illustrative content as operational advice.',
    ]),
  },
  {
    legacySlug: 'a-public-update-with-room-to-breathe',
    title: 'A public update with room to breathe',
    slug: 'a-public-update-with-room-to-breathe',
    excerpt:
      'A calm company note can introduce a change, explain its boundaries, and leave the next action clear without overstating the story.',
    category: 'company' as const,
    image: {
      alt: 'Unbranded shipping bulletin beside a window overlooking a working harbor',
      directory: 'news' as const,
      filename: 'news-public-update.png',
    },
    featured: false,
    body: lexicalBody([
      'Company updates work best when they make room for the context that helps readers understand why the note exists.',
      'This illustrative story shows how a public update can stay clear about what it does and does not describe.',
    ]),
  },
  {
    legacySlug: 'a-publishing-queue-with-clear-status',
    title: 'A publishing queue with clear status',
    slug: 'a-publishing-queue-with-clear-status',
    excerpt:
      'A focused product view can make editorial readiness visible without turning the public newsroom into an internal dashboard.',
    category: 'product' as const,
    image: {
      alt: 'Unbranded editorial planning board and tablet on a clean desk',
      directory: 'news' as const,
      filename: 'news-publishing-queue.png',
    },
    featured: false,
    body: lexicalBody([
      'A publishing queue gives an editorial team a shared place to see what is being prepared and what is ready to be reviewed.',
      'The public story only needs the finished result, while the product can keep the underlying status clear for its owners.',
    ]),
  },
  {
    legacySlug: 'the-workshop-behind-a-clearer-enquiry',
    title: 'The workshop behind a clearer enquiry',
    slug: 'the-workshop-behind-a-clearer-enquiry',
    excerpt:
      'A small cross-functional workshop can turn a broad visitor question into a public route that is easier to understand and use.',
    category: 'people' as const,
    image: {
      alt: 'Small team discussing paper route maps at a bright meeting table',
      directory: 'news' as const,
      filename: 'news-enquiry-workshop.png',
    },
    featured: false,
    body: lexicalBody([
      'A clearer enquiry starts with people agreeing on the information a visitor can reasonably provide and the answer they can expect next.',
      'That conversation keeps a public form focused on beginning a helpful exchange rather than simulating live service information.',
    ]),
  },
  {
    legacySlug: 'the-editorial-handoff-that-keeps-context-intact',
    title: 'The editorial handoff that keeps context intact',
    slug: 'the-editorial-handoff-that-keeps-context-intact',
    excerpt:
      'Publishing a useful story depends on people carrying its meaning from a working draft to a calm, public reading experience.',
    category: 'people' as const,
    image: {
      alt: 'Two colleagues reviewing an unbranded printed story layout beside a harbor window',
      directory: 'news' as const,
      filename: 'news-editorial-handoff.png',
    },
    featured: false,
    body: lexicalBody([
      'An editorial handoff is more than a change of ownership. It is a chance to preserve the context that makes a short story useful to a reader.',
      'The illustration stays intentionally modest: it describes collaboration without claiming a specific operational process.',
    ]),
  },
  {
    legacySlug: 'a-small-framework-for-the-next-useful-choice',
    title: 'A small framework for the next useful choice',
    slug: 'a-small-framework-for-the-next-useful-choice',
    excerpt:
      'A concise set of prompts can help a visitor choose a service route without pretending that a general page can resolve every question.',
    category: 'ideas' as const,
    image: {
      alt: 'Paper route-choice notes and a pencil arranged beside a simple harbor chart',
      directory: 'news' as const,
      filename: 'news-route-choice.png',
    },
    featured: false,
    body: lexicalBody([
      'A useful public framework starts by narrowing the decision to the next question a visitor can answer with confidence.',
      'That approach keeps the navigation honest and creates a natural bridge from editorial context to a focused public route.',
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
    featuredNews: newsIds.slice(0, 3),
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
