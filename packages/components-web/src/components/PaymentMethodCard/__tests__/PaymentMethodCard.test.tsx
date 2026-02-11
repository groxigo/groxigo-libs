import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentMethodCard } from '../PaymentMethodCard';

describe('PaymentMethodCard', () => {
  const defaultProps = {
    id: 'pm-1',
    brand: 'visa' as const,
    lastFour: '4242',
    expiry: '12/28',
  };

  it('renders the brand label', () => {
    render(<PaymentMethodCard {...defaultProps} />);
    expect(screen.getByText('VISA')).toBeInTheDocument();
  });

  it('renders the masked card number with last four digits', () => {
    render(<PaymentMethodCard {...defaultProps} />);
    // The component renders "•••• •••• •••• 4242"
    const cardNumberEl = screen.getByText((content) => content.includes('4242'));
    expect(cardNumberEl).toBeInTheDocument();
  });

  it('renders the expiry date', () => {
    render(<PaymentMethodCard {...defaultProps} />);
    expect(screen.getByText('Expires 12/28')).toBeInTheDocument();
  });

  it('renders Default badge when isDefault is true', () => {
    render(<PaymentMethodCard {...defaultProps} isDefault />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('does not render Default badge when isDefault is false', () => {
    render(<PaymentMethodCard {...defaultProps} isDefault={false} />);
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
  });

  it('renders mastercard brand', () => {
    render(<PaymentMethodCard {...defaultProps} brand="mastercard" />);
    expect(screen.getByText('MC')).toBeInTheDocument();
  });

  it('renders amex brand', () => {
    render(<PaymentMethodCard {...defaultProps} brand="amex" />);
    expect(screen.getByText('AMEX')).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<PaymentMethodCard {...defaultProps} testID="payment-card-visa" />);
    expect(screen.getByTestId('payment-card-visa')).toBeInTheDocument();
  });
});
