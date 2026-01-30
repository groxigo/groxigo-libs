/**
 * ErrorState Component (Web)
 *
 * Displays an error state with icon, message, and optional retry action.
 * Implements @groxigo/contracts ErrorStatePropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { Button, Icon, cn } from '@groxigo/ui-elements-web';
import type { ErrorStatePropsBase } from '@groxigo/contracts';

export interface ErrorStateProps extends ErrorStatePropsBase {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display (defaults to warning) */
  icon?: string;
  /** Whether the retry action is in loading state */
  retryLoading?: boolean;
  /** Custom illustration/image (replaces icon) */
  illustration?: React.ReactNode;
  /** Error code or reference (displayed in smaller text) */
  errorCode?: string;
}

const sizeClasses = {
  sm: {
    container: 'py-8 px-4',
    title: 'text-base',
    message: 'text-sm',
    iconSize: 'lg' as const,
  },
  md: {
    container: 'py-12 px-4',
    title: 'text-lg',
    message: 'text-base',
    iconSize: 'xl' as const,
  },
  lg: {
    container: 'py-16 px-6',
    title: 'text-xl',
    message: 'text-lg',
    iconSize: '2xl' as const,
  },
};

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      title = 'Something went wrong',
      message,
      retryLabel = 'Try Again',
      onRetry,
      section = 'default',
      size = 'md',
      icon = 'warning',
      retryLoading,
      illustration,
      errorCode,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];

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
        ) : (
          <div className="mb-4 text-error">
            <Icon
              name={icon as any}
              size={sizeConfig.iconSize}
              colorScheme="error"
            />
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            'font-medium text-text-primary mb-2',
            sizeConfig.title
          )}
        >
          {title}
        </h3>

        {/* Message */}
        <p
          className={cn(
            'text-text-secondary max-w-sm',
            sizeConfig.message,
            onRetry ? 'mb-6' : 'mb-2'
          )}
        >
          {message}
        </p>

        {/* Error Code */}
        {errorCode && (
          <p className="text-xs text-text-tertiary mb-4 font-mono">
            Error: {errorCode}
          </p>
        )}

        {/* Retry Button */}
        {onRetry && (
          <Button
            variant="solid"
            colorScheme={section === 'recipes' ? 'secondary' : 'primary'}
            onPress={onRetry}
            loading={retryLoading}
            leftIcon={
              <Icon name="refresh" size="sm" className="text-current" />
            }
          >
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }
);

ErrorState.displayName = 'ErrorState';

export default ErrorState;
