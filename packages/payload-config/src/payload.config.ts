import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { serverEnvironment } from '@repo/contracts/env'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { NewsletterSignups } from './collections/NewsletterSignups'
import { Users } from './collections/Users'
import { Homepage } from './globals/Homepage'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: './admin/Logo#Icon',
        Logo: './admin/Logo#Logo',
      },
    },
    importMap: { baseDir: currentDirectory },
    meta: { titleSuffix: '— The Dispatch' },
    theme: 'light',
    user: Users.slug,
  },
  collections: [Users, Media, News, ContactSubmissions, NewsletterSignups],
  db: postgresAdapter({ pool: { connectionString: serverEnvironment.DATABASE_URL } }),
  editor: lexicalEditor(),
  globals: [Homepage],
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
