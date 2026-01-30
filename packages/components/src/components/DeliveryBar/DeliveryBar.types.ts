import type { ViewProps, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';
import type {
  DeliveryBarPropsBase,
  DeliveryAddress,
  DeliverySlot,
  DeliveryBarSection,
} from '@groxigo/contracts';

/**
 * DeliveryBar props for React Native
 *
 * Extends the platform-agnostic DeliveryBarPropsBase from @groxigo/contracts
 * with React Native-specific properties.
 */
export interface DeliveryBarProps
  extends Omit<DeliveryBarPropsBase, 'className'>,
    Omit<ViewProps, 'style'> {
  /**
   * Container style
   */
  style?: ViewStyle;

  /**
   * Custom render function for address display
   */
  renderAddress?: (address: DeliveryAddress) => ReactNode;

  /**
   * Custom render function for right side actions (coins, profile, etc.)
   */
  renderActions?: () => ReactNode;

  /**
   * Whether to show the delivery time section
   */
  showDeliveryTime?: boolean;

  /**
   * Whether to show the countdown section
   */
  showCountdown?: boolean;
}

// Re-export types from contracts for convenience
export type { DeliveryAddress, DeliverySlot, DeliveryBarSection };
