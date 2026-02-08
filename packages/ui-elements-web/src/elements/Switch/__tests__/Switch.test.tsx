import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../Switch';

describe('Switch', () => {
  it('renders a switch with role="switch"', () => {
    render(<Switch testID="sw" />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toBeInTheDocument();
  });

  it('renders unchecked by default', () => {
    render(<Switch />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');
  });

  it('renders checked when checked prop is true', () => {
    render(<Switch checked />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange when toggled', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    const switchBtn = screen.getByRole('switch');
    fireEvent.click(switchBtn);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('toggles from checked to unchecked', () => {
    const onChange = vi.fn();
    render(<Switch checked={true} onChange={onChange} />);
    const switchBtn = screen.getByRole('switch');
    fireEvent.click(switchBtn);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(<Switch disabled onChange={onChange} />);
    const switchBtn = screen.getByRole('switch');
    fireEvent.click(switchBtn);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders label text', () => {
    render(<Switch label="Dark mode" name="dark" />);
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Switch helperText="Enable dark theme" name="dark" />);
    expect(screen.getByText('Enable dark theme')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Switch error="Something went wrong" name="dark" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not show helper text when error is present', () => {
    render(<Switch helperText="hint" error="error" name="dark" />);
    expect(screen.queryByText('hint')).not.toBeInTheDocument();
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Switch disabled />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles keyboard toggle with Space key', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    const switchBtn = screen.getByRole('switch');
    fireEvent.keyDown(switchBtn, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('handles keyboard toggle with Enter key', () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} />);
    const switchBtn = screen.getByRole('switch');
    fireEvent.keyDown(switchBtn, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('works in uncontrolled mode with defaultChecked', () => {
    render(<Switch defaultChecked={true} />);
    const switchBtn = screen.getByRole('switch');
    expect(switchBtn).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(switchBtn);
    expect(switchBtn).toHaveAttribute('aria-checked', 'false');
  });

  it('applies testID as data-testid', () => {
    render(<Switch testID="my-switch" />);
    expect(screen.getByTestId('my-switch')).toBeInTheDocument();
  });

  it('forwards ref to the button element', () => {
    const ref = { current: null } as React.RefObject<HTMLButtonElement | null>;
    render(<Switch ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
