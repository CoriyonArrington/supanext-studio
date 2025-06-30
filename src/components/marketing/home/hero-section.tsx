// src/components/marketing/home/hero-section.tsx
'use client';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaStar } from 'react-icons/fa';
import { ProductMockup } from '~/components/ui/product-mockup';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
}

export function HeroSection({ headline, subheadline }: HeroSectionProps) {
  const heroGradient = useColorModeValue(
    'linear(to-b, white, gray.50)',
    'linear(to-b, gray.800, gray.900)'
  );
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bgGradient={heroGradient}
    >
      <VStack
        spacing={6}
        textAlign="center"
        // FIX: Applied correct, substantial top padding
        pt={{ base: 24, md: 32 }}
        // Padding at the bottom to create space for the mockup
        pb={{ base: 12, md: 16 }}
      >
        <Heading as="h1" size={{ base: '2xl', md: '3xl' }} maxW="2xl">
          {headline}
        </Heading>
        <Text fontSize={{ base: 'lg', md: 'xl' }} maxW="2xl" color={textColor}>
          {subheadline}
        </Text>
        <VStack spacing={4} pt={4}>
          <Button
            as={NextLink}
            href="/sign-up"
            colorScheme="teal"
            bg="teal.600"
            _hover={{ bg: 'teal.700' }}
            color="white"
            size="lg"
            px={8}
            py={7}
          >
            Get Started Free
          </Button>
          <Text fontSize="xs" color={textColor}>
            No credit card required
          </Text>
        </VStack>
        <HStack spacing={3} pt={8}>
          <AvatarGroup size="sm" max={5} borderColor="gray.200">
            <Avatar
              name="User One"
              src="https://randomuser.me/api/portraits/women/4.jpg"
            />
            <Avatar
              name="User Two"
              src="https://randomuser.me/api/portraits/men/44.jpg"
            />
            <Avatar
              name="User Three"
              src="https://randomuser.me/api/portraits/women/31.jpg"
            />
          </AvatarGroup>
          <VStack spacing={0} align="flex-start">
            <HStack spacing={0.5}>
              {[...Array(5)].map((_, i) => (
                <Icon key={i} as={FaStar} color="orange.400" boxSize={4} />
              ))}
            </HStack>
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              Loved by 20,000+ customers
            </Text>
          </VStack>
        </HStack>
      </VStack>
      {/* FIX: Removed the negative margin and added padding for breathing room */}
      <Box pb={20} px={{ base: 4, md: 8 }}>
        <ProductMockup />
      </Box>
    </Box>
  );
}