import './SearchInput.css'

interface SearchInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function SearchInput({ form }: SearchInputProps) {
  const getPlaceholder = (resource: string) => {
    if (resource === 'films') {
      return 'e.g A New Hope, Return of the Jedi'
    }
    return 'e.g Chewbacca, Yoda, Boba Fett'
  }

  return (
    <form.Subscribe selector={(state: any) => [state.values.resource]}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {([resource]: any) => (
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
                placeholder={getPlaceholder(resource || 'people')}
                className="search-input"
              />
              {field.state.meta.errors && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>
      )}
    </form.Subscribe>
  )
}

