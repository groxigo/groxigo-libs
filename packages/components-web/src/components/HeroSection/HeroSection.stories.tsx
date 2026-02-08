import type { Meta, StoryObj } from '@storybook/react';
import { HeroSection } from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Components/Landing/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: 'Authentic groceries. Inspired recipes. Delivered.',
    subheadline:
      'Fresh ingredients and traditional recipes from India, Pakistan, Bangladesh, Nepal, Sri Lanka, and the Arab world.',
    backgroundImage: 'https://placehold.co/1440x600/8B4513/fff?text=Mise+en+Place',
    onGetStarted: (email) => console.log('Get started:', email),
    onSignIn: () => console.log('Sign in clicked'),
  },
};

export const WithCustomCTA: Story = {
  args: {
    headline: 'Cook like home, wherever you are.',
    subheadline: 'Discover 2,000+ authentic products from South Asia and the Middle East.',
    backgroundImage: 'https://placehold.co/1440x600/2d5016/fff?text=Spices+%26+Herbs',
    ctaLabel: 'Start Shopping',
    onGetStarted: (email) => console.log('Get started:', email),
    onSignIn: () => console.log('Sign in clicked'),
  },
};

export const WithoutBackground: Story = {
  args: {
    headline: 'Your kitchen, our ingredients.',
    subheadline: 'Same-day delivery on thousands of authentic grocery items.',
    onGetStarted: (email) => console.log('Get started:', email),
    onSignIn: () => console.log('Sign in clicked'),
  },
};
