import './ResultCard.css'
import { useNavigate } from '@tanstack/react-router'
import { type SwapiResult } from '@/lib/api'

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
      <button
        onClick={handleSeeDetails}
        className="px-4 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors cursor-pointer"
      >
        SEE DETAILS
      </button>
    </div>
  )
}

