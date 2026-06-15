import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Full-width page section with consistent vertical rhythm. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn('py-24 sm:py-32', className)}>
      {children}
    </section>
  )
}
