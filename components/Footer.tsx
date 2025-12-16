'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <div>
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 section-divider mb-5" />
    <footer
      ref={footerRef}
      className="relative pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden vertical-align: center;"
    >
      

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950 via-cosmic-950/50 to-transparent pointer-events-none" />

      <div ref={contentRef} className="container-cosmic relative z-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Cognizant Logo with 3D Spotlight */}
          <div className="relative mb-8">
            {/* Spotlight container */}
            <div className="absolute -inset-8 sm:-inset-12">
              {/* Deep outer glow */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-70"
                   style={{ background: 'radial-gradient(ellipse 80% 60% at center, rgba(6, 182, 212, 0.4) 0%, rgba(124, 58, 237, 0.25) 35%, rgba(139, 92, 246, 0.1) 55%, transparent 75%)' }} />
              {/* Mid glow layer */}
              <div className="absolute inset-4 rounded-full blur-2xl opacity-80"
                   style={{ background: 'radial-gradient(ellipse 70% 50% at center, rgba(6, 182, 212, 0.5) 0%, rgba(255, 255, 255, 0.15) 25%, transparent 60%)' }} />
              {/* Bright center core */}
              <div className="absolute inset-8 rounded-full blur-xl"
                   style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(6, 182, 212, 0.4) 30%, transparent 55%)' }} />
              {/* Animated light rays */}
              <div className="absolute inset-0 opacity-30 animate-spin"
                   style={{ 
                     background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255, 255, 255, 0.3) 10deg, transparent 20deg, transparent 70deg, rgba(6, 182, 212, 0.4) 80deg, transparent 90deg, transparent 160deg, rgba(139, 92, 246, 0.3) 170deg, transparent 180deg, transparent 250deg, rgba(6, 182, 212, 0.3) 260deg, transparent 270deg, transparent 340deg, rgba(255, 255, 255, 0.2) 350deg, transparent 360deg)',
                     animationDuration: '20s'
                   }} />
              {/* Volumetric light effect */}
              <div className="absolute inset-0 rounded-full opacity-40"
                   style={{ background: 'radial-gradient(ellipse 100% 40% at 50% 100%, rgba(6, 182, 212, 0.5) 0%, transparent 50%)' }} />
            </div>
            {/* Logo with glow */}
            <Image
              src="/Cognizant.png"
              alt="Cognizant"
              width={200}
              height={55}
              className="relative h-12 sm:h-14 w-auto object-contain brightness-150 contrast-125 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] drop-shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            />
          </div>

          {/* Event name */}
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-3">
            CoMeT2025
          </h3>

          <p className="text-comet-trail text-sm sm:text-base max-w-md mb-8 px-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Charting the course for visionary leadership and collective momentum 
            toward tomorrow&apos;s possibilities.
          </p>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8">
            {[
              { href: '#hero', label: 'Home' },
              { href: '#agenda', label: 'Agenda' },
              { href: '#quiz', label: 'Quiz' },
              { href: '#feedback', label: 'Feedback' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-comet-trail/90 hover:text-comet-cyan transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social links - COMMENTED OUT
          <div className="flex items-center gap-4 mb-10">
            {[
              { 
                label: 'LinkedIn', 
                href: '#',
                icon: (
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                )
              },
              { 
                label: 'Twitter', 
                href: '#',
                icon: (
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                )
              },
              { 
                label: 'Website', 
                href: '#',
                icon: (
                  <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                )
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-comet-trail/60 hover:text-comet-cyan hover:border-comet-cyan/40 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
          */}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-comet-glow/40 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-comet-trail/90">
          <p className="drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]">
            © {currentYear} Cognizant. All rights reserved.
          </p>

          <p className="text-comet-trail/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
            Developed by - <span className="text-white/90">Ashish Agarwal (2276561)</span>
          </p>
        </div>

        {/* Made with love */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base text-comet-trail/80 flex items-center justify-center gap-2 drop-shadow-[0_0_6px_rgba(255,255,255,0.1)]">
            Crafted with 
            <span className="text-comet-cyan animate-pulse drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">♥</span> 
            for CoMeT2025
          </p>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cosmic-950 to-transparent pointer-events-none" />
    </footer>
    </div>
  )
}
