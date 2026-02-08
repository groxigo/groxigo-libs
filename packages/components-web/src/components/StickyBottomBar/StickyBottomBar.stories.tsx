import type { Meta, StoryObj } from '@storybook/react';
import { StickyBottomBar } from './StickyBottomBar';

const meta: Meta<typeof StickyBottomBar> = {
  title: 'Components/Layout/StickyBottomBar',
  component: StickyBottomBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['singleAction', 'withPrice'],
    },
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'singleAction',
    buttonText: 'Continue to Checkout',
    onButtonPress: () => {},
  },
};

export const WithPrice: Story = {
  args: {
    variant: 'withPrice',
    label: 'Total',
    price: '$24.99',
    buttonText: 'Place Order',
    onButtonPress: () => {},
  },
};

export const WithCustomChildren: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
        <button type="button" style={{ padding: '8px 24px', border: '1px solid #ccc', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
          Save for Later
        </button>
        <button type="button" style={{ padding: '8px 24px', border: 'none', borderRadius: '8px', background: '#2563eb', color: 'white', cursor: 'pointer' }}>
          Add to Cart
        </button>
      </div>
    ),
  },
};

export const Loading: Story = {
  args: {
    variant: 'singleAction',
    buttonText: 'Processing...',
    isLoading: true,
    onButtonPress: () => {},
  },
};
