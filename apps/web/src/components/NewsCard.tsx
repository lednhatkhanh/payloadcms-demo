import { Card, CardBody, CardMedia } from '@repo/ui/card'
import { Icon, ArrowRight, CalendarDays } from '@repo/ui/icon'
import { Cluster, Stack } from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'

import type { NewsSummary } from '@/lib/content'

const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

export function NewsCard({ article }: { readonly article: NewsSummary }) {
  const published = article.publishedAt
    ? dateFormatter.format(new Date(article.publishedAt))
    : 'Recently'
  return (
    <Card>
      <CardMedia alt={article.hero?.alt ?? ''} src={article.hero?.url} />
      <CardBody>
        <Stack gap="sm">
          <Cluster>
            <Text as="span" color="brand" variant="label">
              {article.category}
            </Text>
            <Cluster>
              <Icon source={CalendarDays} size="sm" tone="muted" />
              <Text as="span" color="muted" variant="small">
                {published}
              </Text>
            </Cluster>
          </Cluster>
          <Text as="h2" variant="h3">
            {article.title}
          </Text>
          <Text color="muted">{article.excerpt}</Text>
        </Stack>
        <Link href={`/news/${article.slug}`} variant="inline">
          Read story <Icon source={ArrowRight} size="sm" />
        </Link>
      </CardBody>
    </Card>
  )
}
