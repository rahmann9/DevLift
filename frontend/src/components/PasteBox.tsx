import React, { useState, useRef } from 'react'

interface PasteBoxProps {
  onSubmit: (text: string) => void
  placeholder?: string
  buttonText?: string
  isLoading?: boolean
  minRows?: number
  language?: string
}

const PasteBox: React.FC<PasteBoxProps> = ({
  onSubmit,
  placeholder = 'Paste your code or stack trace here...',
  buttonText = 'Analyze',
  isLoading = false,
  minRows = 10,
  language,
}) => {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text')
    setText(pastedText)
  }

  const handleClear = () => {
    setText('')
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text)
    }
  }

  const handleDownload = () => {
    if (text) {
      const blob = new Blob([text], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'code.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Text Input
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 disabled:opacity-50"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!text}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 disabled:opacity-50"
          >
            Download
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            Clear
          </button>
        </div>
      </div>
      
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPaste={handlePaste}
        placeholder={placeholder}
        rows={minRows}
        className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 font-mono text-sm text-slate-900 dark:text-slate-100 mb-4"
      />
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !text.trim()}
          className="btn btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </form>
  )
}

export default PasteBox 