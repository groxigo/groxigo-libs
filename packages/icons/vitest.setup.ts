import { vi } from 'vitest';

// Mock react-native-svg with basic HTML elements
vi.mock('react-native-svg', async () => {
  const React = await vi.importActual<typeof import('react')>('react');

  const Svg = React.forwardRef(({ children, viewBox, width, height, style, accessibilityLabel, testID, ...props }: any, ref: any) =>
    React.createElement('svg', {
      ref,
      viewBox,
      width,
      height,
      style,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      ...props,
    }, children)
  );
  Svg.displayName = 'Svg';

  const Path = ({ d, fill, ...props }: any) =>
    React.createElement('path', { d, fill, ...props });

  return {
    __esModule: true,
    default: Svg,
    Svg,
    Path,
  };
});
