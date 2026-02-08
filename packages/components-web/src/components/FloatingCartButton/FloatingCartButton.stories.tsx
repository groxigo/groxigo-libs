import type { Meta, StoryObj } from '@storybook/react';
import { FloatingCartButton } from './FloatingCartButton';

const meta: Meta<typeof FloatingCartButton> = {
  title: 'Components/Layout/FloatingCartButton',
  component: FloatingCartButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, max: 150 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
  },
};

export const WithItems: Story = {
  args: {
    count: 5,
    onClick: () => {},
  },
};

export const Empty: Story = {
  args: {
    count: 0,
    onClick: () => {},
  },
};

export const HighCount: Story = {
  args: {
    count: 120,
    onClick: () => {},
  },
};
