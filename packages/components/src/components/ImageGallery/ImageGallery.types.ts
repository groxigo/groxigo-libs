import { ViewProps, ViewStyle, ImageSourcePropType, ImageStyle } from 'react-native';

export interface ImageGalleryProps extends Omit<ViewProps, 'style'> {
  /**
   * Array of image sources
   */
  images: ImageSourcePropType[];
  
  /**
   * Initial image index
   * @default 0
   */
  initialIndex?: number;
  
  /**
   * Whether to show pagination dots
   * @default true
   */
  showPagination?: boolean;
  
  /**
   * Whether to show navigation arrows
   * @default true
   */
  showArrows?: boolean;
  
  /**
   * Whether gallery is looped (wraps around)
   * @default false
   */
  loop?: boolean;
  
  /**
   * Auto-play interval in milliseconds (0 = disabled)
   * @default 0
   */
  autoPlay?: number;
  
  /**
   * Callback when image index changes
   */
  onIndexChange?: (index: number) => void;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Image style
   */
  imageStyle?: ImageStyle;
}

