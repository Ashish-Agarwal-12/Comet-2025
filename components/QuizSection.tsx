'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function QuizSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<HTMLDivElement>(null)

  // Replace with your actual Mentimeter link
  const mentimeterUrl = 'https://www.menti.com'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating orbs animation
      if (orbsRef.current) {
        const orbs = orbsRef.current.children
        Array.from(orbs).forEach((orb, i) => {
          gsap.to(orb, {
            y: -30 + (i * 10),
            x: 20 - (i * 15),
            duration: 3 + i,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
          })
        })
      }

      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.9, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="quiz"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Section divider */}
      {/* <div className="absolute top-0 left-0 right-0 section-divider" /> */}

      {/* Animated background orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 sm:left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-comet-glow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 sm:right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-comet-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-aurora-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="container-cosmic relative z-10 flex items-center justify-center w-full">
        <div 
          ref={cardRef}
          className="w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-10 md:p-12 text-center glow-box-intense"
        >
          <div ref={contentRef}>
            {/* Animated icon */}
            <div className="relative inline-flex items-center justify-center mb-6 sm:mb-8">
              <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-comet-glow/20 to-comet-cyan/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-comet-glow to-comet-cyan flex items-center justify-center">
                <svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                  />
                </svg>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-comet-cyan/10 border border-comet-cyan/30 mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-comet-cyan animate-pulse" />
              <span className="text-xs sm:text-sm text-comet-cyan font-medium">Interactive Session</span>
            </div>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 section-title">
              Join the <span className="text-gradient">Live Quiz</span>
            </h2>

            {/* Description */}
            <p className="text-comet-trail/80 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-xl mx-auto">
              Engage with your fellow leaders in an interactive quiz experience. 
              Test your knowledge, share insights, and compete for recognition.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {[
                { icon: '🎯', label: 'Live Polls' },
                { icon: '🏆', label: 'Leaderboard' },
                { icon: '💡', label: 'Instant Results' },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-2xl sm:text-3xl">{feature.icon}</span>
                  <span className="text-xs sm:text-sm text-comet-trail/70">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={mentimeterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 btn-cosmic text-white font-semibold text-base sm:text-lg rounded-full"
            >
              <span>Participate Now</span>
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>

            {/* Helper text */}
            <p className="mt-6 text-comet-accent/50 text-xs sm:text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Opens in a new tab • Powered by Mentimeter
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
