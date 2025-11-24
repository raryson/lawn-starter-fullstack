import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('renders the correct message', () => {
    render(<EmptyState />)
    // Use regex to match text that may be split by line breaks
    expect(screen.getByText(/There are zero matches/)).toBeInTheDocument()
    expect(screen.getByText(/Use the form to search for People or Movies/)).toBeInTheDocument()
  })

  it('has bold text styling', () => {
    render(<EmptyState />)
    const paragraph = screen.getByText(/There are zero matches/)
    expect(paragraph).toHaveClass('empty-state')
  })

  it('renders message with line break', () => {
    render(<EmptyState />)
    const container = screen.getByText(/There are zero matches/).closest('p')
    expect(container).toBeInTheDocument()
    expect(container?.innerHTML).toContain('<br')
  })
})

