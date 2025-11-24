import { type SwapiResponse } from '@/lib/api'
import { LoadingState, ErrorState, EmptyState } from '../components'
import { ResultsListPage } from './ResultsListPage'

interface ResultsPanelPageProps {
  isLoading: boolean
  error: Error | null
  data: SwapiResponse | undefined
  hasSearched: boolean
}

export function ResultsPanelPage({
  isLoading,
  error,
  data,
  hasSearched,
}: ResultsPanelPageProps) {
  const hasResults = data && data.results && data.results.length > 0
  const hasNoResults =
    hasSearched &&
    !isLoading &&
    !error &&
    (!data || !data.results || data.results.length === 0)

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Results</h2>

      <div className="min-h-[200px]">
        {isLoading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!hasSearched && !isLoading && <EmptyState />}
        {hasNoResults && <EmptyState />}
        {hasResults && data && <ResultsListPage data={data} />}
      </div>
    </div>
  )
}

