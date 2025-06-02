import React, { createContext, useContext, useState } from 'react'

interface AppContextType {
  isProcessing: boolean
  processingProgress: number
  showSuggestionsPanel: boolean
  toggleSuggestionsPanel: () => void
  showDiffView: boolean
  toggleDiffView: () => void
  startProcessing: () => void
  stopProcessing: () => void
  updateProgress: (progress: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showSuggestionsPanel, setShowSuggestionsPanel] = useState(false)
  const [showDiffView, setShowDiffView] = useState(false)

  const startProcessing = () => {
    setIsProcessing(true)
    setProcessingProgress(0)
  }

  const stopProcessing = () => {
    setIsProcessing(false)
    setProcessingProgress(0)
  }

  const updateProgress = (progress: number) => {
    setProcessingProgress(progress)
  }

  const toggleSuggestionsPanel = () => {
    setShowSuggestionsPanel(!showSuggestionsPanel)
  }

  const toggleDiffView = () => {
    setShowDiffView(!showDiffView)
  }

  return (
    <AppContext.Provider
      value={{
        isProcessing,
        processingProgress,
        showSuggestionsPanel,
        toggleSuggestionsPanel,
        showDiffView,
        toggleDiffView,
        startProcessing,
        stopProcessing,
        updateProgress
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