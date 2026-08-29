import type { Access } from 'payload'

export const authenticated: Access = ({ req }) => Boolean(req.user)

type RecordValue = Record<string, unknown>

function isRecord(value: unknown): value is RecordValue {
  return typeof value === 'object' && value !== null
}

function rolesForUser(user: unknown): readonly string[] {
  if (!isRecord(user) || !Array.isArray(user.roles)) return []
  return user.roles.filter((role): role is string => typeof role === 'string')
}

export function isAdministrator(user: unknown): boolean {
  if (!isRecord(user)) return false
  return !Array.isArray(user.roles) || rolesForUser(user).includes('admin')
}

export function hasEditorialRole(
  user: unknown,
  role: 'editor' | 'reviewer' | 'publisher',
): boolean {
  return isAdministrator(user) || rolesForUser(user).includes(role)
}

export const administrator: Access = ({ req }) => isAdministrator(req.user)

export const editorialParticipant: Access = ({ req }) =>
  hasEditorialRole(req.user, 'editor') ||
  hasEditorialRole(req.user, 'reviewer') ||
  hasEditorialRole(req.user, 'publisher')

export const editorialCreator: Access = ({ req }) => hasEditorialRole(req.user, 'editor')

export const selfOrAdministrator: Access = ({ id, req }) => {
  if (isAdministrator(req.user)) return true
  if (!isRecord(req.user)) return false
  return req.user.id === id
}

export const publicRead: Access = () => true

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const publicGlobalRead: Access = () => true
