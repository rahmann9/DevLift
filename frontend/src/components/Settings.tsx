import React, { useState } from 'react'
import { useAuth } from '../services/auth'

const Settings: React.FC = () => {
  const { user } = useAuth()
  const [openaiKey, setOpenaiKey] = useState('')
  const [nvidiaKey, setNvidiaKey] = useState('')
  const [cloudflareKey, setCloudflareKey] = useState('')
  const [togetherKey, setTogetherKey] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)
    try {
      // TODO: Implement API key saving
      setMessage({ type: 'success', text: 'API keys saved successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save API keys' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Configure your API keys to enable advanced AI features
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">API Keys</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="openai" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  id="openai"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  placeholder="sk-..."
                />
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Required for advanced code analysis and optimization
                </p>
              </div>

              <div>
                <label htmlFor="nvidia" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  NVIDIA API Key
                </label>
                <input
                  type="password"
                  id="nvidia"
                  value={nvidiaKey}
                  onChange={(e) => setNvidiaKey(e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  placeholder="nvapi-..."
                />
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Alternative AI provider for code analysis
                </p>
              </div>

              <div>
                <label htmlFor="cloudflare" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Cloudflare API Key
                </label>
                <input
                  type="password"
                  id="cloudflare"
                  value={cloudflareKey}
                  onChange={(e) => setCloudflareKey(e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  placeholder="cf-..."
                />
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Alternative AI provider for code analysis
                </p>
              </div>

              <div>
                <label htmlFor="together" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Together API Key
                </label>
                <input
                  type="password"
                  id="together"
                  value={togetherKey}
                  onChange={(e) => setTogetherKey(e.target.value)}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:text-white sm:text-sm"
                  placeholder="tog-..."
                />
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Alternative AI provider for code analysis
                </p>
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
              <p className={`text-sm ${message.type === 'success' ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                {message.text}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 