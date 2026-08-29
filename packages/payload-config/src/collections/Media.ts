import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'
import { mediaDirectory } from '../paths'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publicRead,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    useAsTitle: 'alt',
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
  upload: {
    imageSizes: [
      { name: 'card', width: 768, height: 432, fit: 'cover' },
      { name: 'hero', width: 1440, height: 810, fit: 'cover' },
    ],
    mimeTypes: ['image/*'],
    staticDir: mediaDirectory,
  },
}
