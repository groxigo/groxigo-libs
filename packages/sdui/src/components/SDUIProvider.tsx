/**
 * SDUIProvider Component
 *
 * Provides SDUI context to the component tree.
 */

import { createContext, useContext, useMemo, type ReactElement, type ReactNode } from 'react';
import type { ComponentRegistry } from '../types/registry';
import type { SDUIAction } from '../types/actions';
import { useActionHandler } from '../hooks/useActionHandler';
import type { UseActionHandlerOptions } from '../hooks/useActionHandler';

/**
 * SDUI Context value
 */
export interface SDUIContextValue {
  /** Component registry */
  registry: ComponentRegistry;
  /** Handle an action */
  handleAction: (action: SDUIAction) => void | Promise<void>;
  /** Convert actions map to props */
  mapActionsToProps: (
    actions?: Record<string, SDUIAction>
  ) => Record<string, () => void>;
}

const SDUIContext = createContext<SDUIContextValue | null>(null);

/**
 * Props for SDUIProvider
 */
export interface SDUIProviderProps {
  /** Component registry */
  registry: ComponentRegistry;
  /** Action handler options */
  actionHandlers: UseActionHandlerOptions;
  /** Children */
  children: ReactNode;
}

/**
 * Provider component for SDUI
 */
export function SDUIProvider({
  registry,
  actionHandlers,
  children,
}: SDUIProviderProps): ReactElement {
  const { handleAction, mapActionsToProps } = useActionHandler(actionHandlers);

  const value = useMemo<SDUIContextValue>(
    () => ({
      registry,
      handleAction,
      mapActionsToProps,
    }),
    [registry, handleAction, mapActionsToProps]
  );

  return <SDUIContext.Provider value={value}>{children}</SDUIContext.Provider>;
}

/**
 * Hook to access SDUI context
 */
export function useSDUI(): SDUIContextValue {
  const context = useContext(SDUIContext);

  if (!context) {
    throw new Error('useSDUI must be used within an SDUIProvider');
  }

  return context;
}

/**
 * Hook to access SDUI context (returns null if not in provider)
 */
export function useSDUISafe(): SDUIContextValue | null {
  return useContext(SDUIContext);
}
