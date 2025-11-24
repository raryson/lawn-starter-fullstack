import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from '@tanstack/react-form'
import { ResourceRadioGroup } from './ResourceRadioGroup'

function TestWrapper({ resource = 'people' }: { resource?: 'people' | 'films' }) {
  const form = useForm({
    defaultValues: {
      resource,
      search: '',
    },
    onSubmit: async () => {},
  })
  return <ResourceRadioGroup form={form} />
}

describe('ResourceRadioGroup', () => {
  it('renders both radio buttons', () => {
    render(<TestWrapper />)
    
    expect(screen.getByLabelText('People')).toBeInTheDocument()
    expect(screen.getByLabelText('Movies')).toBeInTheDocument()
  })

  it('has People radio checked by default when resource is people', () => {
    render(<TestWrapper resource="people" />)
    
    const peopleRadio = screen.getByLabelText('People') as HTMLInputElement
    const moviesRadio = screen.getByLabelText('Movies') as HTMLInputElement
    
    expect(peopleRadio.checked).toBe(true)
    expect(moviesRadio.checked).toBe(false)
  })

  it('has Movies radio checked when resource is films', () => {
    render(<TestWrapper resource="films" />)
    
    const peopleRadio = screen.getByLabelText('People') as HTMLInputElement
    const moviesRadio = screen.getByLabelText('Movies') as HTMLInputElement
    
    expect(peopleRadio.checked).toBe(false)
    expect(moviesRadio.checked).toBe(true)
  })
})

