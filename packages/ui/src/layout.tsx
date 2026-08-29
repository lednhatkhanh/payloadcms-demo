import { cva, type VariantProps } from 'class-variance-authority'
import type { ElementType, ReactNode } from 'react'

const containerStyles = cva('mx-auto w-full px-space-lg sm:px-space-xl', {
  variants: {
    size: { content: 'max-w-3xl', wide: 'max-w-7xl' },
  },
  defaultVariants: { size: 'wide' },
})

const stackStyles = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      '2xs': 'gap-space-2xs',
      xs: 'gap-space-xs',
      sm: 'gap-space-sm',
      md: 'gap-space-md',
      lg: 'gap-space-lg',
      xl: 'gap-space-xl',
      '2xl': 'gap-space-2xl',
      '3xl': 'gap-space-3xl',
    },
  },
  defaultVariants: { gap: 'md' },
})

const sectionStyles = cva('', {
  variants: {
    space: {
      compact: 'py-space-2xl',
      default: 'py-space-section',
      hero: 'py-space-section lg:py-space-hero',
    },
  },
  defaultVariants: { space: 'default' },
})

const surfaceStyles = cva('', {
  variants: {
    border: {
      none: 'border-0',
      subtle: 'border border-neutral-200',
      default: 'border border-border',
      strong: 'border border-neutral-500',
      brand: 'border border-brand-700',
    },
    padding: {
      none: 'p-0',
      sm: 'p-space-md',
      md: 'p-space-lg',
      lg: 'p-space-xl sm:p-space-2xl',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      pill: 'rounded-pill',
    },
    tone: {
      page: 'bg-page',
      surface: 'bg-surface',
      soft: 'bg-surface-soft',
      brand: 'bg-brand-700 text-white',
      ink: 'bg-neutral-950 text-white',
    },
  },
  defaultVariants: { border: 'none', padding: 'none', radius: 'none', tone: 'surface' },
})

interface BaseProps {
  readonly as?: ElementType
  readonly children: ReactNode
  readonly id?: string
}

export interface ContainerProps extends BaseProps, VariantProps<typeof containerStyles> {}
export function Container({ as: Component = 'div', children, id, size }: ContainerProps) {
  return (
    <Component className={containerStyles({ size })} id={id}>
      {children}
    </Component>
  )
}

export interface StackProps extends BaseProps, VariantProps<typeof stackStyles> {}
export function Stack({ as: Component = 'div', children, gap, id }: StackProps) {
  return (
    <Component className={stackStyles({ gap })} id={id}>
      {children}
    </Component>
  )
}

const clusterStyles = cva('flex flex-wrap items-center gap-space-md', {
  variants: {
    justify: { start: 'justify-start', between: 'justify-between', center: 'justify-center' },
    padding: { none: 'py-0', md: 'py-space-md', lg: 'py-space-lg' },
  },
  defaultVariants: { justify: 'start', padding: 'none' },
})

export interface ClusterProps extends BaseProps, VariantProps<typeof clusterStyles> {}
export function Cluster({ as: Component = 'div', children, id, justify, padding }: ClusterProps) {
  return (
    <Component className={clusterStyles({ justify, padding })} id={id}>
      {children}
    </Component>
  )
}

export interface SectionProps extends BaseProps, VariantProps<typeof sectionStyles> {}
export function Section({ as: Component = 'section', children, id, space }: SectionProps) {
  return (
    <Component className={sectionStyles({ space })} id={id}>
      {children}
    </Component>
  )
}

export function NewsGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-lg md:grid-cols-2 lg:grid-cols-3">{children}</div>
}

export function Split({ children }: { readonly children: ReactNode }) {
  return <div className="grid items-start gap-space-2xl lg:grid-cols-split">{children}</div>
}

export function EditorialRule() {
  return <div aria-hidden="true" className="h-px w-full bg-neutral-300" />
}

export function StatGrid({ children }: { readonly children: ReactNode }) {
  return <div className="grid gap-space-md sm:grid-cols-3">{children}</div>
}

export interface SurfaceProps extends BaseProps, VariantProps<typeof surfaceStyles> {}
export function Surface({
  as: Component = 'div',
  border,
  children,
  id,
  padding,
  radius,
  tone,
}: SurfaceProps) {
  return (
    <Component className={surfaceStyles({ border, padding, radius, tone })} id={id}>
      {children}
    </Component>
  )
}
