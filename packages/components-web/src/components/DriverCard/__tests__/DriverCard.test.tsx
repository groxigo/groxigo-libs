import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DriverCard } from '../DriverCard';

describe('DriverCard', () => {
  const defaultProps = {
    name: 'Ahmed Khan',
    vehicle: 'White Toyota Camry - ABC 1234',
    avatarUrl: 'https://example.com/driver.jpg',
    phone: '+1 555-0123',
  };

  it('renders the driver name', () => {
    render(<DriverCard {...defaultProps} />);
    expect(screen.getByText('Ahmed Khan')).toBeInTheDocument();
  });

  it('renders the vehicle info', () => {
    render(<DriverCard {...defaultProps} />);
    expect(screen.getByText('White Toyota Camry - ABC 1234')).toBeInTheDocument();
  });

  it('renders the Call button when onCall is provided', () => {
    const onCall = vi.fn();
    render(<DriverCard {...defaultProps} onCall={onCall} />);
    expect(screen.getByText('Call')).toBeInTheDocument();
  });

  it('does not render Call button when onCall is not provided', () => {
    render(<DriverCard {...defaultProps} />);
    expect(screen.queryByText('Call')).not.toBeInTheDocument();
  });

  it('does not render vehicle when not provided', () => {
    render(<DriverCard name="Ahmed Khan" avatarUrl="" phone="" />);
    expect(screen.queryByText('White Toyota Camry')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<DriverCard {...defaultProps} testID="driver-card" />);
    expect(screen.getByTestId('driver-card')).toBeInTheDocument();
  });
});
