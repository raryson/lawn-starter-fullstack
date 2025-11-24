import { useParams, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getPersonDetail, getFilmDetail } from '@/lib/api'
import { PersonDetailsSection, PersonMoviesSection } from '../components'
import { Button } from '@/lib/components/Button'

export function PersonDetailPage() {
  const { userId } = useParams({ from: '/people/$userId' })
  const navigate = useNavigate()

  const { data: person, isLoading, error } = useQuery({
    queryKey: ['person', userId],
    queryFn: () => getPersonDetail(userId),
  })

  // Fetch films if person has film URLs
  const filmUrls = person?.result?.properties?.films || []
  const filmIds = filmUrls
    .map((url: string) => {
      const match = url.match(/\/(\d+)\/?$/)
      return match ? match[1] : null
    })
    .filter((id): id is string => id !== null)

  const { data: films } = useQuery({
    queryKey: ['films', filmIds],
    queryFn: async () => {
      const filmPromises = filmIds.map((id) => getFilmDetail(id))
      const filmData = await Promise.all(filmPromises)
      return filmData.map((film, index) => ({
        uid: filmIds[index],
        name: film.result.properties.title,
        url: `https://swapi.tech/api/films/${filmIds[index]}`,
      }))
    },
    enabled: filmIds.length > 0,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Error: {error instanceof Error ? error.message : 'Failed to load person details'}</p>
      </div>
    )
  }

  if (!person) {
    return null
  }

  const properties = person.result.properties

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {properties.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <PersonDetailsSection properties={properties} />
            <PersonMoviesSection films={films || []} />
          </div>

          <Button onClick={() => navigate({ to: '/' })} className="w-auto">
            BACK TO SEARCH
          </Button>
        </div>
      </div>
    </div>
  )
}

