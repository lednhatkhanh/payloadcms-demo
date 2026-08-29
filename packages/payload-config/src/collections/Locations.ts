import { slugField, type CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'

export const Locations: CollectionConfig = {
  slug: 'locations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'city', 'country', '_status'],
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    slugField(),
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      required: true,
      maxLength: 320,
      admin: { description: 'Editorial description only; do not imply operational coverage.' },
    },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Lead image shown on the public card and detail page.' },
    },
    {
      name: 'serviceTags',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Ocean freight', value: 'ocean-freight' },
        { label: 'Logistics solutions', value: 'logistics-solutions' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'city', type: 'text', required: true, admin: { position: 'sidebar' } },
    { name: 'country', type: 'text', required: true, admin: { position: 'sidebar' } },
  ],
  timestamps: true,
  versions: { drafts: { autosave: true } },
}
