import { ButtonLink } from '@repo/ui/link'
import { Icon, ArrowRight, Sparkles } from '@repo/ui/icon'
import {
  Cluster,
  Container,
  EditorialRule,
  NewsGrid,
  Section,
  Split,
  Stack,
  StatGrid,
  Surface,
} from '@repo/ui/layout'
import { Text } from '@repo/ui/text'

import { NewsCard } from '@/components/NewsCard'
import { ContactForm } from '@/components/PublicForms'
import { SiteFooter } from '@/components/SiteFooter'
import { getHomepage, getPublishedNews } from '@/lib/content'

export default async function HomePage() {
  const [homepage, news] = await Promise.all([getHomepage(), getPublishedNews(3)])

  return (
    <>
      <Section space="hero">
        <Container>
          <Split>
            <Stack gap="xl">
              <Cluster>
                <Icon source={Sparkles} size="sm" tone="brand" />
                <Text color="brand" variant="label">
                  {homepage.eyebrow}
                </Text>
              </Cluster>
              <Text as="h1" variant="display">
                {homepage.heroTitle}
              </Text>
              <Text color="muted" variant="lead">
                {homepage.heroBody}
              </Text>
              <Cluster>
                <ButtonLink href={homepage.primaryCta.href} size="lg" variant="primary">
                  {homepage.primaryCta.label} <Icon source={ArrowRight} size="sm" />
                </ButtonLink>
                <ButtonLink href={homepage.secondaryCta.href} size="lg" variant="secondary">
                  {homepage.secondaryCta.label}
                </ButtonLink>
              </Cluster>
            </Stack>
            <Surface border="brand" padding="lg" radius="lg" tone="soft">
              <Stack gap="2xl">
                <Text color="brand" variant="label">
                  Why we publish
                </Text>
                <Text as="h2" variant="h2">
                  Context is a product.
                </Text>
                <EditorialRule />
                <StatGrid>
                  <Stack gap="2xs">
                    <Text variant="h3">Fewer</Text>
                    <Text color="muted" variant="small">
                      updates
                    </Text>
                  </Stack>
                  <Stack gap="2xs">
                    <Text variant="h3">Deeper</Text>
                    <Text color="muted" variant="small">
                      reporting
                    </Text>
                  </Stack>
                  <Stack gap="2xs">
                    <Text variant="h3">Clearer</Text>
                    <Text color="muted" variant="small">
                      decisions
                    </Text>
                  </Stack>
                </StatGrid>
              </Stack>
            </Surface>
          </Split>
        </Container>
      </Section>

      <Surface tone="surface">
        <Section>
          <Container>
            <Stack gap="2xl">
              <Split>
                <Stack gap="md">
                  <Text color="brand" variant="label">
                    About the publication
                  </Text>
                  <Text as="h2" variant="h2">
                    {homepage.aboutTitle}
                  </Text>
                </Stack>
                <Text color="muted" variant="lead">
                  {homepage.aboutBody}
                </Text>
              </Split>
              <EditorialRule />
              <Cluster justify="between">
                <Text as="h2" variant="h3">
                  Latest stories
                </Text>
                <ButtonLink href="/news" size="sm" variant="secondary">
                  View all news
                </ButtonLink>
              </Cluster>
              {news.length > 0 ? (
                <NewsGrid>
                  {news.map((article) => (
                    <NewsCard article={article} key={article.slug} />
                  ))}
                </NewsGrid>
              ) : (
                <Surface border="subtle" padding="lg" radius="lg" tone="soft">
                  <Text color="muted">The first stories are being prepared.</Text>
                </Surface>
              )}
            </Stack>
          </Container>
        </Section>
      </Surface>

      <Section id="contact">
        <Container>
          <Split>
            <Stack gap="md">
              <Text color="brand" variant="label">
                Contact
              </Text>
              <Text as="h2" variant="h2">
                {homepage.contactTitle}
              </Text>
              <Text color="muted" variant="lead">
                {homepage.contactBody}
              </Text>
            </Stack>
            <Surface border="default" padding="lg" radius="lg" tone="surface">
              <ContactForm />
            </Surface>
          </Split>
        </Container>
      </Section>

      <SiteFooter body={homepage.newsletterBody} title={homepage.newsletterTitle} />
    </>
  )
}
