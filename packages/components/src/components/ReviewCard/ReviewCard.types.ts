import { ViewProps, ViewStyle, ImageSourcePropType } from 'react-native';

export interface ReviewCardProps extends Omit<ViewProps, 'style'> {
  /**
   * Reviewer name
   */
  reviewerName: string;
  
  /**
   * Reviewer avatar
   */
  reviewerAvatar?: ImageSourcePropType;
  
  /**
   * Rating value (0-5)
   */
  rating: number;
  
  /**
   * Review text
   */
  review: string;
  
  /**
   * Review date
   */
  date?: Date | string;
  
  /**
   * Whether review is verified
   * @default false
   */
  verified?: boolean;
  
  /**
   * Container style
   */
  style?: ViewStyle;
  
  /**
   * Section for theming
   */
  section?: 'groceries' | 'recipes' | 'default';
}

