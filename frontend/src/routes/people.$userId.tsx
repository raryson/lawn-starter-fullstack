import { createFileRoute } from '@tanstack/react-router'
import { PersonDetailPage } from '@/features/search/pages/PersonDetailPage/PersonDetailPage'

export const Route = createFileRoute('/people/$userId')({
  component: PersonDetailPage,
})
