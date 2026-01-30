/**
 * SDUIRenderer Component
 *
 * Renders components from server-driven UI data.
 */

import React, { useMemo } from 'react';
import type { ComponentRegistry } from '../types/registry';
import type { SDUIComponent, SDUISection } from '../types/components';
import type { SDUIAction } from '../types/actions';

export interface SDUIRendererProps {
  /** Component data from server */
  data: SDUIComponent;
  /** Component registry */
  registry: ComponentRegistry;
  /** Action handler function */
  onAction?: (action: SDUIAction) => void;
  /** Fallback component for unknown types */
  fallback?: React.ComponentType<{ type: string }>;
}

/**
 * Renders a single SDUI component
 */
export function SDUIRenderer({
  data,
  registry,
  onAction,
  fallback: Fallback,
}: SDUIRendererProps): React.ReactElement | null {
  const { type, props, actions, children, style } = data;

  // Get registered component
  const registered = registry[type];

  if (!registered) {
    console.warn(`SDUIRenderer: Unknown component type "${type}"`);
    if (Fallback) {
      return <Fallback type={type} />;
    }
    return null;
  }

  const { component: Component, defaultProps, actionProps = [] } = registered;

  // Build final props
  const finalProps = useMemo(() => {
    // Start with default props
    const result: Record<string, unknown> = { ...defaultProps, ...props };

    // Convert actions to handler functions
    if (actions && onAction) {
      for (const [propName, action] of Object.entries(actions)) {
        if (actionProps.includes(propName) || propName.startsWith('on')) {
          // For quantity change, we need to wrap it differently
          if (propName === 'onQuantityChange' && action.type === 'UPDATE_CART_QUANTITY') {
            result[propName] = (quantity: number) => {
              onAction({
                ...action,
                quantity,
              } as SDUIAction);
            };
          } else {
            result[propName] = () => onAction(action);
          }
        }
      }
    }

    // Apply style overrides
    if (style) {
      result.style = { ...(result.style as object), ...style };
    }

    return result;
  }, [props, actions, onAction, actionProps, defaultProps, style]);

  // Render children if present
  const renderedChildren = useMemo(() => {
    if (!children || children.length === 0) return undefined;

    return children.map((child, index) => (
      <SDUIRenderer
        key={child.key ?? index}
        data={child}
        registry={registry}
        onAction={onAction}
        fallback={Fallback}
      />
    ));
  }, [children, registry, onAction, Fallback]);

  return <Component {...finalProps}>{renderedChildren}</Component>;
}

/**
 * Props for SDUISectionRenderer
 */
export interface SDUISectionRendererProps {
  /** Section data from server */
  section: SDUISection;
  /** Component registry */
  registry: ComponentRegistry;
  /** Action handler function */
  onAction?: (action: SDUIAction) => void;
  /** Fallback component for unknown types */
  fallback?: React.ComponentType<{ type: string }>;
  /** Section wrapper component */
  SectionWrapper?: React.ComponentType<{
    section: SDUISection;
    children: React.ReactNode;
  }>;
}

/**
 * Renders an SDUI section with its components
 */
export function SDUISectionRenderer({
  section,
  registry,
  onAction,
  fallback,
  SectionWrapper,
}: SDUISectionRendererProps): React.ReactElement {
  const content = (
    <>
      {section.components.map((component, index) => (
        <SDUIRenderer
          key={component.key ?? index}
          data={component}
          registry={registry}
          onAction={onAction}
          fallback={fallback}
        />
      ))}
    </>
  );

  if (SectionWrapper) {
    return <SectionWrapper section={section}>{content}</SectionWrapper>;
  }

  return <>{content}</>;
}

/**
 * Props for SDUIScreenRenderer
 */
export interface SDUIScreenRendererProps {
  /** Components or sections to render */
  data: SDUIComponent[] | SDUISection[];
  /** Component registry */
  registry: ComponentRegistry;
  /** Action handler function */
  onAction?: (action: SDUIAction) => void;
  /** Fallback component for unknown types */
  fallback?: React.ComponentType<{ type: string }>;
  /** Check if data is sections (has 'components' property) */
  isSections?: boolean;
  /** Section wrapper component */
  SectionWrapper?: React.ComponentType<{
    section: SDUISection;
    children: React.ReactNode;
  }>;
}

/**
 * Renders a list of SDUI components or sections
 */
export function SDUIScreenRenderer({
  data,
  registry,
  onAction,
  fallback,
  isSections,
  SectionWrapper,
}: SDUIScreenRendererProps): React.ReactElement {
  // Determine if we're rendering sections or components
  const renderingSections =
    isSections ?? (data.length > 0 && 'components' in data[0]);

  if (renderingSections) {
    return (
      <>
        {(data as SDUISection[]).map((section, index) => (
          <SDUISectionRenderer
            key={section.id ?? index}
            section={section}
            registry={registry}
            onAction={onAction}
            fallback={fallback}
            SectionWrapper={SectionWrapper}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {(data as SDUIComponent[]).map((component, index) => (
        <SDUIRenderer
          key={component.key ?? index}
          data={component}
          registry={registry}
          onAction={onAction}
          fallback={fallback}
        />
      ))}
    </>
  );
}
