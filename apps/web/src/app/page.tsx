import {
  CardLinkAffordance,
  HeroMedia,
  HeroPlaceholder,
  LocationCard,
  LocationCardBody,
  LocationCardContent,
  ServiceCard,
  StoryCard,
  StoryCardContent,
  StoryCardFooter,
  StoryCardMedia,
  StoryCardMeta,
  Tag,
} from '@repo/ui/card'
import { ArrowRight, Icon } from '@repo/ui/icon'
import {
  Cluster,
  Container,
  DispatchHeader,
  EditorialGrid,
  EditorialRule,
  EnquiryHeading,
  EnquiryGrid,
  FeatureGrid,
  HeroContent,
  HomeHeroGrid,
  NewsGrid,
  Section,
  SectionHeading,
  SectionIntro,
  ServiceGrid,
  Stack,
  Surface,
} from '@repo/ui/layout'
import { ButtonLink, Link } from '@repo/ui/link'
import { Accent, Text } from '@repo/ui/text'
import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import {
  getHomepage,
  getPublishedPageChildren,
  getPublishedLocations,
  getPublishedNews,
  type LocationService,
  type ManagedPageSummary,
  type NewsSummary,
} from '@/lib/content'
import { getSiteLocale } from '@/lib/locale'

export const metadata: Metadata = {
  description:
    'A focused shipping and logistics demonstration with service paths, illustrative locations, and The Dispatch newsroom.',
  title: 'Shipping & logistics',
}

const services = [
  {
    description: 'An at-a-glance entry point for the demo’s core shipping offer.',
    href: '/#enquiry',
    label: 'Explore shipping',
    number: '01 / Overview',
    title: 'Shipping services',
  },
  {
    description: 'A representative service detail route for visitors evaluating a shipping mode.',
    href: '/#enquiry',
    label: 'View the detail',
    number: '02 / Detail',
    title: 'Ocean freight',
  },
  {
    description: 'A companion route that explains how a wider logistics question can be framed.',
    href: '/shipping/logistics-solutions',
    label: 'See the route',
    number: '03 / Detail',
    title: 'Logistics solutions',
  },
] as const

const locationServiceLabels: Record<LocationService, string> = {
  'logistics-solutions': 'Logistics solutions',
  'ocean-freight': 'Ocean freight',
}

export default function HomePage() {
  return (
    <>
      <Section id="about" space="hero">
        <Container>
          <HomeHeroGrid>
            <HeroContent>
              <Text color="brand" variant="label">
                A public-site demonstration
              </Text>
              <Text as="h1" variant="hero">
                Shipping, made <Accent>clearer.</Accent>
              </Text>
              <Text color="muted" variant="lead">
                A focused demonstration of how a shipping and logistics site can help visitors
                explore services, find illustrative locations, read editorial updates, and send the
                right enquiry.
              </Text>
              <Cluster>
                <ButtonLink href="/#enquiry" size="lg" variant="primary">
                  Start an enquiry <Icon source={ArrowRight} size="sm" />
                </ButtonLink>
              </Cluster>
            </HeroContent>
            <Suspense fallback={<HeroPlaceholder />}>
              <HomepageHeroMedia />
            </Suspense>
          </HomeHeroGrid>
        </Container>
      </Section>

      <Container>
        <EditorialRule />
      </Container>

      <Section id="services">
        <Container>
          <Stack gap="2xl">
            <SectionHeading>
              <Text color="brand" variant="label">
                Shipping
              </Text>
              <Text as="h2" variant="section">
                A small set of useful paths.
              </Text>
              <Text color="muted" variant="lead">
                The homepage leads with essential options instead of turning the demonstration into
                a general page builder.
              </Text>
            </SectionHeading>
            <ServiceGrid>
              {services.map((service) => (
                <ServiceCard key={service.title}>
                  <Stack gap="md">
                    <Text color="muted" variant="meta">
                      {service.number}
                    </Text>
                    <Text as="h3" variant="h3">
                      {service.title}
                    </Text>
                    <Text color="muted">{service.description}</Text>
                  </Stack>
                  <Link href={service.href} variant="inline">
                    {service.label} <Icon source={ArrowRight} size="sm" />
                  </Link>
                </ServiceCard>
              ))}
            </ServiceGrid>
          </Stack>
        </Container>
      </Section>

      <Surface border="subtle" tone="surface">
        <Section id="company">
          <Container>
            <Stack gap="2xl">
              <SectionIntro>
                <SectionHeading>
                  <Text as="h2" variant="section">
                    Company pages, within the established system.
                  </Text>
                </SectionHeading>
                <Text color="muted" variant="small">
                  A concise CMS-managed page set that only uses the approved content blocks and
                  shared public-site components.
                </Text>
              </SectionIntro>
              <Suspense fallback={<CompanyPagesLoadingState />}>
                <HomepageCompanyPages />
              </Suspense>
              <Link href="/company" variant="inline">
                Read the Company introduction <Icon source={ArrowRight} size="sm" />
              </Link>
            </Stack>
          </Container>
        </Section>
      </Surface>

      <Surface border="subtle" tone="surface">
        <Section id="locations">
          <Container>
            <Stack gap="2xl">
              <SectionIntro>
                <SectionHeading>
                  <Text color="brand" variant="label">
                    Locations
                  </Text>
                  <Text as="h2" variant="section">
                    Managed location records, with useful detail.
                  </Text>
                </SectionHeading>
                <Text color="muted" variant="small">
                  Illustrative content for demonstrating CMS-managed location cards. These entries
                  do not represent offices, contacts, or operational coverage.
                </Text>
              </SectionIntro>
              <Suspense fallback={<LocationsLoadingState />}>
                <HomepageLocations />
              </Suspense>
            </Stack>
          </Container>
        </Section>
      </Surface>

      <Section id="dispatch">
        <Container>
          <Stack gap="2xl">
            <DispatchHeader>
              <SectionHeading>
                <Text color="brand" variant="label">
                  The Dispatch
                </Text>
                <Text as="h2" variant="section">
                  The editorial layer, kept distinct.
                </Text>
              </SectionHeading>
              <Text as="p" variant="dispatchMark">
                The Dispatch / Newsroom
              </Text>
            </DispatchHeader>
            <Suspense fallback={<NewsroomLoadingState />}>
              <NewsroomStories />
            </Suspense>
            <Link href="/news" variant="inline">
              Visit the newsroom <Icon source={ArrowRight} size="sm" />
            </Link>
          </Stack>
        </Container>
      </Section>

      <Section id="enquiry">
        <Container>
          <EnquiryGrid>
            <EnquiryHeading>
              <Text color="brand" variant="label">
                Next step
              </Text>
              <Text as="h2" variant="enquiry">
                Point each question to the right form.
              </Text>
            </EnquiryHeading>
            <Stack gap="md">
              <Text color="muted">
                This demonstration distinguishes a general contact message, a quote request, and a
                shipment enquiry. The latter is a message form, not real-time tracking.
              </Text>
              <Link href="/#newsletter" variant="inline">
                See the available paths <Icon source={ArrowRight} size="sm" />
              </Link>
            </Stack>
          </EnquiryGrid>
        </Container>
      </Section>

      <SiteFooter
        body="A compact footer entry for the demo’s newsletter flow. Subscription content and submission handling are managed separately."
        title="Editorial updates, when they are published."
      />
    </>
  )
}

async function HomepageLocations() {
  const locations = await getPublishedLocations(await getSiteLocale())
  if (locations.length === 0) {
    return <Text color="muted">No published illustrative locations yet.</Text>
  }

  return (
    <FeatureGrid>
      {locations.slice(0, 3).map((location) => (
        <LocationCard href={`/locations/${location.slug}`} key={location.slug}>
          <LocationCardBody>
            <div>
              <Text color="muted" variant="kicker">
                Illustrative location
              </Text>
              <LocationCardContent>
                <Text as="h3" variant="h3">
                  {location.title}
                </Text>
                <Text color="muted">{location.description}</Text>
              </LocationCardContent>
            </div>
            <Cluster>
              {location.serviceTags.map((serviceTag) => (
                <Tag key={serviceTag}>{locationServiceLabels[serviceTag]}</Tag>
              ))}
            </Cluster>
          </LocationCardBody>
        </LocationCard>
      ))}
    </FeatureGrid>
  )
}

function LocationsLoadingState() {
  return <Text color="muted">Loading published illustrative locations…</Text>
}

async function HomepageCompanyPages() {
  const pages = await getPublishedPageChildren('company', await getSiteLocale())
  if (pages.length === 0) {
    return <Text color="muted">The Company pages are being prepared.</Text>
  }

  return (
    <NewsGrid>
      {pages.map((page) => (
        <HomepageCompanyPageCard key={page.slug} page={page} />
      ))}
    </NewsGrid>
  )
}

function CompanyPagesLoadingState() {
  return <Text color="muted">Loading the Company pages…</Text>
}

function HomepageCompanyPageCard({ page }: { readonly page: ManagedPageSummary }) {
  return (
    <StoryCard href={`/company/${page.slug}`} label={`Read ${page.title}`} size="compact">
      <StoryCardContent>
        <Stack gap="sm">
          <Text as="h3" variant="h3">
            {page.title}
          </Text>
          <Text color="muted">{page.lead}</Text>
        </Stack>
      </StoryCardContent>
      <StoryCardFooter>
        <CardLinkAffordance>
          Read page <Icon source={ArrowRight} size="sm" />
        </CardLinkAffordance>
      </StoryCardFooter>
    </StoryCard>
  )
}

async function NewsroomStories() {
  const news = await getPublishedNews(await getSiteLocale(), undefined, 3)

  if (news.length === 0) {
    return (
      <Surface border="subtle" padding="lg" radius="lg" tone="soft">
        <Text color="muted">The first stories are being prepared.</Text>
      </Surface>
    )
  }

  return (
    <EditorialGrid>
      {news.map((article, index) => (
        <HomepageStoryCard
          article={article}
          featured={index === 0}
          key={article.slug}
          label={index === 0 ? 'Featured example' : index === 1 ? 'Behind the demo' : 'Guide'}
          meta={
            index === 0
              ? 'Published story example · CMS-managed'
              : index === 1
                ? 'News detail example'
                : 'News listing example'
          }
        />
      ))}
    </EditorialGrid>
  )
}

function NewsroomLoadingState() {
  return (
    <Surface border="subtle" padding="lg" radius="lg" tone="soft">
      <Text color="muted">Loading the latest stories…</Text>
    </Surface>
  )
}

function HomepageStoryCard({
  article,
  featured,
  label,
  meta,
}: {
  readonly article: NewsSummary
  readonly featured: boolean
  readonly label: string
  readonly meta: string
}) {
  const story = (
    <Stack gap="sm">
      <Text as="h3" variant="h3">
        {article.title}
      </Text>
      <Text color="muted">{article.excerpt}</Text>
    </Stack>
  )

  return (
    <StoryCard featured={featured} href={`/news/${article.slug}`} label={`Read ${article.title}`}>
      {featured ? (
        <div>
          <Text color="muted" variant="kicker">
            {label}
          </Text>
          <StoryCardContent>{story}</StoryCardContent>
        </div>
      ) : (
        <StoryCardMedia alt={article.hero.alt} src={article.hero.url} />
      )}
      {featured ? <StoryCardMedia alt={article.hero.alt} src={article.hero.url} /> : null}
      {!featured ? (
        <>
          <Text color="muted" variant="kicker">
            {label}
          </Text>
          <StoryCardContent>{story}</StoryCardContent>
        </>
      ) : null}
      <StoryCardFooter>
        <StoryCardMeta>{meta}</StoryCardMeta>
      </StoryCardFooter>
    </StoryCard>
  )
}

async function HomepageHeroMedia() {
  const homepage = await getHomepage(await getSiteLocale())
  return homepage.hero ? (
    <HeroMedia
      alt={homepage.hero.alt}
      caption="Illustrative harbor scene · For demonstrative use"
      src={homepage.hero.url}
    />
  ) : (
    <HeroPlaceholder />
  )
}
