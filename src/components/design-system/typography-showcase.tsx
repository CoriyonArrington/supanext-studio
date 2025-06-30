'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
  Link as ChakraLink,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function TypographyShowcase() {
  const blockquoteBg = useColorModeValue('gray.100', 'gray.800');
  const blockquoteBorder = useColorModeValue('gray.300', 'gray.600');
  const leadTextColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box as="section" id="typography" w="full" py={16}>
      <Heading size="lg" mb={6}>
        Typography
      </Heading>

      <VStack spacing={10} align="stretch">
        {/* Headings Section */}
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Heading Font: Montserrat
          </Text>
          <VStack align="stretch">
            <Heading size="2xl">Heading 2xl</Heading>
            <Heading size="xl">Heading xl</Heading>
            <Heading size="lg">Heading lg</Heading>
            <Heading size="md">Heading md</Heading>
            <Heading size="sm">Heading sm</Heading>
            <Heading size="xs">Heading xs</Heading>
          </VStack>
        </Box>

        <Divider />

        {/* Body & Paragraph Text Section */}
        <Box>
          <Text fontSize="sm" color="gray.500" mb={4}>
            Body Font: Nunito Sans
          </Text>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="lg" color={leadTextColor}>
              This is a lead paragraph style. It&apos;s useful for intros or
              stand-out text, providing a slightly larger and more readable
              starting point for a section.
            </Text>
            <Text>
              This is a standard body paragraph. It uses the default text size
              and is intended for all general-purpose content. The quick brown
              fox jumps over the lazy dog. It provides a baseline for body
              content.
            </Text>
            <Box
              as="blockquote"
              borderLeft="4px"
              borderColor={blockquoteBorder}
              bg={blockquoteBg}
              p={4}
              rounded="md"
              fontStyle="italic"
            >
              &quot;This is a blockquote. It&apos;s useful for highlighting quotes or
              important snippets of text from users or other sources.&quot;
            </Box>
          </VStack>
        </Box>

        <Divider />

        {/* Inline & List Elements Section */}
        <Box>
          <VStack align="stretch" spacing={6}>
            <Text>
              You can use the <Code colorScheme="teal">Code</Code> component for
              inline code snippets, like `useState` or `useEffect`.
            </Text>

            <Box>
              <Heading size="sm" mb={2}>
                Unordered List
              </Heading>
              <UnorderedList spacing={1} pl={4}>
                <ListItem>List item one</ListItem>
                <ListItem>List item two</ListItem>
                <ListItem>
                  Nested list item
                  <UnorderedList pl={6} pt={1} styleType="circle">
                    <ListItem>Sub-item A</ListItem>
                    <ListItem>Sub-item B</ListItem>
                  </UnorderedList>
                </ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Heading size="sm" mb={2}>
                Ordered List
              </Heading>
              <OrderedList spacing={1} pl={4}>
                <ListItem>First item</ListItem>
                <ListItem>Second item</ListItem>
                <ListItem>Third item</ListItem>
              </OrderedList>
            </Box>

            <Text>
              This is an example of a{' '}
              <ChakraLink as={NextLink} href="#" color="teal.500" fontWeight="bold">
                Chakra Link
              </ChakraLink>
              .
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}