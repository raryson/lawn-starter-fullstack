import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies card class', () => {
    render(<Card>Card content</Card>)
    const card = screen.getByText('Card content').closest('.card')
    expect(card).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom-class">Card content</Card>)
    const card = screen.getByText('Card content').closest('.card')
    expect(card?.className).toContain('custom-class')
  })
})

