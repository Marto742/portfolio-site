import type { CSSProperties } from 'react'

// Fine engineering dot-grid, masked to fade out toward the edges.
const dotGrid: CSSProperties = {
  backgroundImage:
    'radial-gradient(circle, var(--color-line) 1px, transparent 1px)',
  backgroundSize: '34px 34px',
  maskImage: 'radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)',
  WebkitMaskImage:
    'radial-gradient(ellipse at 50% 0%, #000 0%, transparent 70%)',
}

/**
 * Static cinematic backdrop for the hero. In Phase 9 the WebGL particle canvas
 * mounts in this same slot; this remains the reduced-motion / no-WebGL poster.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-15%] h-[55vh] w-[90vw] max-w-5xl -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]" />
      <div className="absolute bottom-[-25%] right-[-5%] h-[40vh] w-[45vw] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute inset-0" style={dotGrid} />
    </div>
  )
}
