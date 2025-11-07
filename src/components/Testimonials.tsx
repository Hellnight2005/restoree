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
    name: 'Ravindra Kedari',
    title: 'Luxury Handbag Collector',
    quote:
      'Absolutely loved the work they did on my shoes. Most cleaners and laundries refused to take my shoes cause they were suede, then I found The laundry company, and they were a total God sent. From picking my shoes up, cleaning them so they look better than brand new and delivering the shoes back to me, they were all together highly professional.',

    rating: 5,
  },
  {
    name: 'simone dubash',
    title: 'Designer Shoe Enthusiast',
    quote:
      'My shoes that went through a month of rigourous marathon training and monsoon runs, came back spick and span; completely brand new. Loved the service. With smooth pick up and drop, very reasonably priced. Would definitely recommend it to everyone!',

    rating: 5,
  },
  {
    name: 'Vishal Sankhla',
    title: 'Stylist',
    quote:
      'I’m currently visiting India and heading back tomorrow after an intense travel schedule that left my brand new shoes looking worn out. The Laundry Company was a lifesaver! My shoes had taken quite a beating during my hectic travels, but within just 48 hours, they picked them up and returned them looking as good as new.  Despite my travel, their communication made everything smooth and stress-free. Plus, the pricing was very reasonable, making it a great value for the quality and convenience they provided. ',

    rating: 4,
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? 'opacity-100' : 'opacity-30'}`}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

const GoogleReviewBadge = ({ rating }: { rating: number }) => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1 mb-1">
        <img src="https://imgs.search.brave.com/yAW855-BqsXtqA5Jf4OcPObpmkwBv7GUdB-0GXg1LxA/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvMjJhMDUxMzdm/MzdlZmZmZWU3YzM3/NjM2NzlkNWEzOTc4/ZDA3NWM0MTM2YzMy/OTE3ODQ4NmU2NzI0/NWUwYWE3ZS9pbWFn/ZXMuZ29vZ2xlLmNv/bS8" alt="Google" className="w-4 h-4" />
        <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">Google Review</span>
      </div>
      <StarRating rating={rating} />
    </div>
  )
}

const Testimonials = () => {
  const sectionRef = useRef(null)

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
    <section ref={sectionRef} className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h3 className="font-copperplate text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            What Our Clients Say ✨
          </h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300 font-serif max-w-xl mx-auto">
            Real feedback from those who trust us with their treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 flex flex-col"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* <div
                    className="w-12 h-12 rounded-full bg-cover bg-center ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-800"
                    style={{ backgroundImage: `url(${t.avatar})` }}
                  /> */}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.title}</p>
                  </div>
                </div>
                <GoogleReviewBadge rating={t.rating} />
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