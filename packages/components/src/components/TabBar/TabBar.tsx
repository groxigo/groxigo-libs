import { View } from 'react-native';
import { Tabs, useTheme } from '@groxigo/ui-elements';
import type { TabBarProps } from './TabBar.types';

/**
 * TabBar component
 *
 * Tab navigation bar (wrapper around Tabs primitive).
 * Uses theme colors for consistent styling across platforms.
 */
export const TabBar = ({
  items,
  selectedId,
  onSelect,
  variant = 'default',
  size = 'md',
  style,
  ...props
}: TabBarProps) => {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          paddingVertical: theme.spacing[2],
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        style,
      ]}
      {...props}
    >
      <Tabs
        items={items}
        selectedId={selectedId}
        onSelect={onSelect}
        variant={variant}
        size={size}
        fullWidth
      />
    </View>
  );
};

export default TabBar;
