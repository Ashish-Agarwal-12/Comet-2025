'use client'

import { useEffect, useRef, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Lazy load the 3D scene for better performance
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const preTitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.5 })

      // Badge animation
      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
          0
        )
      }

      // Pre-title animation
      if (preTitleRef.current) {
        tl.fromTo(
          preTitleRef.current,
          { opacity: 0, y: 20, letterSpacing: '0.5em' },
          { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1, ease: 'power3.out' },
          0.2
        )
      }

      // Split title into letters for staggered animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || ''
        titleRef.current.innerHTML = text
          .split('')
          .map((char, i) => 
            char === ' ' 
              ? ' ' 
              : `<span class="inline-block opacity-0 translate-y-12 blur-sm" style="--char-index: ${i}">${char}</span>`
          )
          .join('')

        // Animate letters with wave effect
        tl.to(titleRef.current.querySelectorAll('span'), {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: {
            each: 0.06,
            from: 'start',
          },
          ease: 'power3.out',
        }, 0.4)
      }

      // Subtitle with blur reveal
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: 'blur(20px)' },
          { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)', 
            duration: 1.2, 
            ease: 'power3.out' 
          },
          1.2
        )
      }

      // Buttons stagger animation
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8, 
            stagger: 0.15,
            ease: 'power3.out' 
          },
          1.5
        )
      }

      // Parallax effect on scroll
      if (heroRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          y: 200,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        // Fade out hero on scroll
        gsap.to(heroRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '40% top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-cosmic-950"
    >
      {/* Three.js 3D Scene */}
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-comet-glow/20 border-t-comet-cyan animate-spin" />
        </div>
      }>
        <HeroScene />
      </Suspense>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-950/40 via-transparent to-cosmic-950/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cosmic-950/60 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none z-[1]" 
           style={{ background: 'radial-gradient(circle at center, transparent 0%, rgba(1, 1, 9, 0.4) 70%)' }} />

      {/* Hero content */}
      <div 
        ref={contentRef}
        className="hero-content relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
      >
        {/* Date badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 sm:mb-8 rounded-full glass-card opacity-0 border border-comet-cyan/30"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-comet-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-comet-cyan"></span>
          </span>
          <span className="text-xs sm:text-sm text-white/90 font-medium tracking-wide">
            Leadership Summit 2025
          </span>
        </div>

        {/* Pre-title */}
        <p 
          ref={preTitleRef}
          className="text-comet-cyan text-sm sm:text-base md:text-lg tracking-[0.35em] uppercase mb-4 sm:mb-6 font-display font-semibold opacity-0 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        >
          Cognizant Presents
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-6 sm:mb-8 tracking-tight leading-none hero-title"
          style={{ 
            textShadow: '0 0 40px rgba(6, 182, 212, 0.5), 0 0 80px rgba(124, 58, 237, 0.3), 0 0 120px rgba(124, 58, 237, 0.2)' 
          }}
        >
          CoMeT2025
        </h1>

        {/* Decorative line with animation */}
        <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
          <div className="w-12 sm:w-32 h-px bg-gradient-to-r from-transparent via-comet-cyan to-transparent animate-pulse" />
          <div className="relative">
            <div className="w-3 h-3 rotate-45 border border-comet-cyan bg-comet-cyan/20" />
            <div className="absolute inset-0 w-3 h-3 rotate-45 border border-comet-cyan animate-ping opacity-50" />
          </div>
          <div className="w-12 sm:w-32 h-px bg-gradient-to-r from-transparent via-comet-cyan to-transparent animate-pulse" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-light opacity-0 px-2"
        >
          Charting the trajectory of <span className="text-comet-cyan font-semibold">visionary leadership</span>, 
          strategic alignment, and collective momentum toward{' '}
          <span className="text-comet-trail font-medium">tomorrow&apos;s possibilities</span>.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 sm:mt-14">
          <a
            href="#agenda"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 btn-cosmic text-white font-semibold text-base sm:text-lg rounded-full shadow-lg shadow-comet-glow/25"
          >
            <span>Explore Agenda</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a
            href="#feedback"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 glass-card text-white font-semibold text-base sm:text-lg rounded-full border-comet-cyan/40 hover:border-comet-cyan/70 hover:bg-comet-cyan/10 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Share Feedback</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.2em] uppercase font-medium">Scroll to explore</span>
        <div className="relative w-6 sm:w-7 h-10 sm:h-12 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm">
          <div className="absolute top-2 w-1.5 h-3 bg-gradient-to-b from-comet-cyan to-comet-glow rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner accents with glow */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-comet-cyan/80 to-transparent" />
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-comet-cyan/80 to-transparent" />
        <div className="absolute top-0 left-0 w-3 h-3 bg-comet-cyan rounded-full blur-sm" />
      </div>
      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-40 sm:w-64 md:w-80 lg:w-96 h-40 sm:h-64 md:h-80 lg:h-96 pointer-events-none z-10">
        <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-comet-glow/80 to-transparent" />
        <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-comet-glow/80 to-transparent" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-comet-glow rounded-full blur-sm" />
      </div>

      {/* Floating particles overlay (CSS) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}
