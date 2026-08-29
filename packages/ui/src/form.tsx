'use client'

import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { Form as AriaForm, type FormProps as AriaFormProps } from 'react-aria-components/Form'
import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  type ValidationResult,
} from 'react-aria-components/TextField'
import {
  CheckboxButton as AriaCheckboxButton,
  CheckboxField as AriaCheckboxField,
  type CheckboxFieldProps as AriaCheckboxFieldProps,
} from 'react-aria-components/Checkbox'
import { Check } from 'lucide-react'
import { VisuallyHidden } from 'react-aria-components/VisuallyHidden'

const fieldStyles = cva('group flex flex-col gap-space-2xs text-body')
const labelStyles = cva('text-small font-semibold', {
  variants: {
    tone: {
      default: 'text-foreground',
      inverse: 'text-inverse',
    },
  },
  defaultVariants: { tone: 'default' },
})
const controlStyles = cva(
  'w-full rounded-md border px-space-md py-space-sm text-body outline-none transition rac-invalid:border-danger rac-invalid:ring-danger/15 rac-disabled:cursor-not-allowed rac-disabled:opacity-60',
  {
    variants: {
      tone: {
        default:
          'border-border bg-surface text-foreground placeholder:text-neutral-500 rac-hovered:border-neutral-500 rac-focused:border-brand-700 rac-focused:ring-2 rac-focused:ring-brand-200 rac-disabled:bg-neutral-100',
        inverse:
          'border-neutral-500 bg-neutral-900 text-inverse placeholder:text-inverse-muted rac-hovered:border-neutral-400 rac-focused:border-brand-300 rac-focused:ring-2 rac-focused:ring-brand-300 rac-disabled:bg-neutral-900',
      },
    },
    defaultVariants: { tone: 'default' },
  },
)
const checkboxButtonStyles = cva(
  'group flex cursor-default items-start gap-space-sm text-small rac-disabled:cursor-not-allowed rac-disabled:opacity-50',
  {
    variants: {
      tone: {
        default: 'text-muted',
        inverse: 'text-white',
      },
    },
    defaultVariants: { tone: 'default' },
  },
)

export interface FormProps extends Omit<AriaFormProps, 'className' | 'style'> {}

export function Form(props: FormProps) {
  return <AriaForm {...props} className="flex flex-col gap-space-lg" />
}

export function FormActionRow({ children }: { readonly children: ReactNode }) {
  return (
    <div className="grid items-end gap-space-footer-field sm:grid-cols-form-action">{children}</div>
  )
}

interface SharedFieldProps {
  readonly description?: string
  readonly errorMessage?: string | ((validation: ValidationResult) => string)
  readonly label: string
}

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly placeholder?: string
  readonly tone?: 'default' | 'inverse'
}

export function TextField({
  description,
  errorMessage,
  label,
  placeholder,
  tone,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props} className={fieldStyles()}>
      <Label
        className={
          tone === 'inverse'
            ? 'font-mono text-meta font-bold uppercase tracking-label text-inverse'
            : labelStyles({ tone })
        }
      >
        {label}
      </Label>
      <Input
        className={controlStyles({ tone })}
        {...(placeholder === undefined ? {} : { placeholder })}
      />
      {description ? (
        <Text
          className={tone === 'inverse' ? 'text-small text-inverse-muted' : 'text-small text-muted'}
          slot="description"
        >
          {description}
        </Text>
      ) : null}
      <FieldError className="text-small font-semibold text-danger">{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export interface TextAreaFieldProps
  extends Omit<AriaTextFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly rows?: number
}

export function TextAreaField({
  description,
  errorMessage,
  label,
  rows = 6,
  ...props
}: TextAreaFieldProps) {
  return (
    <AriaTextField {...props} className={fieldStyles()}>
      <Label className="text-small font-semibold text-foreground">{label}</Label>
      <TextArea className={controlStyles()} rows={rows} />
      {description ? (
        <Text className="text-small text-muted" slot="description">
          {description}
        </Text>
      ) : null}
      <FieldError className="text-small font-semibold text-danger">{errorMessage}</FieldError>
    </AriaTextField>
  )
}

export interface CheckboxFieldProps
  extends Omit<AriaCheckboxFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {
  readonly tone?: 'default' | 'inverse'
}

export function CheckboxField({
  description,
  errorMessage,
  label,
  tone,
  ...props
}: CheckboxFieldProps) {
  return (
    <AriaCheckboxField {...props} className={fieldStyles()}>
      <AriaCheckboxButton className={checkboxButtonStyles({ tone })}>
        {({ isSelected }) => (
          <>
            <span className="mt-space-2xs flex size-5 shrink-0 items-center justify-center rounded-sm border border-neutral-500 bg-surface text-white transition group-rac-selected:border-brand-700 group-rac-selected:bg-brand-700 group-rac-focus-visible:ring-2 group-rac-focus-visible:ring-brand-700 group-rac-focus-visible:ring-offset-2">
              {isSelected ? (
                <Check aria-hidden="true" className="size-4" strokeWidth={2.25} />
              ) : null}
            </span>
            <span>{label}</span>
          </>
        )}
      </AriaCheckboxButton>
      {description ? (
        <Text className="pl-space-xl text-small text-muted" slot="description">
          {description}
        </Text>
      ) : null}
      <FieldError className="pl-space-xl text-small font-semibold text-danger">
        {errorMessage}
      </FieldError>
    </AriaCheckboxField>
  )
}

export function HoneypotField({ name = 'website' }: { readonly name?: string }) {
  return (
    <VisuallyHidden>
      <AriaTextField aria-label="Leave this field empty" name={name}>
        <Input autoComplete="off" tabIndex={-1} />
      </AriaTextField>
    </VisuallyHidden>
  )
}
