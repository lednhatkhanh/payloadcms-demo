import type { ReactNode } from 'react'
import Image from 'next/image'

export function Card({ children }: { readonly children: ReactNode }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
      {children}
    </article>
  )
}

export function CardBody({ children }: { readonly children: ReactNode }) {
  return <div className="flex flex-1 flex-col gap-space-md p-space-lg">{children}</div>
}

export function CardMedia({
  alt,
  src,
}: {
  readonly alt: string
  readonly src?: string | undefined
}) {
  return (
    <div className="relative aspect-video overflow-hidden bg-brand-100">
      {src ? (
        <Image
          alt={alt}
          className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={src}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-brand-100 via-brand-300 to-brand-700" />
      )}
    </div>
  )
}

export function ArticleBody({ children }: { readonly children: ReactNode }) {
  return <div className="article-body">{children}</div>
}
