import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiClient from '../api/client'

export type User = {
  id: string
  email: string
  name: string
  picture?: string
  isGuest: boolean
  hasOpenAIKey?: boolean
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (user: User) => void
  logout: () => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: (user) => set({ user, isAuthenticated: true, error: null }),
      logout: () => set({ user: null, isAuthenticated: false, error: null }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)

export const loginWithGoogle = async () => {
  try {
    const response = await apiClient.post('/auth/google')
    const user: User = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      picture: response.data.picture,
      isGuest: false,
      hasOpenAIKey: response.data.hasOpenAIKey
    }
    return user
  } catch (error) {
    console.error('Google login failed:', error)
    throw new Error('Failed to login with Google')
  }
}

export const loginWithLinkedIn = async () => {
  try {
    const response = await apiClient.post('/auth/linkedin')
    const user: User = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      picture: response.data.picture,
      isGuest: false,
      hasOpenAIKey: response.data.hasOpenAIKey
    }
    return user
  } catch (error) {
    console.error('LinkedIn login failed:', error)
    throw new Error('Failed to login with LinkedIn')
  }
}

export const loginAsGuest = async () => {
  const guestUser: User = {
    id: 'guest-' + Date.now(),
    email: 'guest@example.com',
    name: 'Guest User',
    isGuest: true,
    hasOpenAIKey: false
  }
  return guestUser
} 