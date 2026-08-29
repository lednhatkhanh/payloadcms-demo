import type { CollectionConfig } from 'payload'

import { administrator, authenticated, isAdministrator, selfOrAdministrator } from '../access'
import { editorialRoles } from '../workflow'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['name', 'email', 'roles', 'updatedAt'],
    useAsTitle: 'email',
  },
  access: {
    create: administrator,
    delete: administrator,
    read: authenticated,
    update: selfOrAdministrator,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: editorialRoles.map((value) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
      })),
      access: { update: ({ req }) => isAdministrator(req.user) },
      admin: {
        description:
          'Use one clear responsibility per demo account: editor, reviewer, publisher, or admin.',
        position: 'sidebar',
      },
    },
  ],
}
