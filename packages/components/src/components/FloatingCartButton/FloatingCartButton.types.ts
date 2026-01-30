import { ViewStyle, ImageSourcePropType } from 'react-native';

export interface FloatingCartButtonProps {
  /**
   * Number of items in cart
   */
  itemCount: number;

  /**
   * Image source for the first cart item preview
   */
  previewImage?: ImageSourcePropType | { uri: string };

  /**
   * Callback when button is pressed
   */
  onPress?: () => void;

  /**
   * Primary label text
   * @default "View cart"
   */
  label?: string;

  /**
   * Bottom offset from safe area
   * @default 70
   */
  bottomOffset?: number;

  /**
   * Custom container style
   */
  style?: ViewStyle;

  /**
   * Whether to show the button (overrides itemCount check)
   */
  visible?: boolean;
}
