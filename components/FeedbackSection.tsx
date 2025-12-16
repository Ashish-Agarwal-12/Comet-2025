'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeedbackSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
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

      // Card animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 75%',
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
      id="feedback"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-comet-glow/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-comet-glow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-comet-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="container-cosmic relative z-10 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl">
          {/* Section header */}
          <div ref={headerRef} className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <svg className="w-4 h-4 text-comet-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-comet-trail font-medium">We Value Your Input</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 section-title">
              Share Your <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-comet-trail/80 text-base sm:text-lg">
              Scan the QR code to share your feedback and help us improve.
            </p>
          </div>

          {/* QR Code Card */}
          <div
            ref={cardRef}
            className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 glow-box text-center"
          >
            {/* QR Code Container */}
            <div className="relative inline-block mb-6">
              {/* Glow effect behind QR */}
              <div className="absolute -inset-4 bg-gradient-to-br from-comet-glow/20 via-comet-cyan/10 to-comet-glow/20 rounded-3xl blur-xl opacity-60" />
              
              {/* QR Code Image */}
              <Image
                src="/Survey QR Link.png"
                alt="CoMeT 2025 Survey QR Code"
                width={320}
                height={320}
                className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain rounded-2xl"
                priority
              />
            </div>

            {/* Title */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
              CoMeT 2025 Survey
            </h3>

            {/* Instructions */}
            <p className="text-comet-trail/70 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Open your phone camera and point it at the QR code to access the feedback form.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-cosmic-800/50 border border-comet-glow/20">
                <svg className="w-4 h-4 text-comet-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-comet-trail/80">2 min survey</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-cosmic-800/50 border border-comet-glow/20">
                <svg className="w-4 h-4 text-comet-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-comet-trail/80">Mobile friendly</span>
              </div>
            </div>

            {/* Privacy note */}
            <p className="mt-6 text-xs text-comet-trail/40">
              Your feedback helps us improve future leadership events.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 
===========================================
COMMENTED OUT: Original Feedback Form Logic
===========================================

import { useEffect, useRef, useState } from 'react'

const [rating, setRating] = useState<number>(0)
const [hoveredRating, setHoveredRating] = useState<number>(0)
const [comments, setComments] = useState<string>('')
const [isSubmitting, setIsSubmitting] = useState(false)
const [isSubmitted, setIsSubmitted] = useState(false)
const [error, setError] = useState<string | null>(null)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)

  if (rating === 0) {
    setError('Please select a rating')
    return
  }

  setIsSubmitting(true)

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comments }),
    })

    if (!response.ok) {
      throw new Error('Failed to submit feedback')
    }

    setIsSubmitted(true)
  } catch (err) {
    setError('Failed to submit feedback. Please try again.')
    console.error('Feedback submission error:', err)
  } finally {
    setIsSubmitting(false)
  }
}

const getRatingLabel = (r: number) => {
  if (r <= 3) return { text: 'Needs Improvement', color: 'text-orange-400' }
  if (r <= 5) return { text: 'Fair', color: 'text-yellow-400' }
  if (r <= 7) return { text: 'Good', color: 'text-lime-400' }
  if (r <= 9) return { text: 'Excellent', color: 'text-emerald-400' }
  return { text: 'Outstanding!', color: 'text-comet-cyan' }
}

// Original form JSX with rating buttons, comments textarea, submit button, etc.
// Now replaced with QR code for Microsoft Forms integration

*/
