'use-client';

import {
  Heading,
  Text,
  VStack,
  HStack,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { Card } from './card';
import NextLink from 'next/link';
import { FaBookOpen } from 'react-icons/fa';

interface SkillCardProps {
  skillName: string;
  category: string;
  description: string;
  href: string;
}

export function SkillCard({
  skillName,
  category,
  description,
  href,
}: SkillCardProps) {
  // --- DIAGNOSTIC LOG ---
  console.log(`[SkillCard] Rendering "${skillName}" with href:`, href);

  return (
    <Card>
      <VStack align="stretch" spacing={3}>
        <HStack>
          <Icon as={FaBookOpen} color="gray.500" />
          <Heading size="sm">{skillName}</Heading>
        </HStack>
        <Text fontSize="xs" color="teal.500" fontWeight="bold" noOfLines={1}>
          {category.toUpperCase()}
        </Text>
        <Text fontSize="sm" color="gray.600" noOfLines={2}>
          {description}
        </Text>
        <ChakraLink
          as={NextLink}
          href={href}
          color="teal.500"
          fontWeight="bold"
          fontSize="sm"
          mt={2}
        >
          Learn More &rarr;
        </ChakraLink>
      </VStack>
    </Card>
  );
}