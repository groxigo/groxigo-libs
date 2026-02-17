'use client';

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import type { LandingHeaderPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './LandingHeader.module.css';

export interface LandingHeaderProps extends LandingHeaderPropsBase {
  className?: string;
  /** Extra content rendered before the sign-in button (e.g. language switcher) */
  children?: ReactNode;
}

/**
 * LandingHeader — sticky transparent-to-solid header for the marketing landing page.
 *
 * Default: transparent background overlaying the hero.
 * When `isScrolled`: solid surface background with shadow.
 */
export const LandingHeader = forwardRef<HTMLElement, LandingHeaderProps>(
  ({ logoSrc, onSignIn, signInLabel = 'Sign In', isScrolled = false, className, testID, children }, ref) => {
    return (
      <header
        ref={ref}
        className={clsx(
          styles.root,
          isScrolled && styles.scrolled,
          className
        )}
        data-testid={testID}
        role="banner"
      >
        <div className={styles.content}>
          <div className={styles.logo}>
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Groxigo"
                className={styles.logoImage}
              />
            ) : (
              <span className={styles.logoText}>Groxigo</span>
            )}
          </div>

          <div className={styles.actions}>
            {children}
            <button
              type="button"
              className={styles.signInButton}
              onClick={onSignIn}
            >
              {signInLabel}
            </button>
          </div>
        </div>
      </header>
    );
  }
);

LandingHeader.displayName = 'LandingHeader';
export default LandingHeader;
