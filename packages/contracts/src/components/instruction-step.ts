/**
 * InstructionStep Component Contract
 *
 * A step indicator with number circle and instruction text.
 * Used in recipe preparation flows and onboarding guides.
 */

export interface InstructionStepPropsBase {
  /** Step number displayed in the circle */
  stepNumber: number;
  /** Instruction text */
  instruction: string;
  /** Optional image URL shown below the instruction */
  imageUrl?: string;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
