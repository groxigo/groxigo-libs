import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PriceDisplay } from '../PriceDisplay';

describe('PriceDisplay', () => {
  it('renders the formatted price with default USD currency', () => {
    render(<PriceDisplay price={9.99} />);
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('renders price with INR currency symbol', () => {
    render(<PriceDisplay price={199} currency="INR" />);
    expect(screen.getByText('\u20B9199.00')).toBeInTheDocument();
  });

  it('renders price without currency symbol when showCurrency is false', () => {
    render(<PriceDisplay price={5.5} showCurrency={false} />);
    expect(screen.getByText('5.50')).toBeInTheDocument();
  });

  it('renders original price with strikethrough when discounted', () => {
    render(<PriceDisplay price={7.99} originalPrice={9.99} />);
    expect(screen.getByText('$7.99')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });

  it('does not render original price when it is not greater than price', () => {
    render(<PriceDisplay price={9.99} originalPrice={9.99} />);
    // Only one price element, no discount
    const prices = screen.getAllByText('$9.99');
    expect(prices).toHaveLength(1);
  });

  it('displays discount percentage badge when discounted', () => {
    render(<PriceDisplay price={8} originalPrice={10} />);
    // 1 - 8/10 = 0.2 = 20%
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('handles string price values', () => {
    render(<PriceDisplay price="12.50" />);
    expect(screen.getByText('$12.50')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<PriceDisplay price={5} testID="price-display" />);
    expect(screen.getByTestId('price-display')).toBeInTheDocument();
  });
});
