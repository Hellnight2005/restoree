"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'Luxury Handbag Collector',
    quote:
      'Réstorée brought my vintage Chanel back to life. The craftsmanship is exceptional and the service was impeccable.',
    avatar:
      '/images/avatar-1.jpg',
  },
  {
    name: 'Michael Chen',
    title: 'Designer Shoe Enthusiast',
    quote:
      'I was blown away by the attention to detail. My loafers look better than when I first bought them.',
    avatar:
      '/images/avatar-2.jpg',
  },
  {
    name: 'Emma Davis',
    title: 'Stylist',
    quote:
      'Professional, timely, and results that wow. Réstorée is now my go-to for restoration.',
    avatar:
      '/images/avatar-3.jpg',
  },
]

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonial-card',
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
    <section ref={sectionRef} className="section-padding bg-white dark:bg-dark-bg">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h3 className="font-copperplate text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Our Clients Say
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 font-serif">
            Real feedback from those who trust us with their treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card card p-6 flex flex-col"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.title}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-serif flex-1">“{t.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials


