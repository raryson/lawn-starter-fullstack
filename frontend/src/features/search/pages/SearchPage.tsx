import { SearchFormPage } from './SearchFormPage'
import { ResultsPanelPage } from './ResultsPanelPage'
import { useSwapiSearch } from '../hooks/useSwapiSearch'

export function SearchPage() {
  const { data, isLoading, error, hasSearched, handleSearch } = useSwapiSearch()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SearchFormPage onSubmit={handleSearch} isLoading={isLoading} />
        <ResultsPanelPage
          isLoading={isLoading}
          error={error}
          data={data}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  )
}

