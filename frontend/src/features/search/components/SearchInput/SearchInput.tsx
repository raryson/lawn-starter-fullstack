import './SearchInput.css'
import { type SearchFormApi, type SearchFormValues } from '../../types'
import { type SwapiResource } from '@/lib/api'

interface SearchInputProps {
  form: SearchFormApi
}

export function SearchInput({ form }: SearchInputProps) {
  const getPlaceholder = (resource: string) => {
    if (resource === 'films') {
      return 'e.g A New Hope, Return of the Jedi'
    }
    return 'e.g Chewbacca, Yoda, Boba Fett'
  }

  return (
    <form.Subscribe selector={(state: { values: SearchFormValues }) => [state.values.resource]}>
      {([resource]: [SwapiResource]) => {
        return (
          <form.Field
            name="search"
            validators={{
              onChange: ({ value }: { value: string }) => {
                if (!value || !value.trim()) {
                  return undefined
                }
                return undefined
              },
            }}
          >
            {(field: { state: { value: string; meta?: { errors?: string[] } }; handleChange: (value: string) => void; handleBlur: () => void; name: string }) => (
            <div>
              <input
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={getPlaceholder(resource || 'people')}
                className="search-input"
              />
              {field.state.meta?.errors && (
                <p className="mt-1 text-sm text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
            )}
          </form.Field>
        )
      }}
    </form.Subscribe>
  )
}

