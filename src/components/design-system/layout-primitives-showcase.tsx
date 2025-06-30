'use client';

import { Section } from '@/components/ui/section';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function LayoutPrimitivesShowcase() {
  const lightBg = useColorModeValue('gray.50', 'gray.800');
  const darkBg = useColorModeValue('gray.800', 'white');
  const lightTextColor = useColorModeValue('white', 'gray.800');

  return (
    <Box as="section" id="layout-primitives" w="full" py={16}>
      <Heading size="lg" mb={6}>
        Layout & Sectioning
      </Heading>
      <Text color="gray.500" mb={10}>
        The `Section` component is a primary layout primitive used to create
        full-width sections with centered, max-width content.
      </Text>

      <VStack spacing={8} align="stretch">
        {/* Example 1: Default Section */}
        <Box>
          <Heading size="md" mb={4}>
            Default Section
          </Heading>
          <Text mb={4}>
            A standard section with a light background, demonstrating a typical
            hero or feature section.
          </Text>
          <Section py={{ base: 16, md: 24 }} bg={lightBg}>
            <VStack spacing={6} textAlign="center">
              <Heading size={{ base: 'xl', md: '2xl' }}>
                Let&apos;s Build Something Meaningful
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW="xl"
                color="gray.500"
              >
                Your patients deserve a seamless experience, and you deserve a
                UX partner who listens.
              </Text>
              <Button as={NextLink} href="#" colorScheme="teal" size="lg">
                Start a Project
              </Button>
            </VStack>
          </Section>
        </Box>

        {/* Example 2: Dark Section */}
        <Box>
          <Heading size="md" mb={4}>
            Dark Variant Section
          </Heading>
          <Text mb={4}>
            The same `Section` component with different `bg` and `color` props
            for a high-contrast variant.
          </Text>
          <Section py={{ base: 16, md: 24 }} bg={darkBg} color={lightTextColor}>
            <VStack spacing={6} textAlign="center">
              <Heading size={{ base: 'xl', md: '2xl' }}>
                Let&apos;s Build Something Meaningful
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                maxW="xl"
                color={lightTextColor}
                opacity={0.8}
              >
                Your patients deserve a seamless experience, and you deserve a
                UX partner who listens.
              </Text>
              <Button as={NextLink} href="#" colorScheme="teal" size="lg">
                Start a Project
              </Button>
            </VStack>
          </Section>
        </Box>
      </VStack>
    </Box>
  );
}