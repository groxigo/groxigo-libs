import { View } from 'react-native';
import { Select } from '@groxigo/ui-elements';
import type { SortSelectorProps } from './SortSelector.types';

/**
 * SortSelector component
 *
 * Dropdown for selecting sort options.
 * Uses theme-driven Select component from ui-elements.
 */
export const SortSelector = ({
  options,
  selectedId,
  onChange,
  label = 'Sort by',
  style,
  ...props
}: SortSelectorProps) => {
  const selectOptions = options.map(opt => ({
    label: opt.label,
    value: opt.id,
  }));

  const handleChange = (value: string | number) => {
    onChange?.(String(value));
  };

  return (
    <View style={style} {...props}>
      <Select
        label={label}
        options={selectOptions}
        value={selectedId}
        onChange={handleChange}
        placeholder="Select sort option"
        size="md"
      />
    </View>
  );
};

export default SortSelector;
