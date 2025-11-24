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
                className="search-input w-full pt-[5.5px] pr-[50.5px] pb-[5.5px] pl-[5px] rounded-[2px] shadow-[inset_0_0.5px_1.5px_0_rgba(158,158,158,0.75)] border border-pinkish-grey border-solid bg-[#fff] text-gray-900 outline-none border-pinkish-grey focus:ring-2 focus:ring-green-500 focus:border-green-500"
                style={{
                  borderRadius: '2px',
                }}
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

