import React from 'react'
import { useContext } from '../services/context'
import { SuggestionsPanel } from './SuggestionsPanel'
import { Button } from './Button'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description
}) => {
  const {
    showSuggestionsPanel,
    toggleSuggestionsPanel,
    showDiffView,
    toggleDiffView,
    isProcessing,
    processingProgress
  } = useContext()

  return (
    <div className="space-y-8">
      {/* Processing Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500"
            style={{ width: `${processingProgress}%` }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          {description && (
            <p className="text-slate-400">{description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSuggestionsPanel}
            leftIcon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          >
            {showSuggestionsPanel ? 'Hide Suggestions' : 'Show Suggestions'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDiffView}
            leftIcon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            }
          >
            {showDiffView ? 'Hide Diff' : 'Show Diff'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="card">
        {children}
      </div>

      {/* Suggestions Panel */}
      <SuggestionsPanel />
    </div>
  )
} 