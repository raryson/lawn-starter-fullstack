import './ErrorState.css'

interface ErrorStateProps {
  error: Error | unknown
}

export function ErrorState({ error }: ErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : 'Failed to fetch results'

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-red-600">Error: {errorMessage}</p>
    </div>
  )
}

