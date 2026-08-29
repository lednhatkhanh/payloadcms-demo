import { z } from 'zod'

const honeypotSchema = z.string().max(0).optional().default('')

export const contactInputSchema = z.object({
  consent: z.literal(true, { error: 'Please confirm that we may store your message.' }),
  email: z.email('Enter a valid email address.').max(200),
  message: z.string().trim().min(20, 'Tell us a little more.').max(2_000),
  name: z.string().trim().min(2, 'Enter your name.').max(100),
  organization: z.string().trim().max(150).optional().default(''),
  website: honeypotSchema,
})

export const newsletterInputSchema = z.object({
  consent: z.literal(true, { error: 'Please confirm that you want to subscribe.' }),
  email: z.email('Enter a valid email address.').max(200),
  source: z.string().trim().max(100).optional().default('website-footer'),
  website: honeypotSchema,
})

export type ContactInput = z.infer<typeof contactInputSchema>
export type NewsletterInput = z.infer<typeof newsletterInputSchema>

export type FormFieldErrors = Readonly<Record<string, readonly string[]>>

export type FormResult =
  | { readonly ok: true; readonly message: string }
  | {
      readonly ok: false
      readonly message: string
      readonly fieldErrors: FormFieldErrors
    }

export function flattenFormErrors(error: z.ZodError): FormFieldErrors {
  return z.flattenError(error).fieldErrors
}
