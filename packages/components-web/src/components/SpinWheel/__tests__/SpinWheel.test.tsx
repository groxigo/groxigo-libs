import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpinWheel } from '../SpinWheel';

describe('SpinWheel', () => {
  const defaultSegments = [
    { label: '10% Off' },
    { label: 'Free Delivery' },
    { label: '$5 Credit' },
    { label: 'Try Again' },
    { label: '20% Off' },
    { label: 'Extra Points' },
  ];

  it('renders the SPIN button', () => {
    render(<SpinWheel segments={defaultSegments} />);
    expect(screen.getByText('SPIN')).toBeInTheDocument();
  });

  it('renders all segment labels', () => {
    render(<SpinWheel segments={defaultSegments} />);
    expect(screen.getByText('10% Off')).toBeInTheDocument();
    expect(screen.getByText('Free Delivery')).toBeInTheDocument();
    expect(screen.getByText('$5 Credit')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('20% Off')).toBeInTheDocument();
    expect(screen.getByText('Extra Points')).toBeInTheDocument();
  });

  it('renders remaining spins text when provided', () => {
    render(<SpinWheel segments={defaultSegments} remainingSpins={3} />);
    expect(screen.getByText('3 free spins remaining today')).toBeInTheDocument();
  });

  it('renders singular spin text for 1 remaining', () => {
    render(<SpinWheel segments={defaultSegments} remainingSpins={1} />);
    expect(screen.getByText('1 free spin remaining today')).toBeInTheDocument();
  });

  it('does not render remaining spins when not provided', () => {
    render(<SpinWheel segments={defaultSegments} />);
    expect(screen.queryByText(/free spin/)).not.toBeInTheDocument();
  });

  it('has spin button with aria-label', () => {
    render(<SpinWheel segments={defaultSegments} />);
    expect(screen.getByLabelText('Spin the wheel')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<SpinWheel segments={defaultSegments} testID="spin-wheel" />);
    expect(screen.getByTestId('spin-wheel')).toBeInTheDocument();
  });
});
