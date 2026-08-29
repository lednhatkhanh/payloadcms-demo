import { slugField, type CollectionConfig } from 'payload'

import {
  administrator,
  editorialCreator,
  editorialParticipant,
  publishedOrAuthenticated,
} from '../access'
import { editorialWorkflowFields, enforceEditorialWorkflow } from '../workflow'

export const News: CollectionConfig = {
  slug: 'news',
  access: {
    create: editorialCreator,
    delete: administrator,
    read: publishedOrAuthenticated,
    update: editorialParticipant,
  },
  admin: {
    components: {
      edit: {
        PublishButton: '../../../apps/cms/src/components/WorkflowActionButton#WorkflowActionButton',
      },
    },
    defaultColumns: ['title', 'workflowState', '_status', 'updatedAt'],
    description:
      'Workflow: editor requests review, reviewer approves or requests changes, publisher uses Payload’s Publish action.',
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
      required: true,
      admin: { description: 'Lead image shown on the public story card and detail page.' },
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
    ...editorialWorkflowFields,
  ],
  hooks: { beforeChange: [enforceEditorialWorkflow] },
  timestamps: true,
  versions: { drafts: { autosave: true } },
}
