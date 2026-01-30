/**
 * SearchBar Component (Web)
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@groxigo/ui-elements-web';
import type { SearchBarPropsBase } from '@groxigo/contracts';

const variantClasses: Record<string, string> = {
  outline: 'border border-border bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100',
  filled: 'bg-surface-secondary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100',
};

const sizeClasses: Record<string, { container: string; input: string; icon: string }> = {
  sm: {
    container: 'h-9 px-3 rounded-lg',
    input: 'text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    container: 'h-11 px-4 rounded-xl',
    input: 'text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    container: 'h-14 px-5 rounded-2xl',
    input: 'text-lg',
    icon: 'w-6 h-6',
  },
};

export interface SearchBarProps extends SearchBarPropsBase {}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      value,
      placeholder = 'Search...',
      variant = 'filled',
      size = 'md',
      autoFocus,
      showCancel,
      onChangeText,
      onSubmit,
      onFocus,
      onBlur,
      onCancel,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value || '');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync with controlled value
    useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value);
      }
    }, [value]);

    const sizeConfig = sizeClasses[size];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChangeText?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmit?.(localValue);
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        onCancel?.();
      }
    };

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleClear = () => {
      setLocalValue('');
      onChangeText?.('');
      inputRef.current?.focus();
    };

    const handleCancel = () => {
      setLocalValue('');
      onChangeText?.('');
      inputRef.current?.blur();
      onCancel?.();
    };

    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div
          className={cn(
            'flex-1 flex items-center gap-3 transition-all',
            variantClasses[variant],
            sizeConfig.container
          )}
        >
          {/* Search icon */}
          <svg
            className={cn('text-text-secondary flex-shrink-0', sizeConfig.icon)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input */}
          <input
            ref={(node) => {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            type="text"
            value={localValue}
            placeholder={placeholder}
            autoFocus={autoFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              'flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary',
              sizeConfig.input
            )}
            data-testid={testID}
            {...props}
          />

          {/* Clear button */}
          {localValue && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-shrink-0 text-text-tertiary hover:text-text-secondary"
            >
              <svg className={sizeConfig.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Cancel button */}
        {showCancel && isFocused && (
          <button
            type="button"
            onClick={handleCancel}
            className="text-primary-600 font-medium hover:text-primary-700 whitespace-nowrap"
          >
            Cancel
          </button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
