import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { searchSwapi, getPersonDetail, getMovieDetail } from './api'

describe('API functions', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    global.fetch = originalFetch
    vi.restoreAllMocks()
  })

  describe('searchSwapi', () => {
    it('transforms backend response correctly', async () => {
      const mockResponse = {
        result: [
          {
            uid: '1',
            properties: { name: 'Luke Skywalker', url: 'http://example.com/people/1' },
          },
          {
            uid: '2',
            properties: { title: 'A New Hope', url: 'http://example.com/films/1' },
          },
        ],
        message: 'ok',
      }

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await searchSwapi({ resource: 'people', search: 'luke' })

      expect(result.results).toHaveLength(2)
      expect(result.results?.[0]).toEqual({
        uid: '1',
        name: 'Luke Skywalker',
        title: undefined,
        url: 'http://example.com/people/1',
      })
      expect(result.results?.[1]).toEqual({
        uid: '2',
        name: undefined,
        title: 'A New Hope',
        url: 'http://example.com/films/1',
      })
    })

    it('builds correct query parameters', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: [] }),
      } as Response)

      await searchSwapi({ resource: 'people', search: 'luke', page: 1 })

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('resource=people')
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=luke')
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('page=1')
      )
    })

    it('throws error when response is not ok', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response)

      await expect(
        searchSwapi({ resource: 'people', search: 'luke' })
      ).rejects.toThrow('API error: Not Found')
    })
  })

  describe('getPersonDetail', () => {
    it('returns person detail correctly', async () => {
      const mockResponse = {
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
      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await getPersonDetail('1')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/swapi/people/1'
      )
    })

    it('throws error when response is not ok', async () => {
      (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      } as Response)

      await expect(getPersonDetail('1')).rejects.toThrow('API error: Not Found')
    })
  })

  describe('getMovieDetail', () => {
    it('returns movie detail correctly', async () => {
      const mockResponse = {
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

      ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response)

      const result = await getMovieDetail('1')

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:8000/api/swapi/films/1'
      )
    })
  })

})

