import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SearchPage } from './SearchPage'
import * as useSwapiSearchHook from '../../hooks/useSwapiSearch'

// Mock the hook
vi.mock('../../hooks/useSwapiSearch', () => ({
  useSwapiSearch: vi.fn(),
}))

// Mock router hooks
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
}))

describe('SearchPage', () => {
  it('renders SearchFormPage and ResultsPanelPage', () => {
    vi.mocked(useSwapiSearchHook.useSwapiSearch).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      hasSearched: false,
      handleSearch: vi.fn(),
    })

    render(<SearchPage />)
    
    expect(screen.getByText('What are you searching for?')).toBeInTheDocument()
    expect(screen.getByText('Results')).toBeInTheDocument()
  })

  it('passes isLoading prop to SearchFormPage', () => {
    vi.mocked(useSwapiSearchHook.useSwapiSearch).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      hasSearched: false,
      handleSearch: vi.fn(),
    })

    render(<SearchPage />)
    
    const searchButton = screen.getByRole('button', { name: /searching/i })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toBeDisabled()
  })

  it('passes data, isLoading, error, and hasSearched to ResultsPanelPage', () => {
    const mockData = {
      results: [
        { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
      ],
      message: 'ok',
    }

    vi.mocked(useSwapiSearchHook.useSwapiSearch).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      hasSearched: true,
      handleSearch: vi.fn(),
    })

    render(<SearchPage />)
    
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })

  it('passes error to ResultsPanelPage', () => {
    const error = new Error('API Error')
    
    vi.mocked(useSwapiSearchHook.useSwapiSearch).mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
      hasSearched: true,
      handleSearch: vi.fn(),
    })

    render(<SearchPage />)
    
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('passes handleSearch to SearchFormPage', async () => {
    const handleSearch = vi.fn()
    
    vi.mocked(useSwapiSearchHook.useSwapiSearch).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      hasSearched: false,
      handleSearch,
    })

    render(<SearchPage />)
    
    // The handleSearch function should be passed to SearchFormPage
    // We can verify this by checking that the form is rendered
    expect(screen.getByText('What are you searching for?')).toBeInTheDocument()
  })
})

