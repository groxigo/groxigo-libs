import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { InputProps } from '@groxigo/ui-elements';

/**
 * Search result item type - can be any data structure
 */
export type SearchResult = any;

/**
 * Render function for custom result items
 */
export type RenderResultItem = (result: SearchResult, index: number) => ReactNode;

export interface SearchBarProps extends Omit<InputProps, 'leftIcon' | 'rightIcon'> {
  /**
   * Callback when search text changes
   */
  onSearch?: (text: string) => void;
  
  /**
   * Callback when clear button is pressed
   */
  onClear?: () => void;
  
  /**
   * Whether to show clear button when there's text
   * @default true
   */
  showClearButton?: boolean;
  
  /**
   * Additional container style
   */
  containerStyle?: ViewStyle;
  
  /**
   * Array of search suggestions to rotate in placeholder
   * If provided, will cycle through these suggestions
   * @default ["atta", "tomato", "onion"]
   */
  placeholderSuggestions?: string[];
  
  /**
   * Interval in milliseconds for rotating placeholder suggestions
   * @default 5000
   */
  placeholderRotationInterval?: number;
  
  /**
   * Debounce delay in milliseconds for onSearch callback
   * @default 300
   */
  debounceMs?: number;
  
  /**
   * Minimum number of characters required before triggering search
   * @default 3
   */
  minSearchLength?: number;
  
  /**
   * Whether to show back button on the left
   * @default false
   */
  showBackButton?: boolean;
  
  /**
   * Callback when back button is pressed
   */
  onBack?: () => void;
  
  /**
   * Custom back icon component
   */
  backIcon?: ReactNode;
  
  /**
   * Array of search results to display in dropdown
   */
  results?: SearchResult[];
  
  /**
   * Function to render each result item
   * If not provided, results will be rendered as simple text
   */
  renderResultItem?: RenderResultItem;
  
  /**
   * Callback when a result item is selected
   */
  onResultSelect?: (result: SearchResult, index: number) => void;
  
  /**
   * Whether to show the results dropdown
   * @default true (when results array has items)
   */
  showResults?: boolean;
  
  /**
   * Maximum number of results to display
   * @default 5
   */
  maxResults?: number;
  
  /**
   * Whether search is in loading state
   * @default false
   */
  isLoading?: boolean;
}


