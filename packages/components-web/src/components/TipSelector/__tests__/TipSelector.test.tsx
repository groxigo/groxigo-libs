import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TipSelector } from '../TipSelector';

describe('TipSelector', () => {
  it('renders the title', () => {
    render(<TipSelector />);
    expect(screen.getByText('Add a tip')).toBeInTheDocument();
  });

  it('renders default tip amounts', () => {
    render(<TipSelector />);
    expect(screen.getByRole('button', { name: 'Tip $1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $10' })).toBeInTheDocument();
  });

  it('renders custom tip amounts', () => {
    render(<TipSelector amounts={[2, 4, 6]} />);
    expect(screen.getByRole('button', { name: 'Tip $2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tip $6' })).toBeInTheDocument();
  });

  it('marks the selected tip as pressed', () => {
    render(<TipSelector selectedAmount={3} />);
    const btn = screen.getByRole('button', { name: 'Tip $3' });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onSelect when a preset tip is clicked', () => {
    const onSelect = vi.fn();
    render(<TipSelector onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tip $5' }));
    expect(onSelect).toHaveBeenCalledWith(5);
  });

  it('shows custom button when showCustom is true', () => {
    render(<TipSelector showCustom />);
    expect(screen.getByRole('button', { name: 'Enter custom tip' })).toBeInTheDocument();
  });

  it('does not show custom button when showCustom is false', () => {
    render(<TipSelector showCustom={false} />);
    expect(screen.queryByRole('button', { name: 'Enter custom tip' })).not.toBeInTheDocument();
  });

  it('shows custom input after clicking Custom button', () => {
    render(<TipSelector showCustom onSelect={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Enter custom tip' }));
    expect(screen.getByLabelText('Custom tip amount')).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<TipSelector testID="tip-selector" />);
    expect(screen.getByTestId('tip-selector')).toBeInTheDocument();
  });
});
