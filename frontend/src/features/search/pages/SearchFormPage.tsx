import { useForm } from '@tanstack/react-form'
import { type SwapiResource } from '@/lib/api'
import { ResourceRadioGroup, SearchInput, SearchButton } from '../components'

interface SearchFormPageProps {
  onSubmit: (values: { resource: SwapiResource; search: string }) => void
  defaultResource?: SwapiResource
}

export function SearchFormPage({ onSubmit, defaultResource = 'people' }: SearchFormPageProps) {
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
        <SearchButton form={form} />
      </form>
    </div>
  )
}

