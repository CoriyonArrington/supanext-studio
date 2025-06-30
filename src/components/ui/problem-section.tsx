'use client';
import { Heading, Icon, SimpleGrid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { FiAlertTriangle, FiCopy, FiBarChart2 } from 'react-icons/fi';
import { Section } from '@/components/ui/section';
import type { Database } from '~/lib/database.types';

type Feature = Database['public']['Tables']['marketing_features']['Row'];

const iconMap: { [key: string]: React.ElementType } = { FiCopy, FiAlertTriangle, FiBarChart2 };

function ProblemStatement({ icon, title, description }: { icon: React.ElementType, title: string, description: React.ReactNode }) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <VStack spacing={4} textAlign="center">
      <Icon as={icon} w={10} h={10} color="red.500" />
      <Heading size="md">{title}</Heading>
      <Text fontSize="lg" color={textColor}>{description}</Text>
    </VStack>
  );
}

interface ProblemSectionProps {
  headline: string;
  subheadline: string;
  features: Feature[];
}

export function ProblemSection({ headline, subheadline, features }: ProblemSectionProps) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <Section py={{ base: 20, md: 28 }}>
      <VStack spacing={6} textAlign="center" maxW="3xl" mx="auto" mb={12}>
        <Heading size={{ base: 'xl', md: '2xl' }}>{headline}</Heading>
        <Text fontSize="xl" color={textColor}>{subheadline}</Text>
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="7xl" mx="auto">
        {features.map(feature => (
          <ProblemStatement key={feature.id} icon={iconMap[feature.icon_name!]} title={feature.title} description={feature.description} />
        ))}
      </SimpleGrid>
    </Section>
  );
}