import { DefaultTemplate } from '@payloadcms/next/templates'
import { SetStepNav } from '@payloadcms/ui'
import { redirect } from 'next/navigation'
import type { AdminViewServerProps, Payload } from 'payload'

type EditorialCollection = 'news' | 'pages'
type WorkflowRequestState = 'approved' | 'changes-requested' | 'in-review' | 'translation-requested'

type WorkflowRequest = {
  readonly collection: EditorialCollection
  readonly id: number | string
  readonly requester: string
  readonly state: WorkflowRequestState
  readonly title: string
  readonly translationLocales: readonly string[]
  readonly updatedAt: string
}

function rolesForUser(user: unknown): readonly string[] {
  if (!user || typeof user !== 'object' || !('roles' in user)) return []
  const { roles } = user
  return Array.isArray(roles)
    ? roles.filter((role): role is string => typeof role === 'string')
    : []
}

function isWorkflowState(value: unknown): value is WorkflowRequestState {
  return (
    value === 'approved' ||
    value === 'changes-requested' ||
    value === 'in-review' ||
    value === 'translation-requested'
  )
}

function requestTitle(value: unknown): string {
  return typeof value === 'string' && value.length > 0 ? value : 'Untitled content'
}

function requestLocales(value: unknown): readonly string[] {
  return Array.isArray(value)
    ? value.filter((locale): locale is string => typeof locale === 'string')
    : []
}

function requestUpdatedAt(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requestRequester(value: unknown): string {
  if (!isRecord(value)) return '—'

  const { email, name } = value
  if (typeof name === 'string' && name.length > 0) return name
  if (typeof email === 'string' && email.length > 0) return email
  return '—'
}

function requesterForState(
  state: WorkflowRequestState,
  doc: {
    readonly reviewRequestedBy?: unknown
    readonly reviewedBy?: unknown
    readonly translatedBy?: unknown
    readonly translationRequestedBy?: unknown
  },
): string {
  if (state === 'translation-requested') return requestRequester(doc.translationRequestedBy)
  if (state === 'in-review') return requestRequester(doc.translatedBy ?? doc.reviewRequestedBy)
  return requestRequester(doc.reviewedBy)
}

function formatRequestDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return '—'

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(date)
}

async function requestsForState(
  payload: Payload,
  state: WorkflowRequestState,
  user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>,
): Promise<readonly WorkflowRequest[]> {
  const collections: readonly EditorialCollection[] = ['news', 'pages']
  const requests = await Promise.all(
    collections.map(async (collection) => {
      const result = await payload.find({
        collection,
        depth: 1,
        draft: true,
        limit: 20,
        locale: 'en',
        overrideAccess: false,
        select: {
          reviewRequestedBy: true,
          reviewedBy: true,
          title: true,
          translatedBy: true,
          translationLocales: true,
          translationRequestedBy: true,
          updatedAt: true,
          workflowState: true,
        },
        sort: '-updatedAt',
        user,
        where: { workflowState: { equals: state } },
      })

      return result.docs.flatMap((doc) => {
        if (!isWorkflowState(doc.workflowState)) return []
        return [
          {
            collection,
            id: doc.id,
            requester: requesterForState(doc.workflowState, doc),
            state: doc.workflowState,
            title: requestTitle(doc.title),
            translationLocales: requestLocales(doc.translationLocales),
            updatedAt: requestUpdatedAt(doc.updatedAt),
          },
        ]
      })
    }),
  )

  return requests.flat().sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
}

function statesForRoles(roles: readonly string[]): readonly WorkflowRequestState[] {
  if (roles.includes('admin')) {
    return ['translation-requested', 'in-review', 'changes-requested', 'approved']
  }

  return [
    ...(roles.includes('translator') ? (['translation-requested'] as const) : []),
    ...(roles.includes('reviewer') ? (['in-review'] as const) : []),
    ...(roles.includes('editor') ? (['changes-requested'] as const) : []),
    ...(roles.includes('publisher') ? (['approved'] as const) : []),
  ]
}

function stateLabel(request: WorkflowRequest): string {
  if (request.state === 'translation-requested') {
    const languages = request.translationLocales.join(', ')
    return languages ? `Translation requested: ${languages}` : 'Translation requested'
  }
  if (request.state === 'in-review') return 'Ready for review'
  if (request.state === 'changes-requested') return 'Changes requested'
  return 'Ready to publish'
}

export async function WorkflowInbox({
  payload,
  user,
}: {
  readonly payload: Payload
  readonly user: NonNullable<AdminViewServerProps['initPageResult']['req']['user']>
}) {
  const states = statesForRoles(rolesForUser(user))
  const requests = (
    await Promise.all(states.map((state) => requestsForState(payload, state, user)))
  ).flat()
  const adminPath = payload.config.routes.admin

  return (
    <section aria-labelledby="workflow-inbox-title" className="workflow-inbox">
      <div className="workflow-inbox__heading">
        <div>
          <p className="workflow-inbox__eyebrow">Editorial workflow</p>
          <h2 id="workflow-inbox-title">My requests</h2>
        </div>
        <p>Translation, review, revision, and publishing work currently waiting for your role.</p>
      </div>
      {requests.length > 0 ? (
        <div className="workflow-inbox__table-wrap">
          <table className="workflow-inbox__table">
            <thead>
              <tr>
                <th scope="col">Content</th>
                <th scope="col">Current action</th>
                <th scope="col">Requested by</th>
                <th scope="col">Translation targets</th>
                <th scope="col">Last updated</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={`${request.collection}-${request.id}-${request.state}`}>
                  <td>
                    <a href={`${adminPath}/collections/${request.collection}/${request.id}`}>
                      {request.title}
                    </a>
                    <small>{request.collection === 'news' ? 'News story' : 'Page'}</small>
                  </td>
                  <td>{stateLabel(request)}</td>
                  <td>{request.requester}</td>
                  <td>
                    {request.translationLocales.length > 0
                      ? request.translationLocales.join(', ')
                      : '—'}
                  </td>
                  <td>
                    <time dateTime={request.updatedAt}>{formatRequestDate(request.updatedAt)}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="workflow-inbox__empty">No workflow requests are waiting for you.</p>
      )}
    </section>
  )
}

export function WorkflowInboxView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const {
    locale,
    permissions,
    req: { i18n, payload, user },
    visibleEntities,
  } = initPageResult
  const adminPath = payload.config.routes.admin
  const optionalTemplateProps = {
    ...(locale === undefined ? {} : { locale }),
    ...(params === undefined ? {} : { params }),
    ...(searchParams === undefined ? {} : { searchParams }),
  }

  if (!user || !permissions.canAccessAdmin) redirect(`${adminPath}/unauthorized`)

  return (
    <DefaultTemplate
      i18n={i18n}
      payload={payload}
      permissions={permissions}
      user={user}
      visibleEntities={visibleEntities}
      viewType="workflow"
      {...optionalTemplateProps}
    >
      <SetStepNav nav={[{ label: 'My requests' }]} />
      <div className="workflow-inbox__view">
        <WorkflowInbox payload={payload} user={user} />
      </div>
    </DefaultTemplate>
  )
}
