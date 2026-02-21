import type { FC } from 'react';

export interface IconComponentProps {
  size?: number;
  color?: string;
  style?: unknown;
  accessibilityLabel?: string;
  testID?: string;
  className?: string;
}

export type IconComponent = FC<IconComponentProps>;
