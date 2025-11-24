import './MovieDetailPage.css'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetail, getPersonDetail } from '@/lib/api'
import { OpeningCrawlSection, MovieCharactersSection } from '../../components'
import { Button } from '@/lib/components/Button'
import { Card } from '@/lib/components/Card'

export function MovieDetailPage() {
  const { movieId } = useParams({ from: '/movies/$movieId' })
  const navigate = useNavigate()

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetail(movieId),
  })

  const characterUrls = movie?.result?.properties?.characters || []
  const characterIds = characterUrls
    .map((url: string) => {
      const match = url.match(/\/(\d+)\/?$/)
      return match ? match[1] : null
    })
    .filter((id): id is string => id !== null)

  const { data: characters, isLoading: isLoadingCharacters } = useQuery({
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
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--background-gray)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <Card>
          <h1 className="movie-title font-bold text-gray-900">
            {movie.result.properties.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-0 mb-8">
            <OpeningCrawlSection openingCrawl={openingCrawl} />
            <MovieCharactersSection
              characters={characters}
              isLoading={isLoadingCharacters}
              onCharacterClick={(uid: string) => {
                navigate({ to: '/people/$userId', params: { userId: uid } })
              }}
            />
          </div>

          <Button onClick={() => navigate({ to: '/' })} className="w-auto">
            BACK TO SEARCH
          </Button>
        </Card>
      </div>
    </div>
  )
}

