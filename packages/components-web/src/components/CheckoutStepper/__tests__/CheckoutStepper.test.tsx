import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CheckoutStepper } from '../CheckoutStepper';

describe('CheckoutStepper', () => {
  const steps = [
    { key: 'cart', label: 'Cart' },
    { key: 'address', label: 'Address' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  it('renders all step labels', () => {
    render(<CheckoutStepper steps={steps} currentStep={0} />);
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Payment')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('marks the active step with aria-current', () => {
    render(<CheckoutStepper steps={steps} currentStep={1} />);
    const activeStep = screen.getByText('Address').closest('[aria-current="step"]');
    expect(activeStep).toBeInTheDocument();
  });

  it('does not mark non-active steps with aria-current', () => {
    render(<CheckoutStepper steps={steps} currentStep={1} />);
    const cartStep = screen.getByText('Cart').closest('[aria-current]');
    expect(cartStep).toBeNull();
  });

  it('renders step numbers for uncompleted steps', () => {
    render(<CheckoutStepper steps={steps} currentStep={1} />);
    // Step 2 (active) should show number "2"
    expect(screen.getByText('2')).toBeInTheDocument();
    // Steps 3 and 4 (future) should show their numbers
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('does not render step number for completed steps (shows check icon)', () => {
    render(<CheckoutStepper steps={steps} currentStep={2} />);
    // Steps 1 and 2 are completed; their numbers should not appear
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    // Step 3 (active) should show its number
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('has navigation role with accessible label', () => {
    render(<CheckoutStepper steps={steps} currentStep={0} />);
    expect(screen.getByRole('navigation', { name: 'Checkout progress' })).toBeInTheDocument();
  });

  it('renders with the correct testID', () => {
    render(<CheckoutStepper steps={steps} currentStep={0} testID="checkout-stepper" />);
    expect(screen.getByTestId('checkout-stepper')).toBeInTheDocument();
  });
});
