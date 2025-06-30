'use client';

import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Icon,
  Button,
} from '@chakra-ui/react';
// As seen in your auth pages, you use icons from react-icons/fa
import {
  FaUserMd,
  FaHeartbeat,
  FaUserCircle,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

export function IconographyShowcase() {
  const icons = [
    { name: 'FaUserMd', component: FaUserMd },
    { name: 'FaHeartbeat', component: FaHeartbeat },
    { name: 'FaUserCircle', component: FaUserCircle },
    { name: 'FaCheckCircle', component: FaCheckCircle },
    { name: 'FaTimesCircle', component: FaTimesCircle },
  ];

  return (
    <Box as="section" id="iconography" w="full" py={16}>
      <Heading size="lg" mb={6}>
        Iconography
      </Heading>
      <Text color="gray.500" mb={10}>
        Icons from the `react-icons` library can be used with Chakra&apos;s `Icon`
        component for consistent sizing and color.
      </Text>

      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="sm" mb={4}>
            Icon Gallery
          </Heading>
          <SimpleGrid columns={{ base: 3, md: 5 }} spacing={8}>
            {icons.map((icon) => (
              <VStack key={icon.name}>
                <Icon as={icon.component} w={8} h={8} color="teal.500" />
                <Text fontSize="xs" color="gray.500">
                  {icon.name}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Heading size="sm" mb={4}>
            Usage in Buttons
          </Heading>
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={FaCheckCircle} />}
          >
            Accept
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}