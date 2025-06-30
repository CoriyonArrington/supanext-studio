'use client';

import { chakraThemeConfig } from '@/lib/theme';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

export function BorderRadiusShowcase() {
  const { radii } = chakraThemeConfig;

  return (
    <Box as="section" id="borderradius" w="full" py={16}>
      <Heading size="lg" mb={6}>
        Border Radius
      </Heading>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={6}>
        {Object.entries(radii).map(([name, value]) => (
          <Box key={name} textAlign="center">
            <Box
              h="100px"
              bg="gray.200"
              borderWidth="2px"
              borderColor="teal.500"
              borderRadius={name}
            />
            {/* CORRECTED: Explicitly cast 'value' to a string */}
            <Text mt={2} fontWeight="medium">
              {name} ({String(value)})
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}