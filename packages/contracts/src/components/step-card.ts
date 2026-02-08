/**
 * StepCard Component Contract
 *
 * A vertical card showing an icon in a circle, title, and description.
 * Used in the "How It Works" section on the landing page.
 */

import type { ReactNode } from 'react';

export interface StepCardPropsBase {
  /** Icon element */
  icon: ReactNode;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Optional step number */
  stepNumber?: number;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
