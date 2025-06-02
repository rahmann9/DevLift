import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const tools = [
    {
      title: 'StackTraceGPT',
      description: 'Get instant explanations and solutions for your error stack traces. Our AI analyzes the trace and provides clear, actionable insights.',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      path: '/stacktrace',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'RefactorTool',
      description: 'Optimize your code with AI-powered refactoring suggestions. Improve readability, performance, and maintainability of your codebase.',
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      path: '/refactor',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'DSA Optimizer',
      description: 'Analyze and optimize your algorithms with advanced AI. Get detailed insights into time and space complexity, with suggestions for improvement.',
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/dsa',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to DevLift
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
          Your AI-powered development companion. Build better, think sharper, deliver faster.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            to={tool.path}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(to bottom right, ${tool.gradient.split(' ')[1]}, ${tool.gradient.split(' ')[3]})` }} />
            <div className="relative p-8 h-full flex flex-col">
              <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br mb-6" style={{ backgroundImage: `linear-gradient(to bottom right, ${tool.gradient.split(' ')[1]}, ${tool.gradient.split(' ')[3]})` }}>
                {tool.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {tool.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 flex-grow">
                {tool.description}
              </p>
              <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                <span className="font-medium">Get Started</span>
                <svg className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to boost your development workflow?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Choose a tool above to get started, or explore our documentation to learn more.
        </p>
        <Link
          to="/settings"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Configure API Keys
          <svg className="ml-2 -mr-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Home; 