import type { Meta, StoryObj } from '@storybook/react';
import { TipSelector } from './TipSelector';

const meta: Meta<typeof TipSelector> = {
  title: 'Components/Checkout/TipSelector',
  component: TipSelector,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    selectedAmount: 3,
    onSelect: () => {},
  },
};

export const CustomTip: Story = {
  args: {
    showCustom: true,
    onSelect: () => {},
    onCustomChange: () => {},
  },
};
