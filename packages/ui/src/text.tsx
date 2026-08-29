import { cva, type VariantProps } from 'class-variance-authority'
import { createElement, type ElementType, type ReactNode } from 'react'

const textStyles = cva('', {
  variants: {
    color: {
      default: 'text-foreground',
      muted: 'text-muted',
      brand: 'text-brand-800',
      inverse: 'text-white',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
    variant: {
      display: 'text-display font-bold',
      h1: 'text-heading-1 font-bold',
      h2: 'text-heading-2 font-bold',
      h3: 'text-heading-3 font-bold',
      lead: 'text-lead font-normal',
      body: 'text-body font-normal',
      small: 'text-small font-normal',
      label: 'text-label font-bold uppercase tracking-label',
    },
  },
  defaultVariants: { color: 'default', variant: 'body' },
})

type TextVariants = VariantProps<typeof textStyles>

export interface TextProps extends TextVariants {
  readonly as?: ElementType
  readonly children: ReactNode
  readonly id?: string
  readonly testId?: string
}

export function Text({ as = 'p', children, color, id, testId, variant }: TextProps) {
  return createElement(
    as,
    { className: textStyles({ color, variant }), 'data-testid': testId, id },
    children,
  )
}
