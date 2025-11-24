interface SearchInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function SearchInput({ form }: SearchInputProps) {
  return (
    <form.Field
      name="search"
      validators={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: ({ value }: any) => {
          if (!value || !value.trim()) {
            return undefined // Allow empty for now
          }
          return undefined
        },
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(field: any) => (
        <div>
          <input
            type="text"
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Enter search term..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {field.state.meta.errors && (
            <p className="mt-1 text-sm text-red-600">
              {field.state.meta.errors[0]}
            </p>
          )}
        </div>
      )}
    </form.Field>
  )
}

