import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

/** Small monospace pill for tech-stack / metadata labels. */
export function Tag({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
