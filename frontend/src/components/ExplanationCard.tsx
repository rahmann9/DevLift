import React from 'react'

interface ExplanationCardProps {
  explanation: string
  possibleFixes: string[]
  references?: string[]
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({
  explanation,
  possibleFixes,
  references = []
}) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Explanation</h3>
      
      <div className="prose dark:prose-invert max-w-none mb-6">
        <p>{explanation}</p>
      </div>
      
      <div className="mb-6">
        <h4 className="text-md font-medium text-slate-900 dark:text-white mb-2">Possible Fixes</h4>
        <ul className="list-disc pl-5 space-y-2">
          {possibleFixes.map((fix, index) => (
            <li key={index} className="text-slate-700 dark:text-slate-300">
              {fix}
            </li>
          ))}
        </ul>
      </div>
      
      {references.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-slate-900 dark:text-white mb-2">References</h4>
          <ul className="list-disc pl-5 space-y-1">
            {references.map((reference, index) => (
              <li key={index}>
                <a 
                  href={reference} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  {reference}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExplanationCard 