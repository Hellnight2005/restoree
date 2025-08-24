"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAppState } from '@/components/AppStateProvider'
import { User, Mail, Phone, Tag, Package, Calendar, StickyNote } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const mockUser = {
  id: 'u_1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+1 555 123 4567',
  createdAt: new Date(),
}

const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00']

export default function BookingPage() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }

  const router = useRouter()
  const params = useSearchParams()
  const { selectedService, setSelectedService, user, login, blockedDates, blockedTimes } = useAppState()

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLDivElement | null>(null)
  const timeRef = useRef<HTMLDivElement | null>(null)

  const serviceFromQuery = useMemo(() => {
    const id = params.get('service') || params.get('serviceId')
    const title = params.get('title')
    const description = params.get('description')
    const image = params.get('image')
    const price = params.get('price') || undefined
    const estimatedDuration = params.get('duration') || undefined
    if (!id) return null
    return { id, title: title || id, description: description || '', image: image || '', price, estimatedDuration }
  }, [params])

  useEffect(() => {
    if (serviceFromQuery) {
      setSelectedService({
        id: serviceFromQuery.id,
        title: serviceFromQuery.title || 'Selected Service',
        description: serviceFromQuery.description || '',
        summary: '',
        process: [],
        timeline: serviceFromQuery.estimatedDuration || '',
        image: serviceFromQuery.image || '/images/hero-bg.jpg',
        price: serviceFromQuery.price,
        estimatedDuration: serviceFromQuery.estimatedDuration,
      })
    }
  }, [serviceFromQuery, setSelectedService])

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true)
  useEffect(() => {
    if (isLoggedIn && !user) {
      login(mockUser as any, false)
    }
  }, [isLoggedIn, user, login])

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    product: '',
    date: '',
    time: '',
    notes: '',
  })

  const [errors, setErrors] = useState<{ [k: string]: string }>({})

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, name: user.name, email: user.email, phone: user.phone || '' }))
    }
  }, [user])

  const isDateBlocked = (d: string) => blockedDates.includes(d)
  const isTimeBlocked = (t: string) => blockedTimes.includes(t)

  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.summary-card', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })

      gsap.from('.booking-field', {
        opacity: 0,
        y: 12,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%'
        }
      })

      gsap.from('.time-chip', {
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timeRef.current,
          start: 'top 90%'
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <div className="card p-8 max-w-lg mx-auto text-center">
            <h1 className="font-copperplate text-3xl font-bold mb-4">Please Log In</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You must be logged in to book a service.</p>
            <button
              className="btn-primary"
              onClick={() => {
                setIsLoggedIn(true)
              }}
            >
              Log In (Mock)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <motion.section ref={sectionRef} className="section-padding" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Service Summary */}
            <motion.div className="summary-card card p-6 lg:col-span-1 lg:sticky lg:top-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {selectedService && (
                <>
                  <div className="h-48 rounded-xl overflow-hidden mb-4">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${selectedService.image})` }}
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{selectedService.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 font-serif">{selectedService.description}</p>
                  {(selectedService.price || selectedService.estimatedDuration) && (
                    <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
                      {selectedService.price && <span>Price: {selectedService.price}</span>}
                      {selectedService.estimatedDuration && <span>Duration: {selectedService.estimatedDuration}</span>}
                    </div>
                  )}
                </>
              )}
            </motion.div>

            {/* Booking Form */}
            <motion.div ref={formRef} className="card p-6 lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-copperplate text-2xl font-semibold">Book Your Appointment</h3>
                {user && <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back, {user.name.split(' ')[0]}!</p>}
              </div>
              {!isLoggedIn && (
                <div className="mb-4 p-4 rounded bg-yellow-50 text-yellow-800">Please log in to continue</div>
              )}

              {/* Progress */}
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-2 mb-4">
                {(() => {
                  const total = 7
                  const filled = [form.name, form.email, form.phone, form.brand, form.product, form.date, form.time].filter(Boolean).length
                  const width = `${Math.round((filled / total) * 100)}%`
                  return <div className="h-full bg-fawn transition-all duration-500" style={{ width }} />
                })()}
              </div>

              {/* Personal & Item Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                <div className="field booking-field">
                  <label className="label">Name</label>
                  <div className="relative">
                    <User className="icon" />
                    <input className="input pl-11" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  {errors.name && <p className="help">{errors.name}</p>}
                </div>
                <div className="field booking-field">
                  <label className="label">Email</label>
                  <div className="relative">
                    <Mail className="icon" />
                    <input className="input pl-11" placeholder="you@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  {errors.email && <p className="help">{errors.email}</p>}
                </div>
                <div className="field booking-field">
                  <label className="label">Phone</label>
                  <div className="relative">
                    <Phone className="icon" />
                    <input className="input pl-11" placeholder="+1 555 123 4567" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  {errors.phone && <p className="help">{errors.phone}</p>}
                </div>
                <div className="field booking-field">
                  <label className="label">Selected Service</label>
                  <input className="input" value={selectedService?.title || ''} readOnly />
                </div>
                <div className="field booking-field">
                  <label className="label">Brand</label>
                  <div className="relative">
                    <Tag className="icon" />
                    <input className="input pl-11" placeholder="e.g., Chanel, Gucci, Hermès" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                  </div>
                  {errors.brand && <p className="help">{errors.brand}</p>}
                </div>
                <div className="field booking-field">
                  <label className="label">Product</label>
                  <div className="relative">
                    <Package className="icon" />
                    <input className="input pl-11" placeholder="Official product name / model" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} />
                  </div>
                  {errors.product && <p className="help">{errors.product}</p>}
                </div>
              </div>

              {/* Schedule & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                <div className="field booking-field">
                  <label className="label">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="icon" />
                    <input
                      className="input pl-11"
                      type="date"
                      value={form.date}
                      onChange={(e) => {
                        const d = e.target.value
                        if (isDateBlocked(d)) {
                          setErrors((er) => ({ ...er, date: 'Selected date is unavailable. Please choose another date.' }))
                        } else {
                          setErrors((er) => ({ ...er, date: '' }))
                        }
                        setForm({ ...form, date: d })
                      }}
                    />
                  </div>
                  {errors.date && <p className="help">{errors.date}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unavailable: {blockedDates.join(', ') || 'None'}</p>
                </div>
                <div className="field booking-field">
                  <label className="label">Preferred Time</label>
                  <div>
                    <div ref={timeRef} className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {times.map((t) => {
                        const disabled = isTimeBlocked(t)
                        const selected = form.time === t
                        return (
                          <button
                            key={t}
                            type="button"
                            disabled={disabled}
                            onClick={() => setForm({ ...form, time: t })}
                            className={`time-chip px-3 py-2 rounded-full border text-sm transition-all ${
                              selected ? 'bg-fawn text-white border-fawn shadow' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
                            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  {errors.time && <p className="help">{errors.time}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Unavailable: {blockedTimes.join(', ') || 'None'}</p>
                </div>
              </div>

              <div className="field booking-field mt-6">
                <label className="label">Special Notes</label>
                <div className="relative">
                  <StickyNote className="icon" />
                  <textarea className="input pl-11" rows={4} placeholder="Anything we should know? (e.g., scuffs on bottom, zipper issues)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <motion.button
                  className={`btn-primary ${(() => {
                    const required = [form.name, form.email, form.phone, form.brand, form.product, form.date, form.time]
                    const can = required.every(Boolean) && !(errors.date || errors.time)
                    return can ? '' : 'opacity-50 cursor-not-allowed'
                  })()}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const newErrors: { [k: string]: string } = {}
                    if (!form.name.trim()) newErrors.name = 'Name is required.'
                    if (!form.email.trim()) newErrors.email = 'Email is required.'
                    if (!form.phone.trim()) newErrors.phone = 'Phone is required.'
                    if (!form.brand.trim()) newErrors.brand = 'Brand is required.'
                    if (!form.product.trim()) newErrors.product = 'Product is required.'
                    if (!form.date.trim()) newErrors.date = 'Date is required.'
                    if (!form.time.trim()) newErrors.time = 'Time is required.'
                    if (form.date && isDateBlocked(form.date)) newErrors.date = 'Selected date is unavailable.'
                    if (form.time && isTimeBlocked(form.time)) newErrors.time = 'Selected time is unavailable.'
                    setErrors(newErrors)
                    if (Object.keys(newErrors).length === 0) setShowConfirm(true)
                  }}
                >
                  Review & Confirm
                </motion.button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setForm({ name: '', email: '', phone: '', brand: '', product: '', date: '', time: '', notes: '' })
                    setErrors({})
                  }}
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full p-6">
            <h4 className="text-xl font-semibold mb-2">Booking Confirmed</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">We have received your booking. A confirmation email would be sent in a real app.</p>
            <button className="btn-primary" onClick={() => setShowConfirm(false)}>Close</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .input {
          @apply w-full px-5 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-fawn focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white;
        }
        textarea.input { @apply rounded-2xl; }
        .field { @apply flex flex-col; }
        .label { @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-1; }
        .help { @apply text-xs text-red-600 mt-1; }
        .icon { @apply absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
        input[type="date"]:disabled { opacity: 0.5; }
      `}</style>
    </div>
  )
}


