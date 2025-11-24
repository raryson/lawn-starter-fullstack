import { type SwapiResource } from '@/lib/api'

export interface SearchFormValues {
  resource: SwapiResource
  search: string
}

// Type for the form - using a type that's compatible with TanStack Form's ReactFormExtendedApi
// We use a generic type that accepts any form data structure matching SearchFormValues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SearchFormApi = any

export interface PersonProperties {
  birth_year?: string
  gender?: string
  eye_color?: string
  hair_color?: string
  height?: string
  mass?: string
  films?: string[]
  [key: string]: string | string[] | undefined
}

export interface MovieProperties {
  title: string
  opening_crawl?: string
  characters?: string[]
  [key: string]: string | string[] | undefined
}
