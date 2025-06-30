'use client';

import { chakraThemeConfig } from '@/lib/theme';
import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';

export function ShadowsShowcase() {
  const { shadows } = chakraThemeConfig;
  const boxBg = useColorModeValue('white', 'gray.700');

  // We don't need to display the 'outline' shadow
  const displayShadows = Object.fromEntries(
    Object.entries(shadows).filter(([key]) => key !== 'outline')
  );

  return (
    <Box as="section" id="shadows" w="full" py={16}>
      <Heading size="lg" mb={6}>
        Shadows
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10}>
        {Object.entries(displayShadows).map(([name]) => (
          <Box key={name} textAlign="center">
            <Box h="100px" bg={boxBg} boxShadow={name} borderRadius="md" />
            <Text mt={4} fontWeight="medium">{name}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}