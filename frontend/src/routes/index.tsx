import { createFileRoute } from '@tanstack/react-router'
import { SearchPage } from '@/features/search/pages/SearchPage'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return <SearchPage />
}
