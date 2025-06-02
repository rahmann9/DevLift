import React, { useState } from 'react'
import PasteBox from './PasteBox'
import { analyzeWithAI } from '../services/ai'
import { useAuth } from '../services/auth'

const StackTraceGPT: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { user } = useAuth()
  
  const handleSubmit = async (code: string) => {
    setIsLoading(true)
    try {
      const analysis = await analyzeWithAI('stacktrace', code, 'unknown')
      setResult(analysis)
    } catch (error) {
      console.error('Error analyzing stack trace:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Stack Trace Analyzer</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Get AI-powered insights and solutions for your stack traces.
          {!user?.hasOpenAIKey && (
            <span className="ml-2 text-yellow-600 dark:text-yellow-400">
              (Using basic analysis - Sign in with OpenAI key for enhanced analysis)
            </span>
          )}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="card">
          <PasteBox 
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="Paste your stack trace here..."
            buttonText="Analyze Stack Trace"
            language="text"
          />
        </div>
        
        {result && (
          <div className="card">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Error Analysis</h3>
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-md p-4">
                <p className="text-red-800 dark:text-red-300 font-medium">{result.analysis}</p>
              </div>
            </div>
            
            {result.suggestions.length > 0 && (
              <div className="mb-6">
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
    </div>
  )
}

export default StackTraceGPT 