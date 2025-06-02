import React, { createContext, useContext, useState, useCallback } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Suggestion {
  id: string
  type: 'optimization' | 'refactor' | 'bug' | 'style'
  message: string
  code: string
  lineNumber: number
  severity: 'info' | 'warning' | 'error'
  explanation: string
  docsLink?: string
}

interface AISettings {
  autoSuggest: boolean
  suggestionStyle: 'minimal' | 'detailed'
  tone: 'friendly' | 'professional' | 'technical'
}

interface AppContextType {
  suggestions: Suggestion[]
  showSuggestionsPanel: boolean
  showDiffView: boolean
  isProcessing: boolean
  processingProgress: number
  aiSettings: AISettings
  addSuggestion: (suggestion: Omit<Suggestion, 'id'>) => void
  removeSuggestion: (id: string) => void
  acceptSuggestion: (id: string) => void
  toggleSuggestionsPanel: () => void
  toggleDiffView: () => void
  setProcessing: (isProcessing: boolean) => void
  setProcessingProgress: (progress: number) => void
  updateAISettings: (settings: Partial<AISettings>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false)
  const [showDiffView, setShowDiffView] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [aiSettings, setAISettings] = useState<AISettings>({
    autoSuggest: true,
    suggestionStyle: 'detailed',
    tone: 'friendly'
  })

  const addSuggestion = useCallback((suggestion: Omit<Suggestion, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setSuggestions(prev => [...prev, { ...suggestion, id }])
  }, [])

  const removeSuggestion = useCallback((id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }, [])

  const acceptSuggestion = useCallback((id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id))
  }, [])

  const toggleSuggestionsPanel = useCallback(() => {
    setShowSuggestionsPanel(prev => !prev)
  }, [])

  const toggleDiffView = useCallback(() => {
    setShowDiffView(prev => !prev)
  }, [])

  const updateAISettings = useCallback((settings: Partial<AISettings>) => {
    setAISettings(prev => ({ ...prev, ...settings }))
  }, [])

  return (
    <AppContext.Provider
      value={{
        suggestions,
        showSuggestionsPanel,
        showDiffView,
        isProcessing,
        processingProgress,
        aiSettings,
        addSuggestion,
        removeSuggestion,
        acceptSuggestion,
        toggleSuggestionsPanel,
        toggleDiffView,
        setProcessing: setIsProcessing,
        setProcessingProgress,
        updateAISettings
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

interface AppState {
  isLoading: boolean
  error: string | null
  suggestions: any[]
  showSuggestions: boolean
  showDiff: boolean
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setSuggestions: (suggestions: any[]) => void
  toggleSuggestions: () => void
  toggleDiff: () => void
  clearError: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: false,
      error: null,
      suggestions: [],
      showSuggestions: false,
      showDiff: false,
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSuggestions: (suggestions) => set({ suggestions }),
      toggleSuggestions: () =>
        set((state) => ({ showSuggestions: !state.showSuggestions })),
      toggleDiff: () => set((state) => ({ showDiff: !state.showDiff })),
      clearError: () => set({ error: null })
    }),
    {
      name: 'app-storage'
    }
  )
)

// App hook for components
export const useApp = () => {
  const {
    isLoading,
    error,
    suggestions,
    showSuggestions,
    showDiff,
    setLoading,
    setError,
    setSuggestions,
    toggleSuggestions,
    toggleDiff,
    clearError
  } = useAppStore()

  return {
    isLoading,
    error,
    suggestions,
    showSuggestions,
    showDiff,
    setLoading,
    setError,
    setSuggestions,
    toggleSuggestions,
    toggleDiff,
    clearError
  }
}

// Loading hook for components
export const useLoading = () => {
  const { isLoading, setLoading } = useApp()
  return { isLoading, setLoading }
}

// Error hook for components
export const useError = () => {
  const { error, setError, clearError } = useApp()
  return { error, setError, clearError }
}

// Suggestions hook for components
export const useSuggestions = () => {
  const { suggestions, setSuggestions, showSuggestions, toggleSuggestions } = useApp()
  return { suggestions, setSuggestions, showSuggestions, toggleSuggestions }
}

// Diff hook for components
export const useDiff = () => {
  const { showDiff, toggleDiff } = useApp()
  return { showDiff, toggleDiff }
} 