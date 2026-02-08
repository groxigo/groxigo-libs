'use client';

import { forwardRef, useState, useCallback } from 'react';
import type {
  AuthCardPropsBase,
  AuthMode,
} from '@groxigo/contracts/components/auth-card';
import { Input, Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './AuthCard.module.css';

export type { AuthMode };

export interface AuthCardProps extends AuthCardPropsBase {}

/* Inline Google icon */
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

/* Inline Apple icon */
const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
    <path d="M14.94 14.34c-.35.81-.52 1.17-.97 1.89-.63.99-1.52 2.23-2.62 2.24-1.23.01-1.55-.8-3.22-.79-1.67.01-2.02.81-3.25.8-1.1-.01-1.94-1.11-2.57-2.1C.73 13.73.29 10.65 1.46 8.7c.82-1.37 2.25-2.17 3.57-2.17 1.33 0 2.16.8 3.26.8 1.07 0 1.72-.81 3.26-.81 1.17 0 2.44.64 3.25 1.74-2.85 1.56-2.39 5.63.14 6.08zM11.17 4.4c.49-.63.86-1.52.73-2.43-.8.05-1.74.56-2.29 1.22-.5.59-.92 1.5-.76 2.37.88.03 1.79-.49 2.32-1.16z" />
  </svg>
);

export const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      mode = 'signin',
      onSubmit,
      onGoogleAuth,
      onAppleAuth,
      onToggleMode,
      onForgotPassword,
      isLoading = false,
      error,
      className,
      testID,
    },
    ref
  ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isSignIn = mode === 'signin';

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoading && onSubmit) {
          onSubmit(email, password);
        }
      },
      [email, password, isLoading, onSubmit]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Logo area */}
        <div className={styles.logoArea}>
          <span className={styles.brand}>groxigo</span>
          <span className={styles.tagline}>Fresh groceries delivered fast</span>
        </div>

        {/* Form */}
        <form className={styles.formArea} onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            disabled={isLoading}
            fullWidth
            autoComplete="email"
            name="email"
            testID={testID ? `${testID}-email` : undefined}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            disabled={isLoading}
            fullWidth
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
            name="password"
            testID={testID ? `${testID}-password` : undefined}
          />

          {/* Error message */}
          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="solid"
            colorScheme="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            testID={testID ? `${testID}-submit` : undefined}
          >
            {isSignIn ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        {(onGoogleAuth || onAppleAuth) && (
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine} />
          </div>
        )}

        {/* Social buttons */}
        {(onGoogleAuth || onAppleAuth) && (
          <div className={styles.socialButtons}>
            {onGoogleAuth && (
              <Button
                variant="outline"
                colorScheme="primary"
                size="md"
                fullWidth
                onClick={onGoogleAuth}
                disabled={isLoading}
                leftIcon={<GoogleIcon />}
                testID={testID ? `${testID}-google` : undefined}
              >
                Continue with Google
              </Button>
            )}
            {onAppleAuth && (
              <Button
                variant="outline"
                colorScheme="primary"
                size="md"
                fullWidth
                onClick={onAppleAuth}
                disabled={isLoading}
                leftIcon={<AppleIcon />}
                testID={testID ? `${testID}-apple` : undefined}
              >
                Continue with Apple
              </Button>
            )}
          </div>
        )}

        {/* Footer: toggle mode + forgot password */}
        <div className={styles.footer}>
          {onToggleMode && (
            <div className={styles.toggleRow}>
              <span className={styles.toggleText}>
                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                className={styles.toggleLink}
                onClick={onToggleMode}
                disabled={isLoading}
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          )}
          {isSignIn && onForgotPassword && (
            <button
              type="button"
              className={styles.forgotLink}
              onClick={onForgotPassword}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    );
  }
);

AuthCard.displayName = 'AuthCard';
export default AuthCard;
