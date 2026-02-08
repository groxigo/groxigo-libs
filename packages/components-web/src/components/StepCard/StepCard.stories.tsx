import type { Meta, StoryObj } from '@storybook/react';
import { StepCard } from './StepCard';

const meta: Meta<typeof StepCard> = {
  title: 'Components/Landing/StepCard',
  component: StepCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <span>📖</span>,
    title: 'Find a Recipe',
    description: 'Browse curated recipes from South Asian and Middle Eastern cuisines.',
  },
};

export const WithStepNumber: Story = {
  args: {
    stepNumber: 1,
    icon: <span>📖</span>,
    title: 'Find a Recipe',
    description: 'Browse curated recipes from South Asian and Middle Eastern cuisines.',
  },
};

export const HowItWorksFlow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', maxWidth: 700 }}>
      <StepCard
        stepNumber={1}
        icon={<span>📖</span>}
        title="Find a Recipe"
        description="Browse curated recipes from professional chefs."
      />
      <StepCard
        stepNumber={2}
        icon={<span>🛒</span>}
        title="Add Ingredients"
        description="One tap adds all ingredients to your cart."
      />
      <StepCard
        stepNumber={3}
        icon={<span>🚚</span>}
        title="Get It Delivered"
        description="Same-day delivery right to your door."
      />
    </div>
  ),
};
