// src/components/ui/demo-banner.tsx
'use client';

import { Box, Button, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';

export function DemoBanner() {
  const bannerBg = useColorModeValue('teal.300', 'teal.500');
  const bannerColor = useColorModeValue('gray.800', 'white');

  return (
    <Box
      w="full"
      bg={bannerBg}
      color={bannerColor}
      py={2}
      px={4}
      textAlign="center"
    >
      <HStack justify="center" spacing={4}>
        <Icon as={FiAlertTriangle} />
        <Text fontSize="sm" fontWeight="medium">
          You are in a read-only demo environment.
        </Text>
        <Button
          as={NextLink}
          href="/sign-up"
          size="sm"
          variant="link"
          colorScheme="black"
        >
          Sign Up for Full Access
        </Button>
      </HStack>
    </Box>
  );
}