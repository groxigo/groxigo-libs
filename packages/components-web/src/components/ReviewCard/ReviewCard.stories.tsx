import type { Meta, StoryObj } from '@storybook/react';
import { ReviewCard } from './ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/Product/ReviewCard',
  component: ReviewCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Priya Sharma',
    date: 'Jan 15, 2026',
    rating: 5,
    reviewText: 'Excellent quality! The spices are fresh and aromatic. Will definitely order again.',
  },
};

export const WithAvatar: Story = {
  args: {
    avatarUrl: 'https://placehold.co/40x40/e2e8f0/475569?text=PS',
    name: 'Raj Patel',
    date: 'Dec 28, 2025',
    rating: 4,
    reviewText: 'Good product overall. Packaging could be better but the taste is authentic.',
  },
};

export const LowRating: Story = {
  args: {
    name: 'Ahmed Khan',
    date: 'Jan 5, 2026',
    rating: 2,
    reviewText: 'Not what I expected. The product was close to expiry date when delivered.',
  },
};
