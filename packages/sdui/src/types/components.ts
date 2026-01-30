/**
 * SDUI Component Types
 *
 * Defines the structure for server-driven UI components.
 */

import type { SDUIAction } from './actions';
import type { SDUIColorProps } from './colors';

/**
 * Base component definition from server
 */
export interface SDUIComponent<P = Record<string, unknown>> {
  /** Component type - maps to registry */
  type: string;
  /** Component props (serializable) */
  props: P & SDUIColorProps;
  /** Action handlers (maps prop names to actions) */
  actions?: Record<string, SDUIAction>;
  /** Unique key for list rendering */
  key?: string;
  /** Children components */
  children?: SDUIComponent[];
  /** Conditional rendering expression */
  condition?: string;
  /** Style overrides */
  style?: Record<string, unknown>;
}

/**
 * Section definition - a named group of components
 */
export interface SDUISection {
  /** Section ID */
  id: string;
  /** Section type for custom rendering */
  type?: string;
  /** Section title */
  title?: string;
  /** Components in this section */
  components: SDUIComponent[];
  /** Section-level color props */
  colorProps?: SDUIColorProps;
  /** Section-level style */
  style?: Record<string, unknown>;
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Default collapsed state */
  collapsed?: boolean;
  /** Action when section header is pressed */
  onHeaderPress?: SDUIAction;
  /** "See all" action */
  seeAllAction?: SDUIAction;
}

/**
 * Screen definition - complete screen from server
 */
export interface SDUIScreen {
  /** Screen ID */
  id: string;
  /** Screen title */
  title?: string;
  /** Sections on this screen */
  sections: SDUISection[];
  /** Screen-level header config */
  header?: SDUIComponent;
  /** Screen-level footer config */
  footer?: SDUIComponent;
  /** Pull to refresh action */
  onRefresh?: SDUIAction;
  /** Screen background */
  background?: SDUIColorProps['background'];
  /** Analytics screen name */
  analyticsName?: string;
}

/**
 * API response wrapper for SDUI
 */
export interface SDUIResponse {
  /** The screen/section data */
  data: SDUIScreen | SDUISection | SDUIComponent[];
  /** Cache TTL in seconds */
  cacheTTL?: number;
  /** Version for cache invalidation */
  version?: string;
}
