import './ResourceRadioGroup.css'

interface ResourceRadioGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any
}

export function ResourceRadioGroup({ form }: ResourceRadioGroupProps) {
  return (
    <form.Field name="resource">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(field: any) => (
        <div className="space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={field.name}
              value="people"
              checked={field.state.value === 'people'}
              onChange={() => field.handleChange('people')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">People</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={field.name}
              value="films"
              checked={field.state.value === 'films'}
              onChange={() => field.handleChange('films')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-gray-700">Movies</span>
          </label>
        </div>
      )}
    </form.Field>
  )
}

