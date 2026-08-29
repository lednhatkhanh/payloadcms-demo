import { Container, Section, Split, Stack, Surface } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'

import { NewsletterForm } from './PublicForms'

export function SiteFooter({ body, title }: { readonly body: string; readonly title: string }) {
  return (
    <Surface as="footer" tone="ink">
      <Section>
        <Container>
          <Split>
            <Stack gap="md">
              <Text color="inverse" variant="label">
                The Dispatch
              </Text>
              <Text as="h2" color="inverse" variant="h2">
                {title}
              </Text>
              <Text color="inverse" variant="lead">
                {body}
              </Text>
            </Stack>
            <NewsletterForm />
          </Split>
        </Container>
      </Section>
    </Surface>
  )
}
