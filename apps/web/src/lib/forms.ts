import type { FormFieldErrors } from '@repo/contracts/forms'

export function mutableFieldErrors(errors: FormFieldErrors): Record<string, string[]> {
  return Object.fromEntries(
    Object.entries(errors).map(([field, messages]) => [field, [...messages]]),
  )
}
