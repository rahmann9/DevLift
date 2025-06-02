import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../services/auth'
import { useTheme } from '../services/theme'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  if (!user) return null

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/home" className="text-xl font-bold text-white">
              DevLift
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/stack-trace"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/stack-trace')
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Stack Trace
              </Link>
              <Link
                to="/refactor"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/refactor')
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                Refactor
              </Link>
              <Link
                to="/dsa-optimizer"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dsa-optimizer')
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                DSA Optimizer
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
            <Link
              to="/settings"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/settings')
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              Settings
            </Link>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 