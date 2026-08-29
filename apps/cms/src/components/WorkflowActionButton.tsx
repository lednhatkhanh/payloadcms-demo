'use client'

import {
  FormSubmit,
  Select,
  useAuth,
  useConfig,
  useDocumentInfo,
  useForm,
  useFormFields,
} from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'

import { useCallback, useState } from 'react'

type WorkflowState =
  | 'approved'
  | 'changes-requested'
  | 'draft'
  | 'in-review'
  | 'translation-requested'

type WorkflowAction = {
  readonly key:
    | 'approve'
    | 'publish'
    | 'request-changes'
    | 'request-review'
    | 'request-translation'
    | 'save-draft'
    | 'submit-translation'
  readonly label: string
  readonly publish?: boolean
  readonly state: WorkflowState
}

function workflowStateFrom(value: unknown): WorkflowState {
  if (
    value === 'approved' ||
    value === 'changes-requested' ||
    value === 'in-review' ||
    value === 'translation-requested'
  ) {
    return value
  }
  return 'draft'
}

function rolesFrom(value: unknown): readonly string[] {
  if (!value || typeof value !== 'object' || !('roles' in value)) return []
  const { roles } = value
  return Array.isArray(roles)
    ? roles.filter((role): role is string => typeof role === 'string')
    : []
}

function includesRole(roles: readonly string[], role: string): boolean {
  return roles.includes('admin') || roles.includes(role)
}

function isWorkflowActionKey(value: unknown): value is WorkflowAction['key'] {
  return (
    value === 'approve' ||
    value === 'publish' ||
    value === 'request-changes' ||
    value === 'request-review' ||
    value === 'request-translation' ||
    value === 'save-draft' ||
    value === 'submit-translation'
  )
}

function actionPath(
  collectionSlug: string,
  id: number | string | undefined,
  publish: boolean | undefined,
): `/${string}` {
  if (id) {
    return publish
      ? `/${collectionSlug}/${id}?depth=0`
      : `/${collectionSlug}/${id}?depth=0&draft=true&fallback-locale=null`
  }

  return publish
    ? `/${collectionSlug}?depth=0`
    : `/${collectionSlug}?depth=0&draft=true&fallback-locale=null`
}

export function WorkflowActionButton() {
  const { config } = useConfig()
  const { user } = useAuth()
  const { collectionSlug, id } = useDocumentInfo()
  const { submit } = useForm()
  const workflowState = useFormFields(([fields]) => workflowStateFrom(fields.workflowState?.value))
  const roles = rolesFrom(user)
  const [selectedActionKey, setSelectedActionKey] = useState<WorkflowAction['key']>()

  const submitAction = useCallback(
    async (action: WorkflowAction) => {
      if (!collectionSlug) return

      await submit({
        action: formatAdminURL({
          apiRoute: config.routes.api,
          path: actionPath(collectionSlug, id, action.publish),
        }),
        method: id ? 'PATCH' : 'POST',
        overrides: {
          ['_status']: action.publish ? 'published' : 'draft',
          workflowState: action.state,
        },
      })
    },
    [collectionSlug, config.routes.api, id, submit],
  )

  const actions: readonly WorkflowAction[] = (() => {
    if (
      (workflowState === 'draft' || workflowState === 'changes-requested') &&
      includesRole(roles, 'editor')
    ) {
      return id
        ? [
            {
              key: 'request-translation',
              label: 'Request translation',
              state: 'translation-requested',
            },
            { key: 'request-review', label: 'Request review', state: 'in-review' },
          ]
        : [{ key: 'save-draft', label: 'Save draft', state: 'draft' }]
    }

    if (workflowState === 'translation-requested' && includesRole(roles, 'translator')) {
      return [
        { key: 'submit-translation', label: 'Submit translations for review', state: 'in-review' },
      ]
    }

    if (workflowState === 'in-review' && includesRole(roles, 'reviewer')) {
      return [
        { key: 'approve', label: 'Approve', state: 'approved' },
        { key: 'request-changes', label: 'Request changes', state: 'changes-requested' },
      ]
    }

    if (workflowState === 'approved' && includesRole(roles, 'publisher')) {
      return [{ key: 'publish', label: 'Publish changes', publish: true, state: 'approved' }]
    }

    return []
  })()
  const selectedAction = actions.find(({ key }) => key === selectedActionKey) ?? actions[0]

  if (!selectedAction) return null

  return (
    <>
      <Select
        customProps={{ valueContainerLabel: 'Workflow action' }}
        isClearable={false}
        isSearchable={false}
        onChange={(value) => {
          if (!Array.isArray(value) && isWorkflowActionKey(value.value)) {
            setSelectedActionKey(value.value)
          }
        }}
        options={actions.map((action) => ({ label: action.label, value: action.key }))}
        value={{ label: selectedAction.label, value: selectedAction.key }}
      />
      <FormSubmit
        buttonId="action-workflow"
        onClick={() => void submitAction(selectedAction)}
        size="medium"
        type="button"
      >
        {selectedAction.label}
      </FormSubmit>
    </>
  )
}
