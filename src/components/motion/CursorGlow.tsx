import { useEffect } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'

/**
 * A subtle amber spotlight that follows the cursor through the page's negative
 * space. Mouse position is driven through motion values (no React re-renders).
 * Disabled for reduced-motion and non-fine pointers (touch).
 */
export function CursorGlow() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 168, 67, 0.06), transparent 45%)`

  useEffect(() => {
    if (reduced) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    function onMove(event: PointerEvent) {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 print:hidden"
      style={{ background }}
    />
  )
}
