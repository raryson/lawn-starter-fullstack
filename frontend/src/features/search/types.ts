import { type SwapiResource } from '@/lib/api'

export interface SearchFormValues {
  resource: SwapiResource
  search: string
}

// Type for the form - using ReturnType to infer from useForm
// We need to use a type that matches the actual form instance
export type SearchFormApi = ReturnType<typeof import('@tanstack/react-form').useForm<SearchFormValues>>

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
