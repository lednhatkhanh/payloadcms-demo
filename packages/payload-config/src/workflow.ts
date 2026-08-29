import type { CollectionBeforeChangeHook, Field } from 'payload'

import { hasEditorialRole, isAdministrator } from './access'

export const editorialRoles = ['admin', 'editor', 'reviewer', 'publisher'] as const

export type EditorialRole = (typeof editorialRoles)[number]

export const workflowStates = ['draft', 'in-review', 'changes-requested', 'approved'] as const

export type WorkflowState = (typeof workflowStates)[number]

const workflowStateLabels: Record<WorkflowState, string> = {
  approved: 'Approved for publishing',
  'changes-requested': 'Changes requested',
  draft: 'Draft',
  'in-review': 'In review',
}

function asWorkflowState(value: unknown): WorkflowState | undefined {
  if (typeof value !== 'string') return undefined
  return workflowStates.find((state) => state === value)
}

function originalWorkflowState(value: unknown): WorkflowState {
  return asWorkflowState(value) ?? 'draft'
}

export const editorialWorkflowFields: Field[] = [
  {
    name: 'workflowState',
    type: 'select',
    required: true,
    defaultValue: 'draft',
    index: true,
    options: workflowStates.map((value) => ({ label: workflowStateLabels[value], value })),
    admin: {
      description:
        'Read-only. Use the role-specific action control in the document toolbar to change workflow state.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'reviewNote',
    type: 'textarea',
    maxLength: 320,
    admin: {
      description: 'Optional context from the reviewer for the editor or publisher.',
    },
  },
  {
    name: 'reviewRequestedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when an editor requests review.',
      position: 'sidebar',
      readOnly: true,
    },
  },
  {
    name: 'reviewedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      description: 'Set automatically when a reviewer responds.',
      position: 'sidebar',
      readOnly: true,
    },
  },
]

export const enforceEditorialWorkflow: CollectionBeforeChangeHook = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (!req.user || isAdministrator(req.user)) return data

  const currentState = originalWorkflowState(originalDoc?.workflowState)
  const nextState = originalWorkflowState(data.workflowState ?? currentState)
  const currentStatus = originalDoc?.['_status']
  const nextStatus = data['_status'] ?? currentStatus
  const isPublishing = currentStatus !== 'published' && nextStatus === 'published'

  if (operation === 'create') {
    if (!hasEditorialRole(req.user, 'editor')) {
      throw new Error('Only editors can create editorial content.')
    }

    if (data['_status'] === 'published') {
      throw new Error('Only a publisher can publish editorial content after review.')
    }

    data.workflowState = 'draft'
    data.reviewRequestedBy = undefined
    data.reviewedBy = undefined
    data.reviewNote = undefined
    return data
  }

  if (isPublishing) {
    if (!hasEditorialRole(req.user, 'publisher')) {
      throw new Error('Only publishers can publish editorial content.')
    }

    if (nextState !== 'approved') {
      throw new Error('Content must be approved before it can be published.')
    }
  }

  if (nextState === currentState) {
    data.reviewRequestedBy = originalDoc?.reviewRequestedBy
    data.reviewedBy = originalDoc?.reviewedBy
    data.reviewNote = originalDoc?.reviewNote
    return data
  }

  if (
    nextState === 'in-review' &&
    (currentState === 'draft' || currentState === 'changes-requested') &&
    hasEditorialRole(req.user, 'editor')
  ) {
    data.reviewRequestedBy = req.user.id
    data.reviewedBy = undefined
    data.reviewNote = undefined
    return data
  }

  if (
    currentState === 'in-review' &&
    (nextState === 'approved' || nextState === 'changes-requested') &&
    hasEditorialRole(req.user, 'reviewer')
  ) {
    data.reviewRequestedBy = originalDoc?.reviewRequestedBy
    data.reviewedBy = req.user.id
    return data
  }

  throw new Error(
    'Editors can request review, reviewers can approve or request changes, and publishers can publish approved content.',
  )
}
