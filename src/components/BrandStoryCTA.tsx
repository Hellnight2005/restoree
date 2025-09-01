"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const stats = [
  { number: 100, label: 'Items Restored' },
  { number: 15, label: 'Years Experience' },
  { number: 98, label: 'Customer Satisfaction' }
]

const BrandStoryCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section on scroll
      gsap.fromTo('.brand-story-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate stats numbers correctly
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const targetNumber = stats[index].number
          const obj = { value: 0 }

          gsap.fromTo(
            obj, // animate this object
            { value: 0 },
            {
              value: targetNumber,
              duration: 2.5,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                once: true
              },
              onUpdate: function () {
                const value = Math.ceil(obj.value)
                if (index === 0) {
                  // For Items Restored (100K+)
                  stat.textContent = `${value}K+`
                } else if (index === 1) {
                  // For Years Experience (15+)
                  stat.textContent = `${value}+`
                } else if (index === 2) {
                  // For Customer Satisfaction (98%)
                  stat.textContent = `${value}%`
                }
              }
            }
          )
        }
      })

      // Parallax effect for background
      gsap.to('.brand-story-bg', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 brand-story-bg">
        <div
          className="w-full h-full bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-900/60 to-gray-950/80" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto brand-story-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-copperplate text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Legacy Meets Modern Craftsmanship
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 font-serif leading-relaxed max-w-3xl mx-auto">
            We blend traditional restoration techniques with cutting-edge technology
            to preserve the beauty and functionality of your most cherished possessions.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/about">
              <motion.button
                className="btn-primary text-lg px-8 py-4 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Story
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-16 flex justify-center items-center space-x-8 opacity-60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="w-16 h-px bg-fawn" />
            <div className="w-4 h-4 border-2 border-fawn rounded-full" />
            <div className="w-16 h-px bg-fawn" />
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div
                  ref={el => { statsRef.current[index] = el; }}
                  className="font-copperplate text-4xl md:text-5xl font-black text-fawn mb-2"
                >
                  {/* Initial text will be animated by GSAP */}
                  0
                </div>
                <div className="text-gray-900 font-serif md:dark:text-white">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 border border-fawn/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 border border-fawn/20 rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </section>
  )
}

export default BrandStoryCTA