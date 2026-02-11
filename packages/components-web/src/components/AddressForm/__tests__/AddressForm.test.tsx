import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddressForm } from '../AddressForm';

describe('AddressForm', () => {
  it('renders the default title', () => {
    render(<AddressForm />);
    expect(screen.getByText('Add New Address')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<AddressForm title="Edit Address" />);
    expect(screen.getByText('Edit Address')).toBeInTheDocument();
  });

  it('renders form field labels', () => {
    render(<AddressForm />);
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Street Address')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('State')).toBeInTheDocument();
    expect(screen.getByText('Zip Code')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
  });

  it('renders address type chips (Home, Work, Other)', () => {
    render(<AddressForm />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('Home type chip is selected by default', () => {
    render(<AddressForm />);
    const homeChip = screen.getByRole('radio', { name: 'Home' });
    expect(homeChip).toHaveAttribute('aria-checked', 'true');
  });

  it('renders Save Address submit button', () => {
    render(<AddressForm />);
    expect(screen.getByText('Save Address')).toBeInTheDocument();
  });

  it('renders Cancel button when onCancel is provided', () => {
    const onCancel = vi.fn();
    render(<AddressForm onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not render Cancel button when onCancel is not provided', () => {
    render(<AddressForm />);
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<AddressForm testID="address-form" />);
    expect(screen.getByTestId('address-form')).toBeInTheDocument();
  });

  it('passes derived testIDs to form fields', () => {
    render(<AddressForm testID="addr" />);
    expect(screen.getByTestId('addr-fullName')).toBeInTheDocument();
    expect(screen.getByTestId('addr-street')).toBeInTheDocument();
    expect(screen.getByTestId('addr-city')).toBeInTheDocument();
    expect(screen.getByTestId('addr-state')).toBeInTheDocument();
    expect(screen.getByTestId('addr-zip')).toBeInTheDocument();
    expect(screen.getByTestId('addr-phone')).toBeInTheDocument();
  });
});
