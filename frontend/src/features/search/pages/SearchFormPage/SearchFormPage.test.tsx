import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchFormPage } from './SearchFormPage'

describe('SearchFormPage', () => {
  it('renders the form with heading', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    expect(screen.getByText('What are you searching for?')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('renders radio buttons for People and Movies', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    expect(screen.getByLabelText('People')).toBeInTheDocument()
    expect(screen.getByLabelText('Movies')).toBeInTheDocument()
  })

  it('has People selected by default', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const peopleRadio = screen.getByLabelText('People') as HTMLInputElement
    expect(peopleRadio.checked).toBe(true)
  })

  it('uses defaultResource prop when provided', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} defaultResource="films" />)
    
    const filmsRadio = screen.getByLabelText('Movies') as HTMLInputElement
    expect(filmsRadio.checked).toBe(true)
  })

  it('disables submit button when search input is empty', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /search/i })
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when search input has value', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Luke')
    
    const submitButton = screen.getByRole('button', { name: /search/i })
    expect(submitButton).not.toBeDisabled()
  })

  it('disables submit button and shows SEARCHING when isLoading is true', () => {
    const onSubmit = vi.fn()
    render(<SearchFormPage onSubmit={onSubmit} isLoading={true} />)
    
    const submitButton = screen.getByRole('button', { name: /searching/i })
    expect(submitButton).toBeDisabled()
    expect(submitButton.textContent).toBe('SEARCHING...')
  })

  it('calls onSubmit with correct values when form is submitted', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'Luke')
    
    const submitButton = screen.getByRole('button', { name: /search/i })
    await user.click(submitButton)
    
    expect(onSubmit).toHaveBeenCalledWith({
      resource: 'people',
      search: 'Luke',
    })
  })

  it('trims search value before submitting', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const input = screen.getByRole('textbox')
    await user.type(input, '  Luke  ')
    
    const submitButton = screen.getByRole('button', { name: /search/i })
    await user.click(submitButton)
    
    expect(onSubmit).toHaveBeenCalledWith({
      resource: 'people',
      search: 'Luke',
    })
  })

  it('does not call onSubmit when search is empty', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const form = screen.getByRole('textbox').closest('form')
    if (form) {
      await user.click(form)
      await user.keyboard('{Enter}')
    }
    
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with films resource when Movies is selected', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<SearchFormPage onSubmit={onSubmit} />)
    
    const filmsRadio = screen.getByLabelText('Movies')
    await user.click(filmsRadio)
    
    const input = screen.getByRole('textbox')
    await user.type(input, 'A New Hope')
    
    const submitButton = screen.getByRole('button', { name: /search/i })
    await user.click(submitButton)
    
    expect(onSubmit).toHaveBeenCalledWith({
      resource: 'films',
      search: 'A New Hope',
    })
  })
})

