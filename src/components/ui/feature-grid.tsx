// src/components/ui/feature-grid.tsx
'use client';

import {
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  type BoxProps,
} from '@chakra-ui/react';
import {
  FiBookOpen,
  FiLink,
  FiShield,
  FiCopy,
  FiAlertTriangle,
  FiBarChart2,
} from 'react-icons/fi';
import { Section } from '~/components/ui/section';

const iconMap: { [key: string]: React.ElementType } = {
  FiBookOpen,
  FiLink,
  FiShield,
  FiCopy,
  FiAlertTriangle,
  FiBarChart2,
};

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureGridProps extends BoxProps {
  headline: string;
  subheadline?: string;
  features: Feature[];
  iconColor?: string;
}

function FeatureStatement({
  icon,
  title,
  description,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  iconColor: string;
}) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <VStack spacing={4} textAlign="center">
      <Icon as={icon} w={10} h={10} color={iconColor} />
      <Heading size="md">{title}</Heading>
      <Text fontSize="lg" color={textColor}>
        {description}
      </Text>
    </VStack>
  );
}

export function FeatureGrid({
  headline,
  subheadline,
  features,
  iconColor = 'teal.500',
  ...rest
}: FeatureGridProps) {
  // FIX: Corrected the typo from 'useColorMdeValue' to 'useColorModeValue'.
  const textColor = useColorModeValue('gray.600', 'gray.400');
  return (
    <Section {...rest}>
      <VStack
        spacing={subheadline ? 6 : 12}
        textAlign="center"
        maxW="3xl"
        mx="auto"
        mb={12}
      >
        <Heading size={{ base: 'xl', md: '2xl' }}>{headline}</Heading>
        {subheadline && (
          <Text fontSize="xl" color={textColor}>
            {subheadline}
          </Text>
        )}
      </VStack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="7xl" mx="auto">
        {features.map((feature) => (
          <FeatureStatement
            key={feature.title}
            icon={iconMap[feature.icon]}
            title={feature.title}
            description={feature.description}
            iconColor={iconColor}
          />
        ))}
      </SimpleGrid>
    </Section>
  );
}