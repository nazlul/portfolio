'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

const SHAPES = [
  'sphere', 'box', 'cone', 'pyramid', 'dodecahedron',
  'octahedron', 'tetrahedron', 'torus', 'cylinder', 'sphere',
] as const

type ShapeType = typeof SHAPES[number]

interface OrbProps {
  shape: ShapeType
  baseRadius: number
  angleOffset: number
  scroll: number
  yOffset: number
  isScrolling: boolean
  color: string
}

function Orb({
  shape,
  baseRadius,
  angleOffset,
  scroll,
  yOffset,
  isScrolling,
  color
}: OrbProps) {
  const ref = useRef<THREE.Mesh>(null)
  const theta = useRef(angleOffset)

  useFrame(() => {
    if (isScrolling) {
      const orbitSpeed = scroll * 0.1
      theta.current += orbitSpeed
    }

    const dynamicRadius = baseRadius * (1 - 0.3 * scroll)
    const x = dynamicRadius * Math.cos(theta.current)
    const z = dynamicRadius * Math.sin(theta.current)

    if (ref.current) {
      ref.current.position.set(x, yOffset, z)

      const spin = 0.01 + scroll * 0.05
      ref.current.rotation.x += spin
      ref.current.rotation.y += spin
    }
  })

  const geometry = {
    sphere: <sphereGeometry args={[0.8, 32, 32]} />,
    box: <boxGeometry args={[1.4, 1.4, 1.4]} />,
    cone: <coneGeometry args={[0.8, 1.4, 32]} />,
    pyramid: <coneGeometry args={[1, 1.4, 4]} />,
    dodecahedron: <dodecahedronGeometry args={[1]} />,
    octahedron: <octahedronGeometry args={[1]} />,
    tetrahedron: <tetrahedronGeometry args={[1]} />,
    torus: <torusGeometry args={[0.7, 0.25, 16, 100]} />,
    cylinder: <cylinderGeometry args={[0.8, 0.8, 1.4, 32]} />,
  }[shape]

  return (
    <mesh ref={ref}>
      {geometry}
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
    </mesh>
  )
}

interface OrbitalSceneProps {
  scroll: number
  isScrolling: boolean
  color?: string 
}

export default function OrbitalScene({
  scroll,
  isScrolling,
  color = '#f5f5f5'
}: OrbitalSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, 10, 10]} color="#ff00aa" intensity={1} />
      <pointLight position={[10, -10, 10]} color="#ffff33" intensity={1} />

      {SHAPES.map((shape, index) => {
        const angleOffset = (index / SHAPES.length) * Math.PI * 2
        const baseRadius = 4 + (index % 3) * 2
        const yOffset = ((index % 5) - 2) * 1.2

        return (
          <Orb
            key={index}
            shape={shape}
            baseRadius={baseRadius}
            angleOffset={angleOffset}
            scroll={scroll}
            yOffset={yOffset}
            isScrolling={isScrolling}
            color={color}
          />
        )
      })}
    </Canvas>
  )
}
