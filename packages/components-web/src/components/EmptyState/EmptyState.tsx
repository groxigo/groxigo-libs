/**
 * EmptyState Component (Web)
 *
 * Displays an empty list state with icon, title, description, and optional action.
 * Implements @groxigo/contracts EmptyStatePropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { Button, Icon, cn } from '@groxigo/ui-elements-web';
import type { EmptyStatePropsBase } from '@groxigo/contracts';

export interface EmptyStateProps extends EmptyStatePropsBase {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon size override */
  iconSize?: 'md' | 'lg' | 'xl' | '2xl';
  /** Action button variant */
  actionVariant?: 'solid' | 'outline' | 'ghost';
  /** Custom illustration/image (replaces icon) */
  illustration?: React.ReactNode;
}

const sizeClasses = {
  sm: {
    container: 'py-8 px-4',
    title: 'text-base',
    description: 'text-sm',
    iconSize: 'lg' as const,
  },
  md: {
    container: 'py-12 px-4',
    title: 'text-lg',
    description: 'text-base',
    iconSize: 'xl' as const,
  },
  lg: {
    container: 'py-16 px-6',
    title: 'text-xl',
    description: 'text-lg',
    iconSize: '2xl' as const,
  },
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon = 'inbox',
      title,
      description,
      actionLabel,
      onAction,
      section = 'default',
      size = 'md',
      iconSize,
      actionVariant = 'solid',
      illustration,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];

    // Section-based accent colors
    const sectionColors = {
      default: 'text-gray-400',
      groceries: 'text-primary-400',
      recipes: 'text-secondary-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          sizeConfig.container,
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Icon or Illustration */}
        {illustration ? (
          <div className="mb-4">{illustration}</div>
        ) : icon ? (
          <div className={cn('mb-4', sectionColors[section])}>
            <Icon
              name={icon as any}
              size={iconSize || sizeConfig.iconSize}
              colorScheme="muted"
            />
          </div>
        ) : null}

        {/* Title */}
        <h3
          className={cn(
            'font-medium text-text-primary mb-2',
            sizeConfig.title
          )}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p
            className={cn(
              'text-text-secondary max-w-sm mb-6',
              sizeConfig.description
            )}
          >
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && onAction && (
          <Button
            variant={actionVariant}
            colorScheme={section === 'recipes' ? 'secondary' : 'primary'}
            onPress={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
