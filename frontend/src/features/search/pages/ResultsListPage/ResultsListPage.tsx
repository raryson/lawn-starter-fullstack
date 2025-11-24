import { type SwapiResponse, type SwapiResult } from '@/lib/api'
import { ResultCard } from '../../components'

interface ResultsListPageProps {
  data: SwapiResponse
}

export function ResultsListPage({ data }: ResultsListPageProps) {
  if (!data.results || data.results.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {data.total_records !== undefined && (
        <p className="text-sm text-gray-600 mb-4">
          Found {data.total_records} result{data.total_records !== 1 ? 's' : ''}
        </p>
      )}
      <div>
        {data.results.map((result: SwapiResult, index: number) => (
          <ResultCard 
            key={result.uid || index} 
            result={result}
          />
        ))}
      </div>
    </div>
  )
}

