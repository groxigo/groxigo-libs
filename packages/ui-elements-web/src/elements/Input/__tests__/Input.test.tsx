import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input testID="my-input" />);
    expect(screen.getByTestId('my-input')).toBeInTheDocument();
    expect(screen.getByTestId('my-input').tagName).toBe('INPUT');
  });

  it('renders label text', () => {
    render(<Input label="Email" name="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders placeholder text', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<Input value="hello" onChange={() => {}} testID="inp" />);
    expect(screen.getByTestId('inp')).toHaveValue('hello');
  });

  it('calls onChange and onChangeText when value changes', () => {
    const onChange = vi.fn();
    const onChangeText = vi.fn();
    render(<Input onChange={onChange} onChangeText={onChangeText} testID="inp" />);
    fireEvent.change(screen.getByTestId('inp'), { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('test');
  });

  it('displays error message with role="alert"', () => {
    render(<Input error="This field is required" name="email" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('This field is required');
  });

  it('displays helper text when no error', () => {
    render(<Input helperText="We will never share your email" name="email" />);
    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('does not display helper text when error is present', () => {
    render(
      <Input
        error="Required"
        helperText="We will never share your email"
        name="email"
      />
    );
    expect(screen.queryByText('We will never share your email')).not.toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled testID="inp" />);
    expect(screen.getByTestId('inp')).toBeDisabled();
  });

  it('shows asterisk when required', () => {
    render(<Input label="Email" required name="email" />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets aria-invalid when error is present', () => {
    render(<Input error="Bad value" testID="inp" />);
    expect(screen.getByTestId('inp')).toHaveAttribute('aria-invalid', 'true');
  });

  it('sets aria-invalid when isInvalid is true', () => {
    render(<Input isInvalid testID="inp" />);
    expect(screen.getByTestId('inp')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders left element', () => {
    render(<Input leftElement={<span>@</span>} />);
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('renders right element', () => {
    render(<Input rightElement={<span>icon</span>} />);
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('calls onFocus and onBlur handlers', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Input onFocus={onFocus} onBlur={onBlur} testID="inp" />);
    const input = screen.getByTestId('inp');
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('applies testID as data-testid', () => {
    render(<Input testID="test-input" />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
  });

  it('forwards ref to the input element', () => {
    const ref = { current: null } as React.RefObject<HTMLInputElement | null>;
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('sets type attribute', () => {
    render(<Input type="password" testID="inp" />);
    expect(screen.getByTestId('inp')).toHaveAttribute('type', 'password');
  });
});
