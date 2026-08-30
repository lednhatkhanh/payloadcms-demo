import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArticleBody, ArticleHeroMedia, ArticleProvenance } from '@repo/ui/card'
import { ArrowRight, CalendarDays, Icon } from '@repo/ui/icon'
import {
  ArticleLayout,
  Cluster,
  Container,
  LocationDetailGrid,
  Section,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { getNewsBySlug } from '@/lib/content'
import { getSiteLocale, localeTag } from '@/lib/locale'

type PageProps = {
  readonly params: Promise<{ slug: string }>
  readonly searchParams: Promise<{ readonly country?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { country } = await searchParams
  const article = await getNewsBySlug(slug, await getSiteLocale(), country)
  return article
    ? { description: article.excerpt, title: article.title }
    : { title: 'Story not found' }
}

export default function NewsDetailPage({ params, searchParams }: PageProps) {
  return (
    <article>
      <Section space="compact">
        <Container>
          <Stack gap="xl">
            <Text color="brand" testId="story-shell" variant="label">
              The Dispatch / Story
            </Text>
            <Suspense fallback={<ArticleHeroLoadingState />}>
              <ArticleHero params={params} searchParams={searchParams} />
            </Suspense>
          </Stack>
        </Container>
      </Section>
      <Suspense fallback={null}>
        <ArticleDetails params={params} searchParams={searchParams} />
      </Suspense>
    </article>
  )
}

async function ArticleHero({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { country } = await searchParams
  const locale = await getSiteLocale()
  const article = await getNewsBySlug(slug, locale, country)
  if (!article) notFound()
  const published = new Intl.DateTimeFormat(localeTag(locale), { dateStyle: 'long' }).format(
    new Date(article.publishedAt),
  )

  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Text as="h1" variant="h1">
          {article.title}
        </Text>
        <Text color="muted" variant="lead">
          {article.excerpt}
        </Text>
        <Cluster>
          <Icon source={CalendarDays} size="sm" tone="muted" />
          <Text color="muted" variant="small">
            {published}
          </Text>
        </Cluster>
      </Stack>
      <ArticleHeroMedia alt={article.hero.alt} src={article.hero.url} />
    </Stack>
  )
}

async function ArticleDetails({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { country } = await searchParams
  const article = await getNewsBySlug(slug, await getSiteLocale(), country)
  if (!article) notFound()

  return (
    <>
      <Section space="compact">
        <Container>
          <ArticleLayout>
            <ArticleBody>
              <RichText data={article.body} />
            </ArticleBody>
            <ArticleProvenance>
              <Stack gap="md">
                <Text as="strong" variant="label">
                  Published story
                </Text>
                <Text color="muted" variant="small">
                  Illustrative newsroom content managed in the CMS. It does not report live
                  operations, customer outcomes, or service availability.
                </Text>
                <Link
                  href={article.country ? `/news?country=${article.country.code}` : '/news'}
                  variant="inline"
                >
                  All stories <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
            </ArticleProvenance>
          </ArticleLayout>
        </Container>
      </Section>

      <Surface border="subtle" tone="soft">
        <Section space="compact">
          <Container>
            <LocationDetailGrid>
              <Stack gap="md">
                <Text color="brand" variant="label">
                  Next step
                </Text>
                <Text as="h2" variant="h2">
                  Move from context to the right public route.
                </Text>
              </Stack>
              <Stack gap="lg">
                <Text color="muted">
                  The newsroom can frame a topic. The service and form routes then provide a clear
                  place to continue the conversation.
                </Text>
                <Link href="/#services" variant="inline">
                  Explore shipping <Icon source={ArrowRight} size="sm" />
                </Link>
              </Stack>
            </LocationDetailGrid>
          </Container>
        </Section>
      </Surface>

      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </>
  )
}

function ArticleHeroLoadingState() {
  return (
    <Text color="muted" variant="lead">
      Loading the story…
    </Text>
  )
}
