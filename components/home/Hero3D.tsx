'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Preload } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingParticles() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    group.current.rotation.x = state.clock.getElapsedTime() * 0.02
  })

  return (
    <group ref={group}>
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#8B5CF6" : "#10B981"} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        
        <AnimatedShape />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <Preload all />
      </Canvas>
    </div>
  )
}
