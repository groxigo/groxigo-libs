import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '../Select';

const defaultOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('Select', () => {
  it('renders a select element', () => {
    render(<Select options={defaultOptions} testID="sel" />);
    const select = screen.getByTestId('sel');
    expect(select).toBeInTheDocument();
    expect(select.tagName).toBe('SELECT');
  });

  it('renders all options', () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<Select options={defaultOptions} placeholder="Pick a fruit" />);
    expect(screen.getByText('Pick a fruit')).toBeInTheDocument();
  });

  it('displays selected value', () => {
    render(<Select options={defaultOptions} value="banana" testID="sel" />);
    expect(screen.getByTestId('sel')).toHaveValue('banana');
  });

  it('calls onChange when selection changes', () => {
    const onChange = vi.fn();
    render(<Select options={defaultOptions} onChange={onChange} testID="sel" />);
    fireEvent.change(screen.getByTestId('sel'), { target: { value: 'cherry' } });
    expect(onChange).toHaveBeenCalledWith('cherry');
  });

  it('renders disabled select', () => {
    render(<Select options={defaultOptions} disabled testID="sel" />);
    expect(screen.getByTestId('sel')).toBeDisabled();
  });

  it('renders disabled options', () => {
    const opts = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana', disabled: true },
    ];
    render(<Select options={opts} />);
    const bananaOption = screen.getByText('Banana') as HTMLOptionElement;
    expect(bananaOption).toBeDisabled();
  });

  it('displays error message with role="alert"', () => {
    render(<Select options={defaultOptions} error="Selection required" name="fruit" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Selection required');
  });

  it('displays helper text when no error', () => {
    render(<Select options={defaultOptions} helperText="Choose wisely" name="fruit" />);
    expect(screen.getByText('Choose wisely')).toBeInTheDocument();
  });

  it('renders label', () => {
    render(<Select options={defaultOptions} label="Fruit" name="fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });

  it('shows asterisk when required', () => {
    render(<Select options={defaultOptions} label="Fruit" required name="fruit" />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Select options={defaultOptions} error="Bad" testID="sel" />);
    expect(screen.getByTestId('sel')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies testID as data-testid', () => {
    render(<Select options={defaultOptions} testID="my-select" />);
    expect(screen.getByTestId('my-select')).toBeInTheDocument();
  });

  it('forwards ref to the select element', () => {
    const ref = { current: null } as React.RefObject<HTMLSelectElement | null>;
    render(<Select ref={ref} options={defaultOptions} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
