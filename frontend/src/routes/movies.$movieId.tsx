import { createFileRoute } from '@tanstack/react-router'
import { MovieDetailPage } from '@/features/search/pages/MovieDetailPage'

export const Route = createFileRoute('/movies/$movieId')({
  component: MovieDetailPage,
})
