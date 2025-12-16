'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Realistic asteroid SVG shapes
const asteroidShapes = [
  // Irregular rocky asteroid 1
  `M 50 10 
   Q 70 5, 85 20 
   Q 95 35, 90 55 
   Q 88 70, 75 82 
   Q 60 92, 40 88 
   Q 20 85, 12 70 
   Q 5 50, 15 30 
   Q 25 12, 50 10 Z`,
  // Chunky asteroid 2
  `M 45 8 
   Q 65 3, 82 18 
   Q 92 28, 95 45 
   Q 94 65, 80 78 
   Q 65 90, 45 92 
   Q 25 90, 12 75 
   Q 2 55, 8 35 
   Q 18 15, 45 8 Z`,
  // Elongated asteroid 3
  `M 30 15 
   Q 55 5, 80 15 
   Q 95 25, 92 45 
   Q 90 65, 75 80 
   Q 55 92, 35 85 
   Q 15 78, 8 55 
   Q 5 35, 30 15 Z`,
  // Potato-shaped asteroid 4
  `M 40 12 
   Q 60 8, 78 22 
   Q 90 35, 88 55 
   Q 85 75, 68 85 
   Q 50 92, 32 82 
   Q 15 70, 10 50 
   Q 8 30, 40 12 Z`,
]

// Crater patterns for realism
const craterPatterns = [
  { cx: 35, cy: 40, r: 8 },
  { cx: 60, cy: 55, r: 6 },
  { cx: 45, cy: 70, r: 5 },
  { cx: 70, cy: 35, r: 7 },
  { cx: 25, cy: 60, r: 4 },
]

interface AsteroidProps {
  size: number
  left: string
  delay: number
  duration: number
  shape: number
  rotation: number
}

function Asteroid({ size, left, delay, duration, shape, rotation }: AsteroidProps) {
  const asteroidRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!asteroidRef.current) return
    
    // Scale-based movement - larger asteroids move slower and less
    const movementScale = Math.max(0.5, 1 - (size / 150))
    const yMovement = 10 + (movementScale * 15)
    const xMovement = 5 + (movementScale * 10)
    
    // Floating animation
    gsap.to(asteroidRef.current, {
      y: -yMovement,
      rotation: rotation + (8 * movementScale),
      duration: duration,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay,
    })
    
    // Subtle horizontal drift
    gsap.to(asteroidRef.current, {
      x: xMovement,
      duration: duration * 1.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: delay * 0.5,
    })
  }, [delay, duration, rotation, size])

  const gradientId = `asteroid-grad-${Math.random().toString(36).substr(2, 9)}`
  const shadowId = `asteroid-shadow-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div 
      ref={asteroidRef}
      className="absolute"
      style={{ 
        left, 
        transform: `rotate(${rotation}deg)`,
        width: size,
        height: size,
      }}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-lg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
      >
        <defs>
          {/* Realistic rocky gradient */}
          <radialGradient id={gradientId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#6b7280" />
            <stop offset="30%" stopColor="#4b5563" />
            <stop offset="60%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </radialGradient>
          
          {/* Inner shadow for depth */}
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="2" dy="3" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
        </defs>
        
        {/* Main asteroid body */}
        <path 
          d={asteroidShapes[shape % asteroidShapes.length]}
          fill={`url(#${gradientId})`}
          stroke="#374151"
          strokeWidth="0.5"
        />
        
        {/* Surface details - craters */}
        {craterPatterns.slice(0, 3 + (shape % 2)).map((crater, i) => (
          <g key={i}>
            {/* Crater shadow */}
            <ellipse
              cx={crater.cx + 1}
              cy={crater.cy + 1}
              rx={crater.r}
              ry={crater.r * 0.8}
              fill="rgba(0,0,0,0.4)"
            />
            {/* Crater body */}
            <ellipse
              cx={crater.cx}
              cy={crater.cy}
              rx={crater.r}
              ry={crater.r * 0.8}
              fill="#1f2937"
            />
            {/* Crater highlight rim */}
            <ellipse
              cx={crater.cx - 1}
              cy={crater.cy - 1}
              rx={crater.r * 0.7}
              ry={crater.r * 0.5}
              fill="rgba(107, 114, 128, 0.3)"
            />
          </g>
        ))}
        
        {/* Surface texture lines */}
        <path
          d="M 30 35 Q 40 38, 45 45 M 55 30 Q 62 35, 60 45 M 35 60 Q 45 63, 55 58"
          stroke="rgba(55, 65, 81, 0.6)"
          strokeWidth="0.8"
          fill="none"
        />
        
        {/* Highlight on lit side */}
        <ellipse
          cx="35"
          cy="30"
          rx="15"
          ry="10"
          fill="rgba(156, 163, 175, 0.15)"
        />
      </svg>
    </div>
  )
}

// Small dust particles floating around
function DustParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            left: `${5 + Math.random() * 90}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `dust-float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function AsteroidDivider() {
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dividerRef.current) return

    const ctx = gsap.context(() => {
      // Fade in asteroids on scroll
      gsap.fromTo(
        dividerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, dividerRef)

    return () => ctx.revert()
  }, [])

  // Define asteroids configuration - mix of tiny, small, medium, and large
  const asteroids: AsteroidProps[] = [
    // Large asteroids
    { size: 90, left: '35%', delay: 0.2, duration: 6, shape: 1, rotation: 15 },
    { size: 80, left: '70%', delay: 0.8, duration: 5.5, shape: 3, rotation: -25 },
    
    // Medium asteroids
    { size: 55, left: '15%', delay: 0, duration: 4.5, shape: 0, rotation: -15 },
    { size: 50, left: '55%', delay: 1, duration: 4, shape: 2, rotation: 30 },
    { size: 45, left: '85%', delay: 0.5, duration: 4.2, shape: 1, rotation: -10 },
    
    // Small asteroids
    { size: 35, left: '25%', delay: 1.2, duration: 3.5, shape: 2, rotation: 45 },
    { size: 30, left: '48%', delay: 0.3, duration: 3.2, shape: 0, rotation: -35 },
    { size: 32, left: '78%', delay: 0.9, duration: 3.8, shape: 3, rotation: 20 },
    { size: 28, left: '8%', delay: 1.5, duration: 3, shape: 1, rotation: -50 },
    
    // Tiny asteroids (scattered throughout)
    { size: 18, left: '20%', delay: 0.4, duration: 2.8, shape: 0, rotation: 60 },
    { size: 15, left: '42%', delay: 1.1, duration: 2.5, shape: 2, rotation: -40 },
    { size: 12, left: '62%', delay: 0.7, duration: 2.2, shape: 1, rotation: 75 },
    { size: 16, left: '88%', delay: 1.3, duration: 2.6, shape: 3, rotation: -65 },
    { size: 14, left: '5%', delay: 0.6, duration: 2.4, shape: 0, rotation: 35 },
    { size: 10, left: '30%', delay: 1.8, duration: 2, shape: 2, rotation: -80 },
    { size: 13, left: '95%', delay: 0.2, duration: 2.3, shape: 1, rotation: 50 },
  ]

  return (
    <div 
      ref={dividerRef}
      className="relative w-full h-40 sm:h-52 md:h-64 overflow-visible my-8 sm:my-16"
    >
      {/* Gradient line in the middle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-comet-glow/30 to-transparent" />
      </div>
      
      {/* Dust particles */}
      <DustParticles />
      
      {/* Floating asteroids */}
      <div className="absolute inset-0 flex items-center">
        {asteroids.map((asteroid, i) => (
          <Asteroid key={i} {...asteroid} />
        ))}
      </div>
      
      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-comet-glow/5 rounded-full blur-3xl" />
    </div>
  )
}

