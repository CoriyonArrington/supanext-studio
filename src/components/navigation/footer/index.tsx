// src/components/footer/index.tsx
'use client';
import {
  Box,
  Container,
  Stack,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function Footer() {
  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} Your Company Name. All rights reserved</Text>
        {/* FIX: Removed the specific "Built with..." text */}
        <Stack direction={'row'} spacing={6}>
          <ChakraLink as={NextLink} href={'/terms-of-use'}>
            Terms of Use
          </ChakraLink>
          <ChakraLink as={NextLink} href={'/privacy-policy'}>
            Privacy Policy
          </ChakraLink>
        </Stack>
      </Container>
    </Box>
  );
}