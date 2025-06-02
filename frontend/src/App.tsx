import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './services/theme'
import { AuthProvider } from './services/auth'
import { AppProvider } from './services/context'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './pages/Home'
import StackTraceGPT from './components/StackTraceGPT'
import RefactorTool from './components/RefactorTool'
import DSAOptimizer from './components/DSAOptimizer'
import Settings from './pages/Settings'
import { useAuth } from './services/auth'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" />
}

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <div className="min-h-screen bg-slate-900 text-white">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route
                    path="/home"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/stack-trace"
                    element={
                      <PrivateRoute>
                        <StackTraceGPT />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/refactor"
                    element={
                      <PrivateRoute>
                        <RefactorTool />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/dsa-optimizer"
                    element={
                      <PrivateRoute>
                        <DSAOptimizer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <PrivateRoute>
                        <Settings />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App 