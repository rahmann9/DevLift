import React from 'react'
import { useContext } from '../services/context'
import { Button } from './Button'
import { motion } from 'framer-motion'

export const ThemeCustomizer: React.FC = () => {
  const {
    themeColors,
    isDarkMode,
    customTheme,
    aiSettings,
    setThemeColors,
    toggleDarkMode,
    setCustomTheme,
    setAISettings
  } = useContext()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg bg-slate-800/95 backdrop-blur-sm border border-slate-700"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Dark Mode</span>
              <Button
                variant={isDarkMode ? 'primary' : 'ghost'}
                size="sm"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Custom Theme</span>
              <Button
                variant={customTheme ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCustomTheme(!customTheme)}
              >
                {customTheme ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </div>

        {customTheme && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customize Colors</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(themeColors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm text-slate-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) =>
                        setThemeColors({ [key]: e.target.value })
                      }
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setThemeColors({ [key]: e.target.value })
                      }
                      className="flex-1 bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">AI Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-300 block mb-2">
                Refactor Strictness
              </label>
              <select
                value={aiSettings.refactorStrictness}
                onChange={(e) =>
                  setAISettings({
                    refactorStrictness: e.target.value as any
                  })
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded px-3 py-2 text-white"
              >
                <option value="conservative">Conservative</option>
                <option value="balanced">Balanced</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300 block mb-2">
                Focus Areas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(aiSettings.focusAreas).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setAISettings({
                          focusAreas: {
                            ...aiSettings.focusAreas,
                            [key]: e.target.checked
                          }
                        })
                      }
                      className="rounded border-slate-600 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Auto Suggestions</span>
              <Button
                variant={aiSettings.autoSuggest ? 'primary' : 'ghost'}
                size="sm"
                onClick={() =>
                  setAISettings({ autoSuggest: !aiSettings.autoSuggest })
                }
              >
                {aiSettings.autoSuggest ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Inline Explanations</span>
              <Button
                variant={aiSettings.inlineExplanations ? 'primary' : 'ghost'}
                size="sm"
                onClick={() =>
                  setAISettings({
                    inlineExplanations: !aiSettings.inlineExplanations
                  })
                }
              >
                {aiSettings.inlineExplanations ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 