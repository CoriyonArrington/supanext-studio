'use client';

import { Box, Circle, Flex, useColorModeValue } from '@chakra-ui/react';

interface BrowserMockupProps {
  children: React.ReactNode;
}

export function BrowserMockup({ children }: BrowserMockupProps) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const headerBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      boxShadow="2xl"
      w="full"
      mx="auto"
      minH="300px"
    >
      <Flex
        bg={headerBg}
        p={3}
        borderTopRadius="xl"
        align="center"
        gap={2}
      >
        <Circle size="12px" bg="red.400" />
        <Circle size="12px" bg="yellow.400" />
        <Circle size="12px" bg="green.400" />
      </Flex>
      <Box p={{ base: 4, md: 8 }}>
        {children}
      </Box>
    </Box>
  );
}