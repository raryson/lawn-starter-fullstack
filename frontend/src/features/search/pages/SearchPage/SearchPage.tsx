import { SearchFormPage } from '../SearchFormPage/SearchFormPage'
import { ResultsPanelPage } from '../ResultsPanelPage/ResultsPanelPage'
import { useSwapiSearch } from '../../hooks/useSwapiSearch'

export function SearchPage() {
  const { data, isLoading, error, hasSearched, handleSearch } = useSwapiSearch()

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        <div className="lg:col-span-2">
          <SearchFormPage onSubmit={handleSearch} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-3">
          <ResultsPanelPage
            isLoading={isLoading}
            error={error}
            data={data}
            hasSearched={hasSearched}
          />
        </div>
      </div>
    </div>
  )
}

