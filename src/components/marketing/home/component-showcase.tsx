// src/components/marketing/home/component-showcase.tsx
'use client';

import {
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Card } from '~/components/ui/card';
import { FiCheckCircle, FiStar, FiTrendingUp } from 'react-icons/fi';

export function ComponentShowcase() {
  // FIX: Removed the unused 'cardBg' variable.
  return (
    <Card p={0} overflow="hidden">
      <VStack spacing={4} p={6} align="stretch">
        <Heading size="md">Ready-to-Use Components</Heading>
        <SimpleGrid columns={2} spacing={4}>
          <Button colorScheme="teal">Get Started</Button>
          <Button variant="outline">Learn More</Button>
          <Card>
            <HStack>
              <Icon as={FiCheckCircle} color="green.500" />
              <Text>Feature One</Text>
            </HStack>
          </Card>
          <Card>
            <HStack>
              <Icon as={FiStar} color="yellow.400" />
              <Text>Feature Two</Text>
            </HStack>
          </Card>
        </SimpleGrid>
        <Card>
          <HStack justify="space-between">
            <HStack>
              <Icon as={FiTrendingUp} color="blue.500" />
              <Text fontWeight="bold">Weekly Sales</Text>
            </HStack>
            <Text color="green.500">+$2,400</Text>
          </HStack>
        </Card>
        <HStack>
          <Tag>Authentication</Tag>
          <Tag>Billing</Tag>
          <Tag>Dashboard</Tag>
        </HStack>
      </VStack>
    </Card>
  );
}