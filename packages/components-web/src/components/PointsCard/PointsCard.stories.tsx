import type { Meta, StoryObj } from '@storybook/react';
import { PointsCard } from './PointsCard';

const meta: Meta<typeof PointsCard> = {
  title: 'Components/Rewards/PointsCard',
  component: PointsCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: 1250,
    tier: 'Silver',
    nextTier: 'Gold',
    pointsToNextTier: 750,
    progressPercent: 60,
    onRedeem: () => {},
    onViewHistory: () => {},
  },
};

export const GoldTier: Story = {
  args: {
    points: 4800,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 1200,
    progressPercent: 80,
    onRedeem: () => {},
    onViewHistory: () => {},
  },
};

export const NewUser: Story = {
  args: {
    points: 50,
    tier: 'Bronze',
    nextTier: 'Silver',
    pointsToNextTier: 950,
    progressPercent: 5,
    onRedeem: () => {},
    onViewHistory: () => {},
  },
};
