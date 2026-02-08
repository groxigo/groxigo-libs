import type { Meta, StoryObj } from '@storybook/react';
import { ReferralCard } from './ReferralCard';

const meta: Meta<typeof ReferralCard> = {
  title: 'Components/Rewards/ReferralCard',
  component: ReferralCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    referralCode: 'GROX2026',
    subtitle: 'Give $10, get $10 when your friends place their first order.',
    onShare: () => {},
    onCopyCode: () => {},
  },
};

export const WithStats: Story = {
  args: {
    title: 'Invite Friends & Earn',
    subtitle: 'Share your code and earn rewards for every friend who joins.',
    referralCode: 'PAVANI50',
    invitedCount: 12,
    earnedAmount: '$60.00',
    onShare: () => {},
    onCopyCode: () => {},
  },
};
