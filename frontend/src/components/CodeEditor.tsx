import React, { useState, useEffect } from 'react'
import { useContext } from '../services/context'
import { motion } from 'framer-motion'
import { Button } from './Button'
import { Tooltip } from './Tooltip'
import { DiffView } from './DiffView'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  minRows?: number
  maxRows?: number
}

interface SyntaxError {
  line: number
  message: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'javascript',
  placeholder = 'Enter your code here...',
  minRows = 5,
  maxRows = 20
}) => {
  const {
    aiSettings,
    suggestions,
    addSuggestion,
    removeSuggestion,
    acceptSuggestion,
    showDiffView,
    setProcessing,
    setProcessingProgress
  } = useContext()

  const [errors, setErrors] = useState<SyntaxError[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [originalCode, setOriginalCode] = useState('')
  const [modifiedCode, setModifiedCode] = useState('')

  // Real-time validation
  useEffect(() => {
    if (!value) return

    const validateCode = async () => {
      try {
        // Basic syntax validation
        if (language === 'javascript') {
          // Use a simple regex to check for common syntax errors
          const syntaxErrors: SyntaxError[] = []
          const lines = value.split('\n')

          lines.forEach((line, index) => {
            // Check for unclosed brackets, quotes, etc.
            const unclosedBrackets = (line.match(/{/g) || []).length !== (line.match(/}/g) || []).length
            const unclosedQuotes = (line.match(/"/g) || []).length % 2 !== 0
            const unclosedParens = (line.match(/\(/g) || []).length !== (line.match(/\)/g) || []).length

            if (unclosedBrackets || unclosedQuotes || unclosedParens) {
              syntaxErrors.push({
                line: index + 1,
                message: 'Syntax error: Unclosed brackets, quotes, or parentheses'
              })
            }
          })

          setErrors(syntaxErrors)

          // If auto-suggestions are enabled, analyze the code
          if (aiSettings.autoSuggest && syntaxErrors.length === 0) {
            analyzeCode()
          }
        }
      } catch (error) {
        console.error('Error validating code:', error)
      }
    }

    const timeoutId = setTimeout(validateCode, 500)
    return () => clearTimeout(timeoutId)
  }, [value, language, aiSettings.autoSuggest])

  const analyzeCode = async () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    setProcessing(true)
    setProcessingProgress(0)

    try {
      // Simulate AI analysis with progress updates
      const totalSteps = 3
      for (let i = 0; i < totalSteps; i++) {
        await new Promise(resolve => setTimeout(resolve, 500))
        setProcessingProgress(((i + 1) / totalSteps) * 100)
      }

      // Add example suggestions
      addSuggestion({
        type: 'optimization',
        message: 'Consider using Array.map() instead of forEach',
        code: value.replace(/\.forEach\(/g, '.map('),
        lineNumber: 1,
        severity: 'info',
        explanation: 'Array.map() is more functional and can be chained with other array methods.',
        docsLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map'
      })

      setOriginalCode(value)
      setModifiedCode(value.replace(/\.forEach\(/g, '.map('))
    } catch (error) {
      console.error('Error analyzing code:', error)
    } finally {
      setIsAnalyzing(false)
      setProcessing(false)
      setProcessingProgress(0)
    }
  }

  const handleAcceptSuggestion = (id: string) => {
    const suggestion = suggestions.find(s => s.id === id)
    if (suggestion) {
      onChange(suggestion.code)
      acceptSuggestion(id)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={Math.min(Math.max(value.split('\n').length, minRows), maxRows)}
          className="w-full font-mono text-sm bg-slate-800/50 border border-slate-600 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ minHeight: `${minRows * 1.5}rem` }}
        />

        {errors.length > 0 && (
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <Tooltip
              content={`${errors.map(error => `Line ${error.line}: ${error.message}`).join('\n')}`}
            >
              <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                {errors.length} {errors.length === 1 ? 'Error' : 'Errors'}
              </div>
            </Tooltip>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={analyzeCode}
            isLoading={isAnalyzing}
          >
            Analyze Code
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(value)
            }}
          >
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const blob = new Blob([value], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'code.txt'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            Download
          </Button>
        </div>

        <div className="text-sm text-slate-400">
          {value.length} characters
        </div>
      </div>

      {showDiffView && originalCode && modifiedCode && (
        <DiffView
          originalCode={originalCode}
          modifiedCode={modifiedCode}
          onAccept={() => {
            onChange(modifiedCode)
            setOriginalCode('')
            setModifiedCode('')
          }}
          onReject={() => {
            setOriginalCode('')
            setModifiedCode('')
          }}
        />
      )}
    </div>
  )
} 