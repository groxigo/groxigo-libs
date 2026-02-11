import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthCard } from '../AuthCard';

describe('AuthCard', () => {
  // ── Identify step (default) ──

  it('renders the brand name', () => {
    render(<AuthCard />);
    expect(screen.getByText('groxigo')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<AuthCard />);
    expect(screen.getByText('Fresh groceries delivered fast')).toBeInTheDocument();
  });

  it('renders Continue button on identify step', () => {
    render(<AuthCard />);
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('renders email input on identify step', () => {
    render(<AuthCard testID="auth" />);
    expect(screen.getByTestId('auth-email')).toBeInTheDocument();
  });

  it('renders Google SSO icon when onGoogleAuth is provided', () => {
    render(<AuthCard onGoogleAuth={() => {}} />);
    expect(screen.getByLabelText('Continue with Google')).toBeInTheDocument();
  });

  it('renders Apple SSO icon when onAppleAuth is provided', () => {
    render(<AuthCard onAppleAuth={() => {}} />);
    expect(screen.getByLabelText('Continue with Apple')).toBeInTheDocument();
  });

  it('renders Facebook SSO icon when onFacebookAuth is provided', () => {
    render(<AuthCard onFacebookAuth={() => {}} />);
    expect(screen.getByLabelText('Continue with Facebook')).toBeInTheDocument();
  });

  it('renders or divider when any SSO handler is provided', () => {
    render(<AuthCard onGoogleAuth={() => {}} />);
    expect(screen.getByText('or')).toBeInTheDocument();
  });

  it('does not render SSO section when no SSO handlers provided', () => {
    render(<AuthCard />);
    expect(screen.queryByText('or')).not.toBeInTheDocument();
  });

  // ── Sign In step ──

  it('renders Sign In button on signin step', () => {
    render(<AuthCard mode="signin" initialEmail="test@example.com" />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders password input on signin step', () => {
    render(<AuthCard mode="signin" initialEmail="test@example.com" testID="auth" />);
    expect(screen.getByTestId('auth-password')).toBeInTheDocument();
  });

  it('renders Welcome back heading on signin step', () => {
    render(<AuthCard mode="signin" initialEmail="test@example.com" />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
  });

  it('renders Forgot Password link on signin step', () => {
    render(
      <AuthCard
        mode="signin"
        initialEmail="test@example.com"
        onForgotPassword={() => {}}
      />
    );
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  // ── Sign Up step ──

  it('renders Create Account button on signup step', () => {
    render(<AuthCard mode="signup" />);
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('renders name fields on signup step', () => {
    render(<AuthCard mode="signup" testID="auth" />);
    expect(screen.getByTestId('auth-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('auth-lastName')).toBeInTheDocument();
  });

  it('renders Create your account heading on signup step', () => {
    render(<AuthCard mode="signup" />);
    expect(screen.getByText('Create your account')).toBeInTheDocument();
  });

  // ── Shared ──

  it('renders error message when provided', () => {
    render(<AuthCard error="Invalid email or password" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid email or password');
  });

  it('applies testID as data-testid', () => {
    render(<AuthCard testID="auth-card" />);
    expect(screen.getByTestId('auth-card')).toBeInTheDocument();
  });
});
