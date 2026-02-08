import type { Meta, StoryObj } from '@storybook/react';
import { ProductImageCarousel } from './ProductImageCarousel';

const meta: Meta<typeof ProductImageCarousel> = {
  title: 'Components/Product/ProductImageCarousel',
  component: ProductImageCarousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentIndex: { control: { type: 'number', min: 0, max: 5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      'https://placehold.co/400x400/FFC107/333?text=Turmeric+Front',
      'https://placehold.co/400x400/FFD54F/333?text=Turmeric+Back',
      'https://placehold.co/400x400/FFE082/333?text=Turmeric+Side',
      'https://placehold.co/400x400/FFF8E1/333?text=Nutrition+Info',
    ],
    currentIndex: 0,
    onIndexChange: () => {},
  },
};

export const SingleImage: Story = {
  args: {
    images: [
      'https://placehold.co/400x400/4CAF50/fff?text=Mango+Pickle',
    ],
    currentIndex: 0,
    onIndexChange: () => {},
  },
};

export const SecondImageSelected: Story = {
  args: {
    images: [
      'https://placehold.co/400x400/FF5722/fff?text=Masala+Front',
      'https://placehold.co/400x400/FF7043/fff?text=Masala+Back',
      'https://placehold.co/400x400/FF8A65/fff?text=Ingredients',
    ],
    currentIndex: 1,
    onIndexChange: () => {},
  },
};
