import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../services/theme'
import { Button } from '../components/Button'

const Settings: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme()

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Theme
            </h2>
            <div className="flex items-center space-x-4">
              <Button
                variant={theme === 'light' ? 'primary' : 'outline'}
                onClick={() => setTheme('light')}
              >
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'primary' : 'outline'}
                onClick={() => setTheme('dark')}
              >
                Dark
              </Button>
              <Button variant="ghost" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              About
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              DevLift is an AI-powered development toolkit that helps you write
              better code, faster. With features like stack trace analysis, code
              refactoring, and algorithm optimization, you can focus on what
              matters most - building great software.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Version
            </h2>
            <p className="text-slate-600 dark:text-slate-400">1.0.0</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings 