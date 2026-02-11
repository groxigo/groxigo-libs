'use client';

import { forwardRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { HeroSectionPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './HeroSection.module.css';

export interface HeroSectionProps extends HeroSectionPropsBase {}

/* ─── Inline SVG brand icons (from Unicons) ─── */

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.6023 10.004C22.5606 9.77333 22.4393 9.56467 22.2594 9.41438C22.0796 9.2641 21.8527 9.18174 21.6184 9.18168H12.2C12.0686 9.18165 11.9386 9.20749 11.8172 9.25774C11.6959 9.30798 11.5857 9.38164 11.4928 9.4745C11.3999 9.56737 11.3263 9.67762 11.276 9.79896C11.2258 9.9203 11.1999 10.0504 11.2 10.1817V14.0498C11.1999 14.1812 11.2258 14.3112 11.276 14.4326C11.3263 14.5539 11.3999 14.6642 11.4928 14.757C11.5857 14.8499 11.6959 14.9236 11.8172 14.9738C11.9386 15.024 12.0686 15.0499 12.2 15.0498H16.1624C15.88 15.5264 15.493 15.9325 15.0305 16.2373C14.1854 16.7732 13.2004 17.0464 12.2 17.0225C11.1624 17.0106 10.1551 16.6721 9.32096 16.0549C8.48686 15.4378 7.86849 14.5734 7.55373 13.5847L7.55344 13.583C7.20317 12.5564 7.20317 11.4427 7.55344 10.416L7.55368 10.4144C7.86866 9.4259 8.48712 8.56179 9.3212 7.94483C10.1553 7.32787 11.1626 6.98943 12.2 6.97758C12.7764 6.96435 13.3497 7.06512 13.8871 7.2741C14.4245 7.48309 14.9152 7.79616 15.3313 8.19535C15.5202 8.37591 15.7723 8.47537 16.0337 8.47245C16.295 8.46953 16.5448 8.36447 16.7297 8.17974L19.5979 5.31156C19.6929 5.21667 19.7678 5.10359 19.8182 4.97908C19.8685 4.85458 19.8932 4.72121 19.8908 4.58693C19.8885 4.45266 19.8591 4.32024 19.8044 4.19759C19.7497 4.07494 19.6708 3.96458 19.5725 3.87309C17.5766 2.0018 14.9357 0.972656 12.2 1.00004C10.1599 0.994009 8.15873 1.55806 6.4221 2.62858C4.68547 3.69911 3.28247 5.23353 2.37131 7.05883L2.36984 7.0606C1.59737 8.59235 1.19659 10.2845 1.19997 12C1.20241 13.7149 1.60289 15.4057 2.36989 16.9395L2.37136 16.9413C3.28252 18.7665 4.68551 20.301 6.42213 21.3715C8.15875 22.442 10.1599 23.0061 12.2 23C14.8853 23.068 17.4951 22.1067 19.4947 20.313C20.5803 19.2688 21.434 18.011 22.003 16.6188C22.5719 15.2267 22.8434 13.7309 22.8001 12.2276C22.8005 11.482 22.7343 10.7378 22.6023 10.004Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M15.12 5.32003H17V2.14003C16.0897 2.04538 15.1751 1.99865 14.26 2.00003C11.54 2.00003 9.67999 3.66003 9.67999 6.70003V9.32003H6.60999V12.88H9.67999V22H13.36V12.88H16.42L16.88 9.32003H13.36V7.05003C13.36 6.00003 13.64 5.32003 15.12 5.32003Z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M14.94 5.19C15.3181 4.75428 15.6063 4.24817 15.7882 3.70074C15.9701 3.1533 16.0421 2.57533 16 2C14.8394 2.09369 13.762 2.63956 13 3.52C12.6351 3.94198 12.3586 4.43288 12.1868 4.96364C12.015 5.49441 11.9515 6.05424 12 6.61C12.5661 6.61472 13.1258 6.4891 13.6356 6.24286C14.1454 5.99662 14.5917 5.63637 14.94 5.19ZM17.46 12.63C17.4667 11.8637 17.6685 11.1118 18.0465 10.4452C18.4244 9.77859 18.9659 9.21926 19.62 8.82C19.2072 8.22524 18.6615 7.73483 18.0262 7.38767C17.3909 7.04052 16.6835 6.84615 15.96 6.82C14.4 6.66 12.96 7.73 12.13 7.73C11.3 7.73 10.13 6.84 8.83 6.86C7.98013 6.888 7.15202 7.13578 6.42645 7.57919C5.70088 8.02259 5.10261 8.64648 4.69 9.39C2.93 12.45 4.24 17 6 19.47C6.8 20.68 7.8 22.05 9.12 22C10.44 21.95 10.87 21.18 12.4 21.18C13.93 21.18 14.4 22 15.7 21.97C17 21.94 17.92 20.73 18.76 19.52C19.355 18.6415 19.8199 17.6816 20.14 16.67C19.3475 16.332 18.6713 15.7693 18.195 15.0513C17.7188 14.3333 17.4632 13.4916 17.46 12.63Z" />
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
                <span className={styles.dividerText}>or</span>
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
