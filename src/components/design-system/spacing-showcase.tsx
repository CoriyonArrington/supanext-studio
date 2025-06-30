'use client';

import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  Center,
  Divider,
} from '@chakra-ui/react';

export function SpacingShowcase() {
  const boxBg = useColorModeValue('teal.50', 'teal.900');
  const parentBoxBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.500');

  return (
    <Box as="section" id="spacing" w="full" py={16}>
      <Heading size="lg" mb={4}>
        Spacing &amp; Layout
      </Heading>
      <Text color={textColor} mb={10}>
        The application uses a 4-point grid system, where 1 spacing unit equals
        0.25rem or 4px. This scale is used for padding, margin, and gaps.
      </Text>

      <VStack spacing={12} align="stretch">
        {/* Padding Example */}
        <Box>
          <Heading size="md" mb={4}>
            Padding
          </Heading>
          <Text color={textColor} mb={4}>
            Padding (<code>p</code>, <code>px</code>, <code>py</code>) adds space inside an element&apos;s border.
          </Text>
          <HStack
            spacing={6}
            p={4}
            bg={parentBoxBg}
            borderRadius="md"
            flexWrap="wrap"
          >
            {['2', '4', '6', '8'].map((token) => (
              <Center
                key={`p-${token}`}
                bg={boxBg}
                p={token}
                borderRadius="sm"
                textAlign="center"
                boxShadow="inner"
              >
                <Text fontSize="sm">p=&quot;{token}&quot;</Text>
              </Center>
            ))}
          </HStack>
        </Box>

        <Divider />

        {/* Margin Example */}
        <Box>
          <Heading size="md" mb={4}>
            Margin
          </Heading>
          <Text color={textColor} mb={4}>
            Margin (<code>m</code>, <code>mt</code>, <code>mx</code>) adds space outside an element&apos;s border.
          </Text>
          <VStack spacing={2} p={4} bg={parentBoxBg} borderRadius="md">
            <Center bg={boxBg} w="80%" p={2} m="0">
              <Text fontSize="sm">m=&quot;0&quot; (No margin)</Text>
            </Center>
            <Center bg={boxBg} w="80%" p={2} mt="4">
              <Text fontSize="sm">mt=&quot;4&quot;</Text>
            </Center>
            <Center bg={boxBg} w="60%" p={2} mx="auto">
              <Text fontSize="sm">mx=&quot;auto&quot; (Centered)</Text>
            </Center>
          </VStack>
        </Box>

        <Divider />

        {/* Gap Example */}
        <Box>
          <Heading size="md" mb={4}>
            Gap (using Stack and Grid)
          </Heading>
          <Text color={textColor} mb={4}>
            The <code>spacing</code> prop adds consistent space between child elements in
            components like <code>VStack</code>, <code>HStack</code>, and <code>SimpleGrid</code>.
          </Text>
          <SimpleGrid
            columns={3}
            spacing={6}
            p={4}
            bg={parentBoxBg}
            borderRadius="md"
          >
            <Center bg={boxBg} h="50px" borderRadius="sm">
              Item A
            </Center>
            <Center bg={boxBg} h="50px" borderRadius="sm">
              Item B
            </Center>
            <Center bg={boxBg} h="50px" borderRadius="sm">
              Item C
            </Center>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}
