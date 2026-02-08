import type { Meta, StoryObj } from '@storybook/react';
import { CartItem } from './CartItem';

const meta: Meta<typeof CartItem> = {
  title: 'Components/Cart/CartItem',
  component: CartItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'item-001',
    title: 'Tata Gold Tea',
    price: 8.99,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/E8D5B7/333?text=Tea',
    onQuantityChange: () => {},
    onRemove: () => {},
  },
};

export const WithDescription: Story = {
  args: {
    id: 'item-002',
    title: 'Royal Basmati Rice',
    description: '10 lb bag - Aged premium quality',
    price: 18.49,
    quantity: 2,
    currency: 'USD',
    imageUrl: 'https://placehold.co/100x100/FFF3E0/333?text=Rice',
    onQuantityChange: () => {},
    onRemove: () => {},
  },
};

export const Disabled: Story = {
  args: {
    id: 'item-003',
    title: 'Alphonso Mango Pulp',
    description: '850g can - Out of stock',
    price: 6.99,
    quantity: 1,
    disabled: true,
    imageUrl: 'https://placehold.co/100x100/FFCCBC/333?text=Mango',
    onQuantityChange: () => {},
    onRemove: () => {},
  },
};
