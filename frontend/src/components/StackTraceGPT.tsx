import React, { useState } from 'react'
import { Layout } from './Layout'
import { CodeEditor } from './CodeEditor'
import { motion } from 'framer-motion'
import { analyzeWithAI } from '../services/ai'
import { useAuth } from '../services/auth'

const StackTraceGPT: React.FC = () => {
  const [stackTrace, setStackTrace] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { user } = useAuth()
  
  const handleAnalyze = async () => {
    setIsLoading(true)
    try {
      const analysis = await analyzeWithAI('stacktrace', stackTrace, 'unknown')
      setResult(analysis)
      setAnalysis('Analysis complete!')
    } catch (error) {
      console.error('Error analyzing stack trace:', error)
      setAnalysis('Error analyzing stack trace. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Layout
      title="Stack Trace Analyzer"
      description="Analyze and debug stack traces with AI assistance"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Input Stack Trace</h2>
          <CodeEditor
            value={stackTrace}
            onChange={setStackTrace}
            placeholder="Paste your stack trace here..."
            minRows={10}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Analyze
          </button>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Analysis Results</h2>
            <p className="text-slate-300">{analysis}</p>
          </motion.div>
        )}

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Error Analysis</h3>
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-md p-4">
              <p className="text-red-800 dark:text-red-300 font-medium">{result.analysis}</p>
            </div>
            
            {result.suggestions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-slate-900 dark:text-white mb-2">Suggested Solutions</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-slate-700 dark:text-slate-300">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StackTraceGPT 