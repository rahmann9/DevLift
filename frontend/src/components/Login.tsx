import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../services/auth'
import { useApp } from '../services/context'
import { Button } from './Button'

interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { setLoading, setError } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      const mockLogin = () =>
        new Promise<LoginResponse>((resolve) => {
          setTimeout(() => {
            resolve({
              user: {
                id: '1',
                email,
                name: 'Test User'
              },
              token: 'dummy-token'
            })
          }, 1000)
        })

      const response = await mockLogin()
      login(response.user, response.token)
      navigate('/')
    } catch (error) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </motion.div>
  )
}

export default Login 