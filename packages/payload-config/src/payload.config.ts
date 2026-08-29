import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { serverEnvironment } from '@repo/contracts/env'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { NewsletterSignups } from './collections/NewsletterSignups'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Homepage } from './globals/Homepage'
import { contentLocales, defaultContentLocale } from './locales'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
export default buildConfig({
  admin: {
    components: {
      afterNavLinks: ['./admin/WorkflowNavLink#WorkflowNavLink'],
      graphics: {
        Icon: './admin/Logo#Icon',
        Logo: './admin/Logo#Logo',
      },
      views: {
        workflow: {
          Component: './admin/WorkflowInbox#WorkflowInboxView',
          path: '/workflow',
        },
      },
    },
    importMap: { baseDir: currentDirectory },
    meta: { titleSuffix: '— The Dispatch' },
    theme: 'light',
    user: Users.slug,
  },
  collections: [Users, Media, News, Locations, Pages, ContactSubmissions, NewsletterSignups],
  db: postgresAdapter({ pool: { connectionString: serverEnvironment.DATABASE_URL } }),
  editor: lexicalEditor(),
  globals: [Homepage],
  localization: {
    defaultLocale: defaultContentLocale,
    fallback: true,
    locales: [...contentLocales],
  },
  maxDepth: 2,
  secret: serverEnvironment.PAYLOAD_SECRET,
  serverURL: serverEnvironment.PAYLOAD_PUBLIC_SERVER_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(currentDirectory, 'generated/payload-types.ts'),
  },
  upload: {
    limits: { fileSize: 8_000_000 },
  },
})
