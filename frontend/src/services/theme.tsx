import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light'
        }))
    }),
    {
      name: 'theme-storage'
    }
  )
)

// Theme colors
export const themeColors = {
  light: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    border: '#e2e8f0'
  },
  dark: {
    primary: '#60a5fa',
    secondary: '#94a3b8',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    border: '#334155'
  }
}

// Theme utility functions
export const getThemeColor = (color: keyof typeof themeColors.light) => {
  const theme = useThemeStore.getState().theme
  return themeColors[theme][color]
}

// Theme hook for components
export const useTheme = () => {
  const { theme, setTheme, toggleTheme } = useThemeStore()
  return {
    theme,
    setTheme,
    toggleTheme,
    colors: themeColors[theme]
  }
} 