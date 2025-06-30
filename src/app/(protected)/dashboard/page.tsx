// src/app/(protected)/dashboard/page.tsx
import { Box, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { createClient } from '~/lib/supabase/server';
import { ChartCard } from '~/components/ui/chart-card';
import { StatCard } from '~/components/ui/stat-card';
import { CheckoutHandler } from '~/components/billing/checkout-handler';

const PlaceholderChart = () => (
  <Box h="300px" w="full" bg="gray.100" _dark={{ bg: 'gray.800' }} borderRadius="md" p={4} display="flex" alignItems="flex-end">
    <HStack w="full" h="full" align="flex-end" spacing={2}>
      <Box h="20%" w="12%" bg="teal.300" _dark={{ bg: 'teal.600' }} borderRadius="sm" />
      <Box h="40%" w="12%" bg="teal.300" _dark={{ bg: 'teal.600' }} borderRadius="sm" />
      <Box h="30%" w="12%" bg="teal.300" _dark={{ bg: 'teal.600' }} borderRadius="sm" />
      <Box h="60%" w="12%" bg="teal.400" _dark={{ bg: 'teal.500' }} borderRadius="sm" />
      <Box h="50%" w="12%" bg="teal.300" _dark={{ bg: 'teal.600' }} borderRadius="sm" />
      <Box h="80%" w="12%" bg="teal.400" _dark={{ bg: 'teal.500' }} borderRadius="sm" />
      <Box h="70%" w="12%" bg="teal.300" _dark={{ bg: 'teal.600' }} borderRadius="sm" />
    </HStack>
  </Box>
);

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // FIX: Fetch the full_name from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user!.id)
    .single();

  // FIX: Extract the first name for a more personal greeting, with a fallback
  const firstName = profile?.full_name?.split(' ')[0] || user?.email;

  return (
    <>
      <CheckoutHandler />
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="lg">
          Welcome, {firstName}!
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <StatCard label="Active Projects" value="12" iconName="FiActivity" />
          <StatCard label="New Users" value="1,234" iconName="FiUserPlus" />
          <StatCard label="Revenue (MRR)" value="$5,678" iconName="FiDollarSign" />
        </SimpleGrid>

        <ChartCard title="User Sign-ups This Month">
          <PlaceholderChart />
        </ChartCard>
      </VStack>
    </>
  );
}