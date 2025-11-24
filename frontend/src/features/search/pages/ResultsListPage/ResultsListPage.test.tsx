import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResultsListPage } from './ResultsListPage'
import { type SwapiResponse } from '@/lib/api'

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('ResultsListPage', () => {
  it('renders nothing when results array is empty', () => {
    const data: SwapiResponse = {
      results: [],
      message: 'ok',
    }
    const { container } = render(<ResultsListPage data={data} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing when results is undefined', () => {
    const data: SwapiResponse = {
      message: 'ok',
    }
    const { container } = render(<ResultsListPage data={data} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders result cards for each result', () => {
    const data: SwapiResponse = {
      results: [
        { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
        { uid: '2', name: 'Leia Organa', url: 'http://example.com/people/2' },
      ],
      message: 'ok',
    }
    render(<ResultsListPage data={data} />)
    
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
  })

  it('displays total records count when available', () => {
    const data: SwapiResponse = {
      results: [
        { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
      ],
      total_records: 1,
      message: 'ok',
    }
    render(<ResultsListPage data={data} />)
    
    expect(screen.getByText('Found 1 result')).toBeInTheDocument()
  })

  it('displays plural form for multiple records', () => {
    const data: SwapiResponse = {
      results: [
        { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
        { uid: '2', name: 'Leia Organa', url: 'http://example.com/people/2' },
      ],
      total_records: 2,
      message: 'ok',
    }
    render(<ResultsListPage data={data} />)
    
    expect(screen.getByText('Found 2 results')).toBeInTheDocument()
  })

  it('does not display total records when not available', () => {
    const data: SwapiResponse = {
      results: [
        { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
      ],
      message: 'ok',
    }
    render(<ResultsListPage data={data} />)
    
    expect(screen.queryByText(/Found \d+ result/)).not.toBeInTheDocument()
  })

  it('renders movies with title field', () => {
    const data: SwapiResponse = {
      results: [
        { uid: '1', title: 'A New Hope', url: 'http://example.com/films/1' },
        { uid: '2', title: 'The Empire Strikes Back', url: 'http://example.com/films/2' },
      ],
      message: 'ok',
    }
    render(<ResultsListPage data={data} />)
    
    expect(screen.getByText('A New Hope')).toBeInTheDocument()
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()
  })
})

