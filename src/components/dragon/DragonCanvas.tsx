import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import DragonModel from './DragonModel'
import DragonEnvironment from './DragonEnvironment'

interface Props {
  progress?: number
}

useGLTF.preload('/draco.glb')

const NUM_STARS = 1200

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const [positions, colors] = useMemo(() => {
    const p = new Float32Array(NUM_STARS * 3)
    const c = new Float32Array(NUM_STARS * 3)
    const palette = [
      new THREE.Color('#C8922A'),
      new THREE.Color('#E0E0E0'),
      new THREE.Color('#00FFFF'),
      new THREE.Color('#FF6B2B'),
    ]
    for (let i = 0; i < NUM_STARS; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40
      p[i * 3 + 1] = (Math.random() - 0.5) * 25
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4
      const col = palette[Math.floor(Math.random() * palette.length)]
      c[i * 3] = col.r
      c[i * 3 + 1] = col.g
      c[i * 3 + 2] = col.b
    }
    return [p, c]
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function DragonCanvas({ progress = 0 }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.8, 3.2], fov: 50, near: 0.1, far: 20 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <DragonEnvironment />
          <Stars />
          <DragonModel progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}