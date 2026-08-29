import type { Payload } from 'payload'

type EditorialCollection = 'news' | 'pages'
type WorkflowRequestState = 'approved' | 'changes-requested' | 'in-review' | 'translation-requested'

type WorkflowRequest = {
  readonly collection: EditorialCollection
  readonly id: number | string
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

async function requestsForState(
  payload: Payload,
  state: WorkflowRequestState,
): Promise<readonly WorkflowRequest[]> {
  const collections: readonly EditorialCollection[] = ['news', 'pages']
  const requests = await Promise.all(
    collections.map(async (collection) => {
      const result = await payload.find({
        collection,
        depth: 0,
        draft: true,
        limit: 20,
        locale: 'en',
        overrideAccess: true,
        select: { title: true, translationLocales: true, updatedAt: true, workflowState: true },
        sort: '-updatedAt',
        where: { workflowState: { equals: state } },
      })

      return result.docs.flatMap((doc) => {
        if (!isWorkflowState(doc.workflowState)) return []
        return [
          {
            collection,
            id: doc.id,
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
  readonly user?: unknown
}) {
  const states = statesForRoles(rolesForUser(user))
  const requests = (
    await Promise.all(states.map((state) => requestsForState(payload, state)))
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
        <ul className="workflow-inbox__list">
          {requests.map((request) => (
            <li key={`${request.collection}-${request.id}-${request.state}`}>
              <a href={`${adminPath}/collections/${request.collection}/${request.id}`}>
                <span>{request.title}</span>
                <small>{stateLabel(request)}</small>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="workflow-inbox__empty">No workflow requests are waiting for you.</p>
      )}
    </section>
  )
}
