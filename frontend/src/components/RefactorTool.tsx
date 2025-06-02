import React, { useState } from 'react'
import { Layout } from './Layout'
import { CodeEditor } from './CodeEditor'
import { motion } from 'framer-motion'
import { analyzeWithAI } from '../services/ai'
import { useAuth } from '../services/auth'

const RefactorTool: React.FC = () => {
  const [code, setCode] = useState('')
  const [refactoredCode, setRefactoredCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { user } = useAuth()
  
  const handleRefactor = async () => {
    setIsLoading(true)
    try {
      const analysis = await analyzeWithAI('refactor', code, 'unknown')
      setResult(analysis)
      setRefactoredCode(analysis.code)
    } catch (error) {
      console.error('Error analyzing code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout
      title="Code Refactor Tool"
      description="Refactor your code with AI-powered suggestions"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Input Code</h2>
          <CodeEditor
            value={code}
            onChange={setCode}
            placeholder="Paste your code here..."
            minRows={10}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleRefactor}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Refactor
          </button>
        </div>

        {refactoredCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-white">Refactored Code</h2>
            <CodeEditor
              value={refactoredCode}
              onChange={setRefactoredCode}
              placeholder="Refactored code will appear here..."
              minRows={10}
            />
          </motion.div>
        )}

        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Analysis</h3>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
              <p className="text-slate-700 dark:text-slate-300">{result.analysis}</p>
            </div>
            
            {result.suggestions.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium text-white mb-2">Refactoring Suggestions</h4>
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

export default RefactorTool 