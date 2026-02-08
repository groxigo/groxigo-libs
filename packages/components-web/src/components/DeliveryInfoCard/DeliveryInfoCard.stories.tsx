import type { Meta, StoryObj } from '@storybook/react';
import { DeliveryInfoCard } from './DeliveryInfoCard';

const meta: Meta<typeof DeliveryInfoCard> = {
  title: 'Components/Info/DeliveryInfoCard',
  component: DeliveryInfoCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    estimatedTime: '30-45 min',
    itemCount: 8,
    deliveryFee: '$3.99',
    freeDeliveryThreshold: '$35',
    onChange: () => {},
  },
};

export const FreeDelivery: Story = {
  args: {
    estimatedTime: '25-35 min',
    itemCount: 14,
    deliveryFee: 'FREE',
    onChange: () => {},
  },
};
