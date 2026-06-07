import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock all child components
vi.mock('./components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>,
}));

vi.mock('./components/Hero', () => ({
  default: () => <section data-testid="hero">Hero</section>,
}));

vi.mock('./components/ValueProps', () => ({
  default: () => <section data-testid="value-props">ValueProps</section>,
}));

vi.mock('./components/SocialProof', () => ({
  default: () => <section data-testid="social-proof">SocialProof</section>,
}));

vi.mock('./components/WaitlistForm', () => ({
  default: () => <section data-testid="waitlist-form">WaitlistForm</section>,
}));

vi.mock('./components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

describe('App', () => {
  test('renders all main sections', () => {
    render(<App />);

    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('value-props')).toBeInTheDocument();
    expect(screen.getByTestId('social-proof')).toBeInTheDocument();
    expect(screen.getByTestId('waitlist-form')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('has main element wrapping content sections', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
