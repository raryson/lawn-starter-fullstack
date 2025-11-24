import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MovieDetailPage } from './MovieDetailPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as api from '@/lib/api'

// Mock the API functions
vi.mock('@/lib/api', () => ({
  getMovieDetail: vi.fn(),
  getPersonDetail: vi.fn(),
}))

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ movieId: '1' }),
  useNavigate: () => vi.fn(),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('MovieDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state initially', () => {
    vi.mocked(api.getMovieDetail).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<MovieDetailPage />, { wrapper: createWrapper() })
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays movie details when loaded', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
          characters: ['http://example.com/people/1'],
        },
        description: 'A film',
        uid: '1',
        _id: '123',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument()
    })

    expect(screen.getByText('Opening Crawl')).toBeInTheDocument()
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('BACK TO SEARCH')).toBeInTheDocument()
  })

  it('displays error message when API call fails', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(api.getMovieDetail).mockRejectedValue(error)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument()
    })
  })

  it('renders movie title as heading', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'The Empire Strikes Back',
          opening_crawl: 'It is a dark time...',
          characters: [],
        },
        description: 'A film',
        uid: '2',
        _id: '456',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      const heading = screen.getByText('The Empire Strikes Back')
      expect(heading.tagName).toBe('H1')
    })
  })

  it('displays opening crawl text', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war.\n\nRebel spaceships...',
          characters: [],
        },
        description: 'A film',
        uid: '1',
        _id: '123',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText(/It is a period of civil war/)).toBeInTheDocument()
    })
  })

  it('fetches and displays characters when movie has characters', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
          characters: [
            'http://example.com/people/1',
            'http://example.com/people/2',
          ],
        },
        description: 'A film',
        uid: '1',
        _id: '123',
      },
    }

    const mockCharacter1 = {
      message: 'ok',
      result: {
        properties: {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          eye_color: 'blue',
          hair_color: 'blond',
          height: '172',
          mass: '77',
        },
        description: 'A person',
        uid: '1',
        _id: '123',
      },
    }

    const mockCharacter2 = {
      message: 'ok',
      result: {
        properties: {
          name: 'Leia Organa',
          birth_year: '19BBY',
          gender: 'female',
          eye_color: 'brown',
          hair_color: 'brown',
          height: '150',
          mass: '49',
        },
        description: 'A person',
        uid: '2',
        _id: '456',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)
    vi.mocked(api.getPersonDetail)
      .mockResolvedValueOnce(mockCharacter1)
      .mockResolvedValueOnce(mockCharacter2)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('Leia Organa')).toBeInTheDocument()
    })
  })

  it('shows loading message for characters while fetching', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
          characters: ['http://example.com/people/1'],
        },
        description: 'A film',
        uid: '1',
        _id: '123',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)
    vi.mocked(api.getPersonDetail).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument()
    })

    expect(screen.getByText('Loading characters...')).toBeInTheDocument()
  })

  it('handles empty opening crawl', async () => {
    const mockMovie = {
      message: 'ok',
      result: {
        properties: {
          title: 'A New Hope',
          opening_crawl: '',
          characters: [],
        },
        description: 'A film',
        uid: '1',
        _id: '123',
      },
    }

    vi.mocked(api.getMovieDetail).mockResolvedValue(mockMovie)

    render(<MovieDetailPage />, { wrapper: createWrapper() })

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument()
    })

    expect(screen.getByText('No opening crawl available')).toBeInTheDocument()
  })
})

