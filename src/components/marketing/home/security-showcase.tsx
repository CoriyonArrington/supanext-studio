// src/components/marketing/home/security-showcase.tsx
'use client';

import { Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';
import { Card } from '~/components/ui/card';

const securityFeatures = [
  'Row-Level Security',
  'Data Encryption in Transit & At Rest',
  'Multi-Factor Authentication (MFA)',
  'Single Sign-On (SSO)',
  'Secure Stripe Payments',
];

export function SecurityShowcase() {
  return (
    <Card>
      <VStack spacing={6} align="stretch">
        <Heading size="md">Security Features</Heading>
        <VStack align="stretch" spacing={4}>
          {securityFeatures.map((feature) => (
            <HStack key={feature}>
              <Icon as={FiCheckCircle} color="green.500" w={5} h={5} />
              <Text>{feature}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}