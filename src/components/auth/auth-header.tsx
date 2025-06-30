// src/components/auth/auth-header.tsx
'use client';

import { Button, Flex, Heading, HStack, Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from '~/components/ui/theme-switcher';

export function AuthHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <Flex
      as="header"
      position="absolute"
      top={0}
      w="full"
      p={4}
      align="center"
      justify="space-between"
    >
      <HStack>
        <ChakraLink as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="md">SaaS Platform</Heading>
        </ChakraLink>
      </HStack>
      <HStack>
        <ThemeSwitcher />
        {isLoginPage ? (
          <Button as={NextLink} href="/sign-up" colorScheme="teal" size="sm">
            Sign Up
          </Button>
        ) : (
          <Button as={NextLink} href="/login" variant="ghost" size="sm">
            Log In
          </Button>
        )}
      </HStack>
    </Flex>
  );
}