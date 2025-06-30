'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  useTheme,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

export function BreakpointsShowcase() {
  const theme = useTheme();
  const boxBg = useColorModeValue('gray.100', 'gray.700');

  // We can get the breakpoint values directly from the theme
  const breakpoints = theme.breakpoints;

  return (
    <Box as="section" id="breakpoints" w="full" py={16}>
      <Heading size="lg" mb={4}>
        Breakpoints
      </Heading>
      <Text color="gray.500" mb={10}>
        The application uses Chakra UI&apos;s standard responsive breakpoints. Test
        by resizing your browser window.
      </Text>

      {/* Display the breakpoint values from the theme */}
      <Box p={4} bg={boxBg} borderRadius="md" mb={10}>
        <Heading size="sm" mb={4}>
          Breakpoint Values
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3 }} spacingX={4} spacingY={2}>
          {Object.entries(breakpoints).map(([name, value]) => (
            <Text key={name} fontSize="sm">
              <Text as="span" fontWeight="bold">
                {name}:
              </Text>{' '}
              {String(value)}
            </Text>
          ))}
        </SimpleGrid>
      </Box>

      {/* Visual demonstration of breakpoints */}
      <VStack spacing={4} align="stretch">
        <Heading size="sm">Visual Demonstration</Heading>
        <Box
          p={4}
          borderRadius="md"
          textAlign="center"
          // This box changes its background color at each breakpoint
          bg={{
            base: 'red.400',
            sm: 'orange.400',
            md: 'yellow.400',
            lg: 'green.400',
            xl: 'blue.400',
            '2xl': 'purple.400',
          }}
        >
          {/* This text changes at each breakpoint */}
          <Text fontWeight="bold" display={{ base: 'block', sm: 'none' }}>
            BASE (0px+)
          </Text>
          <Text fontWeight="bold" display={{ base: 'none', sm: 'block', md: 'none' }}>
            SMALL - sm (480px+)
          </Text>
          <Text fontWeight="bold" display={{ base: 'none', md: 'block', lg: 'none' }}>
            MEDIUM - md (768px+)
          </Text>
          <Text fontWeight="bold" display={{ base: 'none', lg: 'block', xl: 'none' }}>
            LARGE - lg (992px+)
          </Text>
          <Text fontWeight="bold" display={{ base: 'none', xl: 'block', '2xl': 'none' }}>
            EXTRA LARGE - xl (1280px+)
          </  Text>
          <Text fontWeight="bold" display={{ base: 'none', '2xl': 'block' }}>
            EXTRA EXTRA LARGE - 2xl (1536px+)
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}