import React from 'react'
import { useContext } from '../services/context'
import { Tooltip } from './Tooltip'
import { Button } from './Button'
import { motion, AnimatePresence } from 'framer-motion'

export const SuggestionsPanel: React.FC = () => {
  const {
    suggestions,
    showSuggestionsPanel,
    acceptSuggestion,
    rejectSuggestion,
    toggleSuggestionsPanel
  } = useContext()

  if (!showSuggestionsPanel) return null

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed right-0 top-0 h-full w-80 bg-slate-800/95 backdrop-blur-sm border-l border-slate-700 shadow-xl overflow-y-auto"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">AI Suggestions</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSuggestionsPanel}
            className="text-slate-400 hover:text-white"
          >
            <svg
              className="w-5 h-5"
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
          </Button>
        </div>

        <AnimatePresence>
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 rounded-lg bg-slate-700/50 border border-slate-600"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      suggestion.severity === 'error'
                        ? 'bg-red-500/20 text-red-400'
                        : suggestion.severity === 'warning'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {suggestion.type}
                  </span>
                  <span className="text-sm text-slate-400">
                    Line {suggestion.lineNumber}
                  </span>
                </div>
              </div>

              <p className="text-sm text-white mb-2">{suggestion.message}</p>

              <Tooltip content={suggestion.explanation}>
                <div className="mb-3 p-2 rounded bg-slate-800/50 font-mono text-xs text-slate-300">
                  {suggestion.code}
                </div>
              </Tooltip>

              {suggestion.docsLink && (
                <a
                  href={suggestion.docsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 mb-3 block"
                >
                  View Documentation →
                </a>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => acceptSuggestion(suggestion.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => rejectSuggestion(suggestion.id)}
                >
                  Dismiss
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {suggestions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-400">No suggestions available</p>
          </div>
        )}
      </div>
    </motion.div>
  )
} 