import type { Meta, StoryObj } from '@storybook/react';
import { BadgeCard } from './BadgeCard';

const meta: Meta<typeof BadgeCard> = {
  title: 'Components/Rewards/BadgeCard',
  component: BadgeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Earned: Story = {
  args: {
    name: 'First Order',
    icon: '\uD83C\uDF89',
    state: 'earned',
    description: 'Placed your very first grocery order!',
  },
};

export const Locked: Story = {
  args: {
    name: 'Recipe Master',
    icon: '\uD83D\uDC68\u200D\uD83C\uDF73',
    state: 'locked',
    description: 'Cook 10 recipes from the app to unlock.',
  },
};

export const LoyalCustomer: Story = {
  args: {
    name: 'Loyal Customer',
    icon: '\u2B50',
    state: 'earned',
    description: 'Completed 50 orders. Thank you for your loyalty!',
  },
};
