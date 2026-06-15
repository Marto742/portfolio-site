import { cn } from '../../lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-canvas hover:bg-accent-light',
  secondary: 'border border-line text-fg hover:border-accent hover:text-accent',
  ghost: 'text-muted hover:text-fg',
}

/** Shared button styling — use on `<a>` links or via the `Button` component. */
export function buttonClasses(
  variant: ButtonVariant = 'primary',
  className?: string,
) {
  return cn(base, variants[variant], className)
}
