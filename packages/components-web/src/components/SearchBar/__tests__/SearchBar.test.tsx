import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with default placeholder', () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText('Search groceries...')
    ).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBar placeholder="Find products..." />);
    expect(
      screen.getByPlaceholderText('Find products...')
    ).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<SearchBar value="rice" />);
    expect(screen.getByRole('searchbox')).toHaveValue('rice');
  });

  it('calls onChangeText when input value changes', () => {
    const onChangeText = vi.fn();
    render(<SearchBar onChangeText={onChangeText} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'dal' },
    });
    expect(onChangeText).toHaveBeenCalledWith('dal');
  });

  it('shows clear button when input has a value', () => {
    render(<SearchBar value="test" />);
    expect(
      screen.getByRole('button', { name: 'Clear search' })
    ).toBeInTheDocument();
  });

  it('does not show clear button when input is empty', () => {
    render(<SearchBar value="" />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument();
  });

  it('calls onChangeText with empty string when clear is clicked', () => {
    const onChangeText = vi.fn();
    render(<SearchBar value="rice" onChangeText={onChangeText} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Clear search' })
    );
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('renders cancel button when showCancel is true and input is focused', () => {
    render(<SearchBar showCancel />);
    // Focus the input to reveal the cancel button
    fireEvent.focus(screen.getByRole('searchbox'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not render cancel button when showCancel is false', () => {
    render(<SearchBar showCancel={false} />);
    fireEvent.focus(screen.getByRole('searchbox'));
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('calls onSubmit with value when Enter is pressed', () => {
    const onSubmit = vi.fn();
    render(<SearchBar value="lentils" onSubmit={onSubmit} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('lentils');
  });

  it('applies testID as data-testid', () => {
    render(<SearchBar testID="search-bar" />);
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
  });
});
