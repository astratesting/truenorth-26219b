import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitlistForm from '../components/WaitlistForm';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('WaitlistForm', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  test('renders all form fields', () => {
    render(<WaitlistForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about your idea/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /join the waitlist/i })).toBeInTheDocument();
  });

  test('shows validation error for empty name on submit', async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  test('shows validation error for empty email on submit', async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
    await user.click(submitButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
    await user.click(submitButton);

    expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/company name/i), 'TestCo');
    await user.type(screen.getByLabelText(/tell us about your idea/i), 'A test startup idea');

    await user.click(screen.getByRole('button', { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          company: 'TestCo',
          idea: 'A test startup idea',
        }),
      });
    });
  });

  test('displays success message after successful submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText("You're on the list!")).toBeInTheDocument();
    });
  });

  test('displays error message on API failure', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Email already exists' }),
    });

    render(<WaitlistForm />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  test('clears validation errors when user types', async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    const submitButton = screen.getByRole('button', { name: /join the waitlist/i });
    await user.click(submitButton);

    expect(screen.getByText('Name is required')).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'John');

    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });
});
