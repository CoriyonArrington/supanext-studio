// src/components/ui/product-mockup.tsx
'use client';

import { Avatar, Box, Circle, Flex, Heading, HStack, SimpleGrid, useColorModeValue, VStack } from '@chakra-ui/react';
import { Card } from '~/components/ui/card';
import { ChartCard } from '~/components/ui/chart-card';
import { StatCard } from '~/components/ui/stat-card';

export function ProductMockup() {
  const headerBg = useColorModeValue('gray.100', 'gray.700');
  const containerBg = useColorModeValue('gray.50', 'gray.900');

  const PlaceholderChart = () => (
    <Box h="250px" w="full" bg={useColorModeValue('gray.100', 'gray.800')} borderRadius="md" p={4} display="flex" alignItems="flex-end">
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

  return (
    <Card p={0} overflow="hidden" maxW="1200px" mx="auto">
      <Flex bg={headerBg} p={3} align="center" gap={2}>
        <Circle size="12px" bg="red.400" />
        <Circle size="12px" bg="yellow.400" />
        <Circle size="12px" bg="green.400" />
      </Flex>
      <Box p={{ base: 4, md: 6 }} bg={containerBg}>
        <VStack align="stretch" spacing={6}>
          <HStack justify="space-between">
            <Heading size="lg">Dashboard</Heading>
            <Avatar name="Coriyon Arrington" src="https://suppolucprpnnmoessaj.supabase.co/storage/v1/object/public/images//arrington-coriyon.png" />
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {/* FIX: Pass the icon name as a string */}
            <StatCard label="New Users" value="1,234" iconName="FiUserPlus" />
            <StatCard label="Revenue (MRR)" value="$5,678" iconName="FiDollarSign" />
            <StatCard label="Active Projects" value="245" iconName="FiActivity" />
          </SimpleGrid>
          <ChartCard title="User Sign-ups This Month">
            <PlaceholderChart />
          </ChartCard>
        </VStack>
      </Box>
    </Card>
  );
}