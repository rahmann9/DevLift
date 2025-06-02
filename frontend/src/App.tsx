import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import StackTraceGPT from './components/StackTraceGPT'
import RefactorTool from './components/RefactorTool'
import DSAOptimizer from './components/DSAOptimizer'
import Settings from './components/Settings'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-100/50 dark:from-slate-900/50 dark:to-slate-800/50 backdrop-blur-sm" />
        <div className="relative z-10">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/stacktrace" element={
                <ProtectedRoute>
                  <StackTraceGPT />
                </ProtectedRoute>
              } />
              <Route path="/refactor" element={
                <ProtectedRoute>
                  <RefactorTool />
                </ProtectedRoute>
              } />
              <Route path="/dsa" element={
                <ProtectedRoute>
                  <DSAOptimizer />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App 