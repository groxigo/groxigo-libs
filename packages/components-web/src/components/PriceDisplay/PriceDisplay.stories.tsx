import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Components/Product/PriceDisplay',
  component: PriceDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    currency: {
      control: 'select',
      options: ['USD', 'EUR', 'GBP', 'INR', 'PKR', 'BDT', 'AED'],
    },
    showCurrency: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 4.99,
    currency: 'USD',
  },
};

export const WithDiscount: Story = {
  args: {
    price: 3.49,
    originalPrice: 5.99,
    currency: 'USD',
  },
};

export const LargeSize: Story = {
  args: {
    price: 12.99,
    currency: 'USD',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <PriceDisplay price={4.99} originalPrice={6.99} size="sm" />
      <PriceDisplay price={4.99} originalPrice={6.99} size="md" />
      <PriceDisplay price={4.99} originalPrice={6.99} size="lg" />
      <PriceDisplay price={4.99} originalPrice={6.99} size="xl" />
    </div>
  ),
};
