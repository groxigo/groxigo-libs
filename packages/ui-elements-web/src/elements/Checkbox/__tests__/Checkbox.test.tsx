import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox testID="cb" />);
    const wrapper = screen.getByTestId('cb');
    const input = wrapper.querySelector('input[type="checkbox"]');
    expect(input).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<Checkbox testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(false);
  });

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('passes new checked state to onChange on click', () => {
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders disabled checkbox', () => {
    render(<Checkbox disabled testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders label text', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Checkbox label="Terms" description="Read our terms of service" />);
    expect(screen.getByText('Read our terms of service')).toBeInTheDocument();
  });

  it('renders error text', () => {
    render(<Checkbox error="You must accept" testID="cb" />);
    expect(screen.getByText('You must accept')).toBeInTheDocument();
  });

  it('renders with indeterminate state', () => {
    render(<Checkbox indeterminate testID="cb" />);
    const input = screen.getByTestId('cb').querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(input).toHaveAttribute('aria-checked', 'mixed');
  });

  it('applies testID as data-testid', () => {
    render(<Checkbox testID="my-checkbox" />);
    expect(screen.getByTestId('my-checkbox')).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
