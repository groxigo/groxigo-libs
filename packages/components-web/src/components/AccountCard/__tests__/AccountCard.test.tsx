import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AccountCard } from '../AccountCard';

describe('AccountCard', () => {
  it('renders the title', () => {
    render(<AccountCard title="Personal Information" />);
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <AccountCard title="Profile">
        <p>John Doe</p>
        <p>john@example.com</p>
      </AccountCard>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('renders Edit button when onEdit is provided', () => {
    const onEdit = vi.fn();
    render(<AccountCard title="Profile" onEdit={onEdit} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('does not render Edit button when onEdit is not provided', () => {
    render(<AccountCard title="Profile" />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<AccountCard title="Profile" testID="account-card" />);
    expect(screen.getByTestId('account-card')).toBeInTheDocument();
  });

  it('passes derived testID to Edit button', () => {
    const onEdit = vi.fn();
    render(<AccountCard title="Profile" onEdit={onEdit} testID="account-card" />);
    expect(screen.getByTestId('account-card-edit')).toBeInTheDocument();
  });
});
