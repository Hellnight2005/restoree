"use client"

import React, { createContext, useContext, useMemo, useState } from 'react'
import { AppStateShape, Service, User } from '@/types'

const defaultBlockedDates = ['2025-08-18', '2025-08-20']
const defaultBlockedTimes = ['10:00', '15:00']

const AppStateContext = createContext<AppStateShape | undefined>(undefined)

export const AppStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [blockedDates, setBlockedDates] = useState<string[]>(defaultBlockedDates)
  const [blockedTimes, setBlockedTimes] = useState<string[]>(defaultBlockedTimes)

  const login = (u: User, admin?: boolean) => {
    setUser(u)
    setIsAdmin(Boolean(admin))
  }

  const logout = () => {
    setUser(null)
    setIsAdmin(false)
  }

  const value = useMemo<AppStateShape>(() => ({
    services,
    selectedService,
    setSelectedService,
    user,
    isAdmin,
    login,
    logout,
    blockedDates,
    blockedTimes,
    setBlockedDates,
    setBlockedTimes,
  }), [services, selectedService, user, isAdmin, blockedDates, blockedTimes])

  return (
    <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}




