/**
 * TrustStat Component Contract
 *
 * A horizontal icon + label stat used in trust bar sections.
 * Shows delivery speed, satisfaction rating, etc.
 */

import type { ReactNode } from 'react';

export interface TrustStatPropsBase {
  /** Stat icon */
  icon: ReactNode;
  /** Stat text (e.g., "Same-day delivery") */
  label: string;
  /** Test ID for testing */
  testID?: string;
}
