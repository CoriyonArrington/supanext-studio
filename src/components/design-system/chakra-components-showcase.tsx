'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Badge,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Wrap,
  WrapItem,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useColorModeValue,
  Divider,
  Spinner, // 1. Import the Spinner component
} from '@chakra-ui/react';

export function ChakraComponentsShowcase() {
  const textColor = useColorModeValue('gray.600', 'gray.500');

  return (
    <Box as="section" id="components" w="full" py={16}>
      <Heading size="lg" mb={10}>
        Chakra Components
      </Heading>

      <VStack spacing={12} align="stretch">
        {/* Buttons */}
        <Box>
          <Heading size="md" mb={4}>
            Buttons
          </Heading>
          <Wrap spacing={4} align="center">
            <WrapItem>
              <Button colorScheme="teal" variant="solid">
                Default Primary
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="teal" variant="outline">
                Themed Outline
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="green" variant="solid">
                Solid Green
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="red" variant="ghost">
                Ghost Red
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="purple" variant="link">
                Link Purple
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="teal" isLoading>
                Submitting
              </Button>
            </WrapItem>
            <WrapItem>
              <Button colorScheme="teal" isDisabled>
                Disabled
              </Button>
            </WrapItem>
          </Wrap>
        </Box>

        <Divider />

        {/* Badges */}
        <Box>
          <Heading size="md" mb={4}>
            Badges
          </Heading>
          <Wrap spacing={4}>
            <WrapItem>
              <Badge>Default</Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="yellow" variant="subtle">
                Subtle Yellow
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="pink" variant="solid">
                Solid Pink
              </Badge>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="cyan" variant="outline">
                Outline Cyan
              </Badge>
            </WrapItem>
          </Wrap>
        </Box>

        <Divider />

        {/* Form Elements */}
        <Box>
          <Heading size="md" mb={4}>
            Form Elements
          </Heading>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" placeholder="your@email.com" />
              <FormHelperText>We&apos;ll never share your email.</FormHelperText>
            </FormControl>
            <FormControl isInvalid>
              <FormLabel>Name (with error)</FormLabel>
              <Input type="text" placeholder="John Doe" />
              <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>
          </VStack>
        </Box>

        <Divider />

        {/* Spinners */}
        <Box>
          <Heading size="md" mb={4}>
            Spinners
          </Heading>
          <Text color={textColor} mb={4}>
            Spinners provide visual feedback for indeterminate loading states.
          </Text>
          <Wrap spacing={8} align="center">
            <WrapItem>
              <VStack>
                <Spinner size="xs" />
                <Text fontSize="xs">xs</Text>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack>
                <Spinner size="sm" />
                <Text fontSize="xs">sm</Text>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack>
                <Spinner size="md" />
                <Text fontSize="xs">md</Text>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack>
                <Spinner size="lg" />
                <Text fontSize="xs">lg</Text>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack>
                <Spinner size="xl" />
                <Text fontSize="xs">xl</Text>
              </VStack>
            </WrapItem>
            <WrapItem>
              <VStack>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
                <Text fontSize="xs">Custom</Text>
              </VStack>
            </WrapItem>
          </Wrap>
        </Box>

        <Divider />

        {/* Loading States */}
        <Box>
          <Heading size="md" mb={4}>
            Loading States (Skeleton)
          </Heading>
          <Text color={textColor} mb={4}>
            Use Skeleton components as placeholders for content that is still
            loading.
          </Text>
          <Stack p={4} borderWidth="1px" rounded="md">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
}