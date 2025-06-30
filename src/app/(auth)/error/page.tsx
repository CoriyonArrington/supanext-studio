// src/app/(auth)/error/page.tsx
'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

// Component that uses the search params hook
function ErrorDisplay() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  // Provide a more human-friendly default message
  const displayMessage =
    errorMessage || 'An unexpected issue occurred. Please try again.';

  return (
    <Stack
      spacing={6}
      mx="auto"
      maxW="lg"
      py={12}
      px={6}
      textAlign="center"
      align="center"
    >
      <Icon as={WarningTwoIcon} w={16} h={16} color="red.500" />
      <Stack spacing={2}>
        <Heading fontSize={{ base: '2xl', md: '3xl' }}>
          Sorry, something went wrong
        </Heading>
        <Text fontSize="lg" color={textColor}>
          {displayMessage}
        </Text>
      </Stack>
      <Button
        as={NextLink}
        href="/login"
        colorScheme="teal"
        mt={4}
        px={8}
        py={6}
      >
        Return to Login
      </Button>
    </Stack>
  );
}

// Wrap the client component in Suspense
export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorDisplay />
    </Suspense>
  );
}