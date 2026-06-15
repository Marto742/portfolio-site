import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Centered, max-width content wrapper with responsive gutters. */
export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-6 sm:px-8', className)}>
      {children}
    </div>
  )
}
