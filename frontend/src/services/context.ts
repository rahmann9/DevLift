import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeColors = {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export type AISettings = {
  refactorStrictness: 'conservative' | 'balanced' | 'aggressive'
  focusAreas: {
    performance: boolean
    readability: boolean
    security: boolean
    maintainability: boolean
  }
  autoSuggest: boolean
  inlineExplanations: boolean
}

export type Suggestion = {
  id: string
  type: 'refactor' | 'optimization' | 'bug' | 'style'
  message: string
  code: string
  lineNumber: number
  severity: 'info' | 'warning' | 'error'
  explanation: string
  docsLink?: string
}

type ContextState = {
  // Theme customization
  themeColors: ThemeColors
  isDarkMode: boolean
  customTheme: boolean
  
  // AI settings
  aiSettings: AISettings
  
  // Suggestions and history
  suggestions: Suggestion[]
  suggestionHistory: Suggestion[]
  currentSuggestionIndex: number
  
  // UI state
  showDiffView: boolean
  showSuggestionsPanel: boolean
  isProcessing: boolean
  processingProgress: number
  
  // Actions
  setThemeColors: (colors: Partial<ThemeColors>) => void
  toggleDarkMode: () => void
  setCustomTheme: (enabled: boolean) => void
  setAISettings: (settings: Partial<AISettings>) => void
  addSuggestion: (suggestion: Omit<Suggestion, 'id'>) => void
  removeSuggestion: (id: string) => void
  acceptSuggestion: (id: string) => void
  rejectSuggestion: (id: string) => void
  undoLastSuggestion: () => void
  redoLastSuggestion: () => void
  setProcessing: (isProcessing: boolean) => void
  setProcessingProgress: (progress: number) => void
  toggleDiffView: () => void
  toggleSuggestionsPanel: () => void
}

const defaultThemeColors: ThemeColors = {
  primary: '#3b82f6',
  secondary: '#10b981',
  accent: '#8b5cf6',
  background: '#1a1c2e',
  text: '#f3f4f6'
}

const defaultAISettings: AISettings = {
  refactorStrictness: 'balanced',
  focusAreas: {
    performance: true,
    readability: true,
    security: true,
    maintainability: true
  },
  autoSuggest: true,
  inlineExplanations: true
}

export const useContext = create<ContextState>()(
  persist(
    (set, get) => ({
      // Initial state
      themeColors: defaultThemeColors,
      isDarkMode: true,
      customTheme: false,
      aiSettings: defaultAISettings,
      suggestions: [],
      suggestionHistory: [],
      currentSuggestionIndex: -1,
      showDiffView: false,
      showSuggestionsPanel: true,
      isProcessing: false,
      processingProgress: 0,

      // Actions
      setThemeColors: (colors) => set((state) => ({
        themeColors: { ...state.themeColors, ...colors }
      })),

      toggleDarkMode: () => set((state) => ({
        isDarkMode: !state.isDarkMode
      })),

      setCustomTheme: (enabled) => set({ customTheme: enabled }),

      setAISettings: (settings) => set((state) => ({
        aiSettings: { ...state.aiSettings, ...settings }
      })),

      addSuggestion: (suggestion) => set((state) => ({
        suggestions: [
          ...state.suggestions,
          { ...suggestion, id: crypto.randomUUID() }
        ]
      })),

      removeSuggestion: (id) => set((state) => ({
        suggestions: state.suggestions.filter(s => s.id !== id)
      })),

      acceptSuggestion: (id) => set((state) => {
        const suggestion = state.suggestions.find(s => s.id === id)
        if (!suggestion) return state

        return {
          suggestions: state.suggestions.filter(s => s.id !== id),
          suggestionHistory: [...state.suggestionHistory, suggestion],
          currentSuggestionIndex: state.currentSuggestionIndex + 1
        }
      }),

      rejectSuggestion: (id) => set((state) => ({
        suggestions: state.suggestions.filter(s => s.id !== id)
      })),

      undoLastSuggestion: () => set((state) => {
        if (state.currentSuggestionIndex < 0) return state

        const suggestion = state.suggestionHistory[state.currentSuggestionIndex]
        return {
          suggestions: [...state.suggestions, suggestion],
          currentSuggestionIndex: state.currentSuggestionIndex - 1
        }
      }),

      redoLastSuggestion: () => set((state) => {
        if (state.currentSuggestionIndex >= state.suggestionHistory.length - 1) return state

        const suggestion = state.suggestionHistory[state.currentSuggestionIndex + 1]
        return {
          suggestions: [...state.suggestions, suggestion],
          currentSuggestionIndex: state.currentSuggestionIndex + 1
        }
      }),

      setProcessing: (isProcessing) => set({ isProcessing }),

      setProcessingProgress: (progress) => set({ processingProgress: progress }),

      toggleDiffView: () => set((state) => ({
        showDiffView: !state.showDiffView
      })),

      toggleSuggestionsPanel: () => set((state) => ({
        showSuggestionsPanel: !state.showSuggestionsPanel
      }))
    }),
    {
      name: 'context-storage',
      partialize: (state) => ({
        themeColors: state.themeColors,
        isDarkMode: state.isDarkMode,
        customTheme: state.customTheme,
        aiSettings: state.aiSettings
      })
    }
  )
) 