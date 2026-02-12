/**
 * CheckoutStepper Component Contract
 *
 * Platform-agnostic interface for the checkout progress stepper component.
 * Displays a horizontal sequence of steps with completed/active/inactive states.
 */

/**
 * A single step in the checkout flow
 */
export interface CheckoutStep {
  /** Display label (e.g. "Address", "Payment") */
  label: string;
  /** Unique key identifier for the step */
  key: string;
}

/**
 * CheckoutStepper component props contract
 */
export interface CheckoutStepperPropsBase {
  /** Array of steps to display */
  steps: CheckoutStep[];
  /** Zero-based index of the current active step */
  currentStep: number;
  /** Test ID for testing */
  testID?: string;
}
