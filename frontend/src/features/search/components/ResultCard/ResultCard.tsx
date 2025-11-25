import './ResultCard.css'
import { useNavigate } from '@tanstack/react-router'
import { type SwapiResult } from '@/lib/api'
import { Button } from '@/lib/components/Button'

interface ResultCardProps {
  result: SwapiResult
}

export function ResultCard({ result }: ResultCardProps) {
  const navigate = useNavigate()
  const name = result.name || result.title || 'Unknown'

  const handleSeeDetails = () => {
    // If result has a title, it's a movie, otherwise it's a person
    if (result.title) {
      navigate({ to: '/movies/$movieId', params: { movieId: result.uid } })
    } else {
      navigate({ to: '/people/$userId', params: { userId: result.uid } })
    }
  }

  return (
    <div className="flex items-center justify-between py-2 result-card-item">
      <span className="text-gray-900 font-bold">{name}</span>
      <Button onClick={handleSeeDetails} className="w-auto">
        SEE DETAILS
      </Button>
    </div>
  )
}

