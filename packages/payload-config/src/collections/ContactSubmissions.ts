import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'organization', 'createdAt'],
    useAsTitle: 'email',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'organization', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consent', type: 'checkbox', required: true },
  ],
  timestamps: true,
}
