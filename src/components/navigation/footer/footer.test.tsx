// src/components/footer/footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Footer } from './index';

// Mock the Next.js Link component for testing
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer (unit)', () => {
  it('renders the copyright text and navigation links', () => {
    render(<Footer />);

    // FIX: Updated the expected text to match the component's output
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Your Company Name. All rights reserved`),
    ).toBeInTheDocument();

    // Check for the Terms of Use link
    const termsLink = screen.getByRole('link', { name: /terms of use/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-of-use');

    // Check for the Privacy Policy link
    const privacyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', '/privacy-policy');
  });
});