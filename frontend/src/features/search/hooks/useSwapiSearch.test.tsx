import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSwapiSearch } from './useSwapiSearch'
import * as api from '@/lib/api'
import type { SwapiResponse } from '@/lib/api'

// Mock the API function
vi.mock('@/lib/api', () => ({
  searchSwapi: vi.fn(),
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        networkMode: 'always',
      },
      mutations: {
        networkMode: 'always',
      },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useSwapiSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hasSearched).toBe(false)
    expect(typeof result.current.handleSearch).toBe('function')
  })

  it('does not trigger search when handleSearch is called with empty search string', async () => {
    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'people', search: '' })

    await waitFor(() => {
      expect(result.current.hasSearched).toBe(true)
    })

    // Query should be disabled when search is empty
    expect(api.searchSwapi).not.toHaveBeenCalled()
    expect(result.current.isLoading).toBe(false)
  })

  it('triggers search when handleSearch is called with valid params', async () => {
    const mockResponse = {
      message: 'ok',
      total_records: 1,
      results: [
        {
          uid: '1',
          name: 'Luke Skywalker',
          url: 'http://example.com/people/1',
        },
      ],
    }

    vi.mocked(api.searchSwapi).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'people', search: 'Luke' })

    await waitFor(() => {
      expect(result.current.hasSearched).toBe(true)
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(api.searchSwapi).toHaveBeenCalledWith({
      resource: 'people',
      search: 'Luke',
    })
    expect(result.current.data).toEqual(mockResponse)
    expect(result.current.error).toBeNull()
  })

  it('shows loading state during search', async () => {
    let resolvePromise: (value: SwapiResponse) => void
    const promise = new Promise<SwapiResponse>((resolve) => {
      resolvePromise = resolve
    })

    vi.mocked(api.searchSwapi).mockImplementation(() => promise)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'people', search: 'Luke' })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true)
    })

    resolvePromise!({
      message: 'ok',
      results: [],
    })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('handles search errors correctly', async () => {
    const error = new Error('API error: Not Found')
    vi.mocked(api.searchSwapi).mockRejectedValue(error)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'people', search: 'Luke' })

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('API error: Not Found')
  })

  it('updates search params when handleSearch is called multiple times', async () => {
    const mockResponse1 = {
      message: 'ok',
      results: [{ uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' }],
    }

    const mockResponse2 = {
      message: 'ok',
      results: [{ uid: '2', name: 'Leia Organa', url: 'http://example.com/people/2' }],
    }

    vi.mocked(api.searchSwapi)
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'people', search: 'Luke' })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse1)
    })

    result.current.handleSearch({ resource: 'people', search: 'Leia' })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse2)
    })

    expect(api.searchSwapi).toHaveBeenCalledTimes(2)
    expect(api.searchSwapi).toHaveBeenNthCalledWith(1, {
      resource: 'people',
      search: 'Luke',
    })
    expect(api.searchSwapi).toHaveBeenNthCalledWith(2, {
      resource: 'people',
      search: 'Leia',
    })
  })

  it('handles different resource types', async () => {
    const mockResponse = {
      message: 'ok',
      results: [{ uid: '1', title: 'A New Hope', url: 'http://example.com/films/1' }],
    }

    vi.mocked(api.searchSwapi).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    result.current.handleSearch({ resource: 'films', search: 'Hope' })

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse)
    })

    expect(api.searchSwapi).toHaveBeenCalledWith({
      resource: 'films',
      search: 'Hope',
    })
  })

  it('maintains hasSearched state after search', async () => {
    const mockResponse = {
      message: 'ok',
      results: [],
    }

    vi.mocked(api.searchSwapi).mockResolvedValue(mockResponse)

    const { result } = renderHook(() => useSwapiSearch(), {
      wrapper: createWrapper(),
    })

    expect(result.current.hasSearched).toBe(false)

    result.current.handleSearch({ resource: 'people', search: 'test' })

    await waitFor(() => {
      expect(result.current.hasSearched).toBe(true)
    })

    // hasSearched should remain true even after search completes
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.hasSearched).toBe(true)
  })
})

