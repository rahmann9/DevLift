import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  readOnly?: boolean
  className?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'typescript',
  placeholder = 'Enter your code here...',
  readOnly = false,
  className = ''
}) => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([])

  React.useEffect(() => {
    setLineNumbers(Array.from({ length: value.split('\n').length }, (_, i) => i + 1))
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800 ${className}`}
    >
      <div className="flex">
        {/* Line numbers */}
        <div className="w-12 bg-slate-900 text-slate-500 text-right pr-4 py-2 font-mono text-sm select-none">
          {lineNumbers.map((num) => (
            <div key={num} className="h-6 leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code editor */}
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            placeholder={placeholder}
            className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white font-mono text-sm p-4 resize-none focus:outline-none"
            spellCheck={false}
          />
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              background: 'transparent',
              padding: '1rem',
              margin: 0,
              fontSize: '0.875rem',
              lineHeight: '1.5rem'
            }}
            showLineNumbers={false}
          >
            {value}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  )
} 