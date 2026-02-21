/**
 * AccordionSection Component Contract
 *
 * Platform-agnostic interface for a collapsible/expandable section component.
 * Supports both controlled and uncontrolled expand/collapse state.
 */

import type { ReactNode } from 'react';

/**
 * AccordionSection component props contract
 */
export interface AccordionSectionPropsBase {
  /** Section title displayed in the header */
  title: string;

  /** Whether the section is expanded by default (uncontrolled) @default false */
  defaultExpanded?: boolean;

  /** Controlled expanded state */
  expanded?: boolean;

  /** Callback when the section is toggled */
  onToggle?: (expanded: boolean) => void;

  /** Content to render when expanded */
  children?: ReactNode;


  /** Test ID for testing */
  testID?: string;
}
