import type { FC } from 'react';

export interface IconComponentProps {
  size?: number;
  color?: string;
  style?: any;
  accessibilityLabel?: string;
  testID?: string;
  className?: string;
}

export type IconComponent = FC<IconComponentProps>;
