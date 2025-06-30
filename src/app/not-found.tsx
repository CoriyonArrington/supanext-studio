// src/app/not-found.tsx
'use client';

import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
// FIX: Import the new AuthHeader and existing Footer
import { AuthHeader } from '~/components/auth/auth-header';
import { Footer } from '@/components/navigation/footer';

export default function NotFound() {
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    // FIX: Wrap the page in a Flex container to include the header and footer
    <Flex direction="column" minH="100vh">
      <AuthHeader />
      <Flex align="center" justify="center" flex="1" px={4}>
        <Stack
          spacing={6}
          mx="auto"
          maxW="lg"
          py={12}
          textAlign="center"
          align="center"
        >
          <Icon as={QuestionOutlineIcon} w={16} h={16} color="yellow.500" />
          <Stack spacing={2}>
            <Heading fontSize={{ base: '3xl', md: '4xl' }}>
              404 - Page Not Found
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Sorry, we couldn&apos;t find the page you were looking for. It
              might have been moved or deleted.
            </Text>
          </Stack>
          <Button
            as={NextLink}
            href="/"
            colorScheme="teal"
            mt={4}
            px={8}
            py={6}
          >
            Return to Homepage
          </Button>
        </Stack>
      </Flex>
      <Footer />
    </Flex>
  );
}