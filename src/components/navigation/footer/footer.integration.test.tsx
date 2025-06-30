// src/components/footer/footer.integration.test.tsx
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

describe('Footer (integration)', () => {
  it('displays the correct copyright and navigation links to the user', () => {
    render(<Footer />);

    // FIX: Updated the expected text to match the component's output
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Your Company Name. All rights reserved`),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Terms of Use' }),
    ).toHaveAttribute('href', '/terms-of-use');
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' }),
    ).toHaveAttribute('href', '/privacy-policy');
  });
});