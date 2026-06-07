import { describe, test, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WaitlistForm from '../components/WaitlistForm'

const mockFetch = vi.fn()
globalThis.fetch = mockFetch

describe('WaitlistForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders all form fields', () => {
    render(<WaitlistForm />)

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/tell us about your idea/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join the waitlist/i })).toBeInTheDocument()
  })

  test('shows validation error for empty name on submit', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)

    await user.click(screen.getByRole('button', { name: /join the waitlist/i }))

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
  })

  test('shows validation error for empty email on submit', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.click(screen.getByRole('button', { name: /join the waitlist/i }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
  })

  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<WaitlistForm />)

    await user.type(screen.getByLabelText(/email address/i), 'invalid-email')
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.click(screen.getByRole('button', { name: /join the waitlist/i }))

    expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument()
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    })

    render(<WaitlistForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: /join the waitlist/i }))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com', company: '', idea: '' }),
      })
    })
  })
})
