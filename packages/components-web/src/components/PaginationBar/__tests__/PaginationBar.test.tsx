import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PaginationBar } from '../PaginationBar';

describe('PaginationBar', () => {
  it('renders with testID', () => {
    render(<PaginationBar currentPage={1} totalPages={5} testID="pagination" />);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('renders with role="navigation" and aria-label', () => {
    render(<PaginationBar currentPage={1} totalPages={5} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('renders page number buttons', () => {
    render(<PaginationBar currentPage={1} totalPages={5} />);
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument();
  });

  it('marks current page with aria-current', () => {
    render(<PaginationBar currentPage={3} totalPages={5} />);
    expect(screen.getByLabelText('Page 3')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Page 1')).not.toHaveAttribute('aria-current');
  });

  it('renders previous and next buttons', () => {
    render(<PaginationBar currentPage={3} totalPages={5} />);
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<PaginationBar currentPage={1} totalPages={5} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<PaginationBar currentPage={5} totalPages={5} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('calls onPageChange when a page button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <PaginationBar currentPage={1} totalPages={5} onPageChange={handleChange} />
    );
    fireEvent.click(screen.getByLabelText('Page 3'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with next page when next button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <PaginationBar currentPage={2} totalPages={5} onPageChange={handleChange} />
    );
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when previous button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <PaginationBar currentPage={3} totalPages={5} onPageChange={handleChange} />
    );
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('shows ellipsis for large page counts', () => {
    render(<PaginationBar currentPage={5} totalPages={20} />);
    // Should show ellipsis between page groups
    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });
});
