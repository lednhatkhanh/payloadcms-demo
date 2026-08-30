import type { CollectionConfig } from 'payload'

import { administrator, publicRead } from '../access'
import { contentLocales } from '../locales'

export const Countries: CollectionConfig = {
  slug: 'countries',
  access: {
    create: administrator,
    delete: administrator,
    read: publicRead,
    update: administrator,
  },
  admin: {
    defaultColumns: ['name', 'code', 'defaultLocale', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'code', type: 'text', index: true, required: true, unique: true },
    {
      name: 'supportedLocales',
      type: 'select',
      hasMany: true,
      options: contentLocales.map((locale) => ({ label: locale.toUpperCase(), value: locale })),
      required: true,
    },
    {
      name: 'defaultLocale',
      type: 'select',
      options: contentLocales.map((locale) => ({ label: locale.toUpperCase(), value: locale })),
      required: true,
    },
  ],
  timestamps: true,
}
