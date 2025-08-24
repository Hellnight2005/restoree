"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppState } from '@/components/AppStateProvider'

export default function AdminServicesPage() {
  const { isAdmin, services, blockedDates, blockedTimes, setBlockedDates, setBlockedTimes } = useAppState()
  const [localServices, setLocalServices] = useState(services)
  const [form, setForm] = useState({
    id: '', title: '', description: '', price: '', estimatedDuration: '', image: ''
  })
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  if (!isAdmin) {
    return (
      <div className="min-h-screen section-padding">
        <div className="container-custom">
          <div className="card p-8 max-w-lg mx-auto text-center">
            <h1 className="font-copperplate text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-300">You must be an admin to view this page.</p>
          </div>
        </div>
      </div>
    )
  }

  const addOrUpdate = () => {
    if (!form.title) return
    const id = form.id || form.title.toLowerCase().replace(/\s+/g, '-')
    const svc = { ...form, id, summary: form.description, process: [], timeline: form.estimatedDuration, icon: undefined }
    setLocalServices((prev) => {
      const idx = prev.findIndex((s) => s.id === id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], ...svc }
        return copy
      }
      return [...prev, svc as any]
    })
    setForm({ id: '', title: '', description: '', price: '', estimatedDuration: '', image: '' })
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const editService = (id: string) => {
    const svc = localServices.find((s) => s.id === id)
    if (svc) {
      setForm({
        id: svc.id,
        title: svc.title,
        description: svc.description,
        price: (svc as any).price || '',
        estimatedDuration: (svc as any).estimatedDuration || svc.timeline || '',
        image: svc.image,
      })
      setPreview(svc.image)
    }
  }

  const deleteService = (id: string) => {
    setLocalServices((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        <motion.h1 className="font-copperplate text-4xl md:text-5xl font-bold mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Service Management
        </motion.h1>

        {/* Blocked dates/times */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Availability Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Blocked Dates (YYYY-MM-DD, comma separated)</label>
              <input className="input" value={blockedDates.join(', ')} onChange={(e) => setBlockedDates(e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Blocked Times (HH:mm, comma separated)</label>
              <input className="input" value={blockedTimes.join(', ')} onChange={(e) => setBlockedTimes(e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{form.id ? 'Edit Service' : 'Add Service'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" placeholder="Service name" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="input" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="input" placeholder="Estimated completion time" value={form.estimatedDuration} onChange={(e) => setForm({ ...form, estimatedDuration: e.target.value })} />
            <input className="input" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <textarea className="input mt-4" rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="mt-4 flex items-center gap-4">
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) {
                const url = URL.createObjectURL(f)
                setPreview(url)
                setForm({ ...form, image: url })
              }
            }} />
            {preview && <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded" />}
          </div>
          <div className="mt-6 flex gap-3">
            <button className="btn-primary" onClick={addOrUpdate}>{form.id ? 'Update' : 'Add'} Service</button>
            {form.id && <button className="btn-secondary" onClick={() => setForm({ id: '', title: '', description: '', price: '', estimatedDuration: '', image: '' })}>Cancel</button>}
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localServices.map((s) => (
            <div key={s.id} className="card p-6">
              <div className="h-40 rounded-xl overflow-hidden mb-4">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 font-serif">{s.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <button className="btn-secondary" onClick={() => editService(s.id)}>Edit</button>
                <button className="btn-primary" onClick={() => deleteService(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


