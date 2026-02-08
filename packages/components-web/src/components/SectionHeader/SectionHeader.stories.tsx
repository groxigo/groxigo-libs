import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/Layout/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    titleVariant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    showSeeAll: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Trending Products',
  },
};

export const WithSeeAll: Story = {
  args: {
    title: 'Fresh Fruits & Vegetables',
    showSeeAll: true,
    seeAllText: 'See all',
    onSeeAllPress: () => {},
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Daily Deals',
    subtitle: 'Save up to 40% on everyday essentials',
  },
};

export const WithSubtitleAndSeeAll: Story = {
  args: {
    title: 'Popular Spices',
    subtitle: 'Hand-picked from South Asia and the Middle East',
    showSeeAll: true,
    onSeeAllPress: () => {},
  },
};

export const TitleVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <SectionHeader title="Heading 2" titleVariant="h2" />
      <SectionHeader title="Heading 3 (default)" titleVariant="h3" />
      <SectionHeader title="Heading 4" titleVariant="h4" />
      <SectionHeader title="Heading 5" titleVariant="h5" />
    </div>
  ),
};
