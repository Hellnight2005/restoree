// components/AdminDashboardWrapper.jsx
"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AdminDashboard from '@/components/Dashboard' // Assuming your AdminDashboard component is in the same folder

const AdminDashboardWrapper = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const profileCookie = Cookies.get('profile')

    if (profileCookie) {
      try {
        const profile = JSON.parse(profileCookie)
        console.log('Parsed profile from cookie:', profile)
        if (profile.role === 'admin') {
          setIsAdmin(true)
        } else {
          router.push('/') // Redirect to login if not an admin
        }
      } catch (error) {
        console.error('Failed to parse profile cookie:', error)
        router.push('/') // Redirect on malformed cookie
      }
    } else {
      router.push('/') // Redirect if no profile cookie exists
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return <div>Loading...</div>; // Or a more elaborate loading spinner
  }

  return isAdmin ? <AdminDashboard /> : null
}

export default AdminDashboardWrapper