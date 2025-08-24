export interface Service {
  id: string
  title: string
  description: string
  summary: string
  process: string[]
  timeline: string
  image: string
  icon?: any
  price?: string
  estimatedDuration?: string
}

export interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  beforeImage?: string
  afterImage?: string
  description?: string
}

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: Date
}

export interface AppStateShape {
  services: Service[]
  selectedService: Service | null
  setSelectedService: (s: Service | null) => void
  user: User | null
  isAdmin: boolean
  login: (user: User, isAdmin?: boolean) => void
  logout: () => void
  blockedDates: string[]
  blockedTimes: string[]
  setBlockedDates: (d: string[]) => void
  setBlockedTimes: (t: string[]) => void
}

export interface AdminStats {
  totalUsers: number
  totalBookings: number
  upcomingMeetings: number
  mostPopularService: string
}

export interface Theme {
  theme: 'light' | 'dark' | 'system'
}
