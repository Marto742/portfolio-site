import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useShouldRender3D } from './useShouldRender3D'

const ParticleField = lazy(() => import('./ParticleField'))

/**
 * Mounts the WebGL particle field over the CSS poster — but only on capable
 * devices, only after the browser is idle (so it never competes with the LCP),
 * and pauses its render loop when the hero scrolls out of view.
 */
export function Hero3D() {
  const capable = useShouldRender3D()
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  // Defer the mount until after first paint / hydration.
  useEffect(() => {
    if (!capable) return
    const requestIdle = window.requestIdleCallback as
      | ((cb: () => void) => number)
      | undefined
    let idleId: number | undefined
    let timerId: number | undefined
    if (requestIdle) {
      idleId = requestIdle(() => setMounted(true))
    } else {
      timerId = window.setTimeout(() => setMounted(true), 300)
    }
    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId)
      if (timerId !== undefined) clearTimeout(timerId)
    }
  }, [capable])

  // Pause the render loop while the hero is off-screen.
  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry?.isIntersecting ?? true),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  if (!capable) return null

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-10">
      {mounted && (
        <Suspense fallback={null}>
          <ParticleField active={inView} />
        </Suspense>
      )}
    </div>
  )
}
