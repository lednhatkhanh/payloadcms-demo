'use client'

import type { FormResult } from '@repo/contracts/forms'
import { Button } from '@repo/ui/button'
import {
  CheckboxField,
  Form,
  FormActionRow,
  HoneypotField,
  TextAreaField,
  TextField,
} from '@repo/ui/form'
import { Icon, Send } from '@repo/ui/icon'
import { Stack } from '@repo/ui/layout'
import { Text } from '@repo/ui/text'
import ky from 'ky'
import { useState, useTransition, type SyntheticEvent } from 'react'

import { mutableFieldErrors } from '@/lib/forms'

type FormState = {
  readonly fieldErrors?: Record<string, string[]>
  readonly message?: string
  readonly status: 'idle' | 'error' | 'success'
}

const initialState: FormState = { status: 'idle' }

async function submitForm(endpoint: string, form: HTMLFormElement): Promise<FormResult> {
  const data = new FormData(form)
  const body = Object.fromEntries(data)
  return ky
    .post(endpoint, {
      json: { ...body, consent: data.get('consent') === 'on' },
      throwHttpErrors: false,
    })
    .json<FormResult>()
}

export function ContactForm() {
  const [state, setState] = useState<FormState>(initialState)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    startTransition(async () => {
      const result = await submitForm('/api/contact', form)
      if (result.ok) {
        form.reset()
        setState({ message: result.message, status: 'success' })
      } else {
        setState({
          fieldErrors: mutableFieldErrors(result.fieldErrors),
          message: result.message,
          status: 'error',
        })
      }
    })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      {...(state.fieldErrors ? { validationErrors: state.fieldErrors } : {})}
    >
      <TextField isRequired label="Name" maxLength={100} name="name" />
      <TextField isRequired label="Email" maxLength={200} name="email" type="email" />
      <TextField label="Organization" maxLength={150} name="organization" />
      <TextAreaField
        description="Please include enough context for a useful reply."
        isRequired
        label="Message"
        maxLength={2000}
        minLength={20}
        name="message"
      />
      <CheckboxField
        isRequired
        label="I agree that The Dispatch may store this message to reply."
        name="consent"
      />
      <HoneypotField />
      <Button isPending={isPending} type="submit">
        <Icon source={Send} size="sm" /> Send message
      </Button>
      <FormStatus state={state} />
    </Form>
  )
}

export function NewsletterForm() {
  return (
    <Form>
      <FormActionRow>
        <TextField
          isRequired
          label="Email address"
          maxLength={200}
          name="email"
          placeholder="you@example.com"
          tone="inverse"
          type="email"
        />
        <Button size="newsletter" type="button" variant="secondary">
          Subscribe
        </Button>
      </FormActionRow>
    </Form>
  )
}

function FormStatus({ state }: { readonly state: FormState }) {
  if (!state.message) return null
  return (
    <Stack gap="xs">
      <Text color={state.status === 'success' ? 'success' : 'danger'} variant="small">
        <span aria-live="polite">{state.message}</span>
      </Text>
    </Stack>
  )
}
