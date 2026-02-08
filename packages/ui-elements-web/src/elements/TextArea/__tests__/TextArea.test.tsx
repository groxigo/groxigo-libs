import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from '../TextArea';

describe('TextArea', () => {
  it('renders a textarea element', () => {
    render(<TextArea testID="ta" />);
    const textarea = screen.getByTestId('ta');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('renders label text', () => {
    render(<TextArea label="Description" name="desc" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<TextArea placeholder="Enter description..." />);
    expect(screen.getByPlaceholderText('Enter description...')).toBeInTheDocument();
  });

  it('displays current value', () => {
    render(<TextArea value="Hello world" onChange={() => {}} testID="ta" />);
    expect(screen.getByTestId('ta')).toHaveValue('Hello world');
  });

  it('calls onChange with text value when typing', () => {
    const onChange = vi.fn();
    render(<TextArea onChange={onChange} testID="ta" />);
    fireEvent.change(screen.getByTestId('ta'), { target: { value: 'new text' } });
    expect(onChange).toHaveBeenCalledWith('new text');
  });

  it('calls onChangeNative with event when typing', () => {
    const onChangeNative = vi.fn();
    render(<TextArea onChangeNative={onChangeNative} testID="ta" />);
    fireEvent.change(screen.getByTestId('ta'), { target: { value: 'test' } });
    expect(onChangeNative).toHaveBeenCalledTimes(1);
  });

  it('displays error message with role="alert"', () => {
    render(<TextArea error="Field is required" name="desc" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Field is required');
  });

  it('displays helper text when no error', () => {
    render(<TextArea helperText="Max 500 characters" name="desc" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<TextArea disabled testID="ta" />);
    expect(screen.getByTestId('ta')).toBeDisabled();
  });

  it('renders with specified rows', () => {
    render(<TextArea rows={5} testID="ta" />);
    expect(screen.getByTestId('ta')).toHaveAttribute('rows', '5');
  });

  it('shows character count when showCount and maxLength are set', () => {
    render(<TextArea showCount maxLength={100} value="hello" onChange={() => {}} />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });

  it('shows asterisk when required', () => {
    render(<TextArea label="Bio" required name="bio" />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<TextArea error="Bad" testID="ta" />);
    expect(screen.getByTestId('ta')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies testID as data-testid', () => {
    render(<TextArea testID="my-textarea" />);
    expect(screen.getByTestId('my-textarea')).toBeInTheDocument();
  });

  it('forwards ref to the textarea element', () => {
    const ref = { current: null } as React.RefObject<HTMLTextAreaElement | null>;
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});
