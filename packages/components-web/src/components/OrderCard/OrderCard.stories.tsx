import type { Meta, StoryObj } from '@storybook/react';
import { OrderCard } from './OrderCard';

const meta: Meta<typeof OrderCard> = {
  title: 'Components/Account/OrderCard',
  component: OrderCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Delivered: Story = {
  args: {
    orderId: 'ord-001',
    orderNumber: '#ORD-1234',
    status: 'delivered',
    date: 'Jan 28, 2026',
    itemCount: 8,
    total: '$42.99',
    productImages: [
      'https://placehold.co/60x60/E8D5B7/333?text=Rice',
      'https://placehold.co/60x60/FFF3E0/333?text=Tea',
      'https://placehold.co/60x60/FFCCBC/333?text=Spice',
    ],
    onReorder: () => {},
    onPress: () => {},
  },
};

export const Processing: Story = {
  args: {
    orderId: 'ord-002',
    orderNumber: '#ORD-1289',
    status: 'processing',
    date: 'Feb 5, 2026',
    itemCount: 3,
    total: '$18.50',
    productImages: [
      'https://placehold.co/60x60/D4E6B5/333?text=Lentil',
      'https://placehold.co/60x60/FFE0B2/333?text=Ghee',
    ],
    onPress: () => {},
  },
};

export const Cancelled: Story = {
  args: {
    orderId: 'ord-003',
    orderNumber: '#ORD-1102',
    status: 'cancelled',
    date: 'Jan 15, 2026',
    itemCount: 5,
    total: '$31.75',
    onReorder: () => {},
    onPress: () => {},
  },
};
