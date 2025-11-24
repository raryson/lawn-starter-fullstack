import { useParams, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetail, getPersonDetail } from '@/lib/api'
import { OpeningCrawlSection, MovieCharactersSection, BackButton } from '../components'

export function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movies/$movieId' })
  const navigate = useNavigate()

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetail(movieId),
  })

  // Extract character IDs from character URLs
  const characterUrls = movie?.result?.properties?.characters || []
  const characterIds = characterUrls
    .map((url: string) => {
      const match = url.match(/\/(\d+)\/?$/)
      return match ? match[1] : null
    })
    .filter((id): id is string => id !== null)

  // Fetch character details
  const { data: characters } = useQuery({
    queryKey: ['movie-characters', characterIds],
    queryFn: async () => {
      const characterPromises = characterIds.map((id) => getPersonDetail(id))
      const characterData = await Promise.all(characterPromises)
      return characterData.map((char, index) => ({
        uid: characterIds[index],
        name: char.result.properties.name,
      }))
    },
    enabled: characterIds.length > 0,
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
        <p className="text-red-600">
          Error: {error instanceof Error ? error.message : 'Failed to load movie details'}
        </p>
      </div>
    )
  }

  if (!movie) {
    return null
  }

  const openingCrawl = movie.result.properties.opening_crawl || ''

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {movie.result.properties.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <OpeningCrawlSection openingCrawl={openingCrawl} />
            <MovieCharactersSection
              characters={characters || []}
              onCharacterClick={(uid) => {
                navigate({ to: '/people/$userId', params: { userId: uid } })
              }}
            />
          </div>

          <BackButton onClick={() => navigate({ to: '/' })} />
        </div>
      </div>
    </div>
  )
}

