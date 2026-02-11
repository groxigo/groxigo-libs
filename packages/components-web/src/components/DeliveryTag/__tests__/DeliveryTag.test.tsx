import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DeliveryTag } from '../DeliveryTag';

describe('DeliveryTag', () => {
  it('renders the delivery label text', () => {
    render(<DeliveryTag variant="express" label="EXPRESS" />);
    expect(screen.getByText('EXPRESS')).toBeInTheDocument();
  });

  it('renders express variant', () => {
    render(<DeliveryTag variant="express" label="9 MINS" />);
    expect(screen.getByText('9 MINS')).toBeInTheDocument();
  });

  it('renders standard variant', () => {
    render(<DeliveryTag variant="standard" label="Standard Delivery" />);
    expect(screen.getByText('Standard Delivery')).toBeInTheDocument();
  });

  it('renders scheduled variant', () => {
    render(
      <DeliveryTag variant="scheduled" label="Scheduled 2-3 hrs" />
    );
    expect(screen.getByText('Scheduled 2-3 hrs')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <DeliveryTag variant="express" label="Fast" icon="lightning" />
    );
    expect(screen.getByText('lightning')).toBeInTheDocument();
  });

  it('does not render icon element when icon is not provided', () => {
    const { container } = render(
      <DeliveryTag variant="standard" label="Normal" />
    );
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBe(0);
  });

  it('applies testID as data-testid', () => {
    render(
      <DeliveryTag
        variant="express"
        label="Test"
        testID="delivery-tag"
      />
    );
    expect(screen.getByTestId('delivery-tag')).toBeInTheDocument();
  });
});
