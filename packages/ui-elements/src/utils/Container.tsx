import { View, Platform } from 'react-native';
import { tokens } from '@groxigo/tokens/react-native';
import type { ViewProps } from 'react-native';

export interface ContainerProps extends ViewProps {
  /**
   * Maximum width of the container
   * @default 1440 (web), unlimited (mobile)
   */
  maxWidth?: number;
  
  /**
   * Minimum width of the container
   * @default 375
   */
  minWidth?: number;
  
  /**
   * Whether to enable horizontal scrolling for screens smaller than minWidth
   * @default true
   */
  allowHorizontalScroll?: boolean;
  
  /**
   * Whether to center the container on larger screens
   * @default true (web), false (mobile)
   */
  centered?: boolean;
  
  /**
   * Padding around the container
   * @default responsive (16px mobile, 24px web)
   */
  padding?: number;
  
  children: React.ReactNode;
}

/**
 * Responsive Container component
 * Provides max-width constraints, centering, and horizontal scroll handling
 * Mobile: Full width (375px+)
 * Web: Max 1440px, centered
 */
export const Container = ({
  maxWidth,
  minWidth = tokens.breakpoints.mobile,
  allowHorizontalScroll = true,
  centered,
  padding,
  children,
  style,
  ...props
}: ContainerProps) => {
  const isWeb = Platform.OS === 'web';
  const defaultMaxWidth = isWeb ? tokens.breakpoints.large : undefined;
  const defaultPadding = isWeb ? tokens.spacing[6] : tokens.spacing[4];
  const shouldCenter = centered !== undefined ? centered : isWeb;
  
  const containerMaxWidth = maxWidth !== undefined ? maxWidth : defaultMaxWidth;
  const containerPadding = padding !== undefined ? padding : defaultPadding;

  const containerStyle = {
    ...(containerMaxWidth && { maxWidth: containerMaxWidth }),
    minWidth: minWidth,
    padding: containerPadding,
    // alignSelf is React Native-specific; keep value within allowed enum
    ...(shouldCenter && { alignSelf: 'auto' as const }),
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};

export default Container;

