"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const brands = [
  'Louis Vuitton',
  'Chanel',
  'Gucci',
  'Hermès',
  'Prada',
  'Dior',
  'Fendi',
  'Saint Laurent',
]

const TrustedBy = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.brand-badge',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400">Trusted by luxury lovers</p>
          <h3 className="font-copperplate text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-2">
            Preferred by Owners of Iconic Brands
          </h3>
        </div>

        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex gap-6 whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          >
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={idx}
                className="brand-badge px-4 py-2 rounded-full bg-anti-flash dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                {brand}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default TrustedBy




