import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'

interface Suggestion {
  id: string
  title: string
  description: string
  type: 'improvement' | 'bug' | 'optimization'
  code?: string
  onApply?: () => void
}

interface SuggestionsPanelProps {
  suggestions: Suggestion[]
  isOpen: boolean
  onClose: () => void
}

export const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({
  suggestions,
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 20 }}
          className="fixed right-0 top-0 h-full w-96 bg-slate-800 border-l border-slate-700 shadow-xl z-50"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Suggestions</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {suggestions.map((suggestion) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-700/50 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{suggestion.title}</h3>
                      <p className="text-slate-400 text-sm mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        suggestion.type === 'improvement'
                          ? 'bg-blue-500/20 text-blue-400'
                          : suggestion.type === 'bug'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {suggestion.type}
                    </span>
                  </div>

                  {suggestion.code && (
                    <div className="mt-3 bg-slate-900 rounded p-3 font-mono text-sm text-slate-300">
                      <pre>{suggestion.code}</pre>
                    </div>
                  )}

                  {suggestion.onApply && (
                    <div className="mt-3">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={suggestion.onApply}
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        }
                      >
                        Apply Suggestion
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 