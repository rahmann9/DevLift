import { useAuth } from './auth'
import apiClient from '../api/client'

export type AnalysisResult = {
  analysis: string
  suggestions: string[]
  code?: string
  complexity?: {
    time: string
    space: string
  }
}

const optimizePrompt = (type: 'stacktrace' | 'refactor' | 'dsa', input: string, language: string) => {
  const basePrompt = `You are an expert software engineer analyzing ${type === 'stacktrace' ? 'a stack trace' : type === 'refactor' ? 'code for refactoring' : 'an algorithm'} in ${language}.`
  
  switch (type) {
    case 'stacktrace':
      return `${basePrompt}
Analyze the following stack trace and provide:
1. The root cause of the error
2. Specific suggestions to fix the issue
3. Best practices to prevent similar errors
4. Any relevant code snippets that could help

Stack trace:
${input}`
    
    case 'refactor':
      return `${basePrompt}
Analyze the following code and provide:
1. Specific refactoring suggestions
2. Modern language features that could be used
3. Performance improvements
4. Code quality enhancements
5. A refactored version of the code

Code:
${input}`
    
    case 'dsa':
      return `${basePrompt}
Analyze the following algorithm and provide:
1. Time and space complexity analysis
2. Optimization suggestions
3. Alternative approaches
4. Edge cases to consider
5. Performance improvements

Algorithm:
${input}`
    
    default:
      return input
  }
}

export const analyzeWithAI = async (
  type: 'stacktrace' | 'refactor' | 'dsa',
  input: string,
  language: string
): Promise<AnalysisResult> => {
  const { user } = useAuth.getState()
  
  if (!user?.hasOpenAIKey) {
    console.log('No OpenAI key found, using mock analysis')
    return getMockAnalysis(type, input, language)
  }

  try {
    let response;
    switch (type) {
      case 'stacktrace':
        response = await apiClient.post('/explain/stacktrace', {
          stack_trace: input,
          language
        });
        return {
          analysis: response.data.explanation,
          suggestions: response.data.possible_fixes
        };
      
      case 'refactor':
        response = await apiClient.post('/optimize/refactor', {
          code: input,
          language
        });
        return {
          analysis: response.data.explanation,
          suggestions: response.data.optimization_techniques,
          code: response.data.optimized_code
        };
      
      case 'dsa':
        response = await apiClient.post('/optimize/dsa', {
          code: input,
          language
        });
        return {
          analysis: response.data.explanation,
          suggestions: response.data.optimization_techniques,
          code: response.data.optimized_code,
          complexity: {
            time: response.data.time_complexity_after,
            space: response.data.space_complexity_after
          }
        };
    }
  } catch (error) {
    console.error('Error getting AI analysis:', error)
    return getMockAnalysis(type, input, language)
  }
}

const getMockAnalysis = (type: 'stacktrace' | 'refactor' | 'dsa', input: string, language: string): AnalysisResult => {
  // Return mock analysis for users without OpenAI key
  switch (type) {
    case 'stacktrace':
      return {
        analysis: 'This appears to be a null pointer exception.',
        suggestions: [
          'Add null checks before accessing object properties',
          'Initialize objects before use',
          'Use Optional to handle potential null values'
        ]
      }
    
    case 'refactor':
      return {
        analysis: 'The code can be improved using modern language features.',
        suggestions: [
          'Use arrow functions for better readability',
          'Implement proper error handling',
          'Add input validation'
        ],
        code: input // Return the original code for mock analysis
      }
    
    case 'dsa':
      return {
        analysis: 'The algorithm can be optimized for better performance.',
        suggestions: [
          'Consider using a more efficient data structure',
          'Implement caching for repeated calculations',
          'Optimize the loop structure'
        ],
        complexity: {
          time: 'O(n)',
          space: 'O(1)'
        }
      }
  }
} 