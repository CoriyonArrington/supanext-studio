// src/components/ui/stat-card.tsx
'use client';

import { Box, HStack, Icon, Text, VStack, type BoxProps } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import { FiActivity, FiUserPlus, FiDollarSign } from 'react-icons/fi';

// Create a mapping from string names to the actual icon components
const iconMap: { [key: string]: IconType } = {
  FiActivity,
  FiUserPlus,
  FiDollarSign,
};

interface StatCardProps extends BoxProps {
  label: string;
  value: string;
  // FIX: The prop is now a string, not a function
  iconName?: string;
}

export function StatCard({ label, value, iconName, ...rest }: StatCardProps) {
  // Look up the icon component from the map
  const IconComponent = iconName ? iconMap[iconName] : null;

  return (
    <Box
      p={6}
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      borderRadius="lg"
      boxShadow="sm"
      borderWidth="1px"
      borderColor="gray.200"
      {...rest}
    >
      <HStack spacing={4} align="center">
        {IconComponent && <Icon as={IconComponent} boxSize={8} color="teal.500" />}
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
            {label}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}