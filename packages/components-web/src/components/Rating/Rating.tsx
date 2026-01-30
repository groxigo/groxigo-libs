/**
 * Rating Component (Web)
 *
 * Star rating display and input component.
 * Implements @groxigo/contracts RatingPropsBase.
 */

'use client';

import React, { forwardRef, useState } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { RatingPropsBase } from '@groxigo/contracts';

const sizeClasses: Record<string, { icon: 'sm' | 'md' | 'lg'; gap: string }> = {
  sm: { icon: 'sm', gap: 'gap-0.5' },
  md: { icon: 'md', gap: 'gap-1' },
  lg: { icon: 'lg', gap: 'gap-1.5' },
};

export interface RatingProps extends RatingPropsBase {}

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      max = 5,
      editable = false,
      onChange,
      size = 'md',
      showValue = false,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null);
    const [internalValue, setInternalValue] = useState(value);
    const sizeConfig = sizeClasses[size];

    const currentValue = value !== undefined ? value : internalValue;
    const displayValue = hoverValue !== null ? hoverValue : currentValue;

    const handleClick = (index: number) => {
      if (!editable) return;
      const newValue = index + 1;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleMouseEnter = (index: number) => {
      if (!editable) return;
      setHoverValue(index + 1);
    };

    const handleMouseLeave = () => {
      if (!editable) return;
      setHoverValue(null);
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', sizeConfig.gap, className)}
        data-testid={testID}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const isFilled = index < displayValue;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              disabled={!editable}
              className={cn(
                'transition-transform',
                editable && 'cursor-pointer hover:scale-110 active:scale-95',
                !editable && 'cursor-default',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:rounded'
              )}
              aria-label={`Rate ${index + 1} of ${max} stars`}
            >
              <Icon
                name={isFilled ? 'star-fill' : 'star'}
                size={sizeConfig.icon}
                colorScheme={isFilled ? 'warning' : 'muted'}
              />
            </button>
          );
        })}
        {showValue && (
          <Text variant="caption" colorScheme="muted" className="ml-2">
            {currentValue.toFixed(1)}
          </Text>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
