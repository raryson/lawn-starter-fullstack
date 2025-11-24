import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PersonDetailsSection } from './PersonDetailsSection'

describe('PersonDetailsSection', () => {
  const mockProperties = {
    birth_year: '19BBY',
    gender: 'male',
    eye_color: 'blue',
    hair_color: 'blond',
    height: '172',
    mass: '77',
  }

  it('renders all person details', () => {
    render(<PersonDetailsSection properties={mockProperties} />)
    
    expect(screen.getByText('Birth Year:')).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
    expect(screen.getByText('Eye Color:')).toBeInTheDocument()
    expect(screen.getByText('blue')).toBeInTheDocument()
    expect(screen.getByText('Hair Color:')).toBeInTheDocument()
    expect(screen.getByText('blond')).toBeInTheDocument()
    expect(screen.getByText('Height:')).toBeInTheDocument()
    expect(screen.getByText('172')).toBeInTheDocument()
    expect(screen.getByText('Mass:')).toBeInTheDocument()
    expect(screen.getByText('77')).toBeInTheDocument()
  })

  it('renders Details heading', () => {
    render(<PersonDetailsSection properties={mockProperties} />)
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('filters out empty values', () => {
    const partialProperties = {
      birth_year: '19BBY',
      gender: 'male',
    }
    render(<PersonDetailsSection properties={partialProperties} />)
    
    expect(screen.getByText('Birth Year:')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.queryByText('Eye Color:')).not.toBeInTheDocument()
  })
})

