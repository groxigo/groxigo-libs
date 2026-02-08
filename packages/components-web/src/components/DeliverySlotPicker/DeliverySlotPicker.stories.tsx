import type { Meta, StoryObj } from '@storybook/react';
import { DeliverySlotPicker } from './DeliverySlotPicker';

const sampleDates = [
  { key: '2026-02-07', day: 'Sat', date: 7, month: 'Feb' },
  { key: '2026-02-08', day: 'Sun', date: 8, month: 'Feb' },
  { key: '2026-02-09', day: 'Mon', date: 9, month: 'Feb' },
  { key: '2026-02-10', day: 'Tue', date: 10, month: 'Feb' },
  { key: '2026-02-11', day: 'Wed', date: 11, month: 'Feb' },
];

const sampleTimeSlots = [
  { key: 'morning', label: '9:00 AM - 11:00 AM', available: true },
  { key: 'midday', label: '11:00 AM - 1:00 PM', available: true },
  { key: 'afternoon', label: '1:00 PM - 3:00 PM', available: false },
  { key: 'evening', label: '5:00 PM - 7:00 PM', available: true },
  { key: 'night', label: '7:00 PM - 9:00 PM', available: true },
];

const meta: Meta<typeof DeliverySlotPicker> = {
  title: 'Components/Checkout/DeliverySlotPicker',
  component: DeliverySlotPicker,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    dates: sampleDates,
    timeSlots: sampleTimeSlots,
    onDateSelect: () => {},
    onSlotSelect: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    dates: sampleDates,
    timeSlots: sampleTimeSlots,
    selectedDate: '2026-02-08',
    selectedSlot: 'evening',
    onDateSelect: () => {},
    onSlotSelect: () => {},
  },
};
