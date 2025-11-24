import { useNavigate } from '@tanstack/react-router'
import { type Film } from '@/lib/api'

interface PersonMoviesSectionProps {
  films: Film[]
}

export function PersonMoviesSection({ films }: PersonMoviesSectionProps) {
  const navigate = useNavigate()

  const handleMovieClick = (movieId: string) => {
    navigate({ to: '/movies/$movieId', params: { movieId } })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Movies</h2>
      {films.length > 0 ? (
        <div className="space-y-2">
          {films.map((film) => (
            <button
              key={film.uid}
              onClick={() => handleMovieClick(film.uid)}
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer block text-left"
            >
              {film.name}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies found</p>
      )}
    </div>
  )
}

