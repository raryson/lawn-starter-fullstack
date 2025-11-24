interface SearchButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function SearchButton({ form }: SearchButtonProps) {
  return (
    <form.Subscribe selector={(state: any) => [state.isSubmitting]}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {([isSubmitting]: any) => (
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'SEARCHING...' : 'SEARCH'}
        </button>
      )}
    </form.Subscribe>
  )
}

