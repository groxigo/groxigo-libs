import type { CSSProperties } from 'react';
import type { IconComponent, IconComponentProps } from './types';

export function createIcon(name: string, pathData: string | string[]): IconComponent {
  const paths = Array.isArray(pathData) ? pathData : [pathData];

  const Icon = ({
    size = 24,
    color = 'currentColor',
    style,
    accessibilityLabel,
    testID,
    className,
  }: IconComponentProps) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      style={style as CSSProperties}
      aria-label={accessibilityLabel}
      data-testid={testID}
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );

  Icon.displayName = name;
  return Icon;
}
