import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

// Mock TanStack Router Link
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to, className }: { children: React.ReactNode; to: string; className?: string }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

describe('Header', () => {
  it('renders children correctly', () => {
    render(<Header>SWStarter</Header>)
    expect(screen.getByText('SWStarter')).toBeInTheDocument()
  })

  it('renders as a header element', () => {
    render(<Header>SWStarter</Header>)
    const header = screen.getByText('SWStarter').closest('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('app-header')
  })

  it('has a link to home', () => {
    render(<Header>SWStarter</Header>)
    const link = screen.getByText('SWStarter').closest('a')
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('header-link')
    expect(link).toHaveAttribute('href', '/')
  })
})

