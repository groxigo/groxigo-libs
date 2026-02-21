import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VariantSelector } from '../VariantSelector';

const sampleOptions = [
  { label: '250g', value: '250g', price: '$2.99' },
  { label: '500g', value: '500g', price: '$4.99' },
  { label: '1kg', value: '1kg', price: '$8.99' },
];

describe('VariantSelector', () => {
  it('renders all variant options', () => {
    render(<VariantSelector options={sampleOptions} />);
    expect(screen.getByText('250g')).toBeInTheDocument();
    expect(screen.getByText('500g')).toBeInTheDocument();
    expect(screen.getByText('1kg')).toBeInTheDocument();
  });

  it('renders option prices', () => {
    render(<VariantSelector options={sampleOptions} />);
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getByText('$4.99')).toBeInTheDocument();
    expect(screen.getByText('$8.99')).toBeInTheDocument();
  });

  it('marks the selected variant with aria-checked', () => {
    render(
      <VariantSelector options={sampleOptions} selectedValue="500g" />
    );
    const buttons = screen.getAllByRole('radio');
    expect(buttons[1]).toHaveAttribute('aria-checked', 'true');
    expect(buttons[0]).toHaveAttribute('aria-checked', 'false');
    expect(buttons[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onSelect with the correct value when an option is clicked', () => {
    const onSelect = vi.fn();
    render(
      <VariantSelector
        options={sampleOptions}
        selectedValue="250g"
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getAllByRole('radio')[2]);
    expect(onSelect).toHaveBeenCalledWith('1kg');
  });

  it('renders as a radiogroup', () => {
    render(<VariantSelector options={sampleOptions} />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('renders options without price when price is not provided', () => {
    const noPriceOptions = [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
    ];
    render(<VariantSelector options={noPriceOptions} />);
    expect(screen.getByText('Red')).toBeInTheDocument();
    expect(screen.getByText('Blue')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(
      <VariantSelector
        options={sampleOptions}
        testID="variant-selector"
      />
    );
    expect(screen.getByTestId('variant-selector')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(
      <VariantSelector options={sampleOptions} label="Size" />
    );
    expect(screen.getByText('Size')).toBeInTheDocument();
  });

  it('does not render a label when not provided', () => {
    render(<VariantSelector options={sampleOptions} />);
    expect(screen.queryByText('Size')).not.toBeInTheDocument();
  });

  it('renders disabled options as disabled buttons', () => {
    const optionsWithDisabled = [
      { label: '250g', value: '250g', price: '$2.99' },
      { label: '500g', value: '500g', price: '$4.99', disabled: true },
    ];
    render(<VariantSelector options={optionsWithDisabled} />);
    const buttons = screen.getAllByRole('radio');
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('does not call onSelect when a disabled option is clicked', () => {
    const onSelect = vi.fn();
    const optionsWithDisabled = [
      { label: '250g', value: '250g', price: '$2.99' },
      { label: '500g', value: '500g', price: '$4.99', disabled: true },
    ];
    render(
      <VariantSelector options={optionsWithDisabled} onSelect={onSelect} />
    );
    fireEvent.click(screen.getAllByRole('radio')[1]);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
