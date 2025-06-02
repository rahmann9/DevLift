import React from 'react'
import { useTheme } from '../services/theme'
import { motion } from 'framer-motion'

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode, customTheme, setCustomTheme, themeColors, setThemeColors } = useTheme()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Customize your experience</p>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-slate-800 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Theme Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Dark Mode</h3>
                <p className="text-slate-400">Toggle dark mode on/off</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700"
              >
                <span
                  className={`${
                    isDarkMode ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">Custom Theme</h3>
                <p className="text-slate-400">Enable custom theme colors</p>
              </div>
              <button
                onClick={() => setCustomTheme(!customTheme)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-700"
              >
                <span
                  className={`${
                    customTheme ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            </div>

            {customTheme && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    value={themeColors.primary}
                    onChange={(e) => setThemeColors({ primary: e.target.value })}
                    className="h-10 w-full rounded-md border border-slate-600 bg-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Secondary Color
                  </label>
                  <input
                    type="color"
                    value={themeColors.secondary}
                    onChange={(e) => setThemeColors({ secondary: e.target.value })}
                    className="h-10 w-full rounded-md border border-slate-600 bg-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Accent Color
                  </label>
                  <input
                    type="color"
                    value={themeColors.accent}
                    onChange={(e) => setThemeColors({ accent: e.target.value })}
                    className="h-10 w-full rounded-md border border-slate-600 bg-slate-700"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 