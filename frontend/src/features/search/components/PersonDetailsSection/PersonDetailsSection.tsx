import './PersonDetailsSection.css'

interface PersonDetailsSectionProps {
  properties: {
    birth_year?: string
    gender?: string
    eye_color?: string
    hair_color?: string
    height?: string
    mass?: string
    [key: string]: any
  }
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
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
      <div className="space-y-2">
        {details.map(({ label, value }) => (
          <div key={label} className="flex">
            <span className="font-medium text-gray-700 w-32">{label}:</span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

