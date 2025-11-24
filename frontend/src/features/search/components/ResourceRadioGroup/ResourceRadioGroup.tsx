import './ResourceRadioGroup.css'

interface ResourceRadioGroupProps {
  form: any
}

export function ResourceRadioGroup({ form }: ResourceRadioGroupProps) {
  return (
    <form.Field name="resource">
      {(field: any) => (
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

