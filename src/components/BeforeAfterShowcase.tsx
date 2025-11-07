"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, PanInfo, useMotionValue } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const beforeAfterItems = [
  {
    id: 1,
    title: 'Luxury Handbag Restoration',
    before: '/images/bag_befor.jpg',
    after: '/images/baf_after.jpg',
    description: 'Complete restoration of a vintage Chanel bag, including leather repair and hardware replacement.'
  },
  {
    id: 2,
    title: 'Designer Shoe Revival',
    before: '/images/befor_recolor.jpg',
    after: '/images/after_recolor.jpg',
    description: 'Deep cleaning and polishing of luxury leather shoes, restoring their original shine and beauty.'
  },
  {
    id: 3,
    title: 'Leather bag Transformation',
    before: '/images/restor_befor.JPG',
    after: '/images/resto_after.JPG',
    description: 'Comprehensive leather repair and conditioning, bringing new life to a vintage leather bag.'
  }
]

const BeforeAfterShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeItem, setActiveItem] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section on scroll
      gsap.fromTo('.before-after-content',
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100

    if (info.offset.x > threshold && activeItem > 0) {
      setActiveItem(activeItem - 1)
    } else if (info.offset.x < -threshold && activeItem < beforeAfterItems.length - 1) {
      setActiveItem(activeItem + 1)
    }

    x.set(0)
  }

  const nextItem = () => {
    setActiveItem((prev) => (prev + 1) % beforeAfterItems.length)
  }

  const prevItem = () => {
    setActiveItem((prev) => (prev - 1 + beforeAfterItems.length) % beforeAfterItems.length)
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white dark:bg-dark-bg"
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 before-after-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-copperplate text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Before & After
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-serif">
            See the incredible transformations we achieve through our expert restoration techniques.
          </p>
        </motion.div>

        {/* Before/After Slider */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Image Container */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={{ x: `-${activeItem * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {beforeAfterItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="absolute inset-0 w-full h-full flex"
                    style={{ left: `${index * 100}%` }}
                  >
                    {/* Before Image */}
                    <div className="w-1/2 relative">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.before})` }}
                      />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        BEFORE
                      </div>
                    </div>

                    {/* After Image */}
                    <div className="w-1/2 relative">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.after})` }}
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        AFTER
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white shadow-lg transform -translate-x-1/2" />
                  </div>
                ))}
              </motion.div>

              {/* Draggable Handle */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-1 bg-fawn cursor-ew-resize transform -translate-x-1/2 z-10"
                drag="x"
                dragConstraints={{ left: -50, right: 50 }}
                dragElastic={0.1}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                style={{ x }}
                whileHover={{ scaleX: 2 }}
                whileTap={{ scaleX: 2 }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-fawn rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Item Info */}
            <div className="p-8 bg-white dark:bg-gray-900">
              <motion.div
                key={activeItem}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h3 className="font-copperplate text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {beforeAfterItems[activeItem].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-serif text-lg leading-relaxed">
                  {beforeAfterItems[activeItem].description}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <motion.button
              onClick={prevItem}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-fawn text-fawn hover:bg-fawn hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>

            <div className="flex space-x-2">
              {beforeAfterItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveItem(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeItem
                    ? 'bg-fawn scale-125'
                    : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextItem}
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-fawn text-fawn hover:bg-fawn hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterShowcase
