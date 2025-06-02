import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useContext } from './services/context'
import { ThemeCustomizer } from './components/ThemeCustomizer'
import { SuggestionsPanel } from './components/SuggestionsPanel'
import { CodeEditor } from './components/CodeEditor'
import { Button } from './components/Button'
import { motion, AnimatePresence } from 'framer-motion'

// Import your existing components
import Navbar from './components/Navbar'
import Login from './pages/Login'
import StackTraceGPT from './components/StackTraceGPT'
import RefactorTool from './components/RefactorTool'
import DSAOptimizer from './components/DSAOptimizer'

const App: React.FC = () => {
  const {
    isDarkMode,
    customTheme,
    themeColors,
    showSuggestionsPanel,
    toggleSuggestionsPanel,
    showDiffView,
    toggleDiffView,
    isProcessing,
    processingProgress
  } = useContext()

  // Apply theme colors
  React.useEffect(() => {
    if (customTheme) {
      document.documentElement.style.setProperty('--primary', themeColors.primary)
      document.documentElement.style.setProperty('--secondary', themeColors.secondary)
      document.documentElement.style.setProperty('--accent', themeColors.accent)
      document.documentElement.style.setProperty('--background', themeColors.background)
      document.documentElement.style.setProperty('--text', themeColors.text)
    }
  }, [customTheme, themeColors])

  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <Navbar />
        
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

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">
                      AI-Powered Code Tools
                    </h1>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">
                          Stack Trace Analyzer
                        </h2>
                        <StackTraceGPT />
                      </div>

                      <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">
                          Code Refactor Tool
                        </h2>
                        <RefactorTool />
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">
                          DSA Optimizer
                        </h2>
                        <DSAOptimizer />
                      </div>

                      <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-4">
                          Theme Customizer
                        </h2>
                        <ThemeCustomizer />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Suggestions Panel */}
        <SuggestionsPanel />
      </div>
    </Router>
  )
}

export default App 