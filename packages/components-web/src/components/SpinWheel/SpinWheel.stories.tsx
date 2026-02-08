import type { Meta, StoryObj } from '@storybook/react';
import { SpinWheel } from './SpinWheel';

const meta: Meta<typeof SpinWheel> = {
  title: 'Components/Gamification/SpinWheel',
  component: SpinWheel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    segments: [
      { label: '10% Off' },
      { label: 'Free Delivery' },
      { label: '50 Points' },
      { label: 'Try Again' },
      { label: '$5 Off' },
      { label: '100 Points' },
      { label: '15% Off' },
      { label: 'Try Again' },
    ],
    remainingSpins: 3,
    onSpin: () => {},
    onSpinComplete: () => {},
  },
};

export const Spinning: Story = {
  args: {
    segments: [
      { label: '10% Off' },
      { label: 'Free Delivery' },
      { label: '50 Points' },
      { label: 'Try Again' },
      { label: '$5 Off' },
      { label: '100 Points' },
      { label: '15% Off' },
      { label: 'Try Again' },
    ],
    isSpinning: true,
    remainingSpins: 2,
    onSpin: () => {},
    onSpinComplete: () => {},
  },
};
