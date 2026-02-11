import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BillDetails } from '../BillDetails';

describe('BillDetails', () => {
  const defaultProps = {
    items: [
      { label: 'Subtotal', value: '$24.99' },
      { label: 'Delivery Fee', value: '$3.99' },
      { label: 'Taxes', value: '$2.10' },
    ],
    total: { label: 'Total', value: '$31.08' },
  };

  it('renders all line item labels', () => {
    render(<BillDetails {...defaultProps} />);
    expect(screen.getByText('Subtotal')).toBeInTheDocument();
    expect(screen.getByText('Delivery Fee')).toBeInTheDocument();
    expect(screen.getByText('Taxes')).toBeInTheDocument();
  });

  it('renders all line item values', () => {
    render(<BillDetails {...defaultProps} />);
    expect(screen.getByText('$24.99')).toBeInTheDocument();
    expect(screen.getByText('$3.99')).toBeInTheDocument();
    expect(screen.getByText('$2.10')).toBeInTheDocument();
  });

  it('renders the total label and value', () => {
    render(<BillDetails {...defaultProps} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('$31.08')).toBeInTheDocument();
  });

  it('renders discount line item with savings type', () => {
    const propsWithDiscount = {
      items: [
        { label: 'Subtotal', value: '$24.99' },
        { label: 'Discount', value: '-$5.00', type: 'savings' as const },
      ],
      total: { label: 'Total', value: '$19.99' },
    };
    render(<BillDetails {...propsWithDiscount} />);
    expect(screen.getByText('Discount')).toBeInTheDocument();
    expect(screen.getByText('-$5.00')).toBeInTheDocument();
  });

  it('renders free delivery line item', () => {
    const propsWithFree = {
      items: [
        { label: 'Subtotal', value: '$50.00' },
        { label: 'Delivery', value: 'FREE', type: 'free' as const },
      ],
      total: { label: 'Total', value: '$50.00' },
    };
    render(<BillDetails {...propsWithFree} />);
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<BillDetails {...defaultProps} testID="bill-details" />);
    expect(screen.getByTestId('bill-details')).toBeInTheDocument();
  });
});
