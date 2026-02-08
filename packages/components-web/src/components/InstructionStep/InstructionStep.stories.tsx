import type { Meta, StoryObj } from '@storybook/react';
import { InstructionStep } from './InstructionStep';

const meta: Meta<typeof InstructionStep> = {
  title: 'Components/Recipe/InstructionStep',
  component: InstructionStep,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stepNumber: 1,
    instruction:
      'Wash and soak the basmati rice in water for 30 minutes. Drain and set aside.',
  },
};

export const WithImage: Story = {
  args: {
    stepNumber: 2,
    instruction:
      'Heat ghee in a heavy-bottomed pot over medium heat. Add whole spices (bay leaves, cardamom, cinnamon stick, cloves) and saute until fragrant, about 1 minute.',
    imageUrl: 'https://placehold.co/400x200/FFF3E0/333?text=Tempering+Spices',
  },
};

export const FinalStep: Story = {
  args: {
    stepNumber: 5,
    instruction:
      'Garnish with fresh cilantro, fried onions, and a squeeze of lemon juice. Let the biryani rest for 5 minutes before serving.',
  },
};
