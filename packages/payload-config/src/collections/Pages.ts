import { slugField, type Block, type CollectionConfig, type Validate } from 'payload'

import {
  administrator,
  editorialCreator,
  editorialParticipant,
  publishedOrAuthenticated,
} from '../access'
import { pagePreviewUrl } from '../preview'
import { editorialWorkflowFields, enforceEditorialWorkflow } from '../workflow'

const reservedPageSlugs = new Set([
  '_next',
  'admin',
  'api',
  'favicon.ico',
  'locations',
  'news',
  'robots.txt',
  'sitemap.xml',
])

const validatePageSlug: Validate<string> = (value) => {
  if (typeof value === 'string' && reservedPageSlugs.has(value)) {
    return `“${value}” is reserved by the public site. Choose a different page slug.`
  }

  return true
}

const richTextBlock: Block = {
  slug: 'richText',
  labels: { plural: 'Rich text sections', singular: 'Rich text section' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Editorial content rendered with the shared article-reading component.',
      },
    },
  ],
}

const calloutBlock: Block = {
  slug: 'callout',
  labels: { plural: 'Callouts', singular: 'Callout' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true, maxLength: 320 },
    {
      name: 'link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { description: 'Use a public path, such as /#enquiry or /news.' },
        },
      ],
    },
  ],
}

const imageBlock: Block = {
  slug: 'image',
  labels: { plural: 'Editorial images', singular: 'Editorial image' },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Choose an image from the managed media library.' },
    },
    {
      name: 'caption',
      type: 'text',
      maxLength: 180,
      admin: { description: 'Optional context shown directly below the image.' },
    },
  ],
}

const featureBlock: Block = {
  slug: 'feature',
  labels: { plural: 'Image features', singular: 'Image feature' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true, maxLength: 420 },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Choose an image from the managed media library.' },
    },
    {
      name: 'link',
      type: 'group',
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: { description: 'Use a public path, such as /#enquiry or /news.' },
        },
      ],
    },
  ],
}

const pageLinksBlock: Block = {
  slug: 'pageLinks',
  labels: { plural: 'Related-page lists', singular: 'Related-page list' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true, maxLength: 320 },
    {
      name: 'pages',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        description: 'Select published or draft CMS pages to present with shared story cards.',
      },
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
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
    group: 'Content',
    livePreview: {
      breakpoints: [
        { height: 844, label: 'Phone', name: 'phone', width: 390 },
        { height: 900, label: 'Desktop', name: 'desktop', width: 1440 },
      ],
      openByDefault: true,
      url: ({ data }) => {
        const id = data.id
        return typeof id === 'number' || typeof id === 'string' ? pagePreviewUrl(id) : null
      },
    },
    preview: (data) => {
      const id = data.id
      return typeof id === 'number' || typeof id === 'string' ? pagePreviewUrl(id) : null
    },
    useAsTitle: 'title',
  },
  defaultSort: 'title',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({
      overrides: (field) => {
        const slug = field.fields[1]
        if (slug?.type === 'text') slug.validate = validatePageSlug
        return field
      },
    }),
    {
      name: 'lead',
      type: 'textarea',
      required: true,
      maxLength: 320,
      admin: { description: 'The concise introduction shown below the page title.' },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description:
          'Optional. Parent pages create nested public paths and a manageable content group.',
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [richTextBlock, imageBlock, featureBlock, calloutBlock, pageLinksBlock],
      minRows: 1,
      required: true,
      admin: {
        description:
          'Choose from the five approved page blocks. Each block maps to an existing public-site component.',
      },
    },
    ...editorialWorkflowFields,
  ],
  hooks: { beforeChange: [enforceEditorialWorkflow] },
  timestamps: true,
  trash: true,
  versions: { drafts: { autosave: true } },
}
