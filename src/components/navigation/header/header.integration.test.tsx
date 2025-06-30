// src/components/header/header.integration.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from './index';
import type { User, Subscription } from '@supabase/supabase-js';
import { supabase } from '~/lib/supabase/client';
import { logout } from '~/lib/actions/logout.action';

vi.mock('~/lib/actions/logout.action.ts', () => ({
  logout: vi.fn(),
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
  usePathname: () => '/',
}));

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
    },
    channel: vi.fn(() => mockChannel),
    removeChannel: vi.fn(),
  },
}));

describe('Header (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockSubscription: Subscription = {
      id: 'mock-subscription',
      callback: () => {},
      unsubscribe: vi.fn(),
    };

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: mockSubscription },
    });
  });

  it('calls the logout server action when the Log Out button is clicked', async () => {
    const user = userEvent.setup();
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

    const userMenuButton = screen.getByRole('button', { name: /test user/i });
    await user.click(userMenuButton);

    const logOutButton = screen.getByRole('menuitem', { name: /log out/i });
    await user.click(logOutButton);

    expect(logout).toHaveBeenCalledOnce();
  });
});