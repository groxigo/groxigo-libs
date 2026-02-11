import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PreferencesCard } from '../PreferencesCard';

describe('PreferencesCard', () => {
  const defaultSettings = [
    {
      key: 'language',
      label: 'Language',
      value: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Urdu', value: 'ur' },
      ],
    },
    {
      key: 'currency',
      label: 'Currency',
      value: 'usd',
      options: [
        { label: 'USD', value: 'usd' },
        { label: 'INR', value: 'inr' },
      ],
    },
  ];

  it('renders the default title "Preferences"', () => {
    render(<PreferencesCard settings={defaultSettings} />);
    expect(screen.getByText('Preferences')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<PreferencesCard settings={defaultSettings} title="App Settings" />);
    expect(screen.getByText('App Settings')).toBeInTheDocument();
  });

  it('renders all preference labels', () => {
    render(<PreferencesCard settings={defaultSettings} />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Currency')).toBeInTheDocument();
  });

  it('renders the correct number of settings', () => {
    const { container } = render(<PreferencesCard settings={defaultSettings} />);
    const items = container.querySelectorAll('.item');
    expect(items.length).toBe(2);
  });

  it('applies testID as data-testid', () => {
    render(<PreferencesCard settings={defaultSettings} testID="pref-card" />);
    expect(screen.getByTestId('pref-card')).toBeInTheDocument();
  });

  it('passes derived testIDs to individual selects', () => {
    render(<PreferencesCard settings={defaultSettings} testID="pref-card" />);
    expect(screen.getByTestId('pref-card-language')).toBeInTheDocument();
    expect(screen.getByTestId('pref-card-currency')).toBeInTheDocument();
  });
});
