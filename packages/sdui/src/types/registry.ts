/**
 * SDUI Registry Types
 *
 * Defines the component registry for mapping server types to React components.
 */

import type { ComponentType } from 'react';

/**
 * A registered component with metadata
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- type-erasure boundary: registry stores heterogeneous component types
export interface RegisteredComponent<P = any> {
  /** The React component */
  component: ComponentType<P>;
  /** Default props */
  defaultProps?: Partial<P>;
  /** Props that should be transformed from actions */
  actionProps?: string[];
  /** Props that accept children components */
  childrenProps?: string[];
}

/**
 * Component registry - maps type strings to components
 */
export type ComponentRegistry = Record<string, RegisteredComponent>;

/**
 * Registry builder for type-safe registration
 */
export interface RegistryBuilder {
  /** Register a component */
  register<P>(
    type: string,
    component: ComponentType<P>,
    options?: Omit<RegisteredComponent<P>, 'component'>
  ): RegistryBuilder;

  /** Build the registry */
  build(): ComponentRegistry;
}
