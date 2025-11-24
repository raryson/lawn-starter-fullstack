import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResultsPanelPage } from './ResultsPanelPage'
import { type SwapiResponse } from '@/lib/api'

describe('ResultsPanelPage', () => {
  const mockResults: SwapiResponse = {
    results: [
      { uid: '1', name: 'Luke Skywalker', url: 'http://example.com/people/1' },
      { uid: '2', name: 'Leia Organa', url: 'http://example.com/people/2' },
    ],
    message: 'ok',
  }

  it('renders Results heading', () => {
    render(
      <ResultsPanelPage
        isLoading={false}
        error={null}
        data={undefined}
        hasSearched={false}
      />
    )
    expect(screen.getByText('Results')).toBeInTheDocument()
  })

  it('shows LoadingState when isLoading is true', () => {
    render(
      <ResultsPanelPage
        isLoading={true}
        error={null}
        data={undefined}
        hasSearched={false}
      />
    )
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  it('shows ErrorState when error is present', () => {
    const error = new Error('API Error')
    render(
      <ResultsPanelPage
        isLoading={false}
        error={error}
        data={undefined}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('shows EmptyState when hasSearched is false and not loading', () => {
    render(
      <ResultsPanelPage
        isLoading={false}
        error={null}
        data={undefined}
        hasSearched={false}
      />
    )
    expect(screen.getByText(/There are zero matches/)).toBeInTheDocument()
  })

  it('shows EmptyState when hasSearched is true but no results', () => {
    render(
      <ResultsPanelPage
        isLoading={false}
        error={null}
        data={{ results: [] }}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/There are zero matches/)).toBeInTheDocument()
  })

  it('shows EmptyState when data is undefined and hasSearched is true', () => {
    render(
      <ResultsPanelPage
        isLoading={false}
        error={null}
        data={undefined}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/There are zero matches/)).toBeInTheDocument()
  })

  it('renders ResultsListPage when results are available', () => {
    render(
      <ResultsPanelPage
        isLoading={false}
        error={null}
        data={mockResults}
        hasSearched={true}
      />
    )
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
    expect(screen.getByText('Leia Organa')).toBeInTheDocument()
  })

  it('does not show EmptyState when loading', () => {
    render(
      <ResultsPanelPage
        isLoading={true}
        error={null}
        data={undefined}
        hasSearched={false}
      />
    )
    expect(screen.queryByText(/There are zero matches/)).not.toBeInTheDocument()
  })

  it('does not show EmptyState when error is present', () => {
    const error = new Error('API Error')
    render(
      <ResultsPanelPage
        isLoading={false}
        error={error}
        data={undefined}
        hasSearched={true}
      />
    )
    expect(screen.queryByText(/There are zero matches/)).not.toBeInTheDocument()
  })

  it('prioritizes loading state over empty state', () => {
    render(
      <ResultsPanelPage
        isLoading={true}
        error={null}
        data={undefined}
        hasSearched={true}
      />
    )
    expect(screen.getByText('Searching...')).toBeInTheDocument()
    expect(screen.queryByText(/There are zero matches/)).not.toBeInTheDocument()
  })

  it('prioritizes error state over empty state', () => {
    const error = new Error('API Error')
    render(
      <ResultsPanelPage
        isLoading={false}
        error={error}
        data={{ results: [] }}
        hasSearched={true}
      />
    )
    expect(screen.getByText(/error/i)).toBeInTheDocument()
    expect(screen.queryByText(/There are zero matches/)).not.toBeInTheDocument()
  })
})

