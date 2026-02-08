import type { Meta, StoryObj } from '@storybook/react';
import { NutritionTable } from './NutritionTable';

const meta: Meta<typeof NutritionTable> = {
  title: 'Components/Info/NutritionTable',
  component: NutritionTable,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    servingSize: '1/4 cup dry (45g)',
    servingsPerContainer: 'About 22',
    calories: 160,
    rows: [
      { label: 'Total Fat', value: '0.5g', dailyValue: '1%', bold: true },
      { label: 'Saturated Fat', value: '0g', dailyValue: '0%', indent: true },
      { label: 'Trans Fat', value: '0g', indent: true },
      { label: 'Cholesterol', value: '0mg', dailyValue: '0%', bold: true },
      { label: 'Sodium', value: '0mg', dailyValue: '0%', bold: true },
      { label: 'Total Carbohydrate', value: '36g', dailyValue: '13%', bold: true },
      { label: 'Dietary Fiber', value: '0g', dailyValue: '0%', indent: true },
      { label: 'Total Sugars', value: '0g', indent: true },
      { label: 'Protein', value: '3g', dailyValue: '6%', bold: true },
    ],
    vitamins: [
      { label: 'Iron', value: '2%' },
      { label: 'Thiamin', value: '15%' },
      { label: 'Niacin', value: '15%' },
      { label: 'Folate', value: '25%' },
    ],
  },
};

export const Paneer: Story = {
  args: {
    servingSize: '1 oz (28g)',
    servingsPerContainer: '8',
    calories: 80,
    rows: [
      { label: 'Total Fat', value: '6g', dailyValue: '8%', bold: true },
      { label: 'Saturated Fat', value: '4g', dailyValue: '20%', indent: true },
      { label: 'Trans Fat', value: '0g', indent: true },
      { label: 'Cholesterol', value: '20mg', dailyValue: '7%', bold: true },
      { label: 'Sodium', value: '15mg', dailyValue: '1%', bold: true },
      { label: 'Total Carbohydrate', value: '1g', dailyValue: '0%', bold: true },
      { label: 'Dietary Fiber', value: '0g', dailyValue: '0%', indent: true },
      { label: 'Total Sugars', value: '1g', indent: true },
      { label: 'Protein', value: '6g', dailyValue: '12%', bold: true },
    ],
    vitamins: [
      { label: 'Calcium', value: '15%' },
      { label: 'Vitamin A', value: '4%' },
      { label: 'Phosphorus', value: '10%' },
    ],
  },
};

export const ChickpeaFlour: Story = {
  args: {
    servingSize: '1/4 cup (28g)',
    servingsPerContainer: '16',
    calories: 110,
    rows: [
      { label: 'Total Fat', value: '2g', dailyValue: '3%', bold: true },
      { label: 'Saturated Fat', value: '0g', dailyValue: '0%', indent: true },
      { label: 'Cholesterol', value: '0mg', dailyValue: '0%', bold: true },
      { label: 'Sodium', value: '5mg', dailyValue: '0%', bold: true },
      { label: 'Total Carbohydrate', value: '18g', dailyValue: '7%', bold: true },
      { label: 'Dietary Fiber', value: '5g', dailyValue: '18%', indent: true },
      { label: 'Total Sugars', value: '3g', indent: true },
      { label: 'Protein', value: '6g', dailyValue: '12%', bold: true },
    ],
    vitamins: [
      { label: 'Iron', value: '10%' },
      { label: 'Folate', value: '35%' },
      { label: 'Magnesium', value: '10%' },
    ],
  },
};
