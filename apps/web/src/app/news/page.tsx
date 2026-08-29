import { Container, NewsGrid, Section, Stack, Surface } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import type { Metadata } from 'next'

import { NewsCard } from '@/components/NewsCard'
import { getPublishedNews } from '@/lib/content'

export const metadata: Metadata = {
  description: 'Company, product, people, and ideas from The Dispatch.',
  title: 'News',
}

export default async function NewsPage() {
  const news = await getPublishedNews()
  return (
    <>
      <Section space="hero">
        <Container>
          <Stack gap="lg">
            <Text color="brand" variant="label">
              The newsroom
            </Text>
            <Text as="h1" testId="news-shell" variant="h1">
              Every story, in one clear record.
            </Text>
            <Text color="muted" variant="lead">
              Company news, product decisions, and the ideas behind the work.
            </Text>
          </Stack>
        </Container>
      </Section>
      <Surface tone="surface">
        <Section>
          <Container>
            {news.length > 0 ? (
              <NewsGrid>
                {news.map((article) => (
                  <NewsCard article={article} key={article.slug} />
                ))}
              </NewsGrid>
            ) : (
              <Surface border="subtle" padding="lg" radius="lg" tone="soft">
                <Text color="muted">No published stories yet.</Text>
              </Surface>
            )}
          </Container>
        </Section>
      </Surface>
    </>
  )
}
