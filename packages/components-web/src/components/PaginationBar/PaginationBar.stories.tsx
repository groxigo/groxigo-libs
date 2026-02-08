import type { Meta, StoryObj } from '@storybook/react';
import { PaginationBar } from './PaginationBar';

const meta: Meta<typeof PaginationBar> = {
  title: 'Components/Forms/PaginationBar',
  component: PaginationBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 6,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 12,
    totalPages: 12,
    onPageChange: () => {},
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 4,
    onPageChange: () => {},
  },
};
