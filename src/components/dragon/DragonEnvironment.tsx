import { Environment, ContactShadows } from '@react-three/drei'

export default function DragonEnvironment() {
  return (
    <>
      <ambientLight intensity={0.4} color="#2a1a2a" />
      <directionalLight
        position={[3, 5, 3]}
        intensity={3.0}
        color="#C8922A"
        castShadow
      />
      <directionalLight
        position={[-2, 2, -3]}
        intensity={2.0}
        color="#D9430B"
      />
      <pointLight
        position={[0, -1, 1.5]}
        intensity={1.2}
        color="#00FFFF"
        distance={6}
        decay={1.5}
      />
      <pointLight
        position={[-1, -2, -1]}
        intensity={0.8}
        color="#FF6B2B"
        distance={5}
        decay={1.5}
      />
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.3}
        scale={6}
        blur={2}
        color="#946B31"
      />
      <fog attach="fog" args={['#070507', 8, 20]} />
      <Environment preset="night" />
    </>
  )
}
