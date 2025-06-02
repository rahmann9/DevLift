import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
  customTheme: boolean
  setCustomTheme: (value: boolean) => void
  themeColors: ThemeColors
  setThemeColors: (colors: Partial<ThemeColors>) => void
}

const defaultColors: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#8b5cf6',
  background: '#0f172a',
  text: '#f8fafc'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [customTheme, setCustomTheme] = useState(false)
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultColors)

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Update dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    // Apply theme colors
    if (customTheme) {
      Object.entries(themeColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
    } else {
      // Reset to default colors
      Object.entries(defaultColors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value)
      })
    }
  }, [customTheme, themeColors])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const updateThemeColors = (colors: Partial<ThemeColors>) => {
    setThemeColors(prev => ({ ...prev, ...colors }))
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        customTheme,
        setCustomTheme,
        themeColors,
        setThemeColors: updateThemeColors
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 