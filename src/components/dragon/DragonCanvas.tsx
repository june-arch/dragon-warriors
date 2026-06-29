import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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

function ResponsiveCamera() {
  const { viewport, camera } = useThree()

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    const w = viewport.width
    if (w < 5) {
      cam.position.set(0, 0.5, 4.5)
      cam.fov = 55
    } else if (w < 8) {
      cam.position.set(0, 0.6, 3.8)
      cam.fov = 52
    } else {
      cam.position.set(0, 0.8, 3.2)
      cam.fov = 50
    }
    cam.updateProjectionMatrix()
  }, [viewport.width, camera])

  return null
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
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ResponsiveCamera />
          <DragonEnvironment />
          <Stars />
          <DragonModel progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}