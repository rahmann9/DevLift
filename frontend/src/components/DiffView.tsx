import React from 'react'
import { motion } from 'framer-motion'
import { Button } from './Button'

interface DiffViewProps {
  originalCode: string
  modifiedCode: string
  onAccept?: () => void
  onReject?: () => void
}

export const DiffView: React.FC<DiffViewProps> = ({
  originalCode,
  modifiedCode,
  onAccept,
  onReject
}) => {
  const computeDiff = (original: string, modified: string) => {
    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')
    const diff: { type: 'added' | 'removed' | 'unchanged'; line: string }[] = []

    let i = 0
    let j = 0

    while (i < originalLines.length || j < modifiedLines.length) {
      if (i >= originalLines.length) {
        diff.push({ type: 'added', line: modifiedLines[j] })
        j++
      } else if (j >= modifiedLines.length) {
        diff.push({ type: 'removed', line: originalLines[i] })
        i++
      } else if (originalLines[i] === modifiedLines[j]) {
        diff.push({ type: 'unchanged', line: originalLines[i] })
        i++
        j++
      } else {
        // Check if this is a modification or just different lines
        if (i + 1 < originalLines.length && originalLines[i + 1] === modifiedLines[j]) {
          diff.push({ type: 'removed', line: originalLines[i] })
          i++
        } else if (j + 1 < modifiedLines.length && originalLines[i] === modifiedLines[j + 1]) {
          diff.push({ type: 'added', line: modifiedLines[j] })
          j++
        } else {
          diff.push({ type: 'removed', line: originalLines[i] })
          diff.push({ type: 'added', line: modifiedLines[j] })
          i++
          j++
        }
      }
    }

    return diff
  }

  const diff = computeDiff(originalCode, modifiedCode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg overflow-hidden border border-slate-700 bg-slate-800"
    >
      <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Code Changes</h3>
        <div className="flex space-x-2">
          {onAccept && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAccept}
              leftIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              }
            >
              Accept Changes
            </Button>
          )}
          {onReject && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReject}
              leftIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
            >
              Reject
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 font-mono text-sm overflow-x-auto">
        {diff.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              item.type === 'added'
                ? 'bg-emerald-500/10 text-emerald-400'
                : item.type === 'removed'
                ? 'bg-red-500/10 text-red-400'
                : 'text-slate-400'
            }`}
          >
            <span className="w-8 text-slate-500 select-none">
              {item.type === 'added' ? '+' : item.type === 'removed' ? '-' : ' '}
            </span>
            <span className="flex-1">{item.line}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
} 