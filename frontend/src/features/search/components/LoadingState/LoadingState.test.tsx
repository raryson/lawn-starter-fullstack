import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingState } from './LoadingState'

describe('LoadingState', () => {
  it('renders the correct message', () => {
    render(<LoadingState />)
    expect(screen.getByText('Searching...')).toBeInTheDocument()
  })

  it('has bold text styling', () => {
    render(<LoadingState />)
    const paragraph = screen.getByText('Searching...')
    expect(paragraph).toHaveClass('loading-state')
  })
})

