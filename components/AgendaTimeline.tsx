'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import agendaData from '@/data/agenda.json'

gsap.registerPlugin(ScrollTrigger)

interface AgendaItem {
  id: number
  time: string
  title: string
  description: string
  speaker: string
}

export default function AgendaTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const nodesRef = useRef<HTMLDivElement[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  const agenda: AgendaItem[] = agendaData.agenda

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // Timeline line draw animation
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 1,
            },
          }
        )
      }

      // Animate each card and node
      cardsRef.current.forEach((card, index) => {
        const isLeft = index % 2 === 0
        const node = nodesRef.current[index]

        // Card animation - different on mobile vs desktop
        const isMobile = window.innerWidth < 768

        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isMobile ? 0 : (isLeft ? -60 : 60),
            y: 40,
            scale: 0.95,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Node activation with glow
        if (node) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              gsap.to(node, {
                scale: 1.5,
                duration: 0.4,
                ease: 'power2.out',
              })
              node.classList.add('timeline-node-active')
              // Highlight current card
              gsap.to(card, { 
                scale: 1.02, 
                duration: 0.3,
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(6, 182, 212, 0.15)'
              })
            },
            onLeave: () => {
              gsap.to(node, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
              node.classList.remove('timeline-node-active')
              gsap.to(card, { 
                opacity: 0.6, 
                scale: 1,
                boxShadow: 'none',
                duration: 0.3 
              })
            },
            onEnterBack: () => {
              gsap.to(node, {
                scale: 1.5,
                duration: 0.4,
                ease: 'power2.out',
              })
              node.classList.add('timeline-node-active')
              gsap.to(card, { 
                opacity: 1, 
                scale: 1.02,
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(6, 182, 212, 0.15)',
                duration: 0.3 
              })
            },
            onLeaveBack: () => {
              gsap.to(node, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              })
              node.classList.remove('timeline-node-active')
              gsap.to(card, { 
                scale: 1,
                boxShadow: 'none',
                duration: 0.3 
              })
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="agenda"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Section background accent */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-comet-glow/30 to-transparent" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-comet-glow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-comet-cyan/5 rounded-full blur-3xl" />
      </div> */}

      <div className="container-cosmic">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <svg className="w-4 h-4 text-comet-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-comet-trail font-medium">Event Schedule</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 section-title">
            Event <span className="text-gradient">Trajectory</span>
          </h2>
          <p className="text-comet-trail/80 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Navigate through our carefully crafted agenda designed to inspire, 
            align, and propel leadership forward.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Central timeline line - positioned for mobile (left) and desktop (center) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2">
            <div className="absolute inset-0 bg-cosmic-700/50" />
            <div
              ref={timelineLineRef}
              className="absolute inset-0 origin-top timeline-line"
            />
          </div>

          {/* Agenda items */}
          <div className="relative space-y-8 sm:space-y-12 md:space-y-16">
            {agenda.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={item.id}
                  className="relative flex items-start md:items-center"
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 mt-6 md:mt-0">
                    <div className="relative">
                      <div
                        ref={(el) => {
                          if (el) nodesRef.current[index] = el
                        }}
                        className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-comet-glow to-comet-cyan transition-all duration-300"
                      />
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-comet-cyan/30 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                  </div>

                  {/* Card container - always right on mobile, alternating on desktop */}
                  <div
                    className={`
                      w-full pl-10 md:pl-0 
                      md:w-1/2 
                      ${isLeft ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16 md:ml-auto'}
                    `}
                  >
                    <div
                      ref={(el) => {
                        if (el) cardsRef.current[index] = el
                      }}
                      className="glass-card rounded-2xl p-5 sm:p-6 md:p-8 group cursor-default"
                    >
                      {/* Time badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-comet-glow/20 to-comet-cyan/20 rounded-full">
                          <svg className="w-3.5 h-3.5 text-comet-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-comet-cyan text-xs sm:text-sm font-semibold">{item.time}</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-comet-glow/20 to-transparent" />
                      </div>

                      {/* Content */}
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-gradient-animated transition-all duration-500">
                        {item.title}
                      </h3>
                      <p className="text-comet-trail/70 text-sm sm:text-base mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Speaker - only show if speaker exists */}
                      {item.speaker && item.speaker.trim() !== '' && (
                        <div className="flex items-center gap-3 pt-4 border-t border-comet-glow/10">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-comet-glow/30 to-comet-cyan/30 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <span className="text-sm text-comet-accent/90 font-medium">{item.speaker}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
