'use client';

import React from 'react';
import {
  Heading,
  Text,
  VStack,
  Stack,
  type BoxProps,
} from '@chakra-ui/react';

// 1. Add titleSize to the props interface
interface HeroProps extends BoxProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  titleSize?: string | object;
}

export function Hero({
  title,
  subtitle,
  actions,
  // 2. Set default values for titleSize and other props
  titleSize = { base: '2xl', md: '3xl' },
  ...props
}: HeroProps) {
  return (
    // 3. Add padding to the root VStack
    <VStack spacing={6} textAlign="center" p={{ base: 6, md: 8 }} {...props}>
      <Heading size={titleSize} maxW="2xl">
        {title}
      </Heading>
      <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="xl" color="gray.500">
        {subtitle}
      </Text>
      {actions && (
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing={4}
          mt={4}
        >
          {actions}
        </Stack>
      )}
    </VStack>
  );
}