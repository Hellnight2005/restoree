"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Clock, ArrowRight } from 'lucide-react'

const ServicesPage = () => {
  const services = [
    {
      id: 'bags',
      title: 'Bag Restoration',
      description: 'Expert repair and restoration of luxury handbags and purses.',
      process: [
        'Assessment and condition evaluation',
        'Leather cleaning and conditioning',
        'Repair of tears and scratches',
        'Hardware replacement if needed',
        'Final polishing and protection'
      ],
      benefits: ['Brand-safe methods', 'Original texture preserved', 'Premium aftercare'],
      timeline: '5-7 days',
      image: '/images/service-bags.jpg',
      previewBefore: '/images/before-after-1.jpg',
      previewAfter: '/images/before-after-2.jpg'
    },
    {
      id: 'shoes',
      title: 'Shoe Polishing',
      description: 'Professional cleaning and polishing for all types of footwear.',
      process: [
        'Deep cleaning and stain removal',
        'Leather conditioning and hydration',
        'Color restoration and enhancement',
        'Professional polishing',
        'Protective coating application'
      ],
      benefits: ['Even color finish', 'High-shine or matte on request', 'Moisture protection'],
      timeline: '2-3 days',
      image: '/images/service-shoes.jpg',
      previewBefore: '/images/before-after-2.jpg',
      previewAfter: '/images/before-after-3.jpg'
    },
    {
      id: 'leather',
      title: 'Leather Repair',
      description: 'Specialized repair for scuffs, tears, and worn panels across leather goods.',
      process: [
        'Material inspection and color matching',
        'Edge and panel preparation',
        'Precision patching and fill work',
        'Surface refinishing',
        'Protective sealing'
      ],
      benefits: ['Invisible mends', 'Color-accurate repairs', 'Structural integrity'],
      timeline: '4-6 days',
      image: '/images/service-leather.jpg',
      previewBefore: '/images/before-after-3.jpg',
      previewAfter: '/images/before-after-1.jpg'
    },
    {
      id: 'hardware',
      title: 'Hardware Replacement',
      description: 'Sourcing and replacing zippers, buckles, rivets, feet, and chains.',
      process: [
        'Component identification',
        'Sourcing brand-consistent parts',
        'Precision removal and fitting',
        'Finish matching and testing',
        'Final polish and QC'
      ],
      benefits: ['Smooth operation', 'Finish-matched parts', 'Durability tested'],
      timeline: '3-5 days',
      image: '/images/service-hardware.jpg',
      previewBefore: '/images/before-after-1.jpg',
      previewAfter: '/images/before-after-2.jpg'
    },
    {
      id: 'color',
      title: 'Color Restoration',
      description: 'Reviving faded tones and correcting discoloration with advanced color lab work.',
      process: [
        'Color analysis and swatching',
        'Surface prep and masking',
        'Layered pigment application',
        'Finish selection (matte/satin/gloss)',
        'Curing and protection'
      ],
      benefits: ['Accurate color matching', 'Even finish', 'Long-lasting protection'],
      timeline: '4-6 days',
      image: '/images/service-color.jpg',
      previewBefore: '/images/before-after-2.jpg',
      previewAfter: '/images/before-after-3.jpg'
    }
  ]

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('/images/hero-bg.jpg')"
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            className="font-copperplate text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Expert Care for Your Treasures
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional restoration services that bring your luxury items back to life
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Service Image */}
                <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <motion.div
                    className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </motion.div>
                </div>

                {/* Service Content */}
                <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-serif leading-relaxed">
                    {service.description}
                  </p>

                  {/* Process Steps */}
                  <div className="mb-8">
                    <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      How It's Done
                    </h3>
                    <motion.ol
                      className="space-y-3"
                      variants={listVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {service.process.map((step, stepIndex) => (
                        <motion.li
                          key={stepIndex}
                          className="flex items-start space-x-3"
                          variants={itemVariants}
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-fawn text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {stepIndex + 1}
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 font-serif">
                            {step}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ol>
                  </div>

                  {/* Benefits */}
                  <motion.ul
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {service.benefits.map((b: string) => (
                      <motion.li key={b} className="flex items-center space-x-2" variants={itemVariants}>
                        <CheckCircle className="w-5 h-5 text-fawn" />
                        <span className="text-gray-700 dark:text-gray-300 font-serif">{b}</span>
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Mini Before/After Preview */}
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img src={service.previewBefore} alt={`${service.title} before`} className="w-full h-32 object-cover" />
                        <div className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 bg-anti-flash dark:bg-gray-800">Before</div>
                      </div>
                      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img src={service.previewAfter} alt={`${service.title} after`} className="w-full h-32 object-cover" />
                        <div className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 bg-anti-flash dark:bg-gray-800">After</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Badge */}
                  <div className="inline-flex items-center space-x-2 bg-anti-flash dark:bg-gray-800 px-4 py-2 rounded-full mb-6">
                    <Clock className="w-4 h-4 text-fawn" />
                    <span className="text-fawn font-semibold">Typical completion:</span>
                    <span className="text-gray-700 dark:text-gray-300">{service.timeline}</span>
                  </div>

                  {/* CTA Button */}
                  <motion.div whileHover={{ x: 2 }}>
                    <Link
                      href={`/booking?service=${service.id}&title=${encodeURIComponent(service.title)}&description=${encodeURIComponent(service.description)}&image=${encodeURIComponent(service.image)}&price=${encodeURIComponent((service as any).price || '')}&duration=${encodeURIComponent((service as any).estimatedDuration || service.timeline)}`}
                      className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
                    >
                      Book This Service
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
