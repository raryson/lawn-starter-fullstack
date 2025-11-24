const API_BASE_URL = 'http://localhost:8000/api'

export type SwapiResource = 'people' | 'films' | 'planets' | 'species' | 'starships' | 'vehicles'

export interface SwapiSearchParams {
  resource: SwapiResource
  search?: string
  page?: number
}

export interface SwapiResult {
  uid: string
  name?: string
  title?: string
  url: string
}

export interface SwapiResponse {
  message?: string
  total_records?: number
  total_pages?: number
  previous?: string | null
  next?: string | null
  results?: SwapiResult[]
}

export async function searchSwapi(
  params: SwapiSearchParams
): Promise<SwapiResponse> {
  const queryParams = new URLSearchParams()
  queryParams.set('resource', params.resource)
  if (params.search) {
    queryParams.set('search', params.search)
  }
  if (params.page) {
    queryParams.set('page', params.page.toString())
  }

  const response = await fetch(`${API_BASE_URL}/swapi?${queryParams.toString()}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  const data = await response.json()
  
  if (data.result && Array.isArray(data.result)) {
    return {
      ...data,
      results: data.result.map((item: { uid: string; properties?: { name?: string; title?: string; url?: string }; url?: string }) => ({
        uid: item.uid,
        name: item.properties?.name,
        title: item.properties?.title,
        url: item.properties?.url || item.url,
      })),
    }
  }

  return data
}

export interface PersonDetail {
  message: string
  result: {
    properties: {
      name: string
      birth_year: string
      gender: string
      eye_color: string
      hair_color: string
      height: string
      mass: string
      films?: string[]
      [key: string]: string | string[] | undefined
    }
    description: string
    uid: string
    _id: string
  }
}

export async function getPersonDetail(uid: string): Promise<PersonDetail> {
  const response = await fetch(`${API_BASE_URL}/swapi/people/${uid}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

export interface Film {
  uid: string
  name: string
}

export interface MovieDetail {
  message: string
  result: {
    properties: {
      title: string
      opening_crawl: string
      characters?: string[]
      [key: string]: string | string[] | undefined
    }
    description: string
    uid: string
    _id: string
  }
}

export async function getMovieDetail(uid: string): Promise<MovieDetail> {
  const response = await fetch(`${API_BASE_URL}/swapi/films/${uid}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}

