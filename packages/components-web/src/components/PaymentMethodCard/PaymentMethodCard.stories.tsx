import type { Meta, StoryObj } from '@storybook/react';
import { PaymentMethodCard } from './PaymentMethodCard';

const meta: Meta<typeof PaymentMethodCard> = {
  title: 'Components/Checkout/PaymentMethodCard',
  component: PaymentMethodCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'pm-001',
    brand: 'visa',
    lastFour: '4242',
    expiry: '12/28',
    onSelect: () => {},
  },
};

export const Selected: Story = {
  args: {
    id: 'pm-001',
    brand: 'mastercard',
    lastFour: '8910',
    expiry: '03/27',
    selected: true,
    onSelect: () => {},
  },
};

export const DefaultCard: Story = {
  args: {
    id: 'pm-002',
    brand: 'amex',
    lastFour: '1234',
    expiry: '09/29',
    selected: true,
    isDefault: true,
    onSelect: () => {},
  },
};
