import React, { useState } from 'react'
import PasteBox from './PasteBox'
import { analyzeWithAI } from '../services/ai'
import { useAuth } from '../services/auth'

const detectLanguage = (code: string): string => {
  if (code.includes('public class') || code.includes('private class')) return 'java';
  if (code.includes('def ') || code.includes('import ')) return 'python';
  if (code.includes('function') || code.includes('const ') || code.includes('let ')) return 'javascript';
  return 'unknown';
};

const analyzeAlgorithm = (code: string) => {
  const language = detectLanguage(code);
  const analysis = {
    time_complexity: '',
    space_complexity: '',
    optimization_suggestions: [] as string[],
    potential_issues: [] as string[],
    alternative_approaches: [] as string[],
    detected_language: language
  };

  // Analyze time complexity patterns
  const nestedLoops = (code.match(/for\s*\(/g) || []).length > 1;
  const hasRecursion = code.includes('recursive') || code.includes('function') && code.includes('return') && code.includes('(');
  const hasSorting = code.includes('sort(') || code.includes('.sort(');
  const hasSearching = code.includes('binarySearch') || code.includes('indexOf(') || code.includes('includes(');
  const hasDynamicProgramming = code.includes('dp[') || code.includes('memo[') || code.includes('cache[');

  // Determine time complexity
  if (nestedLoops) {
    analysis.time_complexity = 'O(n²)';
    analysis.optimization_suggestions.push('Consider using a more efficient data structure to avoid nested loops');
  } else if (hasRecursion) {
    analysis.time_complexity = 'O(2ⁿ)';
    analysis.optimization_suggestions.push('Consider using dynamic programming or memoization to optimize recursive calls');
  } else if (hasSorting) {
    analysis.time_complexity = 'O(n log n)';
    analysis.optimization_suggestions.push('If only finding min/max, consider using a single pass instead of sorting');
  } else if (hasSearching) {
    analysis.time_complexity = 'O(log n)';
  } else if (hasDynamicProgramming) {
    analysis.time_complexity = 'O(n)';
  } else {
    analysis.time_complexity = 'O(n)';
  }

  // Determine space complexity
  if (hasDynamicProgramming) {
    analysis.space_complexity = 'O(n)';
  } else if (hasRecursion) {
    analysis.space_complexity = 'O(n)';
  } else if (nestedLoops) {
    analysis.space_complexity = 'O(1)';
  } else {
    analysis.space_complexity = 'O(1)';
  }

  // Language-specific optimizations
  if (language === 'java') {
    if (code.includes('ArrayList') || code.includes('Vector')) {
      analysis.optimization_suggestions.push('Consider using LinkedList for frequent insertions/deletions');
    }
    if (code.includes('HashMap')) {
      analysis.optimization_suggestions.push('Consider using a more specialized data structure if keys are limited');
    }
  } else if (language === 'python') {
    if (code.includes('list(')) {
      analysis.optimization_suggestions.push('Consider using list comprehension for better performance');
    }
    if (code.includes('for x in range(')) {
      analysis.optimization_suggestions.push('Consider using enumerate() if you need both index and value');
    }
  } else if (language === 'javascript') {
    if (code.includes('for (let i = 0;')) {
      analysis.optimization_suggestions.push('Consider using array methods like map, filter, or reduce');
    }
    if (code.includes('Object.keys(')) {
      analysis.optimization_suggestions.push('Consider using Map or Set for better performance with large datasets');
    }
  }

  // Check for potential issues
  if (hasRecursion) {
    analysis.potential_issues.push('Watch out for stack overflow in recursive functions');
    analysis.alternative_approaches.push('Consider using iteration instead of recursion');
  }

  if (code.includes('Math.pow(') || code.includes('**')) {
    analysis.optimization_suggestions.push('Consider using bitwise operations for power of 2 calculations');
  }

  return analysis;
};

const DSAOptimizer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { user } = useAuth()
  
  const handleSubmit = async (code: string) => {
    setIsLoading(true)
    try {
      const language = detectLanguage(code)
      const analysis = await analyzeWithAI('dsa', code, language)
      setResult(analysis)
    } catch (error) {
      console.error('Error analyzing algorithm:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">DSA Optimizer</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Get AI-powered analysis and optimization suggestions for your algorithms and data structures.
          {!user?.hasOpenAIKey && (
            <span className="ml-2 text-yellow-600 dark:text-yellow-400">
              (Using basic analysis - Sign in with OpenAI key for enhanced analysis)
            </span>
          )}
        </p>
      </div>
      
      <PasteBox
        onSubmit={handleSubmit}
        placeholder="Paste your algorithm or data structure code here..."
        buttonText="Analyze Algorithm"
        isLoading={isLoading}
        minRows={10}
      />

      {result && (
        <div className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Analysis Results</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Complexity Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Time Complexity</p>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      {result.complexity?.time || 'O(n)'}
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 dark:text-slate-300">Space Complexity</p>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      {result.complexity?.space || 'O(1)'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Analysis</h3>
                <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                  {result.analysis}
                </p>
              </div>

              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Optimization Suggestions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {result.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-slate-600 dark:text-slate-300">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.code && (
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Optimized Code</h3>
                  <pre className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-slate-900 dark:text-slate-100">
                      {result.code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DSAOptimizer 