import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const NewsletterSignups: CollectionConfig = {
  slug: 'newsletter-signups',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['email', 'source', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true, index: true },
    { name: 'source', type: 'text', required: true, defaultValue: 'website-footer' },
    { name: 'consent', type: 'checkbox', required: true },
  ],
  timestamps: true,
}
