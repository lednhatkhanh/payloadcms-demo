import { RichText } from '@payloadcms/richtext-lexical/react'
import { ArticleBody, CardMedia } from '@repo/ui/card'
import { CalendarDays, Icon } from '@repo/ui/icon'
import { Cluster, Container, Section, Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { getNewsBySlug } from '@/lib/content'

type PageProps = { readonly params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  return article
    ? { description: article.excerpt, title: article.title }
    : { title: 'Story not found' }
}

export default function NewsDetailPage({ params }: PageProps) {
  return (
    <>
      <Section space="compact">
        <Container size="content">
          <Text color="brand" testId="story-shell" variant="label">
            The Dispatch / Story
          </Text>
        </Container>
      </Section>
      <Suspense fallback={<ArticleSkeleton />}>
        <Article params={params} />
      </Suspense>
    </>
  )
}

async function Article({ params }: PageProps) {
  const { slug } = await params
  const article = await getNewsBySlug(slug)
  if (!article) notFound()
  const published = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
    new Date(article.publishedAt),
  )

  return (
    <article>
      <Container size="content">
        <Stack gap="xl">
          <Stack gap="md">
            <Text color="brand" variant="label">
              {article.category}
            </Text>
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
          <CardMedia alt={article.hero?.alt ?? ''} src={article.hero?.url} />
          <ArticleBody>
            <RichText data={article.body} />
          </ArticleBody>
        </Stack>
      </Container>
    </article>
  )
}

function ArticleSkeleton() {
  return (
    <Container size="content">
      <Stack gap="lg">
        <Text color="muted" variant="lead">
          Loading the story…
        </Text>
      </Stack>
    </Container>
  )
}
