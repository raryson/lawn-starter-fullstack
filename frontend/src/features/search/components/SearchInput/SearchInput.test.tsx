import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from '@tanstack/react-form'
import { SearchInput } from './SearchInput'

// Helper to create a form instance for testing
function TestWrapper({ resource = 'people' }: { resource?: 'people' | 'films' }) {
  const form = useForm({
    defaultValues: {
      resource,
      search: '',
    },
    onSubmit: async () => {},
  })
  return <SearchInput form={form} />
}

describe('SearchInput', () => {
  it('renders input field', () => {
    render(<TestWrapper />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows correct placeholder for people resource', () => {
    render(<TestWrapper resource="people" />)
    expect(screen.getByPlaceholderText('e.g Chewbacca, Yoda, Boba Fett')).toBeInTheDocument()
  })

  it('shows correct placeholder for films resource', () => {
    render(<TestWrapper resource="films" />)
    expect(screen.getByPlaceholderText('e.g A New Hope, Return of the Jedi')).toBeInTheDocument()
  })
})

