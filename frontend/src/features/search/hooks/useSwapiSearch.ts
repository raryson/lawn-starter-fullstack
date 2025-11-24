import { useQuery } from '@tanstack/react-query'
import { searchSwapi, type SwapiResource } from '@/lib/api'
import { useState } from 'react'

export function useSwapiSearch() {
  const [searchParams, setSearchParams] = useState<{
    resource: SwapiResource
    search: string
  } | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['swapi', searchParams?.resource, searchParams?.search],
    queryFn: () => {
      if (!searchParams) throw new Error('No search params')
      return searchSwapi({
        resource: searchParams.resource,
        search: searchParams.search || undefined,
      })
    },
    enabled: !!searchParams && !!searchParams.search,
  })

  const handleSearch = (params: { resource: SwapiResource; search: string }) => {
    setSearchParams(params)
  }

  return {
    data,
    isLoading,
    error: error as Error | null,
    hasSearched: searchParams !== null,
    handleSearch,
  }
}

