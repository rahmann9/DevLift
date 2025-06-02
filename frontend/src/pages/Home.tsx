import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const tools = [
  {
    title: 'Stack Trace Analyzer',
    description: 'Analyze and debug stack traces with AI-powered insights',
    path: '/stack-trace',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    )
  },
  {
    title: 'Code Refactor Tool',
    description: 'Refactor your code with AI-powered suggestions',
    path: '/refactor',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    )
  },
  {
    title: 'DSA Optimizer',
    description: 'Optimize your algorithms and data structures',
    path: '/dsa-optimizer',
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    )
  }
]

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Welcome to DevLift
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Your AI-powered development toolkit
        </p>
      </motion.div>

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
              className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                  {tool.icon}
                </div>
                <h2 className="ml-4 text-xl font-semibold text-slate-900 dark:text-white">
                  {tool.title}
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {tool.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Home 