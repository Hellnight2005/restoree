"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Brush, Wrench, ShieldCheck } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    title: 'Consultation & Assessment',
    description:
      'We evaluate the condition, material, and brand-specific details to propose the right approach.',
    icon: Sparkles,
  },
  {
    title: 'Preparation & Cleaning',
    description:
      'Gentle, brand-safe cleaning and prep to ensure surfaces are ready for detailed work.',
    icon: Brush,
  },
  {
    title: 'Restoration & Repair',
    description:
      'Expert leatherwork, stitching, hardware replacement, and color correction, as needed.',
    icon: Wrench,
  },
  {
    title: 'Quality Check & Protection',
    description:
      'Final inspection and protective finishing so your piece looks great and lasts longer.',
    icon: ShieldCheck,
  },
]

const ProcessTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-anti-flash dark:bg-dark-card">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="font-copperplate text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Craftsmanship Process
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 font-serif">
            A careful, brand-conscious approach from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div key={index} className="process-step card p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-fawn text-white flex items-center justify-center mb-4">
                {/**/}
                {(() => {
                  const Icon = step.icon
                  return <Icon className="w-6 h-6" />
                })()}
              </div>
              <h4 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 font-serif">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessTimeline


