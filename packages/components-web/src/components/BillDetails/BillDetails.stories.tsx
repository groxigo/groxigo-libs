import type { Meta, StoryObj } from '@storybook/react';
import { BillDetails } from './BillDetails';

const meta: Meta<typeof BillDetails> = {
  title: 'Components/Cart/BillDetails',
  component: BillDetails,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Subtotal', value: '$45.97' },
      { label: 'Delivery Fee', value: '$4.99' },
      { label: 'Savings', value: '-$5.00', type: 'savings' },
    ],
    total: { label: 'Total', value: '$45.96' },
  },
};

export const WithFreeDelivery: Story = {
  args: {
    items: [
      { label: 'Subtotal', value: '$72.50' },
      { label: 'Delivery Fee', value: 'FREE', type: 'free' },
      { label: 'Tip', value: '$3.00' },
      { label: 'Savings', value: '-$8.25', type: 'savings' },
    ],
    total: { label: 'Total', value: '$67.25' },
  },
};

export const MinimalOrder: Story = {
  args: {
    items: [
      { label: 'Subtotal', value: '$12.99' },
      { label: 'Delivery Fee', value: '$2.99' },
    ],
    total: { label: 'Total', value: '$15.98' },
  },
};
