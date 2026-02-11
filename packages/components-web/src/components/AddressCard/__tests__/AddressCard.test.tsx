import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddressCard } from '../AddressCard';

describe('AddressCard', () => {
  const defaultProps = {
    id: 'addr-1',
    type: 'home' as const,
    label: 'Home',
    line1: '123 Main Street, Apt 4B',
    line2: 'Brooklyn, NY 11201',
  };

  it('renders the address label', () => {
    render(<AddressCard {...defaultProps} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders address line 1', () => {
    render(<AddressCard {...defaultProps} />);
    expect(screen.getByText('123 Main Street, Apt 4B')).toBeInTheDocument();
  });

  it('renders address line 2', () => {
    render(<AddressCard {...defaultProps} />);
    expect(screen.getByText('Brooklyn, NY 11201')).toBeInTheDocument();
  });

  it('does not render line2 when not provided', () => {
    render(<AddressCard {...defaultProps} line2={undefined} />);
    expect(screen.queryByText('Brooklyn, NY 11201')).not.toBeInTheDocument();
  });

  it('renders the Edit button when onEdit is provided', () => {
    const onEdit = vi.fn();
    render(<AddressCard {...defaultProps} onEdit={onEdit} />);
    const editBtn = screen.getByRole('button', { name: 'Edit Home address' });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(onEdit).toHaveBeenCalledOnce();
  });

  it('renders the Delete button when onDelete is provided', () => {
    const onDelete = vi.fn();
    render(<AddressCard {...defaultProps} onDelete={onDelete} />);
    const deleteBtn = screen.getByRole('button', { name: 'Delete Home address' });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledOnce();
  });

  it('does not render Edit/Delete buttons when callbacks are not provided', () => {
    render(<AddressCard {...defaultProps} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<AddressCard {...defaultProps} testID="address-card-home" />);
    expect(screen.getByTestId('address-card-home')).toBeInTheDocument();
  });
});
