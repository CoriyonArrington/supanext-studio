// src/components/marketing/home/analytics-showcase.tsx
'use client';

import {
  Box,
  HStack,
  SimpleGrid,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ChartCard } from '~/components/ui/chart-card';
import { StatCard } from '~/components/ui/stat-card';
import { Card } from '~/components/ui/card';

const PlaceholderChart = () => (
    <Box
      h="200px"
      w="full"
      bg={useColorModeValue('gray.100', 'gray.800')}
      borderRadius="md"
      p={4}
      display="flex"
      alignItems="flex-end"
    >
      <HStack w="full" h="full" align="flex-end" spacing={2}>
        <Box h="20%" w="12%" bg={useColorModeValue('teal.300', 'teal.600')} borderRadius="sm" />
        <Box h="40%" w="12%" bg={useColorModeValue('teal.300', 'teal.600')} borderRadius="sm" />
        <Box h="30%" w="12%" bg={useColorModeValue('teal.300', 'teal.600')} borderRadius="sm" />
        <Box h="60%" w="12%" bg={useColorModeValue('teal.400', 'teal.500')} borderRadius="sm" />
        <Box h="50%" w="12%" bg={useColorModeValue('teal.300', 'teal.600')} borderRadius="sm" />
        <Box h="80%" w="12%" bg={useColorModeValue('teal.400', 'teal.500')} borderRadius="sm" />
        <Box h="70%" w="12%" bg={useColorModeValue('teal.300', 'teal.600')} borderRadius="sm" />
      </HStack>
    </Box>
  );

export function AnalyticsShowcase() {
  return (
    <Card>
      <VStack align="stretch" spacing={6}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {/* FIX: Changed prop from 'icon' to 'iconName' and passed the string name */}
              <StatCard iconName="FiUserPlus" label="New Users" value="1,234" />
              <StatCard iconName="FiDollarSign" label="Revenue (MRR)" value="$5,678" />
              <StatCard iconName="FiActivity" label="Active Projects" value="245" />
          </SimpleGrid>
          <ChartCard title="User Sign-ups This Month">
              <PlaceholderChart />
          </ChartCard>
      </VStack>
    </Card>
  );
}