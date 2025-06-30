import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Header from './index'; // FIXED: Use default import
import type { User } from '@supabase/supabase-js';
import { vi } from 'vitest';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
}));

vi.mock('@/lib/supabase/client', () => ({
  supabase: { // FIXED: Mock the exported instance
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  }
}));

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story: React.ElementType) => (
      <ChakraProvider theme={extendTheme({})}>
        <Story />
      </ChakraProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  name: 'Logged Out State',
  args: {
    initialUser: null,
    initialRole: null,
  },
};

export const LoggedInClient: Story = {
  name: 'Logged In State (Client)',
  args: {
    initialUser: { id: '123', email: 'client@example.com' } as User,
    initialRole: 'client',
  },
};

export const LoggedInTherapist: Story = {
  name: 'Logged In State (Therapist)',
  args: {
    initialUser: { id: '456', email: 'therapist@example.com' } as User,
    initialRole: 'therapist',
  },
};