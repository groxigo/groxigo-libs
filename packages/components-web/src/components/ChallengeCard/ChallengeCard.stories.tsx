import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';

const meta: Meta<typeof ChallengeCard> = {
  title: 'Components/Rewards/ChallengeCard',
  component: ChallengeCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    title: 'Weekend Grocery Run',
    description: 'Place 3 orders this weekend to earn bonus points.',
    progress: 1,
    total: 3,
    reward: '150 Points',
    deadline: 'Ends Sunday',
  },
};

export const NearlyComplete: Story = {
  args: {
    title: 'Try 5 New Products',
    description: 'Add 5 products you have never ordered before to your cart.',
    progress: 4,
    total: 5,
    reward: 'Free Delivery',
    deadline: '2 days left',
  },
};

export const Completed: Story = {
  args: {
    title: 'Spice Explorer',
    description: 'Order from 3 different spice brands this month.',
    progress: 3,
    total: 3,
    reward: '200 Points',
    deadline: 'Completed',
  },
};
