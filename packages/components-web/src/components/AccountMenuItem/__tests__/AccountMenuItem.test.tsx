import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccountMenuItem } from '../AccountMenuItem';

describe('AccountMenuItem', () => {
  it('renders the label', () => {
    render(<AccountMenuItem label="My Orders" />);
    expect(screen.getByText('My Orders')).toBeInTheDocument();
  });

  it('renders the icon when provided', () => {
    const { container } = render(<AccountMenuItem label="Settings" icon="⚙️" />);
    expect(container.querySelector('.iconCircle')).toHaveTextContent('⚙️');
  });

  it('renders subtitle when provided', () => {
    render(<AccountMenuItem label="My Orders" subtitle="View order history" />);
    expect(screen.getByText('View order history')).toBeInTheDocument();
  });

  it('renders the chevron by default', () => {
    const { container } = render(<AccountMenuItem label="My Orders" />);
    const chevron = container.querySelector('.chevron');
    expect(chevron).toBeInTheDocument();
  });

  it('hides the chevron when showChevron is false', () => {
    const { container } = render(<AccountMenuItem label="My Orders" showChevron={false} />);
    const chevron = container.querySelector('.chevron');
    expect(chevron).not.toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<AccountMenuItem label="Notifications" badge={<span>3</span>} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('has aria-label matching the label text', () => {
    render(<AccountMenuItem label="My Orders" />);
    expect(screen.getByLabelText('My Orders')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<AccountMenuItem label="My Orders" testID="menu-item" />);
    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });
});
