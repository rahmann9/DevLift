import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './services/auth'
import { useApp } from './services/context'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import StackTraceGPT from './components/StackTraceGPT'
import RefactorTool from './components/RefactorTool'
import DSAOptimizer from './components/DSAOptimizer'
import Settings from './pages/Settings'

const App: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const { isLoading, error } = useApp()

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 rounded-md">
              {error}
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={isAuthenticated ? <Home /> : <Login />}
              />
              <Route
                path="/stacktrace"
                element={isAuthenticated ? <StackTraceGPT /> : <Login />}
              />
              <Route
                path="/refactor"
                element={isAuthenticated ? <RefactorTool /> : <Login />}
              />
              <Route
                path="/dsa"
                element={isAuthenticated ? <DSAOptimizer /> : <Login />}
              />
              <Route
                path="/settings"
                element={isAuthenticated ? <Settings /> : <Login />}
              />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App 