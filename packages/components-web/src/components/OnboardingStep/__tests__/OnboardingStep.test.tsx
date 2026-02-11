import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingStep } from '../OnboardingStep';

describe('OnboardingStep', () => {
  const defaultProps = {
    title: 'Welcome to Groxigo',
    description: 'Fresh groceries from South Asia & Middle East, delivered to your door.',
    currentStep: 1,
    totalSteps: 3,
  };

  it('renders the title', () => {
    render(<OnboardingStep {...defaultProps} />);
    expect(screen.getByText('Welcome to Groxigo')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<OnboardingStep {...defaultProps} />);
    expect(screen.getByText('Fresh groceries from South Asia & Middle East, delivered to your door.')).toBeInTheDocument();
  });

  it('renders step dot indicators', () => {
    render(<OnboardingStep {...defaultProps} />);
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(3);
  });

  it('marks the current step as selected', () => {
    render(<OnboardingStep {...defaultProps} currentStep={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('renders the Next button with default CTA text', () => {
    const onNext = vi.fn();
    render(<OnboardingStep {...defaultProps} onNext={onNext} />);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders custom CTA text', () => {
    const onNext = vi.fn();
    render(<OnboardingStep {...defaultProps} onNext={onNext} ctaText="Get Started" />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
  });

  it('renders Skip button when onSkip is provided', () => {
    const onSkip = vi.fn();
    render(<OnboardingStep {...defaultProps} onSkip={onSkip} />);
    const skipButton = screen.getByText('Skip');
    expect(skipButton).toBeInTheDocument();
    fireEvent.click(skipButton);
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it('applies testID as data-testid', () => {
    render(<OnboardingStep {...defaultProps} testID="onboarding" />);
    expect(screen.getByTestId('onboarding')).toBeInTheDocument();
  });
});
