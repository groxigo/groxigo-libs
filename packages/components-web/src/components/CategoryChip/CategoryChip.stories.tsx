import type { Meta, StoryObj } from '@storybook/react';
import { CategoryChip } from './CategoryChip';

const meta: Meta<typeof CategoryChip> = {
  title: 'Components/Browse/CategoryChip',
  component: CategoryChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Fruits',
    onPress: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: 'Vegetables',
    selected: true,
    onPress: () => {},
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Dairy',
    iconNode: <span style={{ fontSize: '16px' }}>&#129472;</span>,
    onPress: () => {},
  },
};

export const ChipRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <CategoryChip label="All" selected />
      <CategoryChip label="Fruits" />
      <CategoryChip label="Vegetables" />
      <CategoryChip label="Dairy & Eggs" />
      <CategoryChip label="Spices" />
      <CategoryChip label="Rice & Flour" />
      <CategoryChip label="Snacks" />
      <CategoryChip label="Beverages" />
    </div>
  ),
};
