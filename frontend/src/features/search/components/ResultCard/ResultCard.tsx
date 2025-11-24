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
    navigate({ to: '/people/$userId', params: { userId: result.uid } })
  }

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-gray-900">{name}</span>
      <Button onClick={handleSeeDetails} className="w-auto">
        SEE DETAILS
      </Button>
    </div>
  )
}

