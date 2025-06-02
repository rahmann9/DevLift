import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const tools = [
  {
    title: 'Stack Trace Analyzer',
    description: 'Analyze and debug stack traces with AI assistance',
    path: '/stack-trace',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: 'Code Refactor Tool',
    description: 'Refactor your code with AI-powered suggestions',
    path: '/refactor',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: 'DSA Optimizer',
    description: 'Optimize algorithms and data structures',
    path: '/dsa-optimizer',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
]

const Home: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to DevLift</h1>
        <p className="text-slate-400">Choose a tool to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={tool.path}
              className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-500">{tool.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{tool.title}</h2>
                  <p className="mt-1 text-slate-400">{tool.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Home 