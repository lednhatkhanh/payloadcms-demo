'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components/Link'
import type { ComponentProps } from 'react'

import { buttonStyles } from './button'

type NextLinkProps = ComponentProps<typeof NextLink>

function nextLinkRender(domProps: Parameters<NonNullable<AriaLinkProps['render']>>[0]) {
  if ('href' in domProps && typeof domProps.href === 'string') {
    // React Aria guarantees anchor props after the href guard. Next's exact-optional Link type
    // rejects DOM props whose optional keys contain undefined, although React omits them at runtime.
    const props = domProps as NextLinkProps
    return <NextLink {...props} />
  }
  return <span {...domProps} />
}

const linkStyles = cva(
  'rounded-sm underline decoration-brand-300 underline-offset-4 transition rac-hovered:decoration-brand-700 rac-focus-visible:outline-none rac-focus-visible:ring-2 rac-focus-visible:ring-brand-700 rac-focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        inline: 'font-semibold text-brand-800',
        navigation:
          'text-small font-semibold text-neutral-800 no-underline rac-hovered:text-brand-800',
      },
    },
    defaultVariants: { variant: 'inline' },
  },
)

type LinkVariants = VariantProps<typeof linkStyles>

export interface LinkProps
  extends Omit<AriaLinkProps, 'className' | 'href' | 'style'>, LinkVariants {
  readonly href: string
}

export function Link({ href, variant, ...props }: LinkProps) {
  return (
    <AriaLink {...props} className={linkStyles({ variant })} href={href} render={nextLinkRender} />
  )
}

export interface ButtonLinkProps
  extends Omit<AriaLinkProps, 'className' | 'href' | 'style'>, VariantProps<typeof buttonStyles> {
  readonly href: string
}

export function ButtonLink({ href, size, variant, ...props }: ButtonLinkProps) {
  return (
    <AriaLink
      {...props}
      className={buttonStyles({ size, variant })}
      href={href}
      render={nextLinkRender}
    />
  )
}
