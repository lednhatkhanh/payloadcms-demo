import { Container, Cluster, Surface } from '@repo/ui/layout'
import { Link } from '@repo/ui/link'
import { Text } from '@repo/ui/text'

export function SiteHeader() {
  return (
    <Surface as="header" border="subtle" tone="surface">
      <Container>
        <Cluster as="nav" justify="between" padding="md">
          <Link href="/" variant="navigation">
            <Text as="span" color="brand" variant="h3">
              The Dispatch
            </Text>
          </Link>
          <Cluster>
            <Link href="/news" variant="navigation">
              News
            </Link>
            <Link href="/#contact" variant="navigation">
              Contact
            </Link>
          </Cluster>
        </Cluster>
      </Container>
    </Surface>
  )
}
