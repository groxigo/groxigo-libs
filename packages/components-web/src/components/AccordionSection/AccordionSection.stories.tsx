import type { Meta, StoryObj } from '@storybook/react';
import { AccordionSection } from './AccordionSection';

const meta: Meta<typeof AccordionSection> = {
  title: 'Components/Product/AccordionSection',
  component: AccordionSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultExpanded: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Product Description',
    onToggle: () => {},
    children: (
      <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#555' }}>
        Tata Sampann Turmeric Powder is made from the finest quality turmeric sourced
        directly from farms in India. Rich in curcumin, it adds a vibrant yellow color
        and warm earthy flavor to your dishes. Perfect for curries, rice, and lentils.
      </p>
    ),
  },
};

export const Expanded: Story = {
  args: {
    title: 'Nutrition Information',
    defaultExpanded: true,
    onToggle: () => {},
    children: (
      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
        <p style={{ margin: '0 0 8px' }}>Serving Size: 1 tsp (3g)</p>
        <p style={{ margin: '0 0 4px' }}>Calories: 9</p>
        <p style={{ margin: '0 0 4px' }}>Total Fat: 0.3g</p>
        <p style={{ margin: '0 0 4px' }}>Carbohydrates: 1.4g</p>
        <p style={{ margin: '0 0 4px' }}>Protein: 0.3g</p>
        <p style={{ margin: '0 0 4px' }}>Iron: 5% DV</p>
      </div>
    ),
  },
};

export const MultipleAccordions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
      <AccordionSection title="Description" defaultExpanded>
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Premium basmati rice, aged for 2 years to enhance its aroma and flavor.
          Grains elongate up to 2x when cooked.
        </p>
      </AccordionSection>
      <AccordionSection title="Ingredients">
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          100% Natural Basmati Rice. No preservatives or artificial colors added.
        </p>
      </AccordionSection>
      <AccordionSection title="Storage Instructions">
        <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
          Store in a cool, dry place. Keep the package sealed after opening.
          Best consumed within 6 months of opening.
        </p>
      </AccordionSection>
    </div>
  ),
};
