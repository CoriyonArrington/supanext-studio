// src/app/(auth)/layout.tsx
import { Flex, Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { AuthHeader } from '~/components/auth/auth-header';
import { Footer } from '@/components/navigation/footer';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      <AuthHeader />
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1"
        pt="72px" // Space for the fixed header
        pb={8}
        // FIX: Horizontal padding is now controlled by the layout
        px={4}
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}