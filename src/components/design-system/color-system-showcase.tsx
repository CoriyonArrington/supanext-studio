'use client';

import { chakraThemeConfig } from '@/lib/theme';
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';

// A helper component to render each color swatch neatly
function ColorSwatch({ name, hex }: { name: string; hex: string }) {
  return (
    <VStack spacing={2} alignItems="flex-start">
      <Box
        w="full"
        h="100px"
        bg={hex}
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.200"
      />
      <Box>
        <Text fontWeight="bold" textTransform="capitalize">
          {name.replace('-', ' ')}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {hex}
        </Text>
      </Box>
    </VStack>
  );
}

export function ColorSystemShowcase() {
  const { colors } = chakraThemeConfig;

  return (
    <Box as="section" id="colors" w="full" py={16}>
      <VStack spacing={12} align="stretch">
        {/* Section for Semantic Colors */}
        <Box>
          <Heading size="lg" mb={4}>
            Semantic Palette
          </Heading>
          <Text mb={6}>
            These colors are used for specific UI elements like backgrounds,
            text, borders, and actions.
          </Text>
          <SimpleGrid
            columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
            spacing={8}
          >
            {Object.entries(colors.brand).map(([name, hex]) => (
              <ColorSwatch key={name} name={name} hex={hex} />
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Section for Primary Brand Scale */}
        <Box>
          <Heading size="lg" mb={4}>
            Primary Brand Scale (Teal)
          </Heading>
          <Text mb={6}>
            The primary brand color is `teal`. It is used for accents, buttons,
            and focus indicators.
          </Text>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={6}>
            {Object.entries(colors.teal).map(([weight, hex]) => (
              <VStack key={weight} spacing={2} alignItems="flex-start">
                <Box
                  w="full"
                  h="100px"
                  bg={`teal.${weight}`}
                  borderRadius="md"
                  borderWidth="1px"
                />
                <Box>
                  <Text fontWeight="bold">Teal {weight}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {hex}
                  </Text>
                </Box>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}