'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 5

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1)
    dirLight1.position.set(10, 10, 5)
    scene.add(dirLight1)
    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 0.5)
    dirLight2.position.set(-10, -10, -5)
    scene.add(dirLight2)

    // Animated sphere
    const sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    const sphereMat = new THREE.MeshStandardMaterial({
      color: '#3B82F6',
      roughness: 0.2,
      metalness: 0.8,
    })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    sphere.scale.setScalar(1.5)
    scene.add(sphere)

    // Floating particles
    const particleGroup = new THREE.Group()
    for (let i = 0; i < 40; i++) {
      const pGeo = new THREE.SphereGeometry(0.05, 16, 16)
      const pMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? '#8B5CF6' : '#10B981',
        roughness: 0.1,
      })
      const p = new THREE.Mesh(pGeo, pMat)
      p.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      )
      particleGroup.add(p)
    }
    scene.add(particleGroup)

    // Animation loop
    const clock = new THREE.Clock()
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      sphere.rotation.x = t * 0.2
      sphere.rotation.y = t * 0.3
      sphere.position.y = Math.sin(t * 2) * 0.1 // float effect

      particleGroup.rotation.y = t * 0.05
      particleGroup.rotation.x = t * 0.02

      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  )
}
