import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileHeader } from '../ProfileHeader';

describe('ProfileHeader', () => {
  const defaultProps = {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+1 555-0456',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  it('renders the user name', () => {
    render(<ProfileHeader {...defaultProps} />);
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
  });

  it('renders the email', () => {
    render(<ProfileHeader {...defaultProps} />);
    expect(screen.getByText('priya@example.com')).toBeInTheDocument();
  });

  it('renders the phone number', () => {
    render(<ProfileHeader {...defaultProps} />);
    expect(screen.getByText('+1 555-0456')).toBeInTheDocument();
  });

  it('renders the edit button when onEdit is provided', () => {
    const onEdit = vi.fn();
    render(<ProfileHeader {...defaultProps} onEdit={onEdit} />);
    expect(screen.getByLabelText('Edit profile')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(<ProfileHeader {...defaultProps} onEdit={onEdit} />);
    fireEvent.click(screen.getByLabelText('Edit profile'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<ProfileHeader {...defaultProps} />);
    expect(screen.queryByLabelText('Edit profile')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<ProfileHeader {...defaultProps} testID="profile-header" />);
    expect(screen.getByTestId('profile-header')).toBeInTheDocument();
  });
});
