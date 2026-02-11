'use client';

import { forwardRef, useState, useRef, useCallback, type KeyboardEvent } from 'react';
import { Search, Times } from '@groxigo/icons/line';
import type { SearchBarPropsBase } from '@groxigo/contracts/components';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './SearchBar.module.css';

export interface SearchBarProps extends SearchBarPropsBase {}


export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  (
    {
      value = '',
      placeholder = 'Search groceries...',
      variant = 'filled',
      size = 'md',
      autoFocus = false,
      showCancel = false,
      onChangeText,
      onSubmit,
      onFocus,
      onBlur,
      onCancel,
      className,
      testID,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      onFocus?.();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      onBlur?.();
    }, [onBlur]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeText?.(e.target.value);
      },
      [onChangeText]
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSubmit?.(value);
        }
      },
      [onSubmit, value]
    );

    const handleClear = useCallback(() => {
      onChangeText?.('');
      inputRef.current?.focus();
    }, [onChangeText]);

    const handleCancel = useCallback(() => {
      onChangeText?.('');
      setIsFocused(false);
      inputRef.current?.blur();
      onCancel?.();
    }, [onChangeText, onCancel]);

    const hasValue = value.length > 0;

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          styles[variant],
          styles[size],
          isFocused && styles.focused,
          className
        )}
        data-testid={testID}
      >
        <span className={styles.searchIcon}>
          <Search size={20} />
        </span>

        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          role="searchbox"
          aria-label={placeholder}
        />

        {hasValue && (
          <Button
            variant="ghost"
            size="sm"
            onPress={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <Times size={20} />
          </Button>
        )}

        {showCancel && isFocused && (
          <Button
            variant="ghost"
            size="sm"
            onPress={handleCancel}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
export default SearchBar;
