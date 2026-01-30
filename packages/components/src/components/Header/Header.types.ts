import type { ViewProps, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type { HeaderPropsBase, HeaderSection } from '@groxigo/contracts';

/**
 * Header props for React Native
 *
 * Extends the platform-agnostic HeaderPropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface HeaderProps extends Omit<HeaderPropsBase, 'className' | 'leftAction' | 'rightActions'>, Omit<ViewProps, 'style'> {
  /**
   * Left action (back button, menu, etc.)
   */
  leftAction?: ReactNode;

  /**
   * Right actions (buttons, icons, etc.)
   */
  rightActions?: ReactNode[];

  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { HeaderSection };
