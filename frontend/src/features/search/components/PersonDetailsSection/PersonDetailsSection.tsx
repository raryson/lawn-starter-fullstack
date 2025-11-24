import './PersonDetailsSection.css'
import { type PersonProperties } from '../../types'

interface PersonDetailsSectionProps {
  properties: PersonProperties
}

export function PersonDetailsSection({ properties }: PersonDetailsSectionProps) {
  const details = [
    { label: 'Birth Year', value: properties.birth_year },
    { label: 'Gender', value: properties.gender },
    { label: 'Eye Color', value: properties.eye_color },
    { label: 'Hair Color', value: properties.hair_color },
    { label: 'Height', value: properties.height },
    { label: 'Mass', value: properties.mass },
  ].filter(item => item.value)

  return (
    <div className="person-details-section">
      <h2 className="person-details-heading font-semibold text-gray-900 mb-4">Details</h2>
      <div className="space-y-2">
        {details.map(({ label, value }) => (
          <div key={label} className="detail-row">
            <span className="detail-label font-medium text-gray-700">{label}:</span>
            <span className="detail-value text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

