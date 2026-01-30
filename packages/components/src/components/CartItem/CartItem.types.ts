import type { ViewProps, ViewStyle, ImageSourcePropType } from 'react-native';
import type { CartItemPropsBase, CartItemSection } from '@groxigo/contracts';

/**
 * CartItem props for React Native
 *
 * Extends the platform-agnostic CartItemPropsBase from @groxigo/contracts
 * with React Native-specific properties and deprecated prop aliases for backward compatibility.
 */
export interface CartItemProps extends Omit<CartItemPropsBase, 'className'>, Omit<ViewProps, 'style'> {
  // ======================================
  // DEPRECATED PROPS (for backward compatibility)
  // ======================================

  /**
   * @deprecated Use `imageUrl` instead
   * Product image source
   */
  image?: ImageSourcePropType;

  // ======================================
  // REACT NATIVE-SPECIFIC PROPS
  // ======================================

  /**
   * Container style
   */
  style?: ViewStyle;
}

// Re-export types from contracts for convenience
export type { CartItemSection };
