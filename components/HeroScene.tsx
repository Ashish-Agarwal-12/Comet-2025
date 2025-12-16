'use client'

import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  Stars, 
  Trail,
  PointMaterial,
  Points
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

// Floating particles that respond to mouse
function ParticleField({ count = 3000 }) {
  const points = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 10 // Pushed back
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.01
      points.current.rotation.x = mouse.y * 0.05
      points.current.rotation.z = mouse.x * 0.05
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a78bfa"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Shooting comet with spherical orbital path - pushed far back
function SphericalComet({ 
  radius = 8, 
  speed = 0.3, 
  initialAngle = 0, 
  tilt = 0,
  orbitTilt = 0,
  clockwise = true 
}: {
  radius?: number
  speed?: number
  initialAngle?: number
  tilt?: number
  orbitTilt?: number
  clockwise?: boolean
}) {
  const cometRef = useRef<THREE.Group>(null)
  const direction = clockwise ? 1 : -1
  
  useFrame((state) => {
    if (cometRef.current) {
      const time = state.clock.elapsedTime * speed * direction + initialAngle
      
      // Spherical orbital path - pushed far back in z
      const x = Math.cos(time) * radius
      const y = Math.sin(time * 0.7 + tilt) * radius * 0.5
      const z = Math.sin(time) * radius * 0.5 - 20 // Far behind text
      
      // Apply orbit tilt rotation
      const tiltedY = y * Math.cos(orbitTilt) - z * Math.sin(orbitTilt)
      const tiltedZ = y * Math.sin(orbitTilt) + z * Math.cos(orbitTilt)
      
      cometRef.current.position.set(x, tiltedY, Math.min(tiltedZ, -15)) // Clamp to stay behind
      
      // Make comet face direction of travel
      const nextTime = time + 0.1
      const nextX = Math.cos(nextTime) * radius
      const nextY = Math.sin(nextTime * 0.7 + tilt) * radius * 0.5
      cometRef.current.lookAt(nextX, nextY, -20)
    }
  })

  return (
    <group ref={cometRef}>
      <Trail
        width={4}
        length={15}
        color={new THREE.Color('#fef3c7')} // Warm yellow trail
        attenuation={(t) => t * t * t}
      >
        <mesh>
          {/* Comet head - bright white/yellow core */}
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#fffbeb" />
        </mesh>
      </Trail>
      {/* Inner glow */}
      <pointLight color="#fcd34d" intensity={3} distance={5} />
      {/* Outer warm glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// Ice comet with cyan trail - pushed far back
function IceComet({ 
  radius = 6, 
  speed = 0.4, 
  initialAngle = 0,
  orbitTilt = 0,
  clockwise = true 
}: {
  radius?: number
  speed?: number
  initialAngle?: number
  orbitTilt?: number
  clockwise?: boolean
}) {
  const cometRef = useRef<THREE.Group>(null)
  const direction = clockwise ? 1 : -1
  
  useFrame((state) => {
    if (cometRef.current) {
      const time = state.clock.elapsedTime * speed * direction + initialAngle
      
      // Different orbital path - elliptical, pushed back
      const x = Math.cos(time) * radius * 1.3
      const y = Math.sin(time * 1.2) * radius * 0.4
      const z = Math.sin(time * 0.8) * radius * 0.6 - 18 // Far behind
      
      // Apply orbit tilt
      const tiltedX = x * Math.cos(orbitTilt) + z * Math.sin(orbitTilt)
      const tiltedZ = -x * Math.sin(orbitTilt) + z * Math.cos(orbitTilt)
      
      cometRef.current.position.set(tiltedX, y, Math.min(tiltedZ, -12))
    }
  })

  return (
    <group ref={cometRef}>
      <Trail
        width={3}
        length={12}
        color={new THREE.Color('#67e8f9')} // Cyan/ice trail
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Trail>
      <pointLight color="#22d3ee" intensity={2} distance={4} />
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

// Many floating geometric shapes scattered everywhere - pushed back
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  // Generate 60 shapes scattered across the scene, all pushed back
  const shapes = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        -10 - Math.random() * 25 // All pushed behind text (z: -10 to -35)
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2, 
        Math.random() * Math.PI * 2, 
        Math.random() * Math.PI * 2
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.15,
      type: Math.floor(Math.random() * 5),
      speed: Math.random() * 0.6 + 0.2,
      floatIntensity: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.5 ? '#7c3aed' : Math.random() > 0.5 ? '#06b6d4' : '#ec4899'
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float 
          key={i} 
          speed={shape.speed} 
          rotationIntensity={0.6} 
          floatIntensity={shape.floatIntensity}
        >
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            {shape.type === 0 && <octahedronGeometry args={[1, 0]} />}
            {shape.type === 1 && <tetrahedronGeometry args={[1, 0]} />}
            {shape.type === 2 && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 3 && <dodecahedronGeometry args={[0.8, 0]} />}
            {shape.type === 4 && <boxGeometry args={[0.8, 0.8, 0.8]} />}
            <meshStandardMaterial
              color={shape.color}
              transparent
              opacity={0.3}
              wireframe
              emissive={shape.color}
              emissiveIntensity={0.35}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Extra small floating debris - pushed back
function FloatingDebris() {
  const debrisRef = useRef<THREE.Group>(null)
  
  const debris = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        -8 - Math.random() * 20 // Behind text
      ] as [number, number, number],
      scale: Math.random() * 0.12 + 0.05,
      speed: Math.random() * 0.4 + 0.25
    }))
  }, [])

  useFrame((state) => {
    if (debrisRef.current) {
      debrisRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * debris[i].speed
        child.rotation.y = state.clock.elapsedTime * debris[i].speed * 0.6
      })
    }
  })

  return (
    <group ref={debrisRef}>
      {debris.map((d, i) => (
        <Float key={i} speed={d.speed} floatIntensity={0.4}>
          <mesh position={d.position} scale={d.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshBasicMaterial 
              color={i % 3 === 0 ? '#a78bfa' : i % 3 === 1 ? '#67e8f9' : '#f9a8d4'} 
              transparent 
              opacity={0.5} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Nebula clouds - far back
function NebulaClouds() {
  const cloudsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.z = state.clock.elapsedTime * 0.005
    }
  })

  return (
    <group ref={cloudsRef} position={[0, 0, -35]}>
      {/* Purple nebula */}
      <mesh position={[-8, 4, 0]}>
        <planeGeometry args={[35, 35]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Cyan nebula */}
      <mesh position={[8, -4, -3]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Pink accent */}
      <mesh position={[0, 6, -5]}>
        <planeGeometry args={[25, 25]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Additional deep space glow */}
      <mesh position={[-5, -5, -8]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial
          color="#4c1d95"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Camera that follows mouse slightly
function CameraRig() {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.3, 0.02)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.2, 0.02)
    camera.lookAt(0, 0, -15)
  })

  return null
}

// Main scene component
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, -10]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[-10, -10, -20]} intensity={0.5} color="#06b6d4" />
      <spotLight position={[0, 10, -5]} intensity={0.3} color="#ffffff" angle={0.4} />

      {/* Dense star field - multiple layers for depth */}
      <Stars 
        radius={100} 
        depth={100} 
        count={10000} 
        factor={5} 
        saturation={0.6} 
        fade 
        speed={0.5} 
      />
      
      {/* Second layer of stars - closer, smaller */}
      <Stars 
        radius={60} 
        depth={60} 
        count={5000} 
        factor={3} 
        saturation={0.4} 
        fade 
        speed={0.3} 
      />
      
      {/* Third layer - distant, tiny stars */}
      <Stars 
        radius={150} 
        depth={80} 
        count={8000} 
        factor={6} 
        saturation={0.3} 
        fade 
        speed={0.2} 
      />

      {/* Scene elements - all behind text */}
      <ParticleField count={3500} />
      <FloatingShapes />
      <FloatingDebris />
      <NebulaClouds />
      
      {/* Comets orbiting far behind - Golden/warm comets */}
      <SphericalComet radius={14} speed={0.2} initialAngle={0} tilt={0} orbitTilt={0.3} clockwise={true} />
      <SphericalComet radius={18} speed={0.15} initialAngle={Math.PI} tilt={1} orbitTilt={-0.5} clockwise={false} />
      <SphericalComet radius={12} speed={0.28} initialAngle={Math.PI / 2} tilt={2} orbitTilt={0.8} clockwise={true} />
      <SphericalComet radius={20} speed={0.12} initialAngle={Math.PI * 1.5} tilt={0.5} orbitTilt={-0.2} clockwise={false} />
      <SphericalComet radius={16} speed={0.18} initialAngle={Math.PI * 0.7} tilt={1.5} orbitTilt={0.6} clockwise={true} />
      
      {/* Ice/cyan comets */}
      <IceComet radius={13} speed={0.25} initialAngle={0.5} orbitTilt={0.6} clockwise={true} />
      <IceComet radius={17} speed={0.18} initialAngle={2.5} orbitTilt={-0.4} clockwise={false} />
      <IceComet radius={10} speed={0.32} initialAngle={4} orbitTilt={1.2} clockwise={true} />
      <IceComet radius={15} speed={0.22} initialAngle={1.8} orbitTilt={-0.8} clockwise={false} />

      {/* Camera movement */}
      <CameraRig />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.95} 
          intensity={2.2} 
        />
        <ChromaticAberration 
          offset={new THREE.Vector2(0.0003, 0.0003)}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  )
}

// Loading fallback
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-comet-glow/30 border-t-comet-cyan rounded-full animate-spin" />
    </div>
  )
}

// Main export
export default function HeroScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Loader />
  }

  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
