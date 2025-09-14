"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Sparkles, Scissors, Settings, Palette } from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    id: 'bags',
    title: 'Bag Restoration',
    icon: ShoppingBag,
    summary: 'Expert repair and restoration of luxury handbags and purses',
    description: 'From leather conditioning to hardware replacement, we restore your favorite bags to their former glory.',
    image: '/images/service-bags.jpg',
    before_image: '/images/before-bag.jpg',
    after_image: '/images/after-bag.jpg'
  },
  {
    id: 'shoes',
    title: 'Shoe Polishing',
    icon: Sparkles,
    summary: 'Professional cleaning and polishing for all types of footwear',
    description: 'Deep cleaning, conditioning, and polishing to make your shoes look brand new again.',
    image: '/images/service-shoes.jpg',
    before_image: '/images/before-shoe.jpg',
    after_image: '/images/after-shoe.jpg'
  },
  {
    id: 'leather',
    title: 'Leather Repair',
    icon: Scissors,
    summary: 'Comprehensive leather restoration and repair services',
    description: 'Fix tears, scratches, and wear with our specialized leather repair techniques.',
    image: '/images/service-leather.jpg',
    before_image: '/images/before-leather.jpg',
    after_image: '/images/after-leather.jpg'
  },
  {
    id: 'hardware',
    title: 'Hardware Replacement',
    icon: Settings,
    summary: 'Replace and restore zippers, buckles, and metal components',
    description: 'Professional hardware replacement to ensure your items function perfectly.',
    image: '/images/service-hardware.jpg',
    before_image: '/images/before-hardware.jpg',
    after_image: '/images/after-hardware.jpg'
  },
  {
    id: 'color',
    title: 'Color Restoration',
    icon: Palette,
    summary: 'Restore and enhance original colors and finishes',
    description: 'Bring back the vibrant colors and finishes that make your items special.',
    image: '/images/service-color.jpg',
    before_image: '/images/before-color.jpg',
    after_image: '/images/after-color.jpg'
  }
]

const ServiceHighlights = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate service cards on scroll
      gsap.fromTo('.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const nextService = () => {
    setActiveIndex((prev) => (prev + 1) % services.length)
  }

  const prevService = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-anti-flash dark:bg-dark-card"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Premium Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-serif">
            From luxury bags to designer shoes, we provide expert restoration services
            that bring your cherished items back to life.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card overflow-hidden h-full">
                {/* Conditional Image Display: Before/After for services with both properties */}
                {service.before_image && service.after_image ? (
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 flex">
                      <div
                        className="w-1/2 h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${service.before_image})` }}
                      />
                      <div
                        className="w-1/2 h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${service.after_image})` }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-fawn rounded-full flex items-center justify-center">
                      {React.createElement(service.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                  </div>
                ) : (
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-fawn rounded-full flex items-center justify-center">
                      {React.createElement(service.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                  </div>
                )}

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="font-copperplate text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 font-serif">
                    {service.summary}
                  </p>

                  {/* Hover Reveal Description */}
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-sm text-gray-500 dark:text-gray-400 font-serif"
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="mt-4 text-fawn hover:text-fawn/80 font-medium transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation
        <div className="flex justify-center items-center space-x-4">
          <motion.button
            onClick={prevService}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-fawn text-fawn hover:bg-fawn hover:text-white transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ←
          </motion.button>

          <div className="flex space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                  ? 'bg-fawn scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
                  }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextService}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-fawn text-fawn hover:bg-fawn hover:text-white transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div> */}
      </div>
    </section>
  )
}

export default ServiceHighlights