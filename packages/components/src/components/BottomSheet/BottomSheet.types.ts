import { ViewProps, ViewStyle } from 'react-native';

export interface BottomSheetProps extends Omit<ViewProps, 'style'> {
  /**
   * Whether the bottom sheet is visible
   */
  visible: boolean;
  
  /**
   * Callback when bottom sheet is closed
   */
  onClose: () => void;
  
  /**
   * Title of the bottom sheet
   */
  title?: string;
  
  /**
   * Content of the bottom sheet
   */
  children: React.ReactNode;
  
  /**
   * Whether the bottom sheet is dismissible by tapping backdrop
   * @default true
   */
  dismissible?: boolean;
  
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Content container style
   */
  contentStyle?: ViewStyle;
}

