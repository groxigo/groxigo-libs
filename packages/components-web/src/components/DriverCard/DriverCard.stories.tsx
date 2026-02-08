import type { Meta, StoryObj } from '@storybook/react';
import { DriverCard } from './DriverCard';

const meta: Meta<typeof DriverCard> = {
  title: 'Components/Delivery/DriverCard',
  component: DriverCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Rahul Singh',
    vehicle: 'White Toyota Camry',
    onCall: () => {},
  },
};

export const WithAvatar: Story = {
  args: {
    name: 'Amit Kumar',
    vehicle: 'Blue Honda Civic',
    avatarUrl: 'https://placehold.co/40x40/e2e8f0/475569?text=AK',
    onCall: () => {},
  },
};

export const NoCallAction: Story = {
  args: {
    name: 'Deepak Verma',
    vehicle: 'Red Suzuki Swift',
  },
};
