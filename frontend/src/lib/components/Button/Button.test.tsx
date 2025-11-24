import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled button</Button>)
    expect(screen.getByText('Disabled button')).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button disabled onClick={handleClick}>Disabled button</Button>)
    
    await user.click(screen.getByText('Disabled button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByText('Button')
    expect(button.className).toContain('custom-class')
  })

  it('applies btn-auto-width when w-auto is in className', () => {
    render(<Button className="w-auto">Button</Button>)
    const button = screen.getByText('Button')
    expect(button.className).toContain('btn-auto-width')
  })

  it('applies btn-disabled class when disabled', () => {
    render(<Button disabled>Button</Button>)
    const button = screen.getByText('Button')
    expect(button.className).toContain('btn-disabled')
  })
})

