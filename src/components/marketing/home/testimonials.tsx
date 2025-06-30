// src/components/marketing/home/testimonials.tsx
'use client';

import {
  Avatar,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Section } from '~/components/ui/section';


interface Testimonial {
  quote: string;
  author_name: string;
  author_role: string;
  author_avatar_url: string;
}

interface TestimonialsProps {
  headline: string;
  testimonials: Testimonial[];
}

export function Testimonials({ headline, testimonials }: TestimonialsProps) {
  return (
    <Section bg="gray.50" _dark={{ bg: 'gray.800' }}>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Text color="teal.500" fontWeight="bold">
            SOCIAL PROOF
          </Text>
          <Text as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
            {headline}
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
          {testimonials.map((testimonial) => (
            <VStack
              key={testimonial.author_name}
              p={8}
              bg="white"
              _dark={{ bg: 'gray.700' }}
              borderRadius="lg"
              boxShadow="md"
              spacing={5}
              align="flex-start"
              borderWidth="1px"
              borderColor="gray.200"
              // FIX: The duplicate _dark prop has been removed here.
            >
              <HStack spacing={0.5}>
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} as={FaStar} color="yellow.400" />
                ))}
              </HStack>
              <Text fontStyle="italic">&quot;{testimonial.quote}&quot;</Text>
              <HStack>
                <Avatar
                  size="sm"
                  name={testimonial.author_name}
                  src={testimonial.author_avatar_url}
                />
                <VStack align="flex-start" spacing={0}>
                  <Text fontWeight="bold">{testimonial.author_name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {testimonial.author_role}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Section>
  );
}