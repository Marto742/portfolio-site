import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 4000

/** Engineering dot-grid formation. */
function buildLattice(count: number): Float32Array {
  const out = new Float32Array(count * 3)
  const cols = Math.ceil(Math.sqrt(count * (16 / 9)))
  const rows = Math.ceil(count / cols)
  for (let i = 0; i < count; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    out[i * 3] = (col / (cols - 1) - 0.5) * 5.2
    out[i * 3 + 1] = (row / (rows - 1) - 0.5) * 3
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.4
  }
  return out
}

/** Point cloud sampled from the letterforms "MP". */
function buildText(count: number): Float32Array {
  const w = 320
  const h = 160
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  const out = new Float32Array(count * 3)
  if (!ctx) return out

  ctx.fillStyle = '#fff'
  ctx.font = 'bold 130px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('MP', w / 2, h / 2)

  const data = ctx.getImageData(0, 0, w, h).data
  const hits: number[] = []
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if ((data[(y * w + x) * 4 + 3] ?? 0) > 128) hits.push(x, y)
    }
  }

  for (let i = 0; i < count; i++) {
    const base = hits.length
      ? Math.floor(Math.random() * (hits.length / 2)) * 2
      : 0
    const px = hits[base] ?? w / 2
    const py = hits[base + 1] ?? h / 2
    out[i * 3] = (px / w - 0.5) * 5
    out[i * 3 + 1] = -(py / h - 0.5) * 2.5
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.3
  }
  return out
}

function Particles() {
  const ref = useRef<THREE.Points>(null)
  const { lattice, text, base } = useMemo(() => {
    const lattice = buildLattice(COUNT)
    const text = buildText(COUNT)
    return { lattice, text, base: new Float32Array(lattice) }
  }, [])

  useFrame((state) => {
    const points = ref.current
    if (!points) return
    const t = state.clock.elapsedTime
    const progress = (Math.sin(t * 0.3) + 1) / 2
    const attr = points.geometry.attributes.position as THREE.BufferAttribute
    const pos = attr.array as Float32Array

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const lx = lattice[i3] as number
      const ly = lattice[i3 + 1] as number
      const lz = lattice[i3 + 2] as number
      const tx = text[i3] as number
      const ty = text[i3 + 1] as number
      const tz = text[i3 + 2] as number
      const drift = Math.sin(t * 0.8 + i) * 0.012
      pos[i3] = lx + (tx - lx) * progress
      pos[i3 + 1] = ly + (ty - ly) * progress + drift
      pos[i3 + 2] = lz + (tz - lz) * progress
    }
    attr.needsUpdate = true

    // Subtle parallax toward the cursor, plus a slow ambient sway.
    points.rotation.y += (state.pointer.x * 0.25 - points.rotation.y) * 0.05
    points.rotation.x += (state.pointer.y * 0.12 - points.rotation.x) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[base, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a843"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Particles />
    </Canvas>
  )
}
