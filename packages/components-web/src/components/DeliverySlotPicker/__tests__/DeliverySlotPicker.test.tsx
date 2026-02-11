import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeliverySlotPicker } from '../DeliverySlotPicker';

describe('DeliverySlotPicker', () => {
  const dates = [
    { key: '2026-02-08', day: 'Sun', date: '8', month: 'Feb' },
    { key: '2026-02-09', day: 'Mon', date: '9', month: 'Feb' },
    { key: '2026-02-10', day: 'Tue', date: '10', month: 'Feb' },
  ];

  const timeSlots = [
    { key: 'morning', label: '9 AM - 12 PM', available: true },
    { key: 'afternoon', label: '12 PM - 3 PM', available: true },
    { key: 'evening', label: '3 PM - 6 PM', available: false },
  ];

  const defaultProps = {
    dates,
    timeSlots,
    selectedDate: '2026-02-08',
    selectedSlot: 'morning',
  };

  it('renders all date options', () => {
    render(<DeliverySlotPicker {...defaultProps} />);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
  });

  it('renders date numbers and months', () => {
    render(<DeliverySlotPicker {...defaultProps} />);
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders all time slot labels', () => {
    render(<DeliverySlotPicker {...defaultProps} />);
    expect(screen.getByText('9 AM - 12 PM')).toBeInTheDocument();
    expect(screen.getByText('12 PM - 3 PM')).toBeInTheDocument();
    expect(screen.getByText('3 PM - 6 PM')).toBeInTheDocument();
  });

  it('calls onDateSelect when a date chip is clicked', () => {
    const onDateSelect = vi.fn();
    render(<DeliverySlotPicker {...defaultProps} onDateSelect={onDateSelect} />);
    // Click the "Mon" date button
    const monButton = screen.getByText('Mon').closest('button');
    expect(monButton).toBeTruthy();
    fireEvent.click(monButton!);
    expect(onDateSelect).toHaveBeenCalledWith('2026-02-09');
  });

  it('calls onSlotSelect when an available time slot is clicked', () => {
    const onSlotSelect = vi.fn();
    render(<DeliverySlotPicker {...defaultProps} onSlotSelect={onSlotSelect} />);
    const afternoonButton = screen.getByText('12 PM - 3 PM').closest('button');
    expect(afternoonButton).toBeTruthy();
    fireEvent.click(afternoonButton!);
    expect(onSlotSelect).toHaveBeenCalledWith('afternoon');
  });

  it('disables unavailable time slots', () => {
    render(<DeliverySlotPicker {...defaultProps} />);
    const eveningButton = screen.getByText('3 PM - 6 PM').closest('button');
    expect(eveningButton).toBeDisabled();
  });

  it('has radiogroup roles for dates and times', () => {
    render(<DeliverySlotPicker {...defaultProps} />);
    expect(screen.getByRole('radiogroup', { name: 'Select delivery date' })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup', { name: 'Select delivery time' })).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<DeliverySlotPicker {...defaultProps} testID="delivery-picker" />);
    expect(screen.getByTestId('delivery-picker')).toBeInTheDocument();
  });
});
