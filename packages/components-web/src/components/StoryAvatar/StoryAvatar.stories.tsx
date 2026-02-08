import type { Meta, StoryObj } from '@storybook/react';
import { StoryAvatar } from './StoryAvatar';

const meta: Meta<typeof StoryAvatar> = {
  title: 'Components/Browse/StoryAvatar',
  component: StoryAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['unseen', 'seen'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Fresh Deals',
    avatarUrl: 'https://placehold.co/64x64/4CAF50/fff?text=FD',
    state: 'unseen',
    onPress: () => {},
  },
};

export const Viewed: Story = {
  args: {
    name: 'Recipes',
    avatarUrl: 'https://placehold.co/64x64/FF5722/fff?text=R',
    state: 'seen',
    onPress: () => {},
  },
};

export const WithLabel: Story = {
  args: {
    name: 'Weekly Specials',
    avatarUrl: 'https://placehold.co/64x64/FFC107/333?text=WS',
    state: 'unseen',
    onPress: () => {},
  },
};

export const StoryRow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '8px 0' }}>
      <StoryAvatar
        name="Fresh Deals"
        avatarUrl="https://placehold.co/64x64/4CAF50/fff?text=FD"
        state="unseen"
      />
      <StoryAvatar
        name="Recipes"
        avatarUrl="https://placehold.co/64x64/FF5722/fff?text=R"
        state="unseen"
      />
      <StoryAvatar
        name="New Arrivals"
        avatarUrl="https://placehold.co/64x64/2196F3/fff?text=NA"
        state="seen"
      />
      <StoryAvatar
        name="Trending"
        avatarUrl="https://placehold.co/64x64/9C27B0/fff?text=T"
        state="seen"
      />
      <StoryAvatar
        name="Festival"
        avatarUrl="https://placehold.co/64x64/FF9800/fff?text=F"
        state="unseen"
      />
      <StoryAvatar
        name="Tips"
        avatarUrl="https://placehold.co/64x64/795548/fff?text=Ti"
        state="seen"
      />
    </div>
  ),
};
