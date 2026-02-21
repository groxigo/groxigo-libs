import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { IconComponent, IconComponentProps } from './types';

export function createIcon(name: string, pathData: string | string[]): IconComponent {
  const paths = Array.isArray(pathData) ? pathData : [pathData];

  const Icon = ({
    size = 24,
    color = '#000',
    style,
    accessibilityLabel,
    testID,
  }: IconComponentProps) => (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style as StyleProp<ViewStyle>}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      {paths.map((d, i) => (
        <Path key={i} d={d} fill={color} />
      ))}
    </Svg>
  );

  Icon.displayName = name;
  return Icon;
}
