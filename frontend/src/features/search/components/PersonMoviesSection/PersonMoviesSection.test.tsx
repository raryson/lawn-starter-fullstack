import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PersonMoviesSection } from './PersonMoviesSection'

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('PersonMoviesSection', () => {
  const mockFilms = [
    { uid: '1', name: 'A New Hope' },
    { uid: '2', name: 'The Empire Strikes Back' },
  ]

  it('renders loading state when isLoading is true', () => {
    render(<PersonMoviesSection films={[]} isLoading={true} />)
    expect(screen.getByText('Loading movies...')).toBeInTheDocument()
  })

  it('renders movies list when films are provided', () => {
    render(<PersonMoviesSection films={mockFilms} isLoading={false} />)
    expect(screen.getByText('A New Hope')).toBeInTheDocument()
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()
  })

  it('renders movies separated by commas', () => {
    render(<PersonMoviesSection films={mockFilms} isLoading={false} />)
    const container = screen.getByText('A New Hope').closest('.movies-list')
    expect(container).toBeInTheDocument()
  })

  it('renders "No movies found" when films array is empty', () => {
    render(<PersonMoviesSection films={[]} isLoading={false} />)
    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })

  it('renders Movies heading', () => {
    render(<PersonMoviesSection films={mockFilms} isLoading={false} />)
    expect(screen.getByText('Movies')).toBeInTheDocument()
  })
})

