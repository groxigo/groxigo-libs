'use client';

import { forwardRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { HeroSectionPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './HeroSection.module.css';

export interface HeroSectionProps extends HeroSectionPropsBase {}

/**
 * HeroSection — full-bleed hero banner with headline, subheadline,
 * email capture form, and sign-in link.
 *
 * Heights: 480px mobile, 520px tablet, 600px large.
 * Background image with scrim gradient overlay.
 */
export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      headline,
      subheadline,
      backgroundImage,
      onGetStarted,
      onSignIn,
      ctaLabel = 'Get Started',
      className,
      testID,
    },
    ref
  ) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (email.trim()) {
        onGetStarted(email.trim());
      }
    };

    return (
      <section
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="region"
        aria-label="Hero"
      >
        {backgroundImage && (
          <div
            className={styles.background}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
        )}
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.content}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subheadline}>{subheadline}</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.emailInput}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.ctaButton}>
              {ctaLabel}
            </button>
          </form>

          <button
            type="button"
            className={styles.signInLink}
            onClick={onSignIn}
          >
            Already have an account? <span className={styles.signInText}>Sign in</span>
          </button>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
export default HeroSection;
