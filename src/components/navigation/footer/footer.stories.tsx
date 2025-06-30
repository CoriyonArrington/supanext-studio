import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Footer } from './index';
import { vi } from 'vitest';

// --- Mocks for Storybook Environment ---
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

// --- Storybook Meta Definition ---
const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  decorators: [
    // Add the type 'React.ElementType' to the Story parameter
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
type Story = StoryObj<typeof Footer>;

// --- Component Stories ---
export const Default: Story = {
  name: 'Default Footer',
};