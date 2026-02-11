import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PolicyCard } from '../PolicyCard';

describe('PolicyCard', () => {
  it('renders the message', () => {
    render(<PolicyCard message="Free returns within 30 days." />);
    expect(screen.getByText('Free returns within 30 days.')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<PolicyCard message="Details here." title="Return Policy" />);
    expect(screen.getByText('Return Policy')).toBeInTheDocument();
  });

  it('defaults to info variant', () => {
    render(<PolicyCard message="Info message" testID="policy" />);
    expect(screen.getByTestId('policy')).toHaveAttribute('data-variant', 'info');
  });

  it('renders warning variant', () => {
    render(<PolicyCard message="Warning message" variant="warning" testID="policy" />);
    expect(screen.getByTestId('policy')).toHaveAttribute('data-variant', 'warning');
  });

  it('has role="status" for accessibility', () => {
    render(<PolicyCard message="Policy note" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<PolicyCard message="Some policy" testID="policy-card" />);
    expect(screen.getByTestId('policy-card')).toBeInTheDocument();
  });
});
