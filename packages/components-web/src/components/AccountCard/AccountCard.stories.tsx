import type { Meta, StoryObj } from '@storybook/react';
import { AccountCard } from './AccountCard';

const meta: Meta<typeof AccountCard> = {
  title: 'Components/Account/AccountCard',
  component: AccountCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Personal Information',
    onEdit: () => {},
    children: (
      <div>
        <p style={{ margin: 0 }}>Priya Sharma</p>
        <p style={{ margin: 0 }}>priya.sharma@email.com</p>
        <p style={{ margin: 0 }}>+1 (555) 123-4567</p>
      </div>
    ),
  },
};

export const WithoutEdit: Story = {
  args: {
    title: 'Order Summary',
    children: (
      <div>
        <p style={{ margin: 0 }}>3 items in cart</p>
        <p style={{ margin: 0 }}>Total: $45.99</p>
      </div>
    ),
  },
};
