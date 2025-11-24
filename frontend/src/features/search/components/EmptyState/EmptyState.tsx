import './EmptyState.css'

export function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400 text-center">
        There are zero matches. Use the form to search for People or Movies.
      </p>
    </div>
  )
}

