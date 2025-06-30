// src/components/marketing/showcase/showcase-card.tsx
'use client';

import {
  Heading,
  Icon,
  Link as ChakraLink,
  Tag,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { Card } from '~/components/ui/card';

interface ShowcaseCardProps {
  item: {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    tags: string[];
  };
}

export function ShowcaseCard({ item }: ShowcaseCardProps) {
  // This hook is now safely used in a Client Component
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <ChakraLink
      as={NextLink}
      href={item.link}
      isExternal
      _hover={{ textDecoration: 'none' }}
      role="group"
    >
      <Card p={0} overflow="hidden" h="full">
        <VStack align="stretch" spacing={4} h="full">
          <Box overflow="hidden" h="250px" position="relative">
            <NextImage
              src={item.imageUrl}
              alt={item.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <Icon
              as={FiArrowUpRight}
              position="absolute"
              top={4}
              right={4}
              boxSize={6}
              color="white"
              bg="blackAlpha.600"
              p={1}
              borderRadius="full"
              transition="all 0.2s"
              _groupHover={{ transform: 'translate(4px, -4px)' }}
            />
          </Box>
          <VStack p={6} pt={2} align="stretch" spacing={3} flex="1">
            <Heading size="md">{item.title}</Heading>
            <Text color={textColor} flex="1">
              {item.description}
            </Text>
            <HStack>
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </ChakraLink>
  );
}