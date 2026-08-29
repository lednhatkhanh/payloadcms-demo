import type { GlobalConfig } from 'payload'

import { authenticated, publicGlobalRead } from '../access'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: publicGlobalRead,
    update: ({ req }) => authenticated({ req }),
  },
  fields: [
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'heroTitle', type: 'text', required: true },
    { name: 'heroBody', type: 'textarea', required: true },
    {
      name: 'primaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
    { name: 'aboutTitle', type: 'text', required: true },
    { name: 'aboutBody', type: 'textarea', required: true },
    {
      name: 'featuredNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 3,
    },
    { name: 'contactTitle', type: 'text', required: true },
    { name: 'contactBody', type: 'textarea', required: true },
    { name: 'newsletterTitle', type: 'text', required: true },
    { name: 'newsletterBody', type: 'textarea', required: true },
  ],
  versions: { drafts: { autosave: true } },
}
