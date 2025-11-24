import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import * as api from '@/lib/api'

// Mock the API functions
vi.mock('@/lib/api', () => ({
  getPersonDetail: vi.fn(),
  getFilmDetail: vi.fn(),
}))

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })
}

const createTestRouter = (userId: string = '1') => {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    context: {},
  })

  // Navigate to the initial route (don't await - router will handle it)
  router.navigate({ to: '/people/$userId', params: { userId } }).catch(() => {
    // Ignore navigation errors in tests
  })

  return router
}

describe('PersonDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state initially', async () => {
    vi.mocked(api.getPersonDetail).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    const router = createTestRouter('1')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  it('displays person details when loaded', async () => {
    const mockPerson = {
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
          films: ['http://example.com/films/1'],
        },
        description: 'A person',
        uid: '1',
        _id: '123',
      },
    }

    const mockFilm = {
      result: {
        properties: {
          title: 'A New Hope',
        },
      },
    }

    vi.mocked(api.getPersonDetail).mockResolvedValue(mockPerson)
    vi.mocked(api.getFilmDetail).mockResolvedValue(mockFilm)

    const router = createTestRouter('1')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    })

    expect(screen.getByText('Birth Year:')).toBeInTheDocument()
    expect(screen.getByText('19BBY')).toBeInTheDocument()
    expect(screen.getByText('Gender:')).toBeInTheDocument()
    expect(screen.getByText('male')).toBeInTheDocument()
    expect(screen.getByText('BACK TO SEARCH')).toBeInTheDocument()
  })

  it('displays error message when API call fails', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(api.getPersonDetail).mockRejectedValue(error)

    const router = createTestRouter('1')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
      expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument()
    })
  })

  it('renders person name as heading', async () => {
    const mockPerson = {
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
          films: [],
        },
        description: 'A person',
        uid: '2',
        _id: '456',
      },
    }

    vi.mocked(api.getPersonDetail).mockResolvedValue(mockPerson)

    const router = createTestRouter('2')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      const heading = screen.getByText('Leia Organa')
      expect(heading.tagName).toBe('H1')
    })
  })

  it('renders Details and Movies sections', async () => {
    const mockPerson = {
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
          films: [],
        },
        description: 'A person',
        uid: '1',
        _id: '123',
      },
    }

    vi.mocked(api.getPersonDetail).mockResolvedValue(mockPerson)

    const router = createTestRouter('1')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument()
      expect(screen.getByText('Movies')).toBeInTheDocument()
    })
  })

  it('fetches and displays films when person has films', async () => {
    const mockPerson = {
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
          films: ['http://example.com/films/1', 'http://example.com/films/2'],
        },
        description: 'A person',
        uid: '1',
        _id: '123',
      },
    }

    const mockFilm1 = {
      result: {
        properties: {
          title: 'A New Hope',
        },
      },
    }

    const mockFilm2 = {
      result: {
        properties: {
          title: 'The Empire Strikes Back',
        },
      },
    }

    vi.mocked(api.getPersonDetail).mockResolvedValue(mockPerson)
    vi.mocked(api.getFilmDetail)
      .mockResolvedValueOnce(mockFilm1)
      .mockResolvedValueOnce(mockFilm2)

    const router = createTestRouter('1')
    const queryClient = createQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()
    })
  })
})

