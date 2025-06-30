// src/components/ui/testimonials-section.tsx
'use client';

import {
  Avatar,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { Section } from '~/components/ui/section';
import { useEffect, useState } from 'react';
import { supabase } from '~/lib/supabase/client';

// Type definition for a single testimonial
interface Testimonial {
  id: string; // FIX: Add the id property
  quote: string;
  author_name: string;
  author_role: string;
  author_avatar_url: string;
}

// A new client component just for the star icons
function StarRating() {
  return (
    <HStack spacing={0.5}>
      {[...Array(5)].map((_, i) => (
        <Icon key={i} as={FaStar} color="orange.400" />
      ))}
    </HStack>
  );
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      // FIX: Fetch the 'id' column to use as a unique key
      const { data } = await supabase
        .from('marketing_testimonials')
        .select('id, quote, author_name, author_role, author_avatar_url')
        .order('display_order');
      
      if (data) {
        setTestimonials(data as Testimonial[]);
      }
    };

    fetchTestimonials();
  }, []);


  if (testimonials.length === 0) {
    return null;
  }

  return (
    <Section>
      <VStack spacing={12}>
        <VStack spacing={4} textAlign="center">
          <Text color="teal.500" fontWeight="bold">
            SOCIAL PROOF
          </Text>
          <Heading as="h2" size="xl">
            Loved by builders and innovators
          </Heading>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
          {testimonials.map((testimonial) => (
            // FIX: Use the unique 'testimonial.id' as the key
            <VStack
              key={testimonial.id}
              p={8}
              bg="white"
              _dark={{ bg: 'gray.700', borderColor: 'gray.600' }}
              borderRadius="lg"
              boxShadow="md"
              spacing={5}
              align="flex-start"
              borderWidth="1px"
              borderColor="gray.200"
              flex="1"
            >
              <StarRating />
              <Text fontStyle="italic" flex="1">&quot;{testimonial.quote}&quot;</Text>
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