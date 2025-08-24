"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '@/components/HeroSection'
import ServiceHighlights from '@/components/ServiceHighlights'
import BeforeAfterShowcase from '@/components/BeforeAfterShowcase'
import BrandStoryCTA from '@/components/BrandStoryCTA'
import TrustedBy from '@/components/TrustedBy'
import ProcessTimeline from '@/components/ProcessTimeline'
import Testimonials from '@/components/Testimonials'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations for page elements
    const ctx = gsap.context(() => {
      // Fade in page content
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      <HeroSection />
      <TrustedBy />
      <ServiceHighlights />
      <BeforeAfterShowcase />
      <ProcessTimeline />
      <Testimonials />
      <BrandStoryCTA />
    </motion.div>
  )
}
