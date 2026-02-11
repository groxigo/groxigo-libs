import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantityStepper } from '../QuantityStepper';

describe('QuantityStepper', () => {
  it('renders "Add to cart" button when value is 0 (add mode)', () => {
    render(<QuantityStepper value={0} onChange={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Add to cart' })
    ).toBeInTheDocument();
  });

  it('renders stepper with current value when value > 0', () => {
    render(<QuantityStepper value={3} onChange={vi.fn()} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Increase quantity' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Decrease quantity' })
    ).toBeInTheDocument();
  });

  it('calls onChange with min value when add button is clicked', () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={0} onChange={onChange} min={1} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange with incremented value when + is clicked', () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={2} onChange={onChange} step={1} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Increase quantity' })
    );
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with decremented value when - is clicked', () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={3} onChange={onChange} step={1} min={1} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Decrease quantity' })
    );
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables decrement button when value equals min', () => {
    render(<QuantityStepper value={1} onChange={vi.fn()} min={1} />);
    const decrementBtn = screen.getByRole('button', {
      name: 'Decrease quantity',
    });
    expect(decrementBtn).toBeDisabled();
  });

  it('disables increment button when value equals max', () => {
    render(<QuantityStepper value={5} onChange={vi.fn()} max={5} />);
    const incrementBtn = screen.getByRole('button', {
      name: 'Increase quantity',
    });
    expect(incrementBtn).toBeDisabled();
  });

  it('disables all buttons when disabled prop is true', () => {
    render(<QuantityStepper value={2} onChange={vi.fn()} disabled />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('applies testID as data-testid', () => {
    render(
      <QuantityStepper value={1} onChange={vi.fn()} testID="qty-stepper" />
    );
    expect(screen.getByTestId('qty-stepper')).toBeInTheDocument();
  });

  it('renders custom label for add button', () => {
    render(
      <QuantityStepper value={0} onChange={vi.fn()} label="Add item" />
    );
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument();
  });
});
