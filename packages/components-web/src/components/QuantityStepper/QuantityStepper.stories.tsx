import type { Meta, StoryObj } from '@storybook/react';
import { QuantityStepper } from './QuantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Components/Product/QuantityStepper',
  component: QuantityStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    value: { control: { type: 'number', min: 0, max: 20 } },
    min: { control: { type: 'number', min: 0, max: 10 } },
    max: { control: { type: 'number', min: 1, max: 50 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 2,
    min: 1,
    max: 10,
    onChange: () => {},
  },
};

export const AddMode: Story = {
  args: {
    value: 0,
    min: 1,
    onChange: () => {},
  },
};

export const AtMinimum: Story = {
  args: {
    value: 1,
    min: 1,
    max: 10,
    onChange: () => {},
  },
};

export const AtMaximum: Story = {
  args: {
    value: 10,
    min: 1,
    max: 10,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    min: 1,
    max: 10,
    disabled: true,
    onChange: () => {},
  },
};
