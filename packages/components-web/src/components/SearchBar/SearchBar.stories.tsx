import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Layout/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    autoFocus: { control: 'boolean' },
    showCancel: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search groceries...',
    onChangeText: () => {},
    onSubmit: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: 'Basmati rice',
    placeholder: 'Search groceries...',
    onChangeText: () => {},
    onSubmit: () => {},
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Search for spices, dal, atta...',
    onChangeText: () => {},
    onSubmit: () => {},
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Search categories...',
    onChangeText: () => {},
    onSubmit: () => {},
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <SearchBar size="sm" placeholder="Small search..." />
      <SearchBar size="md" placeholder="Medium search..." />
      <SearchBar size="lg" placeholder="Large search..." />
    </div>
  ),
};
