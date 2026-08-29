import { contactInputSchema, flattenFormErrors, type FormResult } from '@repo/contracts/forms'
import config from '@repo/payload-config'
import { getPayload } from 'payload'

function isHoneypot(value: unknown): boolean {
  return typeof value === 'object' && value !== null && 'website' in value && Boolean(value.website)
}

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json()
  if (isHoneypot(body)) {
    return Response.json({
      ok: true,
      message: 'Thanks — your message has been received.',
    } satisfies FormResult)
  }
  const result = contactInputSchema.safeParse(body)
  if (!result.success) {
    return Response.json(
      {
        ok: false,
        message: 'Check the highlighted fields.',
        fieldErrors: flattenFormErrors(result.error),
      } satisfies FormResult,
      { status: 422 },
    )
  }
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'contact-submissions',
    data: {
      consent: result.data.consent,
      email: result.data.email,
      message: result.data.message,
      name: result.data.name,
      organization: result.data.organization,
    },
    overrideAccess: true,
  })
  return Response.json({
    ok: true,
    message: 'Thanks — your message has been received.',
  } satisfies FormResult)
}
