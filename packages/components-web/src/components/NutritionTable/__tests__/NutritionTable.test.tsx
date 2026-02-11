import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NutritionTable } from '../NutritionTable';

describe('NutritionTable', () => {
  const defaultProps = {
    servingSize: '1 cup (240g)',
    servingsPerContainer: '2',
    calories: '230',
    rows: [
      { label: 'Total Fat', value: '8g', dailyValue: '10%', bold: true },
      { label: 'Saturated Fat', value: '1g', dailyValue: '5%', indent: true },
      { label: 'Protein', value: '3g', bold: true },
    ],
  };

  it('renders "Nutrition Facts" header', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('Nutrition Facts')).toBeInTheDocument();
  });

  it('renders the serving size', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('Serving Size')).toBeInTheDocument();
    expect(screen.getByText('1 cup (240g)')).toBeInTheDocument();
  });

  it('renders servings per container', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('Servings Per Container')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders calories', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('Calories')).toBeInTheDocument();
    expect(screen.getByText('230')).toBeInTheDocument();
  });

  it('renders "% Daily Value*" header', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('% Daily Value*')).toBeInTheDocument();
  });

  it('renders nutrient rows', () => {
    render(<NutritionTable {...defaultProps} />);
    expect(screen.getByText('Total Fat')).toBeInTheDocument();
    expect(screen.getByText('8g')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('Saturated Fat')).toBeInTheDocument();
    expect(screen.getByText('Protein')).toBeInTheDocument();
    expect(screen.getByText('3g')).toBeInTheDocument();
  });

  it('renders vitamins when provided', () => {
    render(
      <NutritionTable
        {...defaultProps}
        vitamins={[
          { label: 'Vitamin D', value: '10%' },
          { label: 'Iron', value: '8%' },
        ]}
      />
    );
    expect(screen.getByText('Vitamin D 10%')).toBeInTheDocument();
    expect(screen.getByText('Iron 8%')).toBeInTheDocument();
  });

  it('applies testID as data-testid', () => {
    render(<NutritionTable {...defaultProps} testID="nutrition-table" />);
    expect(screen.getByTestId('nutrition-table')).toBeInTheDocument();
  });
});
