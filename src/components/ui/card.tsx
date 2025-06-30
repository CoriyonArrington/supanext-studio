'use client';

import { Box, useColorModeValue, type BoxProps } from '@chakra-ui/react';
import React from 'react';

// The Card component is a styled Box that serves as a container.
// It accepts all standard BoxProps so it can be easily customized.
export const Card = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ ...props }, ref) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const cardBorder = useColorModeValue('gray.200', 'gray.700');

    return (
      <Box
        ref={ref}
        bg={cardBg}
        borderWidth="1px"
        borderColor={cardBorder}
        borderRadius="lg"
        p={{ base: 4, md: 6 }}
        // Add transition and hover effects
        transition="all 0.2s ease-in-out"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        }}
        {...props}
      />
    );
  },
);

Card.displayName = 'Card';