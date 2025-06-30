// src/components/ui/solution-section.tsx
'use client';

import {
  Box,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
  // FIX: Import BoxProps to allow passing style props
  type BoxProps,
} from '@chakra-ui/react';
import { FiSmartphone, FiDatabase, FiShield } from 'react-icons/fi';
import { Section } from '~/components/ui/section';

const iconMap: { [key: string]: React.ElementType } = {
  FiSmartphone,
  FiDatabase,
  FiShield,
};

// FIX: Extend the interface with BoxProps
interface SolutionSectionProps extends BoxProps {
  iconName: string;
  headline: string;
  subheadline: string;
  isReversed?: boolean;
  children: React.ReactNode;
}

export function SolutionSection({
  iconName,
  headline,
  subheadline,
  isReversed = false,
  children,
  // FIX: Capture the rest of the props (like py)
  ...rest
}: SolutionSectionProps) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const textOrder = isReversed ? 2 : 1;
  const contentOrder = isReversed ? 1 : 2;

  return (
    // FIX: Spread the rest of the props onto the Section component
    <Section {...rest}>
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
        <VStack
          align="flex-start"
          spacing={5}
          order={{ base: 1, lg: textOrder }}
        >
          <Icon as={iconMap[iconName]} w={12} h={12} color="teal.500" />
          <Heading size="xl">{headline}</Heading>
          <Text fontSize="xl" color={textColor}>
            {subheadline}
          </Text>
        </VStack>
        <Box order={{ base: 2, lg: contentOrder }}>
          {children}
        </Box>
      </SimpleGrid>
    </Section>
  );
}