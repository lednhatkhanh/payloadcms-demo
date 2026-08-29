import { slugField, type CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: authenticated,
    delete: authenticated,
    read: publishedOrAuthenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    useAsTitle: 'title',
  },
  defaultSort: '-publishedAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 320 },
    { name: 'body', type: 'richText', required: true },
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional 16:9 lead image.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'company',
      options: [
        { label: 'Company', value: 'company' },
        { label: 'Product', value: 'product' },
        { label: 'People', value: 'people' },
        { label: 'Ideas', value: 'ideas' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
  timestamps: true,
  versions: { drafts: { autosave: true } },
}
