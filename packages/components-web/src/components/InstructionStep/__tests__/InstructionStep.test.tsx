import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InstructionStep } from '../InstructionStep';

describe('InstructionStep', () => {
  const defaultProps = {
    stepNumber: 1,
    instruction: 'Wash and soak the rice for 30 minutes.',
  };

  it('renders the step number', () => {
    render(<InstructionStep {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    render(<InstructionStep {...defaultProps} />);
    expect(screen.getByText('Wash and soak the rice for 30 minutes.')).toBeInTheDocument();
  });

  it('renders step number as aria-hidden', () => {
    const { container } = render(<InstructionStep {...defaultProps} />);
    const stepNumContainer = screen.getByText('1').closest('[aria-hidden="true"]');
    expect(stepNumContainer).toBeInTheDocument();
  });

  it('renders an image when imageUrl is provided', () => {
    render(
      <InstructionStep
        {...defaultProps}
        imageUrl="https://img.test/step1.jpg"
      />
    );
    const img = screen.getByRole('img', { name: 'Step 1 illustration' });
    expect(img).toHaveAttribute('src', 'https://img.test/step1.jpg');
  });

  it('does not render an image when imageUrl is not provided', () => {
    const { container } = render(<InstructionStep {...defaultProps} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders higher step numbers correctly', () => {
    render(
      <InstructionStep
        stepNumber={5}
        instruction="Let the dish rest for 10 minutes before serving."
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Let the dish rest for 10 minutes before serving.')).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<InstructionStep {...defaultProps} testID="instruction-step-1" />);
    expect(screen.getByTestId('instruction-step-1')).toBeInTheDocument();
  });
});
