import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingStep } from './OnboardingStep';

const meta: Meta<typeof OnboardingStep> = {
  title: 'Components/Onboarding/OnboardingStep',
  component: OnboardingStep,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStep: Story = {
  args: {
    title: 'Fresh Groceries Delivered',
    description:
      'Browse thousands of South Asian & Middle Eastern groceries, from authentic spices to fresh produce, delivered right to your door.',
    currentStep: 1,
    totalSteps: 3,
    ctaText: 'Next',
    onNext: () => {},
    onSkip: () => {},
  },
};

export const MiddleStep: Story = {
  args: {
    title: 'Discover Recipes',
    description:
      'Explore traditional recipes from India, Pakistan, Bangladesh, and the Middle East. Add all ingredients to your cart with one tap.',
    currentStep: 2,
    totalSteps: 3,
    ctaText: 'Next',
    onNext: () => {},
    onSkip: () => {},
  },
};

export const LastStep: Story = {
  args: {
    title: 'Fast & Reliable Delivery',
    description:
      'Get your groceries delivered in as little as 30 minutes. Track your order in real-time and enjoy free delivery on orders over $35.',
    currentStep: 3,
    totalSteps: 3,
    ctaText: 'Get Started',
    onNext: () => {},
  },
};
