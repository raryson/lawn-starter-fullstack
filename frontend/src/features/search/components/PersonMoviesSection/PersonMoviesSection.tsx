import './PersonMoviesSection.css'
import { useNavigate } from '@tanstack/react-router'
import { type Film } from '@/lib/api'

interface PersonMoviesSectionProps {
  films: Film[] | undefined
  isLoading?: boolean
}

export function PersonMoviesSection({ films, isLoading = false }: PersonMoviesSectionProps) {
  const navigate = useNavigate()

  const handleMovieClick = (movieId: string) => {
    navigate({ to: '/movies/$movieId', params: { movieId } })
  }

  return (
    <div className="person-movies-section">
      <h2 className="person-movies-heading font-semibold text-gray-900 mb-4">Movies</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading movies...</p>
      ) : films && films.length > 0 ? (
        <div className="movies-list">
          {films.map((film, index) => (
            <span key={film.uid}>
              <button
                onClick={() => handleMovieClick(film.uid)}
                className="movie-link"
              >
                {film.name}
              </button>
              {index < films.length - 1 && <span className="movie-separator">, </span>}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No movies found</p>
      )}
    </div>
  )
}

