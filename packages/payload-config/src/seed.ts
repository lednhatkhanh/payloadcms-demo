import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import type { News, Page } from './generated/payload-types'
import type { ContentLocale } from './locales'
import config from './payload.config'
import type { EditorialRole, WorkflowState } from './workflow'

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

type PageBlock = Page['layout'][number]
type RichTextPageBlock = Extract<PageBlock, { readonly blockType: 'richText' }>
type ImagePageBlock = Extract<PageBlock, { readonly blockType: 'image' }>
type FeaturePageBlock = Extract<PageBlock, { readonly blockType: 'feature' }>
type CalloutPageBlock = Extract<PageBlock, { readonly blockType: 'callout' }>
type PageLinksBlock = Extract<PageBlock, { readonly blockType: 'pageLinks' }>

function richTextPageBlock(paragraphs: readonly string[]): RichTextPageBlock {
  return { blockType: 'richText', content: lexicalBody(paragraphs) }
}

function imagePageBlock(media: number, caption: string): ImagePageBlock {
  return { blockType: 'image', caption, media }
}

function featurePageBlock(
  title: string,
  body: string,
  media: number,
  label: string,
  href: string,
): FeaturePageBlock {
  return { blockType: 'feature', body, link: { href, label }, media, title }
}

function calloutPageBlock(
  title: string,
  body: string,
  label: string,
  href: string,
): CalloutPageBlock {
  return { blockType: 'callout', body, link: { href, label }, title }
}

function pageLinksBlock(title: string, body: string, pages: readonly number[]): PageLinksBlock {
  return { blockType: 'pageLinks', body, pages: [...pages], title }
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

type PageSeed = {
  readonly lead: string
  readonly layout: Page['layout']
  readonly parent?: number
  readonly reviewNote?: string
  readonly reviewRequestedBy?: number
  readonly reviewedBy?: number
  readonly slug: string
  readonly status: 'draft' | 'published'
  readonly title: string
  readonly workflowState?: WorkflowState
}

const payload = await getPayload({ config })

async function repairLocalizedContent(): Promise<void> {
  await Promise.all([
    ...stories.map(async (story) => {
      const existing = await payload.find({
        collection: 'news',
        depth: 0,
        limit: 1,
        locale: 'all',
        overrideAccess: true,
        where: {
          or: [{ slug: { equals: story.slug } }, { slug: { equals: story.legacySlug } }],
        },
      })
      const record = existing.docs[0]
      if (!record) return
      await payload.update({
        collection: 'news',
        data: { body: story.body, excerpt: story.excerpt, title: story.title },
        draft: false,
        id: record.id,
        locale: 'en',
        overrideAccess: true,
      })
    }),
    ...locations.map(async (location) => {
      const existing = await payload.find({
        collection: 'locations',
        depth: 0,
        limit: 1,
        locale: 'all',
        overrideAccess: true,
        where: { slug: { equals: location.slug } },
      })
      const record = existing.docs[0]
      if (!record) return
      await payload.update({
        collection: 'locations',
        data: { description: location.description, title: location.title },
        draft: false,
        id: record.id,
        locale: 'en',
        overrideAccess: true,
      })
    }),
  ])

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      aboutBody:
        'The homepage leads with essential options instead of turning the demo into a general page builder.',
      aboutTitle: 'A small set of useful paths',
      contactBody:
        'The demo distinguishes a general message, a quote request, and a shipment enquiry without presenting real-time tracking.',
      contactTitle: 'Point each question to the right form.',
      eyebrow: 'A public-site demonstration',
      heroBody:
        'A focused demonstration of service paths, illustrative locations, editorial updates, and the right enquiry.',
      heroTitle: 'Shipping, made clearer.',
      newsletterBody: 'A compact footer entry for the demo’s newsletter flow.',
      newsletterTitle: 'Editorial updates, when they are published.',
      primaryCta: { href: '/#enquiry', label: 'Start an enquiry' },
      secondaryCta: { href: '/news', label: 'Visit the newsroom' },
    },
    draft: false,
    locale: 'en',
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      aboutBody:
        'La página principal prioriza las opciones esenciales sin convertir la demostración en un creador de páginas general.',
      aboutTitle: 'Un conjunto pequeño de rutas útiles',
      contactBody:
        'La demostración distingue un mensaje general, una solicitud de presupuesto y una consulta de envío sin presentar seguimiento en tiempo real.',
      contactTitle: 'Dirige cada pregunta al formulario adecuado.',
      eyebrow: 'Una demostración de sitio público',
      heroBody:
        'Una demostración enfocada en rutas de servicio, ubicaciones ilustrativas, actualizaciones editoriales y la consulta adecuada.',
      heroTitle: 'Envíos, con mayor claridad.',
      newsletterBody:
        'Una entrada de pie de página compacta para el flujo de boletines de la demostración.',
      newsletterTitle: 'Actualizaciones editoriales, cuando se publican.',
      primaryCta: { href: '/#enquiry', label: 'Iniciar una consulta' },
      secondaryCta: { href: '/news', label: 'Visitar la sala de prensa' },
    },
    draft: false,
    locale: 'es',
    overrideAccess: true,
  })

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      aboutBody:
        'このホームページでは、デモを汎用的なページビルダーにせず、必要な選択肢を優先しています。',
      aboutTitle: '役立つ経路を厳選',
      contactBody:
        'このデモでは、一般的なメッセージ、見積もり依頼、配送に関するお問い合わせを区別し、リアルタイム追跡とは表示しません。',
      contactTitle: '質問ごとに適切なフォームへ。',
      eyebrow: '公開サイトのデモンストレーション',
      heroBody:
        'サービス経路、説明用の拠点、編集記事、適切なお問い合わせを示す、焦点を絞ったデモです。',
      heroTitle: '配送を、もっとわかりやすく。',
      newsletterBody: 'デモのニュースレターフロー用に用意した、簡潔なフッター項目です。',
      newsletterTitle: '公開時に届く、編集アップデート。',
      primaryCta: { href: '/#enquiry', label: 'お問い合わせを始める' },
      secondaryCta: { href: '/news', label: 'ニュースルームを見る' },
    },
    draft: false,
    locale: 'jp',
    overrideAccess: true,
  })
}

if (process.env.PAYLOAD_SEED_SCOPE === 'localized-content') {
  await repairLocalizedContent()
  await payload.destroy()
} else {
  type DemoUser = {
    readonly email: string
    readonly name: string
    readonly role: EditorialRole
  }

  const demoUserPassword = 'Abc123@@'

  const demoAdmin: DemoUser = { email: 'admin@dispatch.demo', name: 'Alex Admin', role: 'admin' }
  const demoEditor: DemoUser = {
    email: 'editor@dispatch.demo',
    name: 'Maya Editor',
    role: 'editor',
  }
  const demoReviewer: DemoUser = {
    email: 'reviewer@dispatch.demo',
    name: 'Rowan Reviewer',
    role: 'reviewer',
  }
  const demoTranslator: DemoUser = {
    email: 'translator@dispatch.demo',
    name: 'Jordan Translator',
    role: 'translator',
  }
  const demoPublisher: DemoUser = {
    email: 'publisher@dispatch.demo',
    name: 'Parker Publisher',
    role: 'publisher',
  }

  async function upsertDemoUser(user: DemoUser): Promise<number> {
    const existing = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { email: { equals: user.email } },
    })

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'users',
        data: { name: user.name, password: demoUserPassword, roles: [user.role] },
        id: existing.docs[0].id,
        overrideAccess: true,
      })
      return updated.id
    }

    const created = await payload.create({
      collection: 'users',
      data: {
        email: user.email,
        name: user.name,
        password: demoUserPassword,
        roles: [user.role],
      },
      overrideAccess: true,
    })
    return created.id
  }

  await upsertDemoUser(demoAdmin)
  const editorId = await upsertDemoUser(demoEditor)
  const reviewerId = await upsertDemoUser(demoReviewer)
  await upsertDemoUser(demoTranslator)
  await upsertDemoUser(demoPublisher)

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
            workflowState: 'approved',
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
          workflowState: 'approved',
          _status: 'published',
        },
        draft: false,
        overrideAccess: true,
      })
      return created.id
    }),
  )

  type NewsTranslation = {
    readonly excerpt: string
    readonly locale: Exclude<ContentLocale, 'en'>
    readonly slug: string
    readonly title: string
  }

  const seededNewsTranslations: readonly NewsTranslation[] = [
    {
      excerpt:
        'El contexto editorial puede explicar un proceso de consulta en lenguaje sencillo sin confundir una consulta con el seguimiento en tiempo real.',
      locale: 'es',
      slug: 'a-clearer-way-to-begin-a-shipment-enquiry',
      title: 'Una forma más clara de iniciar una consulta de envío',
    },
    {
      excerpt:
        '編集上の文脈は、お問い合わせとリアルタイム追跡を混同させずに、フォームの流れをわかりやすく説明できます。',
      locale: 'jp',
      slug: 'a-clearer-way-to-begin-a-shipment-enquiry',
      title: '配送に関するお問い合わせを、より明確に始める方法',
    },
    {
      excerpt:
        'Borradores, contexto de publicación, medios, categorías y texto enriquecido se reúnen en una superficie editorial enfocada.',
      locale: 'es',
      slug: 'what-a-published-editorial-review-can-show',
      title: 'Lo que puede mostrar una revisión editorial publicada',
    },
    {
      excerpt:
        '下書き、公開時の文脈、メディア、カテゴリー、リッチテキストを、焦点の定まったニュースルーム画面にまとめます。',
      locale: 'jp',
      slug: 'what-a-published-editorial-review-can-show',
      title: '公開された編集レビューで示せること',
    },
    {
      excerpt:
        'Una actualización breve puede ofrecer contexto antes de invitar al visitante a dar el siguiente paso.',
      locale: 'es',
      slug: 'a-quieter-arrival-for-the-next-dispatch-edition',
      title: 'Una llegada más tranquila para la próxima edición de The Dispatch',
    },
    {
      excerpt: '短い更新でも、次の行動を促す前に必要な文脈を伝えられます。',
      locale: 'jp',
      slug: 'a-quieter-arrival-for-the-next-dispatch-edition',
      title: '次の The Dispatch 号を静かに届ける',
    },
    {
      excerpt:
        'Un flujo editorial puede aclarar el estado, el contexto y las responsabilidades de una historia publicada.',
      locale: 'es',
      slug: 'what-changes-when-publishing-has-a-clear-owner',
      title: 'Qué cambia cuando la publicación tiene una responsabilidad clara',
    },
    {
      excerpt: '編集ワークフローは、公開記事の状態、背景、責任をわかりやすくします。',
      locale: 'jp',
      slug: 'what-changes-when-publishing-has-a-clear-owner',
      title: '公開の責任者が明確になると何が変わるか',
    },
    {
      excerpt:
        'Las rutas públicas claras empiezan con decisiones compartidas sobre lo que una persona debe entender antes de enviar un mensaje.',
      locale: 'es',
      slug: 'the-people-behind-a-more-useful-first-question',
      title: 'Las personas detrás de una primera pregunta más útil',
    },
    {
      excerpt:
        '明確な公開導線は、メッセージを送る前に訪問者が知るべきことを協力して決めるところから始まります。',
      locale: 'jp',
      slug: 'the-people-behind-a-more-useful-first-question',
      title: 'より役立つ最初の質問を支える人々',
    },
    {
      excerpt:
        'Una entrada clara para un sitio de envíos compacto, sin presentar consejos operativos sin respaldo.',
      locale: 'es',
      slug: 'choosing-a-service-path-for-a-demonstration-brief',
      title: 'Elegir una ruta de servicio para una demostración',
    },
    {
      excerpt: '根拠のない運用アドバイスを示さない、コンパクトな配送サイトの読みやすい入口です。',
      locale: 'jp',
      slug: 'choosing-a-service-path-for-a-demonstration-brief',
      title: 'デモの要件に合わせてサービス導線を選ぶ',
    },
    {
      excerpt:
        'Una estructura de información compacta ayuda a pasar de una pregunta amplia a una ruta pública más útil.',
      locale: 'es',
      slug: 'a-route-map-for-choosing-the-next-useful-action',
      title: 'Un mapa de rutas para elegir la próxima acción útil',
    },
    {
      excerpt: 'コンパクトな情報設計が、幅広い配送の質問から役立つ公開導線への移動を支えます。',
      locale: 'jp',
      slug: 'a-route-map-for-choosing-the-next-useful-action',
      title: '次に役立つ行動を選ぶためのルートマップ',
    },
    {
      excerpt:
        'Una nota de empresa serena puede presentar un cambio y dejar clara la siguiente acción sin exagerar la historia.',
      locale: 'es',
      slug: 'a-public-update-with-room-to-breathe',
      title: 'Una actualización pública con espacio para respirar',
    },
    {
      excerpt: '落ち着いた企業のお知らせは、内容を誇張せず変更と次の行動を明確に伝えられます。',
      locale: 'jp',
      slug: 'a-public-update-with-room-to-breathe',
      title: '余白のある公開アップデート',
    },
    {
      excerpt:
        'Una vista de producto enfocada puede mostrar la preparación editorial sin convertir la sala de prensa pública en un panel interno.',
      locale: 'es',
      slug: 'a-publishing-queue-with-clear-status',
      title: 'Una cola de publicación con estado claro',
    },
    {
      excerpt:
        '公開ニュースルームを内部ダッシュボードにせず、編集準備の状況を示せるプロダクト画面です。',
      locale: 'jp',
      slug: 'a-publishing-queue-with-clear-status',
      title: '状態が明確な公開キュー',
    },
    {
      excerpt:
        'Un pequeño taller interfuncional puede convertir una pregunta amplia en una ruta pública más fácil de entender y usar.',
      locale: 'es',
      slug: 'the-workshop-behind-a-clearer-enquiry',
      title: 'El taller detrás de una consulta más clara',
    },
    {
      excerpt: '小さな部門横断ワークショップが、幅広い質問を使いやすい公開導線へと変えます。',
      locale: 'jp',
      slug: 'the-workshop-behind-a-clearer-enquiry',
      title: 'より明確なお問い合わせを支えるワークショップ',
    },
    {
      excerpt:
        'Publicar una historia útil depende de conservar su significado desde el borrador hasta la lectura pública.',
      locale: 'es',
      slug: 'the-editorial-handoff-that-keeps-context-intact',
      title: 'El relevo editorial que conserva el contexto',
    },
    {
      excerpt: '役立つ記事の公開には、下書きから公開閲覧まで意味を保ち続けることが必要です。',
      locale: 'jp',
      slug: 'the-editorial-handoff-that-keeps-context-intact',
      title: '文脈を保つ編集の引き継ぎ',
    },
    {
      excerpt:
        'Un conjunto breve de preguntas puede ayudar a elegir una ruta de servicio sin fingir que una página general resuelve todo.',
      locale: 'es',
      slug: 'a-small-framework-for-the-next-useful-choice',
      title: 'Un pequeño marco para la próxima decisión útil',
    },
    {
      excerpt:
        '簡潔な問いかけの組み合わせが、一般ページですべてを解決できるふりをせずにサービス導線を選ぶ助けになります。',
      locale: 'jp',
      slug: 'a-small-framework-for-the-next-useful-choice',
      title: '次の役立つ選択のための小さな枠組み',
    },
  ]

  async function seedNewsTranslations(index = 0): Promise<void> {
    const translation = seededNewsTranslations[index]
    if (!translation) return

    const storyIndex = stories.findIndex((story) => story.slug === translation.slug)
    const id = storyIndex === -1 ? undefined : newsIds[storyIndex]
    if (id) {
      await payload.update({
        collection: 'news',
        data: {
          body: lexicalBody([
            translation.excerpt,
            translation.locale === 'es'
              ? 'Esta historia ilustrativa explica una ruta pública clara sin presentar información operativa en tiempo real.'
              : 'この記事は、リアルタイムの運用情報を示さず、わかりやすい公開導線を説明するための例です。',
          ]),
          excerpt: translation.excerpt,
          title: translation.title,
        },
        draft: false,
        id,
        locale: translation.locale,
        overrideAccess: true,
      })
    }

    await seedNewsTranslations(index + 1)
  }

  await seedNewsTranslations()

  type WorkflowNewsSeed = {
    readonly body: News['body']
    readonly category: 'company' | 'ideas' | 'people' | 'product'
    readonly excerpt: string
    readonly heroMedia: number
    readonly reviewNote?: string
    readonly reviewRequestedBy: number
    readonly reviewedBy?: number
    readonly slug: string
    readonly title: string
    readonly workflowState: Extract<WorkflowState, 'approved' | 'in-review'>
  }

  async function upsertWorkflowNews(data: WorkflowNewsSeed): Promise<void> {
    const existing = await payload.find({
      collection: 'news',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: data.slug } },
    })
    const newsData = {
      ...data,
      publishedAt: new Date().toISOString(),
      _status: 'draft' as const,
    }

    if (existing.docs[0]) {
      await payload.update({
        collection: 'news',
        data: newsData,
        draft: true,
        id: existing.docs[0].id,
        overrideAccess: true,
      })
      return
    }

    await payload.create({
      collection: 'news',
      data: newsData,
      draft: true,
      overrideAccess: true,
    })
  }

  const [reviewQueueImage, publishingQueueImage] = await Promise.all([
    getSeedMediaId(stories[3].image),
    getSeedMediaId(stories[8].image),
  ])

  await Promise.all([
    upsertWorkflowNews({
      body: lexicalBody([
        'This draft is ready for a reviewer to check before it becomes a public Dispatch story.',
        'It demonstrates the simple request-review state without exposing the editorial queue on the public site.',
      ]),
      category: 'product',
      excerpt:
        'A draft story deliberately placed in the review queue for the Payload workflow demo.',
      heroMedia: reviewQueueImage,
      reviewRequestedBy: editorId,
      slug: 'review-queue-demo-story',
      title: 'A story ready for review',
      workflowState: 'in-review',
    }),
    upsertWorkflowNews({
      body: lexicalBody([
        'This draft has already been approved by a reviewer and is waiting for a publisher to use Payload’s normal Publish action.',
        'The workflow state shows who has acted without replacing Payload’s draft and published statuses.',
      ]),
      category: 'product',
      excerpt: 'An approved draft kept ready for the publisher in the Payload workflow demo.',
      heroMedia: publishingQueueImage,
      reviewNote: 'Ready for the publishing check.',
      reviewRequestedBy: editorId,
      reviewedBy: reviewerId,
      slug: 'publisher-queue-demo-story',
      title: 'A story ready to publish',
      workflowState: 'approved',
    }),
  ])

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

  const seededLocationTranslations = [
    {
      description:
        'Un registro con una región de medios principal y una etiqueta enfocada en transporte marítimo.',
      locale: 'es' as const,
      slug: 'port-city-record',
      title: 'Registro de ciudad portuaria',
    },
    {
      description: '先導メディア領域と、海上輸送に焦点を当てたタグを持つ記録です。',
      locale: 'jp' as const,
      slug: 'port-city-record',
      title: '港湾都市の記録',
    },
    {
      description:
        'Un registro intermodal enfocado con una ruta de soluciones logísticas fácil de entender.',
      locale: 'es' as const,
      slug: 'inland-hub-record',
      title: 'Registro de centro interior',
    },
    {
      description:
        '読みやすい物流ソリューション導線を備えた、焦点の定まった複合一貫輸送の記録です。',
      locale: 'jp' as const,
      slug: 'inland-hub-record',
      title: '内陸ハブの記録',
    },
    {
      description:
        'Un único registro puede usar etiquetas controladas para conectar más de una ruta de servicio.',
      locale: 'es' as const,
      slug: 'regional-point-record',
      title: 'Registro de punto regional',
    },
    {
      description: 'ひとつの記録でも、管理されたタグによって複数のサービス導線につなげられます。',
      locale: 'jp' as const,
      slug: 'regional-point-record',
      title: '地域拠点の記録',
    },
  ]

  async function seedLocationTranslations(index = 0): Promise<void> {
    const translation = seededLocationTranslations[index]
    if (!translation) return

    const result = await payload.find({
      collection: 'locations',
      depth: 0,
      limit: 1,
      locale: 'all',
      overrideAccess: true,
      where: { slug: { equals: translation.slug } },
    })
    const location = result.docs[0]
    if (location) {
      await payload.update({
        collection: 'locations',
        data: { description: translation.description, title: translation.title },
        draft: false,
        id: location.id,
        locale: translation.locale,
        overrideAccess: true,
      })
    }

    await seedLocationTranslations(index + 1)
  }

  await seedLocationTranslations()

  async function upsertPage(data: PageSeed): Promise<number> {
    const existing = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: { slug: { equals: data.slug } },
    })
    const draft = data.status === 'draft'
    const pageData = {
      lead: data.lead,
      layout: data.layout,
      ...(data.parent === undefined ? {} : { parent: data.parent }),
      ...(data.reviewNote === undefined ? {} : { reviewNote: data.reviewNote }),
      ...(data.reviewRequestedBy === undefined
        ? {}
        : { reviewRequestedBy: data.reviewRequestedBy }),
      ...(data.reviewedBy === undefined ? {} : { reviewedBy: data.reviewedBy }),
      slug: data.slug,
      title: data.title,
      workflowState: data.workflowState ?? (data.status === 'published' ? 'approved' : 'draft'),
      _status: data.status,
    }

    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'pages',
        data: pageData,
        draft,
        id: existing.docs[0].id,
        overrideAccess: true,
      })
      return updated.id
    }

    const created = await payload.create({
      collection: 'pages',
      data: pageData,
      draft,
      overrideAccess: true,
    })
    return created.id
  }

  const [companyImage, workingImage, standardsImage, routesImage] = await Promise.all([
    getSeedMediaId(stories[0].image),
    getSeedMediaId(stories[2].image),
    getSeedMediaId(stories[4].image),
    getSeedMediaId(stories[6].image),
  ])

  const companyPageId = await upsertPage({
    lead: 'A CMS-managed parent page that demonstrates grouped content, reusable blocks, and careful public routing without a custom template for every page.',
    layout: [
      richTextPageBlock([
        'The Company section is a compact content group for this demonstration. Its purpose is to show that editors can add and arrange rich text inside a clear public hierarchy without reaching for freeform styles.',
        'Every section below is a named Payload block that maps to a shared site component. Editors own the message and the order; the interface keeps the visual system intact.',
      ]),
      imagePageBlock(
        companyImage,
        'Illustrative editorial media managed in the same CMS library as the newsroom images.',
      ),
    ],
    slug: 'company',
    status: 'published',
    title: 'Company',
  })

  const waysOfWorkingPageId = await upsertPage({
    lead: 'A small illustration of how clear routes, bounded claims, and an editorial perspective can make a public shipping site easier to use.',
    layout: [
      richTextPageBlock([
        'Useful public journeys begin by naming the next question rather than pretending to complete an operational task on a marketing page.',
        'For this demo, every path stays illustrative. It can explain a form, a service route, or a publishing decision without claiming live coverage or availability.',
      ]),
      featurePageBlock(
        'A clear route begins with context.',
        'Editors can pair a managed image with one focused action while the shared feature block keeps reading order, spacing, and responsive behavior consistent.',
        workingImage,
        'Explore the enquiry route',
        '/#enquiry',
      ),
      calloutPageBlock(
        'Start with the right question.',
        'The enquiry route is the public place to continue a shipping conversation when a visitor is ready to share context.',
        'Start an enquiry',
        '/#enquiry',
      ),
    ],
    parent: companyPageId,
    slug: 'ways-of-working',
    status: 'published',
    title: 'Ways of working',
  })

  const editorialStandardsPageId = await upsertPage({
    lead: 'The Dispatch uses a calm, illustrative editorial voice to make context visible without presenting a demonstration as a live operating record.',
    layout: [
      richTextPageBlock([
        'A published story should be clear about what it can explain. In this demonstration, the newsroom provides useful context around public routes and CMS-managed content.',
        'It does not report live operations, customer outcomes, or service availability. Those boundaries are part of making editorial information more trustworthy.',
      ]),
      imagePageBlock(
        standardsImage,
        'Illustrative newsroom media, selected from the shared library rather than uploaded directly into a page.',
      ),
      calloutPageBlock(
        'Read the latest Dispatch stories.',
        'Browse the CMS-managed newsroom to see the same draft and publishing workflow applied to illustrative updates.',
        'Visit the newsroom',
        '/news',
      ),
    ],
    parent: companyPageId,
    slug: 'editorial-standards',
    status: 'published',
    title: 'Editorial standards',
  })

  const publicRoutesPageId = await upsertPage({
    lead: 'A practical note on how a compact demo can steer a visitor toward a clear public action without turning every page into a form.',
    layout: [
      richTextPageBlock([
        'The public site works best when its pages have a single job: offer enough context for a visitor to choose their next useful action.',
        'That makes room for focused service and enquiry pages while allowing editorial pages to remain readable and calm.',
      ]),
      featurePageBlock(
        'One flexible feature, still a fixed pattern.',
        'The feature block gives editors room for an image, short explanation, and clear action without allowing arbitrary column systems, styles, or components.',
        routesImage,
        'Visit the newsroom',
        '/news',
      ),
    ],
    parent: companyPageId,
    slug: 'public-routes',
    status: 'published',
    title: 'Public routes',
  })

  await upsertPage({
    lead: 'An unpublished example page for testing Payload drafts, autosave, version history, and the live-preview iframe before editorial content is published.',
    layout: [
      richTextPageBlock([
        'This draft is intentionally not visible to public visitors. Open it from the Pages collection to confirm that Payload can update the live preview while the published site remains unchanged.',
      ]),
      imagePageBlock(
        workingImage,
        'A draft can use the same approved media block before it is published.',
      ),
    ],
    parent: companyPageId,
    reviewRequestedBy: editorId,
    slug: 'working-note',
    status: 'draft',
    title: 'Working note for preview',
    workflowState: 'in-review',
  })

  await upsertPage({
    lead: 'An approved draft that gives the publisher a safe, visible item to publish during the demo.',
    layout: [
      richTextPageBlock([
        'This page has passed review and is intentionally still a draft. Sign in as the publisher to use Payload’s usual Publish action after checking its preview.',
        'The status is visible in the Pages list alongside the person who requested and completed the review.',
      ]),
      imagePageBlock(
        routesImage,
        'The publisher-ready draft still uses the same approved editorial image block.',
      ),
    ],
    parent: companyPageId,
    reviewNote: 'Approved for the publisher to release.',
    reviewRequestedBy: editorId,
    reviewedBy: reviewerId,
    slug: 'publisher-ready-note',
    status: 'draft',
    title: 'Publisher-ready note',
    workflowState: 'approved',
  })

  await upsertPage({
    lead: 'A CMS-managed parent page that demonstrates grouped content, reusable blocks, and careful public routing without a custom template for every page.',
    layout: [
      richTextPageBlock([
        'The Company section is a compact content group for this demonstration. Its purpose is to show that editors can add and arrange rich text inside a clear public hierarchy without reaching for freeform styles.',
        'Every section below is a named Payload block that maps to a shared site component. Editors own the message and the order; the interface keeps the visual system intact.',
      ]),
      imagePageBlock(
        companyImage,
        'Illustrative editorial media managed in the same CMS library as the newsroom images.',
      ),
      pageLinksBlock(
        'Explore the company pages',
        'Each link below is a related CMS page rendered with the shared story-card component.',
        [waysOfWorkingPageId, editorialStandardsPageId, publicRoutesPageId],
      ),
    ],
    slug: 'company',
    status: 'published',
    title: 'Company',
  })

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

  await Promise.all([
    payload.updateGlobal({
      slug: 'homepage',
      data: {
        aboutBody:
          'La página principal prioriza las opciones esenciales sin convertir la demostración en un creador de páginas general.',
        aboutTitle: 'Un conjunto pequeño de rutas útiles',
        contactBody:
          'La demostración distingue un mensaje general, una solicitud de presupuesto y una consulta de envío sin presentar seguimiento en tiempo real.',
        contactTitle: 'Dirige cada pregunta al formulario adecuado.',
        eyebrow: 'Una demostración de sitio público',
        heroBody:
          'Una demostración enfocada en rutas de servicio, ubicaciones ilustrativas, actualizaciones editoriales y la consulta adecuada.',
        heroTitle: 'Envíos, con mayor claridad.',
        newsletterBody:
          'Una entrada de pie de página compacta para el flujo de boletines de la demostración.',
        newsletterTitle: 'Actualizaciones editoriales, cuando se publican.',
        primaryCta: { label: 'Iniciar una consulta', href: '/#enquiry' },
        secondaryCta: { label: 'Visitar la sala de prensa', href: '/news' },
      },
      draft: false,
      locale: 'es',
      overrideAccess: true,
    }),
    payload.updateGlobal({
      slug: 'homepage',
      data: {
        aboutBody:
          'このホームページでは、デモを汎用的なページビルダーにせず、必要な選択肢を優先しています。',
        aboutTitle: '役立つ経路を厳選',
        contactBody:
          'このデモでは、一般的なメッセージ、見積もり依頼、配送に関するお問い合わせを区別し、リアルタイム追跡とは表示しません。',
        contactTitle: '質問ごとに適切なフォームへ。',
        eyebrow: '公開サイトのデモンストレーション',
        heroBody:
          'サービス経路、説明用の拠点、編集記事、適切なお問い合わせを示す、焦点を絞ったデモです。',
        heroTitle: '配送を、もっとわかりやすく。',
        newsletterBody: 'デモのニュースレターフロー用に用意した、簡潔なフッター項目です。',
        newsletterTitle: '公開時に届く、編集アップデート。',
        primaryCta: { label: 'お問い合わせを始める', href: '/#enquiry' },
        secondaryCta: { label: 'ニュースルームを見る', href: '/news' },
      },
      draft: false,
      locale: 'jp',
      overrideAccess: true,
    }),
  ])

  await payload.destroy()
}
