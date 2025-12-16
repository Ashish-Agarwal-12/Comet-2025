'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#agenda',
        start: 'top 80%',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (headerRef.current) {
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.5,
        ease: 'power3.out',
      })
    }
  }, [isVisible])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '#agenda', label: 'Agenda' },
    { href: '#quiz', label: 'Quiz' },
    { href: '#feedback', label: 'Feedback' },
  ]

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 opacity-0"
        style={{ transform: 'translateY(-100px)' }}
      >
        <div className="glass-card rounded-none border-x-0 border-t-0">
          <div className="container-cosmic py-3 sm:py-4 flex items-center justify-between">
            {/* Logo with Enhanced Spotlight Effect */}
            <a href="#hero" className="flex items-center gap-3 sm:gap-4 group">
              <div className="relative">
                {/* Extended Spotlight layers */}
                <div className="absolute -inset-8 sm:-inset-12 md:-inset-16">
                  {/* Outermost diffuse glow */}
                  <div 
                    className="absolute inset-0 rounded-full blur-3xl opacity-70"
                    style={{ 
                      background: 'radial-gradient(ellipse 120% 100% at center, rgba(6, 182, 212, 0.35) 0%, rgba(124, 58, 237, 0.2) 30%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)' 
                    }} 
                  />
                  {/* Secondary glow ring */}
                  <div 
                    className="absolute inset-2 rounded-full blur-2xl opacity-80 animate-pulse"
                    style={{ 
                      background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.4) 0%, rgba(124, 58, 237, 0.25) 35%, transparent 65%)',
                      animationDuration: '3s'
                    }} 
                  />
                  {/* Inner bright core */}
                  <div 
                    className="absolute inset-4 sm:inset-6 rounded-full blur-xl opacity-90"
                    style={{ 
                      background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(6, 182, 212, 0.4) 25%, rgba(124, 58, 237, 0.2) 50%, transparent 70%)' 
                    }} 
                  />
                  {/* Rotating light rays */}
                  <div 
                    className="absolute inset-0 opacity-50 animate-spin"
                    style={{ 
                      background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(6, 182, 212, 0.4) 20deg, transparent 40deg, transparent 90deg, rgba(139, 92, 246, 0.3) 110deg, transparent 130deg, transparent 180deg, rgba(6, 182, 212, 0.3) 200deg, transparent 220deg, transparent 270deg, rgba(139, 92, 246, 0.25) 290deg, transparent 310deg, transparent 360deg)',
                      animationDuration: '20s'
                    }} 
                  />
                </div>
                {/* Logo */}
                <Image
                  src="/Cognizant.png"
                  alt="Cognizant"
                  width={160}
                  height={48}
                  className="relative h-9 sm:h-11 md:h-12 w-auto object-contain brightness-150 contrast-125 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] transition-all duration-300"
                  priority
                />
              </div>
              <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-comet-cyan/50 to-transparent" />
              {/* Larger CoMeT2025 text */}
              <div className="hidden sm:flex flex-col">
                <span className="text-base md:text-lg lg:text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-comet-cyan via-white to-comet-glow tracking-wide">
                  CoMeT2025
                </span>
                <span className="text-[10px] text-comet-trail/60 tracking-widest uppercase">
                  Leadership Summit
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm text-comet-trail/80 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative z-10 font-medium">{link.label}</span>
                  <div className="absolute inset-0 rounded-lg bg-comet-glow/0 group-hover:bg-comet-glow/10 transition-colors duration-300" />
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-comet-glow to-comet-cyan group-hover:w-10 transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Mobile menu button - Enhanced visibility */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl border border-comet-cyan/30 bg-cosmic-900/80 hover:bg-comet-glow/20 hover:border-comet-cyan/50 transition-all duration-300 shadow-lg shadow-comet-glow/10"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span 
                  className={`absolute top-0 w-full h-0.5 bg-gradient-to-r from-comet-cyan to-white rounded-full transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? 'rotate-45 top-2' : ''
                  }`} 
                />
                <span 
                  className={`absolute top-2 w-full h-0.5 bg-gradient-to-r from-white to-comet-cyan rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`} 
                />
                <span 
                  className={`absolute top-4 w-full h-0.5 bg-gradient-to-r from-comet-cyan to-white rounded-full transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? '-rotate-45 top-2' : ''
                  }`} 
                />
              </div>
              {/* Glow effect on button */}
              <div className="absolute -inset-1 rounded-xl bg-comet-cyan/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ease-out ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="glass-card rounded-none border-x-0 border-t border-comet-cyan/20 shadow-2xl shadow-comet-glow/20">
            <nav className="container-cosmic py-4 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl text-comet-trail hover:text-white hover:bg-gradient-to-r hover:from-comet-glow/15 hover:to-comet-cyan/10 border border-transparent hover:border-comet-cyan/20 transition-all duration-300"
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-comet-cyan to-comet-glow shadow-lg shadow-comet-cyan/50" />
                  <span className="font-semibold text-lg">{link.label}</span>
                  <svg className="w-5 h-5 ml-auto text-comet-cyan/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
              
              {/* Mobile CoMeT2025 branding */}
              <div className="mt-4 pt-4 border-t border-comet-glow/20 flex items-center justify-center gap-3">
                <span className="text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-comet-cyan via-white to-comet-glow">
                  CoMeT2025
                </span>
                <span className="text-xs text-comet-trail/50">Leadership Summit</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-cosmic-950/70 backdrop-blur-md" />
      </div>
    </>
  )
}
