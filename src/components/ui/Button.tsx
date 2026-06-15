import type { ComponentPropsWithoutRef } from 'react'
import { buttonClasses, type ButtonVariant } from './button-styles'

export function Button({
  variant = 'primary',
  className,
  type = 'button',
  ...props
}: ComponentPropsWithoutRef<'button'> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      {...props}
    />
  )
}
