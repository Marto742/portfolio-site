import { useSyncExternalStore } from 'react'

let cached: boolean | undefined

function detect(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return false
  if (!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches)
    return false
  if ((navigator.hardwareConcurrency ?? 2) < 4) return false
  try {
    const canvas = document.createElement('canvas')
    if (!(canvas.getContext('webgl2') ?? canvas.getContext('webgl')))
      return false
  } catch {
    return false
  }
  return true
}

function getSnapshot(): boolean {
  if (cached === undefined) cached = detect()
  return cached
}

// Capability is effectively static for a session, so there's nothing to subscribe to.
const subscribe = () => () => {}

/**
 * True only when the WebGL particle hero is worth rendering: a capable desktop
 * with a fine pointer, enough cores, WebGL support, and no reduced-motion
 * preference. Returns false during prerender (the CSS poster is the SSR output).
 */
export function useShouldRender3D(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
