// src/components/header/header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from './index';
import type { User } from '@supabase/supabase-js';

const mockChannel = {
  on: vi.fn().mockReturnThis(),
  subscribe: vi.fn(),
};

vi.mock('~/lib/supabase/client', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: vi.fn(),
    },
    channel: vi.fn(() => mockChannel),
    removeChannel: vi.fn(),
  },
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
  }),
  usePathname: vi.fn(),
}));

describe('Header (unit)', () => {
  it('renders "Log In" and "Sign Up" links when no user is provided', () => {
    render(<Header initialUser={null} initialRole={null} />);

    expect(screen.getByRole('link', { name: /log in/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it('renders the user menu when a user is provided', () => {
    // FIX: The mock user now includes all required properties for the User type
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'Test User',
        avatar_url: 'https://example.com/avatar.png',
      },
      app_metadata: {
        provider: 'email',
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    };

    render(<Header initialUser={mockUser} initialRole="member" />);

    expect(screen.getByRole('button', { name: /test user/i })).toBeInTheDocument();
    
    expect(
      screen.queryByRole('link', { name: /log in/i }),
    ).not.toBeInTheDocument();
  });
});