'use client'

import { cva } from 'class-variance-authority'
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
const controlStyles = cva(
  'w-full rounded-md border border-border bg-surface px-space-md py-space-sm text-body text-foreground outline-none transition placeholder:text-neutral-500 rac-hovered:border-neutral-500 rac-focused:border-brand-700 rac-focused:ring-2 rac-focused:ring-brand-200 rac-invalid:border-danger rac-invalid:ring-danger/15 rac-disabled:cursor-not-allowed rac-disabled:bg-neutral-100 rac-disabled:opacity-60',
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

interface SharedFieldProps {
  readonly description?: string
  readonly errorMessage?: string | ((validation: ValidationResult) => string)
  readonly label: string
}

export interface TextFieldProps
  extends Omit<AriaTextFieldProps, 'children' | 'className' | 'style'>, SharedFieldProps {}

export function TextField({ description, errorMessage, label, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} className={fieldStyles()}>
      <Label className="text-small font-semibold text-foreground">{label}</Label>
      <Input className={controlStyles()} />
      {description ? (
        <Text className="text-small text-muted" slot="description">
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
