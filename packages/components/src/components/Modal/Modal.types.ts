import { ViewStyle } from 'react-native';

export interface ModalProps {
  /**
   * Whether the modal is visible
   */
  visible: boolean;
  
  /**
   * Callback when modal should be closed (backdrop press or close button)
   */
  onClose?: () => void;
  
  /**
   * Modal title
   */
  title?: string;
  
  /**
   * Modal content
   */
  children: React.ReactNode;
  
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether clicking backdrop closes the modal
   * @default true
   */
  dismissible?: boolean;
  
  /**
   * Size of the modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
  
  /**
   * Additional container style
   */
  style?: ViewStyle;
  
  /**
   * Additional content style
   */
  contentStyle?: ViewStyle;
}







