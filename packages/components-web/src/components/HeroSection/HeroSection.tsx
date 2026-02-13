'use client';

import { forwardRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { HeroSectionPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './HeroSection.module.css';

export interface HeroSectionProps extends HeroSectionPropsBase {
  className?: string;
}

/* ─── Inline SVG brand icons (colored, matching AuthCard) ─── */

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879V12.89h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.989C16.343 19.129 20 14.99 20 10z" fill="#1877F2" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
    <path d="M14.94 14.34c-.35.81-.52 1.17-.97 1.89-.63.99-1.52 2.23-2.62 2.24-1.23.01-1.55-.8-3.22-.79-1.67.01-2.02.81-3.25.8-1.1-.01-1.94-1.11-2.57-2.1C.73 13.73.29 10.65 1.46 8.7c.82-1.37 2.25-2.17 3.57-2.17 1.33 0 2.16.8 3.26.8 1.07 0 1.72-.81 3.26-.81 1.17 0 2.44.64 3.25 1.74-2.85 1.56-2.39 5.63.14 6.08zM11.17 4.4c.49-.63.86-1.52.73-2.43-.8.05-1.74.56-2.29 1.22-.5.59-.92 1.5-.76 2.37.88.03 1.79-.49 2.32-1.16z" />
  </svg>
);

/**
 * HeroSection — full-bleed hero banner with headline, subheadline,
 * email capture form, "or" divider, and SSO icon buttons.
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
      ctaLabel = 'Continue',
      emailPlaceholder = 'Sign in or sign up using email',
      dividerText = 'or',
      onGoogleAuth,
      onFacebookAuth,
      onAppleAuth,
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

    const hasSso = !!(onGoogleAuth || onFacebookAuth || onAppleAuth);

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
              placeholder={emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.ctaButton}>
              {ctaLabel}
            </button>
          </form>

          {hasSso && (
            <>
              <div className={styles.dividerRow}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>{dividerText}</span>
                <span className={styles.dividerLine} />
              </div>

              <div className={styles.ssoIconRow}>
                {onGoogleAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onGoogleAuth}
                    aria-label="Continue with Google"
                  >
                    <GoogleIcon />
                  </button>
                )}
                {onFacebookAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onFacebookAuth}
                    aria-label="Continue with Facebook"
                  >
                    <FacebookIcon />
                  </button>
                )}
                {onAppleAuth && (
                  <button
                    type="button"
                    className={styles.ssoIcon}
                    onClick={onAppleAuth}
                    aria-label="Continue with Apple"
                  >
                    <AppleIcon />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
);

HeroSection.displayName = 'HeroSection';
export default HeroSection;
