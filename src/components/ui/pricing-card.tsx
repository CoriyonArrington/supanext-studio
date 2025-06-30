// src/components/ui/pricing-card.tsx
'use client';

import {
  Button,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from '~/lib/icons';
import { createCheckoutSession } from '@/lib/actions/billing.action';
import type { User } from '@supabase/supabase-js';

interface PricingCardProps {
  title: string;
  price: string;
  priceDescription?: string; // FIX: Added optional priceDescription prop
  features: string[];
  isFeatured?: boolean;
  ctaText?: string;
  ctaLink?: string;
  stripePriceId: string;
  user: User | null;
}

export function PricingCard({
  title,
  price,
  priceDescription, // FIX: Destructure the new prop
  features,
  isFeatured = false,
  ctaText = 'Get Started',
  ctaLink,
  stripePriceId,
  user,
}: PricingCardProps) {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
  const router = useRouter();

  const handleSubscribeClick = () => {
    // If a specific link is provided (like for a contact page), use it.
    if (ctaLink) {
      router.push(ctaLink);
      return;
    }
    
    if (!user) {
      router.push(`/sign-up?priceId=${stripePriceId}`);
      return;
    }

    startTransition(async () => {
      const result = await createCheckoutSession(stripePriceId);
      
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          status: 'error',
          isClosable: true,
        });
      } else if (result.url) {
        router.push(result.url);
      }
    });
  };

  const cardBg = useColorModeValue('white', 'gray.700');
  const featuredBorderColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <VStack
      p={8}
      bg={cardBg}
      borderRadius="xl"
      borderWidth={isFeatured ? '2px' : '1px'}
      borderColor={isFeatured ? featuredBorderColor : 'gray.200'}
      boxShadow={isFeatured ? 'lg' : 'md'}
      spacing={6}
      align="stretch"
      h="full"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
      }}
    >
      <Heading size="lg" textAlign="center">
        {title}
      </Heading>
      <VStack>
        <Text fontSize="4xl" fontWeight="bold">
          {price}
        </Text>
        {/* FIX: Render the priceDescription if it exists */}
        {priceDescription && (
          <Text color="gray.500" h={10}>{priceDescription}</Text>
        )}
      </VStack>
      <List spacing={3} flex="1">
        {features.map((feature) => (
          <ListItem key={feature}>
            <ListIcon as={FaCheckCircle} color="green.500" />
            {feature}
          </ListItem>
        ))}
      </List>
      <Button
        colorScheme={isFeatured ? 'teal' : 'gray'}
        variant={isFeatured ? 'solid' : 'outline'}
        w="full"
        onClick={handleSubscribeClick}
        isLoading={isPending}
      >
        {ctaText}
      </Button>
    </VStack>
  );
}