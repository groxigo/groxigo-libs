import { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { Badge, Text, useTheme } from '@groxigo/ui-elements';
import type { FilterBarProps } from './FilterBar.types';

/**
 * FilterBar component
 *
 * Horizontal scrollable filter controls.
 * Uses theme colors for consistent styling across platforms.
 */
export const FilterBar = ({
  filters,
  selectedFilters: controlledSelectedFilters,
  onFiltersChange,
  multiSelect = true,
  showCounts = false,
  section,
  testID,
  style,
  ...props
}: FilterBarProps) => {
  const theme = useTheme();
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  const selectedFilters = controlledSelectedFilters !== undefined
    ? controlledSelectedFilters
    : internalSelected;

  const handleFilterPress = (filterId: string) => {
    let newSelected: string[];

    if (multiSelect) {
      if (selectedFilters.includes(filterId)) {
        newSelected = selectedFilters.filter(id => id !== filterId);
      } else {
        newSelected = [...selectedFilters, filterId];
      }
    } else {
      newSelected = selectedFilters.includes(filterId) ? [] : [filterId];
    }

    if (controlledSelectedFilters === undefined) {
      setInternalSelected(newSelected);
    }
    onFiltersChange?.(newSelected);
  };

  return (
    <View style={[{ marginVertical: theme.spacing[2] }, style]} testID={testID} {...props}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing[3],
          gap: theme.spacing[2],
        }}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilters.includes(filter.id);

          return (
            <Pressable
              key={filter.id}
              onPress={() => handleFilterPress(filter.id)}
              style={({ pressed }) => [
                styles.filterButton,
                {
                  paddingHorizontal: theme.spacing[4],
                  paddingVertical: theme.spacing[2],
                  borderRadius: theme.radius.full,
                  borderWidth: 1,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  backgroundColor: isSelected
                    ? theme.colors.primary + '20'
                    : theme.colors.surface,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={filter.label}
            >
              <View style={[styles.filterContent, { gap: theme.spacing[1] }]}>
                <Text
                  variant="bodySmall"
                  style={{
                    color: isSelected ? theme.colors.primary : theme.colors.text,
                    fontWeight: isSelected ? '600' : '400',
                  }}
                >
                  {filter.label}
                </Text>
                {showCounts && filter.count !== undefined && (
                  <Badge variant="solid" size="sm">
                    {filter.count}
                  </Badge>
                )}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

FilterBar.displayName = 'FilterBar';

const styles = StyleSheet.create({
  filterButton: {},
  filterContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FilterBar;
