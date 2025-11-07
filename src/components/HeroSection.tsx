"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Cookies from 'js-cookie'


const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null) // Changed to div
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the headline into two lines
      const mainText = "Réstorée"
      const subText = "Luxury care, redefined"
      const firstLineChars = mainText.split('')
      const secondLineChars = subText.split('')

      if (headlineRef.current) {
        headlineRef.current.innerHTML = `
          <h1 class="font-copperplate text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            ${firstLineChars.map(char =>
          char === ' ' ? ' ' : `<span class="char inline-block">${char}</span>`
        ).join('')}
          </h1>
          <p class="font-copperplate text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2">
            ${secondLineChars.map(char =>
          char === ' ' ? ' ' : `<span class="char inline-block">${char}</span>`
        ).join('')}
          </p>
        `

        gsap.fromTo('.char',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.7)"
          }
        )
      }

      // Animate subheadline
      gsap.fromTo(subheadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
      )

      // Animate CTA button container
      gsap.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1, ease: "back.out(1.7)" }
      )

      // Parallax effect for background
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleBookingClick = () => {
    const userProfileCookie = Cookies.get('user-profile')

    if (userProfileCookie) {
      window.location.href = '/booking'
    } else {
      window.location.href = '/api/user/auth/google_login'
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-2">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: "url('/images/hero.jpg')",
          }}

        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div ref={headlineRef} className="mb-6">
          {/* Initial content here is a placeholder */}
          <h1 className="font-copperplate text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Réstorée: Luxury care, redefined
          </h1>
        </div>

        <motion.p
          ref={subheadlineRef}
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-serif leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Luxury Restoration for Bags, Shoes, and Accessories
        </motion.p>

        <motion.div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Book a Consultation button with conditional logic */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleBookingClick}
              className="btn-primary text-lg px-8 py-4"
            >
              Book a Consultation
            </button>
          </motion.div>

          {/* View Our Work Link */}
          <Link href="/gallery" passHref>
            <motion.button
              className="btn-secondary text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white cursor-pointer"
          onClick={scrollToServices}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Overlay Pattern */}
      <div className="absolute inset-0 z-5 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
    </section>


  )
}

export default HeroSection