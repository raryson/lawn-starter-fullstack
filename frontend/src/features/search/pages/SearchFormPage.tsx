import { useForm } from '@tanstack/react-form'
import { type SwapiResource } from '@/lib/api'
import { ResourceRadioGroup, SearchInput } from '../components'
import { Button } from '@/lib/components/Button'

interface SearchFormPageProps {
  onSubmit: (values: { resource: SwapiResource; search: string }) => void
  isLoading?: boolean
  defaultResource?: SwapiResource
}

export function SearchFormPage({ onSubmit, isLoading = false, defaultResource = 'people' }: SearchFormPageProps) {
  const form = useForm({
    defaultValues: {
      resource: defaultResource,
      search: '',
    },
    onSubmit: async ({ value }) => {
      if (value.search.trim()) {
        onSubmit({
          resource: value.resource,
          search: value.search.trim(),
        })
      }
    },
  })

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        What are you searching for?
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="space-y-6"
      >
        <ResourceRadioGroup form={form} />
        <SearchInput form={form} />
        <form.Subscribe selector={(state: any) => [state.values.search]}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {([searchValue]: any) => {
            const isSearchEmpty = !searchValue || !searchValue.trim()
            return (
              <Button type="submit" disabled={isLoading || isSearchEmpty}>
                {isLoading ? 'SEARCHING...' : 'SEARCH'}
              </Button>
            )
          }}
        </form.Subscribe>
      </form>
    </div>
  )
}

