import type { Meta, StoryObj } from '@storybook/react';
import { VariantSelector } from './VariantSelector';

const meta: Meta<typeof VariantSelector> = {
  title: 'Components/Product/VariantSelector',
  component: VariantSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: '200g', value: '200g', price: '$2.49' },
      { label: '500g', value: '500g', price: '$4.99' },
      { label: '1kg', value: '1kg', price: '$8.99' },
    ],
    onSelect: () => {},
  },
};

export const WithSelection: Story = {
  args: {
    options: [
      { label: '200g', value: '200g', price: '$2.49' },
      { label: '500g', value: '500g', price: '$4.99' },
      { label: '1kg', value: '1kg', price: '$8.99' },
    ],
    selectedValue: '500g',
    onSelect: () => {},
  },
};

export const PackSizes: Story = {
  args: {
    options: [
      { label: 'Single', value: 'single', price: '$1.29' },
      { label: 'Pack of 3', value: 'pack-3', price: '$3.49' },
      { label: 'Pack of 6', value: 'pack-6', price: '$5.99' },
      { label: 'Pack of 12', value: 'pack-12', price: '$10.99' },
    ],
    selectedValue: 'pack-3',
    onSelect: () => {},
  },
};
