import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    elevated: { control: 'boolean' },
    section: {
      control: 'select',
      options: ['default', 'groceries', 'recipes'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Groxigo',
    elevated: true,
  },
};

export const WithActions: Story = {
  args: {
    title: 'Groxigo',
    elevated: true,
    leftAction: (
      <button type="button" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
        &#9776;
      </button>
    ),
    rightActions: [
      <button key="search" type="button" style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
        &#128269;
      </button>,
      <button key="cart" type="button" style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
        &#128722;
      </button>,
    ],
  },
};

export const GroceriesSection: Story = {
  args: {
    title: 'Groceries',
    section: 'groceries',
    elevated: true,
    leftAction: (
      <button type="button" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
        &#8592;
      </button>
    ),
    rightActions: [
      <button key="search" type="button" style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
        &#128269;
      </button>,
    ],
  },
};

export const WithCenterContent: Story = {
  args: {
    elevated: true,
    leftAction: (
      <button type="button" style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>
        &#9776;
      </button>
    ),
    children: (
      <div style={{ padding: '4px 12px', background: '#f5f5f5', borderRadius: '8px', fontSize: '14px', color: '#666' }}>
        Search groceries...
      </div>
    ),
    rightActions: [
      <button key="cart" type="button" style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>
        &#128722;
      </button>,
    ],
  },
};
