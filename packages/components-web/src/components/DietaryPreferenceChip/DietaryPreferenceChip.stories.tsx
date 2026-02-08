import type { Meta, StoryObj } from '@storybook/react';
import { DietaryPreferenceChip } from './DietaryPreferenceChip';

const meta: Meta<typeof DietaryPreferenceChip> = {
  title: 'Components/Filters/DietaryPreferenceChip',
  component: DietaryPreferenceChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Halal',
    selected: false,
    onToggle: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: 'Vegetarian',
    emoji: '\uD83E\uDD6C',
    selected: true,
    onToggle: () => {},
  },
};

export const WithEmoji: Story = {
  args: {
    label: 'Vegan',
    emoji: '\uD83C\uDF31',
    selected: false,
    onToggle: () => {},
  },
};
