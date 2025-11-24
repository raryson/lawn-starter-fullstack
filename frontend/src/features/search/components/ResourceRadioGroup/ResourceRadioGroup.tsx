import './ResourceRadioGroup.css'
import { type SearchFormApi } from '../../types'
import { type SwapiResource } from '@/lib/api'

interface ResourceRadioGroupProps {
  form: SearchFormApi
}

export function ResourceRadioGroup({ form }: ResourceRadioGroupProps) {
  return (
    <form.Field name="resource">
      {(field: { state: { value: SwapiResource }; handleChange: (value: SwapiResource) => void; name: string }) => (
        <div className="radio-group">
          <div className="radio-container">
            <label className="radio-label">
              <input
                type="radio"
                name={field.name}
                value="people"
                checked={field.state.value === 'people'}
                onChange={() => field.handleChange('people')}
                className="radio-input"
              />
              People
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name={field.name}
                value="films"
                checked={field.state.value === 'films'}
                onChange={() => field.handleChange('films')}
                className="radio-input"
              />
              Movies
            </label>
          </div>
        </div>
      )}
    </form.Field>
  )
}

