import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  progress?: number
}

type BoneMap = Record<string, THREE.Bone>
type RotMap = Record<string, THREE.Euler>

const BREATH_AMP = 0.03
const BREATH_FREQ = 0.8

export default function DragonModel({ progress = 0 }: Props) {
  const { scene } = useGLTF('/draco.glb')
  const groupRef = useRef<THREE.Group>(null)
  const bones = useRef<BoneMap>({})
  const initRot = useRef<RotMap>({})
  const mouse = useRef({ x: 0, y: 0 })
  const headSmooth = useRef({ x: 0, y: 0 })
  const boneLogged = useRef(false)

  function setBone(name: string, rx: number, ry: number, rz: number) {
    const b = bones.current[name]
    if (!b) return
    const i = initRot.current[name]
    b.rotation.x = (i?.x ?? 0) + rx
    b.rotation.y = (i?.y ?? 0) + ry
    b.rotation.z = (i?.z ?? 0) + rz
  }

  useEffect(() => {
    scene.traverse((node) => {
      if ((node as THREE.Bone).isBone) {
        const bone = node as THREE.Bone
        bones.current[bone.name] = bone
        initRot.current[bone.name] = bone.rotation.clone()
      }
    })
    if (import.meta.env.DEV && !boneLogged.current) {
      console.log('[Draco] bones:', Object.keys(bones.current).sort())
      boneLogged.current = true
    }
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [scene])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const d = Math.min(delta, 0.05)
    const p = Math.max(0, Math.min(1, progress ?? 0))

    const paraY = p * 1.2
    const opacity = 1 - Math.pow(p, 1.5)
    const scale = 2 * (1 + p * 0.08)

    groupRef.current.position.set(0, -1.0 + Math.sin(t * BREATH_FREQ) * BREATH_AMP + paraY, 0.3)
    groupRef.current.rotation.set(0, -Math.PI / 2, 0.15)
    groupRef.current.scale.setScalar(scale)
    scene.traverse((node) => {
      const mesh = node as THREE.Mesh
      if (mesh.isMesh && mesh.material) {
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const mat of mats) {
          mat.opacity = opacity
          mat.transparent = true
        }
      }
    })

    const k = 1 - Math.pow(0.04, d)
    headSmooth.current.x += (mouse.current.x - headSmooth.current.x) * k * 0.5
    headSmooth.current.y += (mouse.current.y - headSmooth.current.y) * k * 0.5

    setBone('Head', headSmooth.current.y * 0.2, headSmooth.current.x * 0.25, 0)
    setBone('Neck', headSmooth.current.y * 0.1, headSmooth.current.x * 0.15, 0)
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} castShadow receiveShadow />
    </group>
  )
}

useGLTF.preload('/draco.glb')