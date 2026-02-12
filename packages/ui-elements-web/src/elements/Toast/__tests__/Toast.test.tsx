import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toast } from '../Toast';

describe('Toast', () => {
  it('renders with role="alert"', () => {
    render(<Toast title="Success" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders title text', () => {
    render(<Toast title="Operation completed" />);
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Toast title="Success" description="Your changes have been saved" />);
    expect(screen.getByText('Your changes have been saved')).toBeInTheDocument();
  });

  it('renders close button when isClosable is true (default)', () => {
    render(<Toast title="Test" />);
    const closeBtn = screen.getByLabelText('Close notification');
    expect(closeBtn).toBeInTheDocument();
  });

  it('does not render close button when isClosable is false', () => {
    render(<Toast title="Test" isClosable={false} />);
    expect(screen.queryByLabelText('Close notification')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast title="Test" onClose={onClose} />);
    const closeBtn = screen.getByLabelText('Close notification');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Test" duration={3000} onClose={onClose} />);
    expect(onClose).not.toHaveBeenCalled();
    vi.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('does not auto-dismiss when duration is null', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Test" duration={null as any} onClose={onClose} />);
    vi.advanceTimersByTime(10000);
    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('renders with aria-live="polite"', () => {
    render(<Toast title="Test" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('renders action button when action prop is provided', () => {
    const onPress = vi.fn();
    render(
      <Toast
        title="Deleted"
        action={{ label: 'Undo', onPress }}
      />
    );
    const actionBtn = screen.getByText('Undo');
    expect(actionBtn).toBeInTheDocument();
    fireEvent.click(actionBtn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders with custom render function', () => {
    render(
      <Toast
        title="ignored"
        render={({ onClose }) => <div>Custom Toast <button onClick={onClose}>X</button></div>}
      />
    );
    expect(screen.getByText('Custom Toast')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<Toast title="Test" testID="my-toast" />);
    expect(screen.getByTestId('my-toast')).toBeInTheDocument();
  });

  it('forwards ref to the container div', () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;
    render(<Toast ref={ref} title="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
