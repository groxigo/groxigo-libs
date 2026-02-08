import React, { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from '../Avatar';

describe('Avatar', () => {
  // ===== Basic Rendering =====
  describe('Basic Rendering', () => {
    it('renders as a <div> with role="img"', () => {
      render(<Avatar testID="avatar" />);
      const el = screen.getByTestId('avatar');
      expect(el.tagName).toBe('DIV');
      expect(el).toHaveAttribute('role', 'img');
    });

    it('applies testID as data-testid', () => {
      render(<Avatar testID="my-avatar" />);
      expect(screen.getByTestId('my-avatar')).toBeInTheDocument();
    });

    it('renders with default aria-label "Avatar" when no name or alt', () => {
      render(<Avatar testID="default-label" />);
      expect(screen.getByTestId('default-label')).toHaveAttribute('aria-label', 'Avatar');
    });

    it('renders with name-based aria-label when name is provided', () => {
      render(<Avatar name="John Doe" testID="named" />);
      expect(screen.getByTestId('named')).toHaveAttribute('aria-label', 'Avatar for John Doe');
    });

    it('renders with alt as aria-label when alt is provided', () => {
      render(<Avatar alt="User photo" testID="alt-avatar" />);
      expect(screen.getByTestId('alt-avatar')).toHaveAttribute('aria-label', 'User photo');
    });
  });

  // ===== Image =====
  describe('Image', () => {
    it('renders an <img> element when src is provided', () => {
      render(<Avatar src="https://example.com/photo.jpg" testID="img-avatar" />);
      const img = screen.getByTestId('img-avatar').querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('sets alt on the image from alt prop', () => {
      render(<Avatar src="https://example.com/photo.jpg" alt="Profile pic" testID="alt-img" />);
      const img = screen.getByTestId('alt-img').querySelector('img');
      expect(img).toHaveAttribute('alt', 'Profile pic');
    });

    it('uses name as fallback alt for image', () => {
      render(<Avatar src="https://example.com/photo.jpg" name="Jane Doe" testID="name-img" />);
      const img = screen.getByTestId('name-img').querySelector('img');
      expect(img).toHaveAttribute('alt', 'Jane Doe');
    });

    it('shows fallback initials when image errors', () => {
      render(<Avatar src="https://example.com/broken.jpg" name="John Doe" testID="error-avatar" />);
      const img = screen.getByTestId('error-avatar').querySelector('img');
      fireEvent.error(img!);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  // ===== Fallback / Initials =====
  describe('Fallback and Initials', () => {
    it('shows initials when no src is provided', () => {
      render(<Avatar name="John Doe" testID="initials" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('shows single initial for single-word name', () => {
      render(<Avatar name="Alice" testID="single" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('shows "?" when no name and no src', () => {
      render(<Avatar testID="no-name" />);
      expect(screen.getByText('?')).toBeInTheDocument();
    });

    it('uses first and last name initials for multi-word names', () => {
      render(<Avatar name="Mary Jane Watson" testID="multi" />);
      expect(screen.getByText('MW')).toBeInTheDocument();
    });

    it('renders custom fallback element when provided', () => {
      render(
        <Avatar
          fallback={<span data-testid="custom-fallback">Custom</span>}
          testID="fallback-avatar"
        />
      );
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    });
  });

  // ===== Badge =====
  describe('Status Badge', () => {
    it('does not render badge by default', () => {
      render(<Avatar testID="no-badge" />);
      const avatar = screen.getByTestId('no-badge');
      // Badge has aria-hidden="true" so we check by querying spans
      const badges = avatar.querySelectorAll('[aria-hidden="true"]');
      expect(badges.length).toBe(0);
    });

    it('renders status badge when showBadge is true', () => {
      render(<Avatar showBadge testID="badge-avatar" />);
      const avatar = screen.getByTestId('badge-avatar');
      const badge = avatar.querySelector('[aria-hidden="true"]');
      expect(badge).toBeInTheDocument();
    });
  });

  // ===== Border Color =====
  describe('Border Color', () => {
    it('applies border color style when borderColor is provided', () => {
      render(<Avatar borderColor="#ff0000" testID="bordered" />);
      const el = screen.getByTestId('bordered');
      expect(el.style.borderColor).toBe('rgb(255, 0, 0)');
      expect(el.style.borderWidth).toBe('2px');
      expect(el.style.borderStyle).toBe('solid');
    });
  });

  // ===== Click Handler =====
  describe('Click Handler', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Avatar onClick={handleClick} testID="clickable" />);
      fireEvent.click(screen.getByTestId('clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ===== Ref Forwarding =====
  describe('Ref Forwarding', () => {
    it('forwards ref to the container div', () => {
      const ref = createRef<HTMLDivElement>();
      render(<Avatar ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
