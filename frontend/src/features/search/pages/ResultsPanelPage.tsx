import './ResultsPanelPage.css'
import { type SwapiResponse } from '@/lib/api'
import { LoadingState, ErrorState, EmptyState } from '../components'
import { ResultsListPage } from './ResultsListPage'
import { Card } from '@/lib/components/Card'

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
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <h2 className="results-heading font-semibold text-gray-900 flex-shrink-0">Results</h2>

      <div className="flex-1 overflow-y-auto min-h-0">
        {isLoading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!hasSearched && !isLoading && <EmptyState />}
        {hasNoResults && <EmptyState />}
        {hasResults && data && <ResultsListPage data={data} />}
      </div>
    </Card>
  )
}

